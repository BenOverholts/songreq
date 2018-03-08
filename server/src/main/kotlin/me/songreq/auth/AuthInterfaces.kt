package me.songreq.auth

interface AuthProvider {
    fun getAccessTokenForParty(partyId: String): String?
}