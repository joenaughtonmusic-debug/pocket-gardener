package com.pocketgardener.app;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.webkit.JavascriptInterface;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private static final String TAG = "PG_NATIVE";

    /**
     * Holds the deep-link path from the FCM notification Intent that launched
     * this cold start. Consumed once by JavaScript via PGNativeBridge.
     *
     * Null when the app was not launched by a notification tap.
     */
    private volatile String coldStartNotificationPath = null;

    // -------------------------------------------------------------------------
    // Lifecycle
    // -------------------------------------------------------------------------

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Extract FCM path from the launch Intent first.
        coldStartNotificationPath = extractPath("onCreate", getIntent());

        // Register the JavascriptInterface AFTER super.onCreate() so the
        // Capacitor WebView instance already exists. The interface is available
        // to JavaScript from the first line of the page that loads.
        getBridge().getWebView().addJavascriptInterface(new PGNativeBridge(), "PGNative");
        Log.d(TAG, "PGNative JavascriptInterface registered — coldStartPath: "
                + (coldStartNotificationPath != null ? coldStartNotificationPath : "null"));
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        // App was in background (not killed) when the notification was tapped.
        // Capacitor's pushNotificationActionPerformed listener handles warm
        // starts, but store here as a fallback in case it doesn't fire.
        coldStartNotificationPath = extractPath("onNewIntent", intent);
    }

    // -------------------------------------------------------------------------
    // JavascriptInterface exposed as window.PGNative
    // -------------------------------------------------------------------------

    public class PGNativeBridge {

        /**
         * Called synchronously from JavaScript (usePushNotifications useEffect)
         * to retrieve the deep-link path from the cold-start notification Intent.
         *
         * Returns the path string (e.g. "/calendar") or an empty string if the
         * app was not launched via a notification tap. Consumes the stored value
         * so a second call always returns "".
         */
        @JavascriptInterface
        public String getColdStartPath() {
            String path = coldStartNotificationPath;
            coldStartNotificationPath = null; // consume once
            Log.d(TAG, "PGNative.getColdStartPath() called → "
                    + (path != null ? '"' + path + '"' : "null (not a cold-start tap)"));
            return path != null ? path : "";
        }
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    private String extractPath(String source, Intent intent) {
        if (intent == null) {
            Log.d(TAG, source + ": intent is null");
            return null;
        }
        Log.d(TAG, source + ": action=" + intent.getAction());
        Bundle extras = intent.getExtras();
        if (extras == null) {
            Log.d(TAG, source + ": extras null — not a notification tap");
            return null;
        }
        Log.d(TAG, source + ": extras key count=" + extras.keySet().size());
        for (String key : extras.keySet()) {
            Log.d(TAG, source + ":   extra[" + key + "] = " + extras.get(key));
        }
        String path = extras.getString("path");
        if (path != null && !path.isEmpty()) {
            Log.d(TAG, source + ": *** FCM path extra found: " + path + " ***");
            return path;
        }
        Log.d(TAG, source + ": no 'path' key in extras");
        return null;
    }
}
