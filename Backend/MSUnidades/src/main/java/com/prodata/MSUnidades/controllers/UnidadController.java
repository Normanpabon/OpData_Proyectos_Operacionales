package com.prodata.MSUnidades.controllers;

import com.prodata.MSUnidades.dto.Unidad;
import com.prodata.MSUnidades.repository.UnidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/MSUnidad/V1/unidad")
public class UnidadController {

    @Autowired
    UnidadRepository unidadRepository;

    // GET

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    Flux<Unidad> getAllUnidades(){
        return unidadRepository.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    Mono<Unidad> getUnidadById(@PathVariable int id){
        return unidadRepository.findById((long) id);
    }

    @GetMapping("/jefe/{uid}")
    @ResponseStatus(HttpStatus.OK)
    Mono<Unidad> getUnidadByJefe(@PathVariable int uid){
        return unidadRepository.getUnidadByJefe(uid);
    }


    // POST

    @PostMapping("/{nombre}/{uid_jefe}/{habilitado}")
    @ResponseStatus(HttpStatus.CREATED)
    Mono<Unidad> saveUnidad(@PathVariable String nombre, @PathVariable int uid_jefe, @PathVariable int habilitado){
        Unidad tmpUnidad = new Unidad();
        tmpUnidad.setNombre_unidad(nombre);
        tmpUnidad.setUid_jefe(uid_jefe);

        boolean activo = false;

        if(habilitado == 1){
            activo = true;
        }

        tmpUnidad.setHabilitado(activo);

        unidadRepository.save(tmpUnidad).subscribe();

        return unidadRepository.getLastUnidadAdded();
    }


    // PUT

    // todo: Implementar actualizacion de unidad

    @PutMapping("/{id}/{nombre}/{new_uid}/{habilitado}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    Mono<Unidad> updateUnidad(@PathVariable int id, @PathVariable String nombre, @PathVariable int new_uid, @PathVariable int habilitado){


        boolean activo = false;

        if(habilitado == 1){
            activo = true;
        }

        Unidad tmpUnidad = new Unidad(id, nombre, new_uid, activo);
        unidadRepository.save(tmpUnidad).subscribe();
        // todo: revisar si devuelve es la version actualizada o la version anterior
        return unidadRepository.findById((long)id);

    }
}
