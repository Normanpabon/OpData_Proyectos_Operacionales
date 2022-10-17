package com.prodata.ProdataAPI.controllers;

import com.prodata.ProdataAPI.dto.msProyectos.Estado;
import com.prodata.ProdataAPI.dto.msProyectos.Proyecto;
import com.prodata.ProdataAPI.services.ProyectosServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin
@RequestMapping("/prodata/API/V1/proyectos/")
public class ApiControllerProyectos {

    @Autowired
    private ProyectosServiceClient proyectosServiceClient;

    // GET Proyectos

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public Flux<Proyecto> getAll(){
        return proyectosServiceClient.getProyectos();
    }

    @GetMapping("/unidad/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Flux<Proyecto> getAllByUnidad(@PathVariable int id){
        return proyectosServiceClient.getProyectosByUnidad(id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Proyecto> getProyectoBy(@PathVariable int id){
        return proyectosServiceClient.getProyectoById(id);
    }


    // GET Estado

    @GetMapping("/estado/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Estado> getEstadoById(@PathVariable int id){
        return proyectosServiceClient.getEstadoById(id);
    }

    @GetMapping("/estado/all")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Flux<Estado> getAllEstados(){
        return proyectosServiceClient.getEstados();
    }


    // POST Proyectos y estado

/*
@Deprecated
    @PostMapping("/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/{obs}")
    @ResponseStatus(HttpStatus.CREATED)
    public void createProyecto(@PathVariable int unidad, @PathVariable String feReg,@PathVariable String feIni, @PathVariable String feEnd,
                               @PathVariable String desc, @PathVariable int id_estado,
                               @PathVariable String obs){

        proyectosServiceClient.saveProyecto(unidad, feReg, feIni, feEnd, desc, id_estado, obs);

    }

 */

    @PostMapping("/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/{obs}")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Proyecto> createProyecto(@PathVariable int unidad, @PathVariable String feReg,@PathVariable String feIni, @PathVariable String feEnd,
                               @PathVariable String desc, @PathVariable int id_estado,
                               @PathVariable String obs){

        return proyectosServiceClient.addProyecto(unidad, feReg, feIni, feEnd, desc, id_estado, obs);

    }

    @PostMapping("/estado/{est}")
    @ResponseStatus(HttpStatus.CREATED)
    public void createEstado(@PathVariable String est){
        proyectosServiceClient.saveEstado(est);
    }

    // PUT Proyectos y estado

    @PutMapping("/{id}/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/{obs}")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Proyecto> updateProyecto(@PathVariable int id,@PathVariable int unidad, @PathVariable String feReg, @PathVariable String feIni,
                                        @PathVariable String feEnd,
                                        @PathVariable String desc, @PathVariable int id_estado,
                                        @PathVariable String obs){
        return proyectosServiceClient.updateProyecto(id, unidad, feReg, feIni, feEnd, desc, id_estado, obs);
    }

    @PutMapping("/estado/{id}/{estado}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Mono<Estado> updateEstado(@PathVariable int id, @PathVariable String estado){

        return proyectosServiceClient.updateEstado(id, estado);
    }

}
