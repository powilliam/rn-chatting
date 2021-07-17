package com.mobile.domain.services

import com.mobile.domain.models.Message
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*

data class PullResponseBody(val messages: List<Message>)
data class PushRequestBody(val messages: List<Message>)

interface SynchronizationService {
    @GET("v1/sync/pull/")
    suspend fun pull(@Query("last_sync") lastSync: Double): Call<PullResponseBody>

    @POST("v1/sync/push/")
    suspend fun push(
        @Body body: PushRequestBody
    ): Response<Unit>

    companion object {
        private var instance: SynchronizationService? = null

        suspend fun getInstance(): SynchronizationService {
            return instance ?: withContext(Dispatchers.IO) {
                val newInstance = Retrofit
                    .Builder()
                    .addConverterFactory(GsonConverterFactory.create())
                    .baseUrl("https://guarded-sands-64792.herokuapp.com/")
                    .build()
                    .create(SynchronizationService::class.java)
                instance = newInstance
                return@withContext newInstance
            }
        }
    }
}