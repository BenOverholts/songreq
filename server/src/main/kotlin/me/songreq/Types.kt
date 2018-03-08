package me.songreq

import com.squareup.moshi.JsonAdapter
import com.squareup.moshi.KotlinJsonAdapterFactory
import com.squareup.moshi.Moshi
import com.squareup.moshi.Types
import java.time.Instant

val moshi: Moshi = Moshi.Builder()
        .add(KotlinJsonAdapterFactory())
        .build()

data class AsymmetricKeyPair(val publicKey: String, val privateKey: String)

data class ResponseEnvelope<out T>(val source: String, val version: String, val body: T)
val stringEnvelopeAdapter: JsonAdapter<ResponseEnvelope<String>> =
        moshi.adapter(Types.newParameterizedType(ResponseEnvelope::class.java, String::class.java))

/** Simple container for ID types as JSON. */
data class StringIdentifier(val id: String)
val stringIdAdapter: JsonAdapter<StringIdentifier> = moshi.adapter(StringIdentifier::class.java)

/** Type for signed in users. */
data class Credentials(val accessToken: String, val refreshToken: String, val expirationTime: Instant)
data class UserParams(val platform: String, val platformId: String, val credentials: Credentials?)
data class User(val id: String, val platform: String, val platformId: String, val credentials: Credentials?) {
    constructor(id: String, params: UserParams)
            : this(id, params.platform, params.platformId, params.credentials)
}

/** Search query for songs. */
data class SearchQuery(val partyId: String, val query: String, val limit: Int, val offset: Int)
val songQueryAdapter: JsonAdapter<SearchQuery> = moshi.adapter(SearchQuery::class.java)

/** Song data type. */
data class Song(val uri: String, val name: String, val artist: String, val artUrl: String?)
val songListAdapter: JsonAdapter<List<Song>> =
        moshi.adapter(Types.newParameterizedType(List::class.java, Song::class.java))

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
val partyParamsAdapter: JsonAdapter<PartyParams> = moshi.adapter(PartyParams::class.java)
val partyAdapter: JsonAdapter<Party> = moshi.adapter(Party::class.java)

/** Song request data type. */
abstract class AbstractSongRequest {
    abstract val partyId: String
    abstract val song: Song
    abstract val requester: String
}
data class SongRequestParams(override val partyId: String, override val song: Song,
                       override val requester: String) : AbstractSongRequest()
data class SongRequest(val id: String, override val partyId: String, override val song: Song,
                                 override val requester: String) : AbstractSongRequest() {
    constructor(id: String, params: SongRequestParams)
            : this(id, params.partyId, params.song, params.requester)
}
val songRequestParamsAdapter: JsonAdapter<SongRequestParams> = moshi.adapter(SongRequestParams::class.java)
val songRequestListAdapter: JsonAdapter<List<SongRequest>> =
        moshi.adapter(Types.newParameterizedType(List::class.java, SongRequest::class.java))