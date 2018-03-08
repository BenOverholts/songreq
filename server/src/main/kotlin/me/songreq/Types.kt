package me.songreq

import java.time.Instant

data class AsymmetricKeyPair(val publicKey: String, val privateKey: String)

data class ResponseEnvelope<out T>(val source: String, val version: String, val body: T)

/** Simple container for ID types as JSON. */
data class StringIdentifier(val id: String)

/** Type for signed in users. */
data class Credentials(val accessToken: String, val refreshToken: String, val expirationTime: Instant)
data class UserParams(val platform: String, val platformId: String, val credentials: Credentials?)
data class User(val id: String, val platform: String, val platformId: String, val credentials: Credentials?) {
    constructor(id: String, params: UserParams)
            : this(id, params.platform, params.platformId, params.credentials)
}

/** Search query for songs. */
data class SearchQuery(val partyId: String, val query: String, val limit: Int, val offset: Int)

/** Song data type. */
data class Song(val uri: String, val name: String, val artist: String, val artUrl: String?)

/** Party data type. */
abstract class AbstractParty {
    abstract val playlistId: String
    abstract val hostId: String
    abstract val hostName: String
    abstract val createTimestamp: Long
}
data class PartyParams(override val playlistId: String, override val hostId: String, override val hostName: String,
                 override val createTimestamp: Long) : AbstractParty()

data class Party(val id: String, override val playlistId: String, override val hostId: String,
                           override val hostName: String, override val createTimestamp: Long) : AbstractParty() {
    constructor(id: String, params: PartyParams)
            : this(id, params.playlistId, params.hostId, params.hostName, params.createTimestamp)
}

/** Song request data type. */
abstract class AbstractSongRequest {
    abstract val partyId: String
    abstract val song: Song
}
data class SongRequestParams(override val partyId: String, override val song: Song) : AbstractSongRequest()
data class SongRequest(val id: String, override val partyId: String, override val song: Song) : AbstractSongRequest() {
    constructor(id: String, params: SongRequestParams)
            : this(id, params.partyId, params.song)
}
