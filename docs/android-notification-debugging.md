# Android Notification Debugging Checklist

For Android notification bugs:

1. Do not patch timing first.
2. Check Vercel deploy status.
   - The Android app loads JS from `server.url`, so local JS changes do not run until deployed.
3. Check native APK rebuild status.
   - Java/Kotlin changes require rebuilding and reinstalling the APK.
4. Use `/api/dev/push-test` only for testing.
   - Do not rely on Firebase Console campaign tests.
5. Verify `extra[path]` in `PG_NATIVE` logs.
6. Verify `[PG_BOOTSTRAP]` logs.
7. Verify `NotificationNavigator` logs.
8. Only then inspect UI render blockers such as WelcomeOverlay.

---

## Known lesson

The app can receive the notification correctly while still rendering the wrong UI. Always prove each layer in order:

```
FCM payload → Android Intent → native bridge → WebView bootstrap → React navigator → UI overlay
```

Do not skip layers. A log confirming layer N does not mean layer N+1 is working.
