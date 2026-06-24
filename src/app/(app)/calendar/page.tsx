'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import { createSupabaseBrowserClient } from '../../lib/supabaseClient'
import {
  ShoppingCart,
  Wrench,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
} from 'lucide-react'
import PageHelp from '../../../components/PageHelp'
import LockedProFeatureCard from '../../../components/LockedProFeatureCard'
import { trackEvent } from '../../../lib/analytics/trackEvent'
import type {
  TaskCandidate,
  PlantRow,
  UserPlantRow,
  MonthlyCareRow,
  TaskRuleRow,
  TaskStatusRow,
} from '../../../types/calendar'

function parseArrayField(value: unknown): string[] {
  if (!value) return []
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string')
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === 'string')
        : []
    } catch {
      return []
    }
  }
  return []
}

function prettyTag(tag: string): string {
  return tag.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

function buildRuleNote(rule: TaskRuleRow, plant: PlantRow, qty: number): string {
  const name = plant.common_name || 'plant'
  const action = (rule.task_type || 'care').toLowerCase()

  if (action === 'trim') {
    return `You should trim your ${name.toLowerCase()} this month.`
  }

  if (action === 'prune') {
    return `You should prune your ${name.toLowerCase()} this month.`
  }

  if (action === 'feed') {
    return qty > 1
      ? `Time to feed your ${qty} ${name.toLowerCase()} plants.`
      : `Time to feed your ${name.toLowerCase()}.`
  }

  if (action === 'check') {
    return `Check your ${name.toLowerCase()} for seasonal maintenance.`
  }

  if (action === 'tidy') {
    return `Time to tidy your ${name.toLowerCase()}.`
  }

  if (action === 'divide') {
    return `Consider dividing your ${name.toLowerCase()} this month.`
  }

  return `Seasonal ${action} task for your ${name.toLowerCase()}.`
}

function inferToolsFromCareNote(note: string): string[] {
  const lower = note.toLowerCase()
  const tools = new Set<string>()

  if (lower.includes('prune') || lower.includes('trim') || lower.includes('cut back')) {
    tools.add('Secateurs')
  }

  if (lower.includes('hedge')) {
    tools.add('Hedge Shears')
  }

  if (lower.includes('spray')) {
    tools.add('Sprayer')
  }

  if (lower.includes('mulch')) {
    tools.add('Gloves')
  }

  return Array.from(tools)
}

function inferShoppingFromCareNote(note: string, plantName?: string | null): string[] {
  const lower = note.toLowerCase()
  const shopping = new Set<string>()

  if (lower.includes('feed') || lower.includes('fertilis')) {
    shopping.add('Granular Fertiliser')
  }

  if (lower.includes('slug') || lower.includes('snail')) {
    shopping.add('Slug Pellets')
  }

  if (
    plantName &&
    ['meyer lemon', 'lemon', 'lime', 'mandarin', 'orange', 'grapefruit'].includes(
      plantName.toLowerCase()
    ) &&
    (lower.includes('feed') || lower.includes('spring'))
  ) {
    shopping.add('Citrus Fertiliser')
    shopping.add('Epsom Salts')
  }

  return Array.from(shopping)
}

function priorityToUrgency(score: number): 'must' | 'should' | 'could' {
  if (score >= 85) return 'must'
  if (score >= 55) return 'should'
  return 'could'
}

function urgencyToLabel(urgency: 'must' | 'should' | 'could'): string {
  if (urgency === 'must') return 'Do first'
  if (urgency === 'should') return 'This week'
  return 'When you can'
}

function formatTaskDuration(minutes: number): string {
  if (minutes >= 60) {
    const hrs = minutes / 60
    return hrs === 1 ? '~1 hr' : `~${hrs.toFixed(1)} hrs`
  }
  return `~${Math.round(minutes)} min`
}

function getAucklandDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'Pacific/Auckland',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(date)

  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value || 0)

  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
  }
}

