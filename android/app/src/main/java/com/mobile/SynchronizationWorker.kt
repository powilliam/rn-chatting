package com.mobile

import android.content.Context
import android.util.Log
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.mobile.domain.repositories.WatermelonRepository
import com.mobile.domain.services.PushRequestBody
import com.mobile.domain.services.SynchronizationService
import kotlinx.coroutines.*

class SynchronizationWorker(applicationContext: Context, workerParams: WorkerParameters)
    : CoroutineWorker(applicationContext, workerParams) {

    override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
        try {
            Log.d(TAG, "Starting Worker")

            val synchronizationService = SynchronizationService.getInstance()
            val watermelonRepository = WatermelonRepository(applicationContext)

            val messages = watermelonRepository.getMessagesMarkedAsUnsynchronizedAsync().await()
            val body = PushRequestBody(messages = messages)

            synchronizationService.push(body = body)
            watermelonRepository.markUnsynchronizedMessagesAsSynchronizedAsync().await()

            Result.success()
        } catch (exception: Exception) {
            Log.d(TAG, exception.message ?: "Worker failed")
            Result.failure()
        } finally {
            Log.d(TAG, "Worker finished")
        }
    }

    companion object {
        private const val TAG = "SynchronizationWorker"
    }
}