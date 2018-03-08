package me.songreq.provider

import me.songreq.ResponseEnvelope
import me.songreq.SearchQuery
import me.songreq.UserParams

interface MusicProvider {
    fun search(query: SearchQuery): ResponseEnvelope<String>?
    fun instantiateUser(authCode: String): UserParams?
}

class MusicProviderException(override val message: String) : Throwable(message)