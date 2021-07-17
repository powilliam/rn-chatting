package com.mobile.domain.databases

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File

class WatermelonDatabase() {
    companion object {
        private const val DATABASE_FILE_NAME = "watermelon.db"
        private const val DEFAULT_DATABASE_DIR = "/databases"
        private var instance: SQLiteDatabase? = null

        suspend fun getInstance(applicationContext: Context): SQLiteDatabase {
            return instance ?: withContext(Dispatchers.IO) {
                val file = getWatermelonSQLiteFile(applicationContext)
                val newInstance = SQLiteDatabase.openOrCreateDatabase(file, null)
                instance = newInstance
                newInstance
            }
        }

        private fun getWatermelonSQLiteFile(applicationContext: Context): File {
            return File(applicationContext.getDatabasePath(DATABASE_FILE_NAME).path.replace(DEFAULT_DATABASE_DIR, ""))
        }
    }
}