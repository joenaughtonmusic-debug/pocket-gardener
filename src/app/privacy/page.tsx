export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f0f4f1] px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-[2rem] p-8 shadow-sm">
        <h1 className="text-3xl font-black text-green-950 mb-2">
          Privacy Policy
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Last updated: 23 May 2026
        </p>

        <div className="space-y-6 text-sm leading-7 text-gray-700">
          <section>
            <h2 className="font-black text-green-950 mb-2">Introduction</h2>
            <p>
              Pocket Gardener is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, and protect
              information when you use the Pocket Gardener app and website.
            </p>
          </section>

          <section>
            <h2 className="font-black text-green-950 mb-2">
              Information We Collect
            </h2>

            <ul className="list-disc pl-5 space-y-2">
              <li>Account information such as email address.</li>
              <li>Plant selections and garden records.</li>
              <li>Garden notes and plant health logs.</li>
              <li>Plant identification photos.</li>
              <li>Garden photos uploaded by users.</li>
              <li>Subscription information and payment references.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-black text-green-950 mb-2">
              How We Use Information
            </h2>

            <ul className="list-disc pl-5 space-y-2">
              <li>Provide Pocket Gardener services.</li>
              <li>Personalise gardening recommendations.</li>
              <li>Identify plants from uploaded images.</li>
              <li>Generate gardening tasks and reminders.</li>
              <li>Manage subscriptions and billing.</li>
              <li>Improve the app and customer experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-black text-green-950 mb-2">
              Third-Party Services
            </h2>

            <p>
              Pocket Gardener may use third-party providers including Supabase,
              Stripe, OpenAI, Apple App Store, and Google Play Store to provide
              functionality and process payments.
            </p>
          </section>

          <section>
            <h2 className="font-black text-green-950 mb-2">Data Storage</h2>

            <p>
              We take reasonable measures to protect your information and store
              data securely using trusted service providers.
            </p>
          </section>

          <section>
            <h2 className="font-black text-green-950 mb-2">Your Rights</h2>

            <p>
              You may request access to or deletion of your information by
              contacting us.
            </p>
          </section>

          <section>
            <h2 className="font-black text-green-950 mb-2">Contact</h2>

            <p>
              For privacy enquiries please contact:
              <br />
              <strong>pocketgardeneruploads@gmail.com</strong>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}