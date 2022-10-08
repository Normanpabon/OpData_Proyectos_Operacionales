package com.prodata.MSProyectos.controllers;


import com.prodata.MSProyectos.dto.Proyecto;
import com.prodata.MSProyectos.repository.ProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.sql.Date;

@RestController
@RequestMapping("/MSProyect/V1/proyecto")
public class ProyectoController {

    @Autowired
    ProyectoRepository proyectoRepository;

    // GET

    @GetMapping("/proyectos")
    @ResponseStatus(HttpStatus.ACCEPTED)
    Flux<Proyecto> getProyectos(){
        return proyectoRepository.findAll();
    }

    // Obtener por id de unidad designada
    @GetMapping("/unidad/{uni}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    Flux<Proyecto> getProyectosByUnidad(@PathVariable int uni){
        return proyectoRepository.getProyectoByUnidad(uni);
    }

    // Obtener por id del proyecto

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    Mono<Proyecto> getProyectoById(@PathVariable int id){
        return proyectoRepository.findById((long) id);
    }

    // POST

    @PostMapping("/{unidad}/{feReg}/{feEnd}/{desc}/{id_estado}/{obs}")
    @ResponseStatus(HttpStatus.CREATED)
    void addProyecto(@PathVariable int unidad, @PathVariable Date feReg, @PathVariable Date feEnd,
                     @PathVariable String desc, @PathVariable int id_estado,
                     @PathVariable String obs){

        Proyecto tmpProyecto =  new Proyecto();
        tmpProyecto.setUnidad_p(unidad);
        tmpProyecto.setFecha_reg(feReg);
        tmpProyecto.setFecha_fin(feEnd);
        tmpProyecto.setDesc_pro(desc);
        tmpProyecto.setId_estado(id_estado);
        tmpProyecto.setObservaciones(obs);

    }

    // PUT

    // TODO: Implementar
}