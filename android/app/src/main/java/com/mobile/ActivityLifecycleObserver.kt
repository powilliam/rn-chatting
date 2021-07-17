package com.mobile

import android.content.Context
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleObserver
import androidx.lifecycle.OnLifecycleEvent
import androidx.work.*

class ActivityLifecycleObserver(private val applicationContext: Context) : LifecycleObserver {
    private val defaultConstraints = Constraints.Builder()
        .setRequiredNetworkType(NetworkType.CONNECTED)
        .build()

    @OnLifecycleEvent(Lifecycle.Event.ON_RESUME)
    fun synchronizeWhenOnForeground() {
        val foregroundSynchronizationWorkerRequest = OneTimeWorkRequestBuilder<SynchronizationWorker>()
            .setConstraints(defaultConstraints)
            .build()
        WorkManager.getInstance(applicationContext).enqueue(foregroundSynchronizationWorkerRequest)
    }
}