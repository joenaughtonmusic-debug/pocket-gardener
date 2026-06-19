import Navigation from '../../components/Navigation'
import PushNotificationInit from '../../components/PushNotificationInit'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Navigation />
      <PushNotificationInit />
    </>
  )
}
