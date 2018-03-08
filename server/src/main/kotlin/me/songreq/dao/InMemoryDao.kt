package me.songreq.dao

import me.songreq.*
import java.util.*

/**
 * In memory implementations of data storage.
 */

class InMemoryUserDao : UserDao {

    private val users = HashMap<String, User>()

    override fun put(params: UserParams) {
        val id = UUID.randomUUID().toString()
        users[id] = User(id, params)
    }

    override fun get(id: String): User? {
        return users[id]
    }

    override fun update(id: String, params: UserParams) {
        users[id] = User(id, params)
    }

    override fun delete(id: String) {
        users.remove(id)
    }
}

class InMemoryPartyDao : PartyDao {

    private val parties = HashMap<String, Party>()

    override fun put(params: PartyParams) {
        val id = UUID.randomUUID().toString()
        parties[id] = Party(id, params)
    }

    override fun get(id: String): Party? {
        return parties[id]
    }

    override fun findByHost(hostId: String): List<Party> {
        return parties.values.filter { it.hostId == hostId }
    }
}

class InMemorySongRequestDao : SongRequestDao {

    private val requests = HashMap<String, SongRequest>()

    override fun put(params: SongRequestParams) {
        val id = UUID.randomUUID().toString()
        requests[id] = SongRequest(id, params)
    }

    override fun get(id: String): SongRequest? {
        return requests[id]
    }

    override fun findByParty(partyId: String): List<SongRequest> {
        return requests.values.filter { it.partyId == partyId }
    }

    override fun delete(id: String) {
        requests.remove(id)
    }
}