package me.songreq.provider.spotify

import me.songreq.Credentials
import me.songreq.ResponseEnvelope
import me.songreq.SearchQuery
import me.songreq.UserParams
import me.songreq.auth.AuthProvider
import me.songreq.provider.MusicProvider
import me.songreq.provider.MusicProviderException
import me.songreq.provider.spotify.client.SpotifyClient
import me.songreq.provider.spotify.client.SpotifyEntityType
import me.songreq.provider.spotify.client.SpotifySearchRequest
import me.songreq.provider.spotify.client.SpotifyTokenResponse
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.time.Instant

class SpotifyMusicProvider(private val authProvider: AuthProvider, private val spotify: SpotifyClient) : MusicProvider {

    private val log: Logger = LoggerFactory.getLogger(SpotifyMusicProvider::class.java)

    override fun search(query: SearchQuery): ResponseEnvelope<String>? {
        val token = (authProvider.getAccessTokenForParty(query.partyId)
                ?: throw MusicProviderException("Could not get access token for party ${query.partyId}"))

        log.debug("Searching Spotify with parameters {}", query)

        val request = SpotifySearchRequest(token, query.query, listOf(SpotifyEntityType.TRACK), query.limit,
                query.offset)

        return spotify.search(request)
    }

    override fun instantiateUser(authCode: String): UserParams {
        val tokens: SpotifyTokenResponse = spotify.requestTokens(authCode)
                ?: throw MusicProviderException("Could not get OAuth tokens from Spotify")

        // TODO request user info (platform id, display name, etc.)

        val credentials = Credentials(tokens.accessToken, tokens.refreshToken, Instant.now().plusMillis(tokens.expiresIn))

        return UserParams("spotify", "12345", credentials)
    }
}