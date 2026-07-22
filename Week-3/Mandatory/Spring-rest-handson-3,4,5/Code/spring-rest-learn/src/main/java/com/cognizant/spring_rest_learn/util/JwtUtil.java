package com.cognizant.spring_rest_learn.util;

import java.security.Key;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtUtil {

    private static final String SECRET =
            "abcdefghijklmnopqrstuvwxyz123456";

    private static final Key KEY =
            new SecretKeySpec(
                    SECRET.getBytes(),
                    SignatureAlgorithm.HS256.getJcaName());

    public static String generateToken(String user) {

        return Jwts.builder()
                .setSubject(user)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+3600000))
                .signWith(KEY)
                .compact();
    }
}