package com.pocketgardener.app;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;

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

        WebView webView = getBridge().getWebView();

        // ── Primary path: inject sessionStorage directly after page load ──────
        // BridgeWebViewClient extends Capacitor's own WebViewClient so all
        // Capacitor routing behaviour is preserved via super.onPageFinished().
        // We write the path to sessionStorage here — before React's useEffect
        // hooks can fire — so WelcomeOverlay's 800 ms check always sees it.
        webView.setWebViewClient(new BridgeWebViewClient(getBridge()) {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                final String path = coldStartNotificationPath;
                if (path == null) return;
                coldStartNotificationPath = null;
                final String safe = path.replace("\\", "\\\\").replace("'", "\\'");
                final String js =
                    "try{" +
                    "  sessionStorage.setItem('pg:pending-notification-path','" + safe + "');" +
                    "  console.log('[PG_NATIVE_JS] onPageFinished wrote path: " + safe + "');" +
                    "}catch(e){console.error('[PG_NATIVE_JS] write failed',String(e));}";
                view.evaluateJavascript(js, result ->
                    Log.d(TAG, "onPageFinished injection — url=" + url + " evalResult=" + result));
                Log.d(TAG, "onPageFinished: injected path=" + path + " url=" + url);
            }
        });

        // ── Backup path: synchronous JS interface callable from React ─────────
        // Registered before the page loads so window.PGNative is available
        // from the first JS execution. usePushNotifications.ts calls
        // getColdStartPath() in its useEffect as a belt-and-suspenders check.
        webView.addJavascriptInterface(new PGNativeBridge(), "PGNative");
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
