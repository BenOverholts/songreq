package me.songreq.auth

import me.songreq.PartyNotFoundException
import me.songreq.dao.PartyDao
import me.songreq.dao.UserDao

class DefaultAuthProvider(private val partyDao: PartyDao, private val userDao: UserDao) : AuthProvider {

    override fun getAccessTokenForParty(partyId: String): String? {
        return userDao.get(partyDao.get(partyId)?.hostId ?: throw PartyNotFoundException("Party not found with id $partyId"))
                ?.credentials?.accessToken
    }
}