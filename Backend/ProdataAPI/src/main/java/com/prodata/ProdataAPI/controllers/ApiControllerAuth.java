package com.prodata.ProdataAPI.controllers;

import com.prodata.ProdataAPI.security.JwtModel.AuthRequest;
import com.prodata.ProdataAPI.security.JwtModel.AuthResponse;
import com.prodata.ProdataAPI.security.service.JWTUtil;
import com.prodata.ProdataAPI.security.service.PBKDF2Encoder;
import com.prodata.ProdataAPI.services.UsuariosServiceClient;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import reactor.core.publisher.Mono;

@AllArgsConstructor
@RestController
public class ApiControllerAuth {

    private JWTUtil jwtUtil;
    private PBKDF2Encoder passEncoder;
    private UsuariosServiceClient usuariosServiceClient;


    @Operation(summary = "Recibe datos del usuario a loguear, devuelve token jwt")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Logueo exitoso"),
            @ApiResponse(responseCode = "401", description = "No autorizado" )

    })
    @PostMapping("/opData/API/V2/login")
    public Mono<ResponseEntity<AuthResponse>> login(@Parameter(description = "Recibe Json con username y password, correspondiendo al jefe de unidad o admin " +
            "a loguearse") @RequestBody AuthRequest request){

        return usuariosServiceClient.getUserbyUsername(request.getUsername())
                .filter(userDetails -> passEncoder.encode(request.getPassword()).equals(userDetails.getPassword()))
                .map(userDetails -> ResponseEntity.ok(new AuthResponse(jwtUtil.generateToken(userDetails))))
                .switchIfEmpty(Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()));
    }

    // Excepcion si el micorservicio no responde la peticion de la API
    @ExceptionHandler
    @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
    public Mono<String> handleDownService(WebClientRequestException ex){
        String errMsg = "El servidor no responde, porfavor intentelo mas tarde";
        // Todo : Llamar a ms de logs para registrar fallo
        return Mono.just(errMsg);
    }


}
