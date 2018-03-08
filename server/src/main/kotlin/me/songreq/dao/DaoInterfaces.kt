package me.songreq.dao

import me.songreq.*

interface UserDao {
    fun put(params: UserParams)
    fun get(id: String): User?
    fun update(id: String, params: UserParams)
    fun delete(id: String)
}

interface PartyDao {
    fun put(params: PartyParams)
    fun get(id: String): Party?
    fun findByHost(hostId: String): List<Party>
}

interface SongRequestDao {
    fun put(params: SongRequestParams)
    fun get(id: String): SongRequest?
    fun findByParty(partyId: String): List<SongRequest>
    fun delete(id: String)
}

class DaoException(message: String, cause: Throwable) : Throwable()