package com.prodata.ProdataAPI.controllers;

import com.prodata.ProdataAPI.security.JwtModel.AuthRequest;
import com.prodata.ProdataAPI.security.JwtModel.AuthResponse;
import com.prodata.ProdataAPI.security.service.JWTUtil;
import com.prodata.ProdataAPI.security.service.PBKDF2Encoder;
import com.prodata.ProdataAPI.services.UsuariosServiceClient;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@AllArgsConstructor
@RestController
public class ApiControllerAuth {

    private JWTUtil jwtUtil;
    private PBKDF2Encoder passEncoder;
    private UsuariosServiceClient usuariosServiceClient;

    @PostMapping("/opData/API/V2/login")
    public Mono<ResponseEntity<AuthResponse>> login(@RequestBody AuthRequest request){

        return usuariosServiceClient.getUserbyUsername(request.getUsername())
                .filter(userDetails -> passEncoder.encode(request.getPassword()).equals(userDetails.getPassword()))
                .map(userDetails -> ResponseEntity.ok(new AuthResponse(jwtUtil.generateToken(userDetails))))
                .switchIfEmpty(Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()));
    }


}
