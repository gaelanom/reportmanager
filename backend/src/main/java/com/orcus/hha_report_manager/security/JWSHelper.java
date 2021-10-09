package com.orcus.hha_report_manager.security;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.security.KeyFactory;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


/**
 * Utility class for generating and verifying JWT's.
 * */
public class JWSHelper {

    /*
     *  Todo: We need to store the key for subsequent decryption.
     *  This will need to be secure as exposing the key => our token can be generated.
     *  The Keys.secretKeyFor(SignatureAlgorithm.HS256) is provided to generate a valid key;
     */
    private static final Key KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public static String makeJwt(UserDetails userDetails) {
        //todo: fill out required claims.
        var claims = new HashMap<String, Object>();
        return makeJwt(userDetails.getUsername(), claims);
    }

    private static String makeJwt(String subject, HashMap<String, Object> claims) {
        //Todo: refactor this
        var createdDate = new Date(System.currentTimeMillis());
        var expiryDate = new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(createdDate)
                .setExpiration(expiryDate)
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }
}
