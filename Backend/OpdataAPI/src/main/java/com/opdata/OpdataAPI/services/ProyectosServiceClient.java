package com.opdata.OpdataAPI.services;

import com.opdata.OpdataAPI.dto.msProyectos.Estado;
import com.opdata.OpdataAPI.dto.msProyectos.Proyecto;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ProyectosServiceClient {

    private WebClient webClient;

    public ProyectosServiceClient(WebClient.Builder builder){
        this.webClient = builder.baseUrl("http://localhost:8086/MSProyect/V1/").build();
    }

    // Implementar llamados a ms de proyectos

    //Estados
    public Mono<Estado> getEstadoById(int id){
        return this.webClient.get().uri("estado/{id}", id)
                .retrieve()
                .bodyToMono(Estado.class);
    }

    public Flux<Estado> getEstados(){
        return this.webClient.get().uri("/estado/all")
                .retrieve()
                .bodyToFlux(Estado.class);
    }

    public Mono<Estado> saveEstado(String estado, int habilitado){
        return this.webClient.post().uri("estado/add/{estado}/{habilitado}", estado, habilitado)
                .retrieve().bodyToMono(Estado.class);
    }

    // Proyectos
    //get
    public Flux<Proyecto> getProyectos(){
        return this.webClient.get().uri("proyecto/proyectos")
                .retrieve()
                .bodyToFlux(Proyecto.class);
    }

    public Flux<Proyecto> getProyectosByUnidad(int idUnidad){
        return this.webClient.get().uri("proyecto/unidad/{idUnidad}", idUnidad)
                .retrieve()
                .bodyToFlux(Proyecto.class);
    }

    public Mono<Proyecto> getProyectoById(int idProyecto){
        return this.webClient.get().uri("proyecto/{idProyecto}", idProyecto)
                .retrieve()
                .bodyToMono(Proyecto.class);
    }
    //post

    // TODO : Verificar porque no se esta creando en el ms (no llega la peticion al controlador del ms)
    public Mono<Proyecto> saveProyecto(int unidad, String feReg,String feIni, String feEnd, String desc, int id_estado, String obs){
        String valObs= obs;
        return this.webClient.post().uri("proyecto/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/",
                        unidad, feReg, feIni, feEnd, desc, id_estado).accept(MediaType.ALL).contentType(MediaType.TEXT_PLAIN).body(BodyInserters.fromObject(obs))
                        .retrieve().bodyToMono(Proyecto.class);


    }

    // Prueba con return
    @Deprecated
    public Mono<Proyecto> addProyecto(int unidad, String feReg,String feIni, String feEnd, String desc, int id_estado, String obs){
        return this.webClient.post().uri("proyecto/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/{obs}/",
                        unidad, feReg, feIni, feEnd, desc, id_estado, obs)
                .retrieve().bodyToMono(Proyecto.class);


    }

    // put

    public Mono<Proyecto> updateProyecto(int id, int unidad, String feReg,String feIni, String feEnd, String desc, int id_estado, String obs){
        return this.webClient.put().uri("proyecto/{id}/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/{obs}",id,
                        unidad, feReg, feIni, feEnd, desc, id_estado, obs)
                .retrieve()
                .bodyToMono(Proyecto.class);
    }

    public Mono<Proyecto> updateProyectoV2(int id, int unidad, String feReg,String feIni, String feEnd, String desc, int id_estado, String obs){
        String obsVal = obs;

        return this.webClient.put().uri("proyecto/{id}/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/",id,
                        unidad, feReg, feIni, feEnd, desc, id_estado).accept(MediaType.ALL).contentType(MediaType.TEXT_PLAIN).body(BodyInserters.fromObject(obsVal))
                .retrieve().bodyToMono(Proyecto.class);
    }

    public Mono<Estado> updateEstado(int id, String estado, int habilitado){
        return this.webClient.put().uri("estado/{id}/{estado}/{habilitado}", id, estado, habilitado)
                .retrieve()
                .bodyToMono(Estado.class);
    }



}