function getDefaultActiveWeek() {
  const { year, month, day } = getAucklandDateParts()

  const firstOfMonthUtc = new Date(Date.UTC(year, month - 1, 1))
  const mondayIndex = (firstOfMonthUtc.getUTCDay() + 6) % 7
  const firstMondayDay = mondayIndex === 0 ? 1 : 8 - mondayIndex

  if (day < firstMondayDay) return 1

  return Math.min(4, Math.floor((day - firstMondayDay) / 7) + 1)
}

export default function CalendarPage() {
  const [loading, setLoading] = useState(true)
  const [weekLoading, setWeekLoading] = useState(false)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)

  const [gardenPhoto, setGardenPhoto] = useState<string | null>(null)
  const [activeWeek, setActiveWeek] = useState(getDefaultActiveWeek())
  const [allPlants, setAllPlants] = useState<UserPlantRow[]>([])
  const [monthlyCare, setMonthlyCare] = useState<MonthlyCareRow[]>([])
  const [taskRules, setTaskRules] = useState<TaskRuleRow[]>([])
  const [taskStatus, setTaskStatus] = useState<Record<string, boolean>>({})
  const [taskDoneMessage, setTaskDoneMessage] = useState<string | null>(null)
  const [isPro, setIsPro] = useState(false)

  const taskDoneTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (taskDoneTimeoutRef.current) {
        clearTimeout(taskDoneTimeoutRef.current)
      }
    }
  }, [])

  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const today = new Date()
  const currentMonthNum = Number(
    new Intl.DateTimeFormat('en-NZ', {
      timeZone: 'Pacific/Auckland',
      month: 'numeric',
    }).format(today)
  )
  const currentMonthName = new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'Pacific/Auckland',
    month: 'long',
  }).format(today)
  const currentYear = Number(
    new Intl.DateTimeFormat('en-NZ', {
      timeZone: 'Pacific/Auckland',
      year: 'numeric',
    }).format(today)
  )

  useEffect(() => {
    async function loadData() {
      if (!hasLoadedOnce) {
        setLoading(true)
      } else {
        setWeekLoading(true)
      }

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        setWeekLoading(false)
        return
      }

      setGardenPhoto(user.user_metadata?.garden_photo || null)

      const [plantsRes, careRes, rulesRes, statusRes, profileRes] = await Promise.all([
  supabase
    .from('user_plants')
    .select(
      `
        id,
        quantity,
        length_metres,
        nickname,
        personal_notes,
        is_sick,
        current_issue,
        current_remedy,
        current_shopping_tags,
        plants (
          id,
          common_name,
          plant_type,
          task_category,
          maintenance_level,
          trim_cycle,
          feed_cycle,
          trim_notes,
          feed_notes
        )
      `
    )
    .eq('user_id', user.id)
    .eq('is_project', false),
        supabase
          .from('auckland_monthly_care')
          .select('id, month_number, plant_type, care_note')
          .eq('month_number', currentMonthNum),
        supabase.from('plant_task_rules').select('*'),
        supabase
          .from('user_task_status')
          .select('task_key, is_done')
          .eq('user_id', user.id)
          .eq('week_number', activeWeek)
          .eq('month_number', currentMonthNum)
          .eq('year_number', currentYear),
        supabase
          .from('profiles')
          .select('is_pro')
          .eq('id', user.id)
          .maybeSingle(),
      ])

      if (profileRes.data) setIsPro(profileRes.data.is_pro)

      if (plantsRes.error) console.error('Error loading user plants:', plantsRes.error)
      if (careRes.error) console.error('Error loading monthly care:', careRes.error)
      if (rulesRes.error) console.error('Error loading task rules:', rulesRes.error)
      if (statusRes.error) console.error('Error loading task status:', statusRes.error)

      const safePlants: UserPlantRow[] = (plantsRes.data ?? []).map((row: any) => ({
  id: row.id,
  quantity: row.quantity ?? 1,
  length_metres: row.length_metres ?? null,
  nickname: row.nickname ?? null,
  personal_notes: row.personal_notes ?? null,
  is_sick: row.is_sick ?? false,
  current_issue: row.current_issue ?? null,
  current_remedy: row.current_remedy ?? null,
  current_shopping_tags: row.current_shopping_tags ?? [],
  plants: row.plants
    ? {
        id: row.plants.id,
        common_name: row.plants.common_name ?? null,
        plant_type: row.plants.plant_type ?? null,
        task_category: row.plants.task_category ?? null,
        maintenance_level: row.plants.maintenance_level ?? null,
        trim_cycle: row.plants.trim_cycle ?? null,
        feed_cycle: row.plants.feed_cycle ?? null,
        trim_notes: row.plants.trim_notes ?? null,
        feed_notes: row.plants.feed_notes ?? null,
      }
    : null,
}))

      const statusMap: Record<string, boolean> = {}
      ;((statusRes.data ?? []) as TaskStatusRow[]).forEach((row) => {
        statusMap[row.task_key] = row.is_done
      })

      setAllPlants(safePlants)
      setMonthlyCare((careRes.data ?? []) as MonthlyCareRow[])
      setTaskRules((rulesRes.data ?? []) as TaskRuleRow[])
      setTaskStatus(statusMap)

      setLoading(false)
      setWeekLoading(false)
      setHasLoadedOnce(true)
    }

    loadData()
  }, [currentMonthNum, currentYear, activeWeek, hasLoadedOnce, supabase])

  async function toggleTask(task: TaskCandidate, done: boolean) {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { error } = await supabase.from('user_task_status').upsert(
      {
        user_id: user.id,
        task_key: task.id,
        week_number: activeWeek,
        month_number: currentMonthNum,
        year_number: currentYear,
        is_done: done,
      },
      { onConflict: 'user_id,task_key,week_number,month_number,year_number' }
    )

    if (error) {
      console.error('Error updating task status:', error)
      return
    }

    setTaskStatus((prev) => ({
      ...prev,
      [task.id]: done,
    }))

    if (done && task.id.startsWith('sick-')) {
      const userPlantId = Number(task.id.replace('sick-', ''))

      const { error: clearError } = await supabase
        .from('user_plants')
        .update({
          is_sick: false,
          current_issue: null,
          current_remedy: null,
          current_shopping_tags: null,
        })
        .eq('id', userPlantId)

      if (clearError) {
        console.error('Error clearing unhealthy plant state:', clearError)
      } else {
        setAllPlants((prev) =>
          prev.map((plant) =>
            plant.id === userPlantId
              ? {
                  ...plant,
                  is_sick: false,
                  current_issue: null,
                  current_remedy: null,
                  current_shopping_tags: [],
                }
              : plant
          )
        )

        await supabase
          .from('plant_logs')
          .update({
            status: 'Resolved',
            resolved_at: new Date().toISOString(),
          })
          .eq('user_id', user.id)
          .eq('user_plant_id', userPlantId)
          .eq('status', 'Ongoing')
      }
    }

    if (done) {
      trackEvent('calendar_task_completed', {
        task_type:  task.taskType,
        plant_name: task.title,
        route:      '/calendar',
      })

      const type = (task.taskType || '').toLowerCase()

      let message = 'Task completed'

      if (type === 'trim') {
        message = `${task.title} trimmed`
      } else if (type === 'prune') {
        message = `${task.title} pruned`
      } else if (type === 'feed') {
        message = `${task.title} fed`
      } else if (type === 'check') {
        message = `${task.title} checked`
      } else if (type === 'tidy') {
        message = `${task.title} tidied`
      } else if (type === 'sick') {
        message = `${task.title} issue resolved`
      }

      if (taskDoneTimeoutRef.current) {
        clearTimeout(taskDoneTimeoutRef.current)
      }

      setTaskDoneMessage(message)

      taskDoneTimeoutRef.current = setTimeout(() => {
        setTaskDoneMessage(null)
      }, 2200)
    }
  }

  const agenda = useMemo(() => {
    if (!allPlants.length) {
      return {
        tasks: [] as TaskCandidate[],
        shoppingList: [] as string[],
        toolsList: ['Watering Can'],
      }
    }

    const sickCandidates: TaskCandidate[] = []
    const candidates: TaskCandidate[] = []
    const finalShopping = new Set<string>()
    const finalTools = new Set<string>(['Watering Can'])

    allPlants.forEach((up) => {
      const p = up.plants
      if (!p) return

      const commonName = up.nickname || p.common_name || 'Plant'

      if (up.is_sick) {
        const issueText = up.current_issue?.trim()
        const remedyText = up.current_remedy?.trim()
        const shoppingTags = parseArrayField(up.current_shopping_tags).map(prettyTag)

        let sickNote = 'This plant needs attention.'
        if (issueText && remedyText) {
          sickNote = `${issueText} — ${remedyText}`
        } else if (issueText) {
          sickNote = issueText
        } else if (remedyText) {
          sickNote = remedyText
        }

        const needsSprayer = shoppingTags.some((tag) => {
          const lower = tag.toLowerCase()
          return (
            lower.includes('spray') ||
            lower.includes('neem') ||
            lower.includes('oil') ||
            lower.includes('fungicide')
          )
        })

        sickCandidates.push({
          id: `sick-${up.id}`,
          title: commonName,
          note: sickNote,
          taskType: 'sick',
          score: 999,
          urgency: 'must',
          minutes: 15,
          tools: needsSprayer ? ['Garden Sprayer'] : [],
          shopping: shoppingTags,
          canBundle: false,
        })
      }
    })

    allPlants.filter((up) => !up.is_sick).forEach((up, index) => {
      const p = up.plants
      if (!p) return

      const qty = up.quantity || 1
      const commonName = up.nickname || p.common_name || 'Plant'
      const plantType = p.plant_type || ''
      const taskCategory = (p.task_category || plantType || '').trim().toLowerCase()

      const assignedWeek = (index % 4) + 1
      const shouldShowThisWeek = assignedWeek === activeWeek

      if (!shouldShowThisWeek) return

      const plantSpecificCare = monthlyCare.find((c) => {
  const careType = (c.plant_type || '').trim().toLowerCase()
  const commonName = (p.common_name || '').trim().toLowerCase()
  const plantType = (p.plant_type || '').trim().toLowerCase()
  const taskCategory = (p.task_category || '').trim().toLowerCase()

  if (careType === commonName) return true
  if (careType === taskCategory) return true

  // Allow genuinely general fruit advice, but only after citrus/deciduous rows
  // have been split out in the database.
  if (careType === 'fruit' && plantType === 'fruit') return true

  return false
})

      if (plantSpecificCare?.care_note) {
        const monthlyCareScore =
          taskCategory === 'hedge' &&
          /trim|prune|cut back/.test(plantSpecificCare.care_note.toLowerCase())
            ? 115
            : 90

        candidates.push({
          id: `care-${up.id}`,
          title: qty > 1 ? `${qty}x ${commonName}` : commonName,
          note: plantSpecificCare.care_note,
          taskType: 'care',
          score: monthlyCareScore,
          urgency: priorityToUrgency(monthlyCareScore),
          minutes: Math.max(10, 15 * qty),
          tools: inferToolsFromCareNote(plantSpecificCare.care_note),
          shopping: inferShoppingFromCareNote(plantSpecificCare.care_note, p.common_name),
          canBundle: false,
        })
      }

      const matchingRules = taskRules.filter((r) => {
        const ruleCategory = (r.plant_category || '').trim().toLowerCase()
        const ruleMonth = Number(r.trigger_month)
        return ruleCategory === taskCategory && ruleMonth === currentMonthNum
      })

      if (matchingRules.length > 0) {
        matchingRules.forEach((rule, ruleIndex) => {
          const isHedgeTrim =
            (rule.task_type || '').trim().toLowerCase() === 'trim' &&
            taskCategory === 'hedge'

          const baseScore = isHedgeTrim ? 120 : rule.base_priority || 50
          const finalScore = plantSpecificCare ? Math.max(60, baseScore - 10) : baseScore

          candidates.push({
  id: `rule-${up.id}-${rule.id || ruleIndex}`,

  title:
    taskCategory === 'hedge' && up.length_metres
      ? `${up.length_metres}m ${commonName}`
      : qty > 1
      ? `${qty}x ${commonName}`
      : commonName,

  note: buildRuleNote(rule, p, qty),
  taskType: rule.task_type || 'care',
  score: finalScore,
  urgency: priorityToUrgency(finalScore),

  minutes:
    taskCategory === 'hedge'
      ? Math.max(10, (up.length_metres || 0) * 15)
      : Math.max(5, (rule.estimated_minutes || 15) * qty),

  tools: parseArrayField(rule.tool_tags).map(prettyTag),
  shopping: parseArrayField(rule.shopping_tags).map(prettyTag),
  canBundle: true,
})
        })
      } else if (!plantSpecificCare) {
        candidates.push({
  id: `fallback-${up.id}`,
  title:
    taskCategory === 'hedge' && up.length_metres
      ? `${up.length_metres}m ${commonName}`
      : qty > 1
      ? `${qty}x ${commonName}`
      : commonName,
  note: `General maintenance check for your ${commonName.toLowerCase()}.`,
  taskType: 'check',
  score: 30,
  urgency: 'could',
  minutes:
    taskCategory === 'hedge'
      ? Math.max(10, (up.length_metres || 0) * 2)
      : 10,
  tools: [],
  shopping: [],
  canBundle: false,
})
      }
    })

    const finalTasks: TaskCandidate[] = []
    const bundleGroups = new Map<string, TaskCandidate[]>()

    candidates.forEach((candidate) => {
      if (candidate.canBundle) {
        const key = candidate.taskType.toLowerCase()
        bundleGroups.set(key, [...(bundleGroups.get(key) || []), candidate])
      } else {
        finalTasks.push(candidate)
      }
    })

    bundleGroups.forEach((tasks, type) => {
      if (tasks.length === 1) {
        finalTasks.push(tasks[0])
        return
      }

      const mergedTitles = tasks.map((t) => t.title).join(', ')
      const mergedTools = Array.from(new Set(tasks.flatMap((t) => t.tools)))
      const mergedShopping = Array.from(new Set(tasks.flatMap((t) => t.shopping)))
      const totalMinutes = tasks.reduce((sum, t) => sum + t.minutes, 0)
      const bestScore = Math.max(...tasks.map((t) => t.score))

      finalTasks.push({
        id: `bundle-${type}`,
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Jobs`,
        note: `Time to ${type} these plants: ${mergedTitles}.`,
        taskType: type,
        score: bestScore,
        urgency: priorityToUrgency(bestScore),
        minutes: totalMinutes,
        tools: mergedTools,
        shopping: mergedShopping,
        canBundle: false,
      })
    })

    const visibleSickTasks = sickCandidates

    const sortedNormalTasks = finalTasks
      .filter((task) => !taskStatus[task.id])
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        return a.minutes - b.minutes
      })
      .slice(0, 4)

    const sortedTasks = [...visibleSickTasks, ...sortedNormalTasks]

    sortedTasks.forEach((task) => {
      task.tools.forEach((tool) => finalTools.add(tool))
      task.shopping.forEach((item) => finalShopping.add(item))
    })

    return {
      tasks: sortedTasks,
      shoppingList: Array.from(finalShopping),
      toolsList: Array.from(finalTools),
    }
  }, [allPlants, monthlyCare, taskRules, activeWeek, currentMonthNum, taskStatus])

  const priorityLevel1Tasks = agenda.tasks.filter((task) => task.urgency === 'must')
  const priorityLevel2And3Tasks = agenda.tasks.filter((task) => task.urgency !== 'must')

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center font-black text-green-800 tracking-widest text-[10px]">
        BUILDING YOUR PLAN...
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#f0f4f1] pb-40 text-gray-900">
      <section className="relative h-[60vh] w-full overflow-hidden rounded-b-[4rem] shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-[#f0f4f1] via-transparent to-transparent z-12" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-15" />
        <img
          src={
            gardenPhoto ||
            'https://images.unsplash.com/photo-1558905619-17254261b646?q=80&w=2000'
          }
          alt="Garden"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-[100] flex flex-col justify-end p-8 pb-20">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md w-fit px-3 py-1.5 rounded-full border border-white/20 mb-4">
            <MapPin size={10} className="text-white" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
              Auckland • {currentMonthName}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-8 relative z-50">
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
              {currentMonthName.toUpperCase()} <span className="text-amber-400">TO-DO</span>
            </h1>

            <PageHelp
              title="Calendar"
              description="Your weekly garden plan based on your plants, season, and any issues you've logged."
              bullets={[
                "Do first tasks are the most important right now.",
                "Sick plants appear at the top and can be resolved here.",
                "Shopping and tools update automatically based on your tasks."
              ]}
            />
          </div>

        </div>
      </section>

      <div className="px-6 -mt-10 relative z-30 space-y-3">
        <div className="bg-white rounded-[2.5rem] shadow-xl p-2 flex items-center justify-between border border-gray-100">
          <button
            onClick={() => setActiveWeek((prev) => Math.max(1, prev - 1))}
            className="p-4 text-gray-300"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="text-center flex flex-col items-center">
            <p className="text-[8px] font-black text-amber-500 uppercase tracking-[0.3em] mb-1">
              Weekly Plan
            </p>

            <p className="font-black text-green-950 uppercase italic text-sm">
              Week {activeWeek} Agenda
            </p>
          </div>

          <button
            onClick={() => setActiveWeek((prev) => Math.min(4, prev + 1))}
            className="p-4 text-gray-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="px-6 py-10 space-y-10">
        <section className="space-y-4">
          <h2 className="text-[10px] font-black text-green-900/30 uppercase tracking-[0.3em] px-2 italic">
            Priority Tasks
          </h2>

          <div className="space-y-3">
            {priorityLevel1Tasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white rounded-[2rem] border border-gray-100 shadow-sm p-5 flex gap-4 items-start border-l-4 ${
                  task.taskType === 'sick'
                    ? 'border-l-red-500'
                    : 'border-l-amber-400'
                }`}
              >
                <div
                  className={`mt-0.5 w-10 h-10 rounded-[0.875rem] flex items-center justify-center shrink-0 ${
                    task.taskType === 'sick' ? 'bg-red-50' : 'bg-amber-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.taskType === 'sick' ? false : taskStatus[task.id] || false}
                    onChange={(e) => toggleTask(task, e.target.checked)}
                    className={`w-4 h-4 ${
                      task.taskType === 'sick' ? 'accent-red-600' : 'accent-green-800'
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start w-full gap-3">
                    <div className="min-w-0">
                      <span
                        className={`inline-block text-[9px] font-black uppercase tracking-[0.16em] px-2 py-0.5 rounded-full mb-2 ${
                          task.taskType === 'sick'
                            ? 'bg-red-50 text-red-700'
                            : 'bg-amber-50 text-amber-800'
                        }`}
                      >
                        {urgencyToLabel(task.urgency)}
                      </span>
                      <h3
                        className={`font-black uppercase text-sm tracking-tight leading-snug ${
                          task.taskType === 'sick' ? 'text-red-900' : 'text-green-950'
                        }`}
                      >
                        {task.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1">
                      <Clock size={11} className="text-gray-400" />
                      <span className="text-[10px] font-bold text-gray-500">
                        {formatTaskDuration(task.minutes)}
                      </span>
                    </div>
                  </div>

                  <p
                    className={`text-[13px] font-medium leading-relaxed mt-2.5 ${
                      task.taskType === 'sick' ? 'text-red-800/90' : 'text-gray-600'
                    }`}
                  >
                    {task.note}
                  </p>
                </div>
              </div>
            ))}

            {priorityLevel1Tasks.length > 0 && priorityLevel2And3Tasks.length > 0 && (
              <div className="py-2">
                <div className="border-t border-gray-300" />
              </div>
            )}

            {priorityLevel2And3Tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-5 flex gap-4 items-start border-l-4 border-l-green-200"
              >
                <div className="mt-0.5 w-10 h-10 rounded-[0.875rem] flex items-center justify-center shrink-0 bg-green-50">
                  <input
                    type="checkbox"
                    checked={taskStatus[task.id] || false}
                    onChange={(e) => toggleTask(task, e.target.checked)}
                    className="w-4 h-4 accent-green-700"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start w-full gap-3">
                    <div className="min-w-0">
                      <span className="inline-block text-[9px] font-black uppercase tracking-[0.16em] px-2 py-0.5 rounded-full mb-2 bg-green-50 text-green-700">
                        {urgencyToLabel(task.urgency)}
                      </span>
                      <h3 className="font-black uppercase text-sm tracking-tight leading-snug text-green-950">
                        {task.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1">
                      <Clock size={11} className="text-gray-400" />
                      <span className="text-[10px] font-bold text-gray-500">
                        {formatTaskDuration(task.minutes)}
                      </span>
                    </div>
                  </div>

                  <p className="text-[13px] font-medium leading-relaxed mt-2.5 text-gray-600">
                    {task.note}
                  </p>
                </div>
              </div>
            ))}

            {agenda.tasks.length === 0 && (
              <div className="bg-white rounded-[2.5rem] p-6 shadow-sm text-sm text-gray-500 italic">
                No tasks scheduled for this week. Use the arrows to browse other weeks, or add more plants from the Library to build out your plan.
              </div>
            )}
          </div>
        </section>

        {!isPro && (
          <section>
            <LockedProFeatureCard
              icon="🔔"
              title="Advanced Reminders"
              description="Coming soon — smart nudges and a monthly garden review tailored to your plants."
            />
          </section>
        )}

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-[2.5rem] p-7 border border-white shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-green-800 rounded-2xl flex items-center justify-center shadow-md shadow-amber-900/10">
                <ShoppingCart size={18} className="text-white" />
              </div>
              <h2 className="text-sm font-black text-green-950 uppercase tracking-tight">
                Supplies
              </h2>
            </div>

            <ul className="space-y-3">
              {agenda.shoppingList.length > 0 ? (
                agenda.shoppingList.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-xs font-bold text-gray-600 border-b border-gray-50 pb-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {item}
                  </li>
                ))
              ) : (
                <li className="text-xs text-gray-400 italic px-1">
                  No specific products needed.
                </li>
              )}
            </ul>
          </div>

          <div className="bg-white rounded-[2.5rem] p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-green-800 rounded-2xl flex items-center justify-center">
                <Wrench size={18} className="text-white" />
              </div>
              <h2 className="text-sm font-black text-green-950 uppercase tracking-tight">
                Tool Kit
              </h2>
            </div>

            <ul className="space-y-3">
              {agenda.toolsList.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-xs font-bold text-gray-600 border-b border-gray-50 pb-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {taskDoneMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-green-900 text-white px-5 py-3 rounded-full shadow-2xl text-[10px] font-black uppercase tracking-widest">
          {taskDoneMessage}
        </div>
      )}

    </main>
  )
}
