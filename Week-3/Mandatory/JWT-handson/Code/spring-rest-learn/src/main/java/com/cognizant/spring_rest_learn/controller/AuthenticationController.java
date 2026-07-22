package com.cognizant.spring_rest_learn.controller;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.spring_rest_learn.model.AuthenticationResponse;
import com.cognizant.spring_rest_learn.util.JwtUtil;

@RestController
public class AuthenticationController {

    @GetMapping("/authenticate")
    public AuthenticationResponse authenticate(
            @RequestHeader("Authorization") String header) {

        String base64 = header.substring(6);

        byte[] decoded = Base64.getDecoder().decode(base64);

        String credentials =
                new String(decoded, StandardCharsets.UTF_8);

        String username = credentials.split(":")[0];

        String token = JwtUtil.generateToken(username);

        return new AuthenticationResponse(token);
    }
}