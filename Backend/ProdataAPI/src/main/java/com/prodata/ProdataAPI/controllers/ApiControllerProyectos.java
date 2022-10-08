package com.prodata.ProdataAPI.controllers;

import com.prodata.ProdataAPI.dto.Estado;
import com.prodata.ProdataAPI.dto.Proyecto;
import com.prodata.ProdataAPI.services.ProyectosServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.sql.Date;

@RestController
@CrossOrigin
@RequestMapping("/prodata/API/V1/proyectos/")
public class ApiControllerProyectos {

    @Autowired
    ProyectosServiceClient proyectosServiceClient;

    // GET Proyectos

    @GetMapping("/")
    @ResponseStatus(HttpStatus.ACCEPTED)
    Flux<Proyecto> getAll(){
        return proyectosServiceClient.getProyectos();
    }

    @GetMapping("/unidad/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    Flux<Proyecto> getAllByUnidad(@PathVariable int id){
        return proyectosServiceClient.getProyectosByUnidad(id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    Mono<Proyecto> getProyectoBy(@PathVariable int id){
        return proyectosServiceClient.getProyectoById(id);
    }


    // GET Estado

    @GetMapping("/estado/{id}")
    @ResponseStatus(HttpStatus.OK)
    Mono<Estado> getEstadoById(@PathVariable int id){
        return proyectosServiceClient.getEstadoById(id);
    }

    @GetMapping("/estado/all")
    @ResponseStatus(HttpStatus.ACCEPTED)
    Flux<Estado> getAllEstados(){
        return proyectosServiceClient.getEstados();
    }


    // POST Proyectos y estado

    @PostMapping("/{unidad}/{feReg}/{feEnd}/{desc}/{id_estado}/{obs}")
    @ResponseStatus(HttpStatus.CREATED)
    public void createProyecto(@PathVariable int unidad, @PathVariable Date feReg, @PathVariable Date feEnd,
                               @PathVariable String desc, @PathVariable int id_estado,
                               @PathVariable String obs){

        proyectosServiceClient.saveProyecto(unidad, feReg, feEnd, desc, id_estado, obs);

    }

    @PostMapping("/estado/{est}")
    @ResponseStatus(HttpStatus.CREATED)
    public void createEstado(@PathVariable String est){
        proyectosServiceClient.saveEstado(est);
    }


}
