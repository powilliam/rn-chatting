package com.mobile.domain.models

data class Message(
    var uuid: String,
    var content: String,
    var authorUuid: String,
    var authorName: String,
    var isSynchronized: Int,
    var timestamps: Double
) {
    companion object {
        const val UUID_COLUMN = "uuid"
        const val CONTENT_COLUMN = "content"
        const val AUTHOR_UUID_COLUMN = "author_uuid"
        const val AUTHOR_NAME_COLUMN = "author_name"
        const val IS_SYNCHRONIZED_COLUMN = "is_synchronized"
        const val TIMESTAMPS_COLUMN = "timestamps"
    }
}