export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f0f4f1] px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-[2rem] p-8 shadow-sm">
        <h1 className="text-3xl font-black text-green-950 mb-2">
          Terms of Use
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Last updated: 23 May 2026
        </p>

        <div className="space-y-6 text-sm leading-7 text-gray-700">
          <section>
            <h2 className="font-black text-green-950 mb-2">
              Acceptance of Terms
            </h2>

            <p>
              By using Pocket Gardener, you agree to these Terms of Use.
            </p>
          </section>

          <section>
            <h2 className="font-black text-green-950 mb-2">
              Service Description
            </h2>

            <p>
              Pocket Gardener provides plant identification, garden management
              tools, gardening reminders, plant care information, and optional
              subscription features.
            </p>
          </section>

          <section>
            <h2 className="font-black text-green-950 mb-2">
              User Accounts
            </h2>

            <p>
              You are responsible for maintaining access to your account and
              keeping login credentials secure.
            </p>
          </section>

          <section>
            <h2 className="font-black text-green-950 mb-2">
              Pocket Gardener Pro
            </h2>

            <p>
              Pocket Gardener offers an optional paid subscription which may
              include additional features and higher usage limits.
            </p>

            <p className="mt-3">
              Subscriptions automatically renew unless cancelled before the
              renewal date.
            </p>
          </section>

          <section>
            <h2 className="font-black text-green-950 mb-2">
              Cancellation & Billing
            </h2>

            <p>
              Subscriptions may be cancelled through Apple App Store, Google
              Play, or the Stripe customer portal where applicable.
            </p>
          </section>

          <section>
            <h2 className="font-black text-green-950 mb-2">
              User Content
            </h2>

            <p>
              You retain ownership of photos, garden information, and other
              content you upload. You grant Pocket Gardener permission to store
              and process this content to provide app functionality.
            </p>
          </section>

          <section>
            <h2 className="font-black text-green-950 mb-2">
              Disclaimer
            </h2>

            <p>
              Gardening advice provided by Pocket Gardener is intended for
              general guidance only. Results may vary based on conditions,
              climate, and plant health.
            </p>
          </section>

          <section>
            <h2 className="font-black text-green-950 mb-2">
              Limitation of Liability
            </h2>

            <p>
              To the maximum extent permitted by law, Pocket Gardener is not
              liable for plant loss, property damage, or other losses arising
              from use of the app.
            </p>
          </section>

          <section>
            <h2 className="font-black text-green-950 mb-2">Contact</h2>

            <p>
              Questions regarding these Terms may be directed to:
              <br />
              <strong>pocketgardeneruploads@gmail.com</strong>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}