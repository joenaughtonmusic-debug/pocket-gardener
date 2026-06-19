package com.pocketgardener.app;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private static final String TAG = "PG_NATIVE";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "=== onCreate fired ===");
        logIntent("onCreate", getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        Log.d(TAG, "=== onNewIntent fired ===");
        logIntent("onNewIntent", intent);
    }

    private void logIntent(String source, Intent intent) {
        if (intent == null) {
            Log.d(TAG, source + ": intent is null");
            return;
        }
        Log.d(TAG, source + ": action=" + intent.getAction());
        Bundle extras = intent.getExtras();
        if (extras == null) {
            Log.d(TAG, source + ": extras are null — not a notification tap intent");
            return;
        }
        Log.d(TAG, source + ": extras key count=" + extras.keySet().size());
        for (String key : extras.keySet()) {
            Log.d(TAG, source + ":   extra[" + key + "] = " + extras.get(key));
        }
        String path = extras.getString("path");
        if (path != null) {
            Log.d(TAG, source + ": *** FCM path extra found: " + path + " ***");
        } else {
            Log.d(TAG, source + ": no 'path' key in extras");
        }
    }
}
