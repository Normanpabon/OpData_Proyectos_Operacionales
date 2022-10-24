package com.prodata.ProdataAPI.controllers;

import com.prodata.ProdataAPI.dto.msProyectos.Estado;
import com.prodata.ProdataAPI.dto.msProyectos.Proyecto;
import com.prodata.ProdataAPI.services.ProyectosServiceClient;
import org.hibernate.validator.constraints.Length;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@RestController
@CrossOrigin
@RequestMapping("/opData/API/V1/proyectos/")
@Validated
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
    public Flux<Proyecto> getAllByUnidad(@PathVariable @Positive @NotNull(message = "Debe suministrarse un id") int id){
        return proyectosServiceClient.getProyectosByUnidad(id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Proyecto> getProyectoBy(@PathVariable @Positive @NotNull(message = "Debe suministrarse un id") int id){
        return proyectosServiceClient.getProyectoById(id);
    }


    // GET Estado

    @GetMapping("/estado/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Estado> getEstadoById(@PathVariable @Positive @NotNull(message = "Debe suministrarse un id") int id){
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
    @Validated
    public Mono<Proyecto> createProyecto(@PathVariable @Positive @NotNull(message = "La unidad asociada es obligatoria.") int unidad,
                                         @PathVariable @NotBlank(message = "La fecha de registro es obligatoria.") String feReg,
                                         @PathVariable @NotBlank(message = "La fecha de inicio es obligatoria.") String feIni,
                                         @PathVariable @NotBlank(message = "La fecha de fin es obligatoria.") @Future(message = "La fecha de finalizacion debe ser posterior a la actual.") String feEnd,
                                         @PathVariable @NotBlank(message = "El nombre del proyecto es obligatorio.") @Length(min=1, max=128, message = "La longitud maxima del nombre son 128 caracteres.") String desc,
                                         @PathVariable @Positive @NotNull(message = "El id de estado es obligatorio.") int id_estado,
                                         @PathVariable @Length(max=500, message = "La longitud maxima de las observaciones son 500 caracteres.") String obs){



        return proyectosServiceClient.addProyecto(unidad, feReg, feIni, feEnd, desc, id_estado, obs);

    }

    @PostMapping("/estado/{est}")
    @ResponseStatus(HttpStatus.CREATED)
    public void createEstado(@PathVariable  @NotBlank(message = "El estado debe tener un nombre.") String est){
        proyectosServiceClient.saveEstado(est);
    }

    // PUT Proyectos y estado

    @PutMapping("/{id}/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/{obs}")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Proyecto> updateProyecto(@PathVariable @Positive @NotNull int id, @PathVariable  @NotNull(message = "La unidad asociada es obligatoria.") int unidad,
                                         @PathVariable @NotBlank(message = "La fecha de registro es obligatoria.") String feReg,
                                         @PathVariable @NotBlank(message = "La fecha de inicio es obligatoria.") String feIni,
                                         @PathVariable @NotBlank(message = "La fecha de fin es obligatoria.") @Future(message = "La fecha de finalizacion debe ser posterior a la actual.") String feEnd,
                                         @PathVariable @NotBlank(message = "El nombre del proyecto es obligatorio.") @Length(min=1, max=128, message = "La longitud maxima del nombre son 128 caracteres.") String desc,
                                         @PathVariable @Positive @NotNull(message = "El id de estado es obligatorio.") int id_estado,
                                         @PathVariable @Length(max=500, message = "La longitud maxima de las observaciones son 500 caracteres.") String obs){


        return proyectosServiceClient.updateProyecto(id, unidad, feReg, feIni, feEnd, desc, id_estado, obs);
    }

    @PutMapping("/estado/{id}/{estado}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Mono<Estado> updateEstado(@PathVariable @Positive @NotNull int id,
                                     @PathVariable  @NotBlank(message = "El estado debe tener un nombre.") String estado){

        return proyectosServiceClient.updateEstado(id, estado);
    }

}
