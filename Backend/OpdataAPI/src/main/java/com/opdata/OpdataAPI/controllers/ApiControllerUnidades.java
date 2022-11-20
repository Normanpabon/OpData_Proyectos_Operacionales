package com.opdata.OpdataAPI.controllers;


import com.opdata.OpdataAPI.dto.msUnidades.Unidad;
import com.opdata.OpdataAPI.services.UnidadesServiceClient;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.hibernate.validator.constraints.Length;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.ConstraintViolationException;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;


@RestController
@CrossOrigin
@RequestMapping("/opData/API/V2/unidades/")
@Validated
@SecurityRequirement(name = "Jwt Authentication")
public class ApiControllerUnidades {

    @Autowired
    UnidadesServiceClient unidadesServiceClient;

    // GET's
    @GetMapping("/")
    @PreAuthorize("hasRole('Administrador')")
    @ResponseStatus(HttpStatus.OK)
    Flux<Unidad> getAll(){
        return unidadesServiceClient.getAllUnidades();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.OK)
    Mono<Unidad> getUnidadById(@PathVariable @Positive(message = "El id debe ser positivo mayor a 0") int id){
        return unidadesServiceClient.getUnidadById(id);
    }

    @GetMapping("/jefe/{uid}")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.OK)
    Mono<Unidad> getUnidadByJefe(@PathVariable @Positive(message = "El id debe ser positivo mayor a 0") int uid){
        return unidadesServiceClient.getUnidadByJefe(uid);
    }

    // POST's

    @PostMapping("/{nombre}/{uid_jefe}/{habilitado}")
    @PreAuthorize("hasRole('Administrador')")
    @ResponseStatus(HttpStatus.CREATED)
    Mono<Unidad> saveUnidad(@PathVariable @NotBlank(message ="La unidad debe tener un nombre valido" )  @Length(min=2, max=128, message = "La longitud del nombre de unidad son minimo 2 y maximo 128 caracteres.") String nombre,
                            @PathVariable @Positive(message = "El id debe ser positivo mayor a 0") int uid_jefe,
                            @PathVariable @NotNull(message = "debe especificarse un estado 0: deshabilitado, 1: habilitado") @PositiveOrZero(message = "El campo habilitado puede tomar solo valor 0 o 1") int habilitado){

        return unidadesServiceClient.saveUnidad(nombre, uid_jefe, habilitado);
    }

    // UPDATE's

    @PutMapping("/{id}/{nombre}/{new_uid}/{habilitado}")
    @PreAuthorize("hasRole('Administrador')")
    @ResponseStatus(HttpStatus.ACCEPTED)
    Mono<Unidad> updateUnidad(@PathVariable @Positive(message = "El id debe ser positivo mayor a 0") int id,
                              @PathVariable @NotBlank(message ="La unidad debe tener un nombre valido" ) @Length(min=2, max=128, message = "La longitud mininma del nombre de unidad son minimo 2 y maximo 128 caracteres.") String
                              nombre, @PathVariable @Positive(message = "El id debe ser positivo mayor a 0") int new_uid,
                              @PathVariable @NotNull(message = "debe especificarse un estado 0: deshabilitado, 1: habilitado") @PositiveOrZero(message = "El campo habilitado puede tomar solo valor 0 o 1") int habilitado){

        return unidadesServiceClient.updateUnidad(id, nombre, new_uid, habilitado);
    }

    // Todo : Metodos de eliminacion (invisibilizacion)

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Mono<String> handleException(ConstraintViolationException exception) {

        String errMsg = exception.getMessage();

        return Mono.just(errMsg);
    }

    // JWT Vencido
    @ExceptionHandler
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Mono<String> handleExpiredJwt(ExpiredJwtException ex){
        String errMsg = "El JWT suministrado se encuentra expirado" + ex.getMessage();

        return Mono.just(errMsg);

    }
    @ExceptionHandler
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Mono<String> handleAuthSignatureException(SignatureException ex){
        String errMsg = "El JWT sumistrado es invalido" + ex.getMessage();

        return Mono.just(errMsg);
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
