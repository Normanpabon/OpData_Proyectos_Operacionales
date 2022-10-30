package com.prodata.ProdataAPI.controllers;


import com.prodata.ProdataAPI.dto.msUnidades.Unidad;
import com.prodata.ProdataAPI.services.UnidadesServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.ConstraintViolationException;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;


@RestController
@CrossOrigin
@RequestMapping("/opData/API/V2/unidades/")
@Validated
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

    @PostMapping("/{nombre}/{uid_jefe}")
    @PreAuthorize("hasRole('Administrador')")
    @ResponseStatus(HttpStatus.CREATED)
    void saveUnidad(@PathVariable @NotBlank(message ="La unidad debe tener un nombre valido" ) String nombre, @PathVariable @Positive(message = "El id debe ser positivo mayor a 0") int uid_jefe){

        unidadesServiceClient.saveUnidad(nombre, uid_jefe);
    }

    // UPDATE's

    @PutMapping("/{id}/{nombre}/{new_uid}")
    @PreAuthorize("hasRole('Administrador')")
    @ResponseStatus(HttpStatus.ACCEPTED)
    Mono<Unidad> updateUnidad(@PathVariable @Positive(message = "El id debe ser positivo mayor a 0") int id,
                              @PathVariable @NotBlank(message ="La unidad debe tener un nombre valido" ) String
                              nombre, @PathVariable @Positive(message = "El id debe ser positivo mayor a 0") int new_uid){

        return unidadesServiceClient.updateUnidad(id, nombre, new_uid);
    }

    // Todo : Metodos de eliminacion (invisibilizacion)

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Mono<String> handleException(ConstraintViolationException exception) {

        String errMsg = exception.getMessage();

        return Mono.just(errMsg);
    }


    // Todo: Manejo de excepcion para servidor caido (MS) ?


}
