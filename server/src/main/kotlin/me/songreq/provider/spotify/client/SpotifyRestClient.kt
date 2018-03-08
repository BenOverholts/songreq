package me.songreq.provider.spotify.client

import me.songreq.AsymmetricKeyPair
import me.songreq.ResponseEnvelope
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.util.*
import javax.ws.rs.client.Client
import javax.ws.rs.client.Entity
import javax.ws.rs.core.Form

class SpotifyRestClient(client: Client, clientCredentials: AsymmetricKeyPair, val callbackUrl: String) : SpotifyClient {

    private val log: Logger = LoggerFactory.getLogger(SpotifyRestClient::class.java)

    private val clientAuthHeader = Base64.getEncoder()
            .encodeToString((clientCredentials.publicKey + ":" + clientCredentials.privateKey).toByteArray())

    private val accountsApi = client.target("https://accounts.spotify.com/api")

    private val api = client.target("https://api.spotify.com/v1")


    override fun requestTokens(authCode: String) : SpotifyTokenResponse? {
        val form = Form()
                .param("grant_type", "authorization_code")
                .param("code", authCode)
                .param("redirect_uri", callbackUrl)

        log.debug("Requesting tokens from Spotify - payload: {}", form)

        val response = accountsApi.path("token")
                .request()
                .header("Authorization", "Basic " + clientAuthHeader)
                .post(Entity.form(form))

        return response.readEntity(SpotifyTokenResponse::class.java)
    }

    override fun search(request: SpotifySearchRequest): ResponseEnvelope<String>? {
        log.debug("Searching spotify with parameters - {}", request)

        val response = api.path("search")
                .queryParam("q", request.query)
                .queryParam("type", request.types[0])
                .queryParam("market", "from_token")
                .request()
                .header("Authorization", "Bearer " + request.accessToken)
                .get()

        return ResponseEnvelope("spotify", "v1", response.readEntity(String::class.java))
    }
}