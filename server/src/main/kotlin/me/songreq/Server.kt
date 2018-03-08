package me.songreq

import com.google.common.net.MediaType
import com.squareup.moshi.JsonDataException
import me.songreq.auth.DefaultAuthProvider
import me.songreq.dao.*
import me.songreq.provider.MusicProvider
import me.songreq.provider.spotify.SpotifyMusicProvider
import me.songreq.provider.spotify.client.SpotifyRestClient
import org.eclipse.jetty.http.HttpStatus
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import spark.Filter
import spark.Spark.*
import java.io.IOException
import javax.ws.rs.client.ClientBuilder

class Server

val log: Logger = LoggerFactory.getLogger(Server::class.java)
val songRequestDao: SongRequestDao = InMemorySongRequestDao()
val partyDao: PartyDao = InMemoryPartyDao()
val userDao: UserDao = InMemoryUserDao()

fun main(args: Array<String>) {
    val provider: MusicProvider = SpotifyMusicProvider(DefaultAuthProvider(partyDao, userDao),
            SpotifyRestClient(ClientBuilder.newClient(), AsymmetricKeyPair(args[0], args[1]),
                    "http://localhost:4567/api/login/spotify/callback")) // TODO inject

    path("/api/requests") {
        get("/party/:partyId") { req, res ->
            try {
                songRequestListAdapter.toJson(songRequestDao.findByParty(req.params("partyId")))
            } catch (e: JsonDataException) {
                log.error("Failed to list songs for party {} - ", req.params("partyId"), e)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR_500)
                noResponseBody()
            } catch (e: IOException) {
                log.error("Failed to list songs for party {} - ", req.params("partyId"), e)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR_500)
                noResponseBody()
            } catch (e: Exception) {
                log.error("Failed to list songs for party {} - ", req.params("partyId"), e)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR_500)
                noResponseBody()
            }
        }

        post("") { req, res ->
            try {
                songRequestDao.put(songRequestParamsAdapter.fromJson(req.body()) ?: throw JsonDataException())
            } catch (e: JsonDataException) {
                log.error("Failed to add song request {} - ", req.body(), e)
                res.status(HttpStatus.BAD_REQUEST_400)
            } catch (e: IOException) {
                log.error("Failed to add song request {} - ", req.body(), e)
                res.status(HttpStatus.BAD_REQUEST_400)
            } catch (e: Exception) {
                log.error("Failed to add song request {} - ", req.body(), e)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR_500)
            }
            noResponseBody()
        }

        post("/approve/:id") { req, res ->
            try {
                songRequestDao.delete(req.params("id"))

                // TODO add song to playlist
                res.status(HttpStatus.NOT_IMPLEMENTED_501)
            } catch (e: DaoException) {
                log.error("Failed to delete song request {} - ", req.params("id"), e)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR_500)
            }
            noResponseBody()
        }

        post("/reject/:id") { req, res ->
            try {
                songRequestDao.delete(req.params("id"))
            } catch (e: DaoException) {
                log.error("Failed to delete song request {} - ", req.params("id"), e)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR_500)
            }
            noResponseBody()
        }
    }

    path("/api/party") {
        get("/:id") { req, _ ->
            val party = partyDao.get(req.params("id"))
            partyAdapter.toJson(party)
        }

        post("/create") { _, res ->
            // TODO create party playlist
            res.status(HttpStatus.NOT_IMPLEMENTED_501)
        }
    }

    path("api/songs") {
        post("/search") { req, res ->
            try {
                val query = songQueryAdapter.fromJson(req.body()) ?: throw JsonDataException()
                val results = provider.search(query)
                log.info("Search - query: {}, results: {}", query, results)
                results
            } catch (e: JsonDataException) {
                log.error("Failed to search songs for query {} - ", req.body(), e)
                res.status(HttpStatus.BAD_REQUEST_400)
                noResponseBody()
            } catch (e: IOException) {
                log.error("Failed to search songs for query {} - ", req.body(), e)
                res.status(HttpStatus.BAD_REQUEST_400)
                noResponseBody()
            } catch (e: Exception) {
                log.error("Failed to search songs for query {} - ", req.body(), e)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR_500)
                noResponseBody()
            }
        }
    }

    path("api/login/spotify") {
        get("") { req, res ->
            // TODO get redirect from music provider
            res.redirect("https://accounts.spotify.com/authorize/?client_id=" + args[0] + "&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4567%2Fapi%2Flogin%2Fspotify%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09")
        }
        get("/callback") { req, res ->
            try {
                val userParams = provider.instantiateUser(req.queryParams(("code")))
                userDao.put(userParams ?: throw Exception())
                // TODO Redirect to party / party management
                userParams.toString()
            } catch (e: Exception) {
                log.error("Failed to login with spotify auth code {} - ", req.body(), e)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR_500)
                noResponseBody()
            }
        }
    }

    after(Filter { _, res ->
        res.type(MediaType.JSON_UTF_8.toString())
    })
}

fun noResponseBody(): String { return "{ }" }



