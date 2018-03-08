package me.songreq.provider.spotify.client

import me.songreq.ResponseEnvelope

interface SpotifyClient {
    fun search(request: SpotifySearchRequest) : ResponseEnvelope<String>?
    fun requestTokens(authCode: String) : SpotifyTokenResponse?
}