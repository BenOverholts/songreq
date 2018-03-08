package me.songreq.provider.spotify.client

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonProperty

abstract class SpotifyAuthorizedRequest {
    abstract val accessToken: String
}

data class SpotifySearchRequest(override val accessToken: String,
                                val query: String,
                                val types: List<SpotifyEntityType>,
                                val limit: Int,
                                val offset: Int) : SpotifyAuthorizedRequest()

@JsonIgnoreProperties(ignoreUnknown = true)
data class SpotifyTokenResponse(@JsonProperty("access_token") val accessToken: String,
                                @JsonProperty("refresh_token") val refreshToken: String,
                                @JsonProperty("expires_in") val expiresIn: Long)

enum class SpotifyEntityType(val typeName: String) {
    ALBUM("album"), ARTIST("artist"), PLAYLIST("playlist"), TRACK("track")
}

/** Party data type. */
abstract class SpotifyEntity {
    abstract val id: String
    abstract val uri: String
    abstract val name: String
    abstract val type: SpotifyEntityType
}

data class SpotifyAlbumImage(val height: Int, val width: Int, val url: String)

data class SpotifyArtist(override val id: String, override val uri: String, override val name: String,
                         override val type: SpotifyEntityType) : SpotifyEntity()

data class SpotifyAlbum(override val id: String, override val uri: String, override val name: String,
                        override val type: SpotifyEntityType,
                        val artists: List<SpotifyArtist>,
                        val images: List<SpotifyAlbumImage>) : SpotifyEntity()

data class SpotifyTrack(override val id: String, override val uri: String, override val name: String,
                        override val type: SpotifyEntityType,
                        val album: SpotifyAlbum,
                        val artists: List<SpotifyArtist>) : SpotifyEntity()
