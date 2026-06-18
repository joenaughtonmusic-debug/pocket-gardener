# Android Build Guide — Pocket Gardener

Capacitor 8 · Live Vercel WebView approach  
App ID: `com.pocketgardener.app`  
Min SDK: 24 (Android 7.0) · Target/Compile SDK: 36

---

## Architecture

The Android app is a **thin WebView shell** that loads `https://pocket-gardener.vercel.app` directly.  
No local static build is required — all app logic lives in the live Next.js deployment.

```
User → Android app → WebView → pocket-gardener.vercel.app (Vercel/Next.js) → Supabase
```

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Android Studio | Meerkat (2024.3+) | https://developer.android.com/studio |
| JDK | 17+ | Bundled with Android Studio |
| Android SDK | API 36 | via SDK Manager in Android Studio |
| Node.js | 18+ | Already installed (for `npx cap sync`) |

---

## First-time Setup

```bash
# 1. Install dependencies (already done if node_modules exists)
npm install

# 2. Sync Capacitor config to the Android project
#    (safe to ignore the "missing out directory" warning — we use live Vercel URL)
npx cap sync android

# 3. Open in Android Studio
npx cap open android
```

---

## Build & Run in Android Studio

1. Open the project: **File → Open** → select `pocket-gardener/android/`
2. Wait for Gradle sync to complete (~1–3 min first time)
3. Connect a device or start an emulator (API 24+)
4. **Run → Run 'app'** (or press `Shift+F10`)

The app will open and immediately load `https://pocket-gardener.vercel.app`.

---

## Generating a Release APK / AAB

```bash
# In Android Studio:
# Build → Generate Signed Bundle / APK
# Choose Android App Bundle (AAB) for Play Store submission
```

Or via terminal (after setting up a keystore):

```bash
cd android
./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

---

## Auth Behaviour in Android WebView

### Magic Link (Email OTP) — Status: ⚠️ Requires App Links setup

**How it currently works:**
1. User enters email → Supabase sends a magic link to `https://pocket-gardener.vercel.app/auth/callback?code=...`
2. User taps the link in their email client
3. **WITHOUT App Links**: link opens in Chrome, auth succeeds in Chrome, but the session is NOT shared with the app's WebView
4. **WITH App Links verified**: Android routes the URL directly into the app's WebView → auth works seamlessly

**To enable App Links** (one-time setup):

**Step 1 — Get your keystore SHA-256 fingerprint:**
```bash
# For debug builds (use this for testing):
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# For release builds, use your release keystore:
keytool -list -v -keystore your-release-key.jks -alias your-alias
```
Copy the `SHA-256` value (format: `AA:BB:CC:...`).

**Step 2 — Update `public/.well-known/assetlinks.json`:**
```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.pocketgardener.app",
      "sha256_cert_fingerprints": [
        "AA:BB:CC:DD:..."  ← replace with your actual fingerprint
      ]
    }
  }
]
```

**Step 3 — Deploy to Vercel:**
```bash
git add public/.well-known/assetlinks.json
git commit -m "Add Android App Links verification"
git push
```
Vercel will serve it at `https://pocket-gardener.vercel.app/.well-known/assetlinks.json`.

**Step 4 — Verify (after deploy):**
```
https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://pocket-gardener.vercel.app&relation=delegate_permission/common.handle_all_urls
```
Should return your app's package name.

**Step 5 — Re-install the app** on device (Android only verifies App Links on install/update).

---

### Google OAuth — Status: ❌ Blocked in WebView (known Android limitation)

**Problem:**  
`signInWithOAuth({ provider: 'google' })` opens Google's consent screen. Google blocks OAuth inside WebViews as a security policy — you'll see a "disallowed_useragent" error.

**Solutions for a future sprint:**

**Option A — Chrome Custom Tabs** (recommended, Play Store compliant):
```bash
npm install @capacitor/browser
```
Then in `login/page.tsx`, detect Android and use the Capacitor Browser plugin to open Google OAuth in a Chrome Custom Tab instead of a WebView popup. Configure Supabase to redirect to `com.pocketgardener.app://auth/callback`.

**Option B — Remove Google login on mobile:**
Detect `Capacitor.isNativePlatform()` and hide the Google button, showing only magic-link on Android.

**Option C — Google Sign-In native plugin:**
Use `@codetrix-studio/capacitor-google-auth` for a fully native Google sign-in experience.

**For now:** Magic link (email OTP) is the working auth path on Android once App Links are configured.

---

## Supabase Configuration Checklist

In your Supabase dashboard → **Authentication → URL Configuration**:

| Setting | Value |
|---------|-------|
| Site URL | `https://pocket-gardener.vercel.app` |
| Redirect URLs | `https://pocket-gardener.vercel.app/auth/callback` |
| Redirect URLs | `com.pocketgardener.app://auth/callback` (add this for the custom scheme fallback) |

---

## Next Steps for Play Store

1. **Complete App Links** — get debug SHA-256, update `assetlinks.json`, deploy, test
2. **Decide Google OAuth strategy** — Chrome Custom Tabs or remove button on mobile
3. **Replace placeholder icons** — run `npx @capacitor/assets generate` with a 1024×1024 `pglogo.png` (see below)
4. **Create a release keystore** — store it securely, never commit it
5. **Build a signed AAB** — `./gradlew bundleRelease`
6. **Create Play Console listing** — app description, screenshots (from emulator), content rating, privacy policy URL
7. **Internal testing track** — upload AAB, invite testers

### Icon generation (when ready):

```bash
# Place a 1024×1024 icon at public/icon.png (already exists)
# and a 2732×2732 splash at public/splash.png
npm install @capacitor/assets --save-dev
npx capacitor-assets generate --android
npx cap sync android
```

---

## Quick Reference Commands

```bash
# Sync Capacitor config changes to Android
npx cap sync android

# Open Android Studio
npx cap open android

# Check Capacitor doctor
npx cap doctor

# Run on connected device (requires ADB)
npx cap run android
```
