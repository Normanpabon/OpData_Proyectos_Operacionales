package com.prodata.ProdataAPI.controllers;


import com.prodata.ProdataAPI.dto.Unidad;
import com.prodata.ProdataAPI.services.UnidadesServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin
@RequestMapping("/prodata/API/V1/unidades/")
public class ApiControllerUnidades {

    @Autowired
    UnidadesServiceClient unidadesServiceClient;

    // GET's
    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    Flux<Unidad> getAll(){
        return unidadesServiceClient.getAllUnidades();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    Mono<Unidad> getUnidadById(@PathVariable int id){
        return unidadesServiceClient.getUnidadById(id);
    }

    @GetMapping("/jefe/{uid}")
    @ResponseStatus(HttpStatus.OK)
    Mono<Unidad> getUnidadByJefe(@PathVariable int uid){
        return unidadesServiceClient.getUnidadByJefe(uid);
    }

    // POST's

    @PostMapping("/{nombre}/{uid_jefe}")
    @ResponseStatus(HttpStatus.CREATED)
    void saveUnidad(@PathVariable String nombre, @PathVariable int uid_jefe){

        unidadesServiceClient.saveUnidad(nombre, uid_jefe);
    }

    // UPDATE's

    @PutMapping("/{id}/{nombre}/{new_uid}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    Mono<Unidad> updateUnidad(@PathVariable int id, @PathVariable String
                              nombre, @PathVariable int new_uid){

        return unidadesServiceClient.updateUnidad(id, nombre, new_uid);
    }

    // Todo : Metodos de eliminacion (invisibilizacion)



}
