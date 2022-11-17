package com.opdata.OpdataAPI.security.service;

import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;

import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class AuthManager implements ReactiveAuthenticationManager {
    private JWTUtil jwtUtil;

    @Override
    @SuppressWarnings("unchecked")
    public Mono<Authentication> authenticate(Authentication authentication) {
        String authToken = authentication.getCredentials().toString();
        String username = jwtUtil.getUsernameFromToken(authToken);
        return Mono.just(jwtUtil.validateToken(authToken))
                .filter(valid -> valid)
                .switchIfEmpty(Mono.empty())
                .map(valid -> {
                    Claims claims = jwtUtil.getAllClaimsFromToken(authToken); // Todo: verificar el error aca
                    //List<String> rolesMap = claims.get("role", List.class);
                    List<String> rolesMap = new ArrayList<>();
                    rolesMap.add(claims.get("role", String.class));
                    System.out.println(rolesMap.toString());
                    return new UsernamePasswordAuthenticationToken(
                            username,
                            null,

                            rolesMap.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList())
                    );
                });
    }
}
