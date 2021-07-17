package com.mobile.domain.repositories

import android.content.Context
import com.mobile.domain.databases.WatermelonDatabase
import com.mobile.domain.models.Message
import kotlinx.coroutines.*

class WatermelonRepository(private val applicationContext: Context) {
    suspend fun getMessagesMarkedAsUnsynchronizedAsync(): Deferred<List<Message>> = GlobalScope.async {
        val messages = mutableListOf<Message>()
        val database = WatermelonDatabase.getInstance(applicationContext)
        val cursor = database.rawQuery("SELECT * FROM messages WHERE is_synchronized = 0", arrayOf())

        if (cursor.moveToFirst()) {
            do {
                val uuid = cursor.getString(cursor.getColumnIndex(Message.UUID_COLUMN))
                val content = cursor.getString(cursor.getColumnIndex(Message.CONTENT_COLUMN))
                val authorUuid = cursor.getString(cursor.getColumnIndex(Message.AUTHOR_UUID_COLUMN))
                val authorName = cursor.getString(cursor.getColumnIndex(Message.AUTHOR_NAME_COLUMN))
                val isSynchronized = cursor.getInt(cursor.getColumnIndex(Message.IS_SYNCHRONIZED_COLUMN))
                val timestamps = cursor.getDouble(cursor.getColumnIndex(Message.TIMESTAMPS_COLUMN))

                val message = Message(
                    uuid = uuid,
                    content = content,
                    authorUuid = authorUuid,
                    authorName = authorName,
                    isSynchronized = isSynchronized,
                    timestamps = timestamps
                )

                messages.add(message)
            } while (cursor.moveToNext())
        }

        cursor.close()

        return@async messages
    }

    suspend fun markUnsynchronizedMessagesAsSynchronizedAsync(): Deferred<Unit> = GlobalScope.async {
        val database = WatermelonDatabase.getInstance(applicationContext)
        database.execSQL("UPDATE messages SET is_synchronized = 1 WHERE is_synchronized = 0")
    }
}