package com.prodata.ProdataAPI.services;

import com.prodata.ProdataAPI.dto.msProyectos.Estado;
import com.prodata.ProdataAPI.dto.msProyectos.Proyecto;
import org.springframework.stereotype.Service;
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

    public void saveEstado(String estado){
        this.webClient.post().uri("estado/add/{estado}", estado)
                .retrieve();
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
    @Deprecated
    public void saveProyecto(int unidad, String feReg,String feIni, String feEnd, String desc, int id_estado, String obs){
        this.webClient.post().uri("proyecto/add/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/{obs}/",
                        unidad, feReg, feIni, feEnd, desc, id_estado, obs)
                        .retrieve();


    }

    // Prueba con return

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

    public Mono<Estado> updateEstado(int id, String estado){
        return this.webClient.put().uri("estado/{id}/{estado}", id, estado)
                .retrieve()
                .bodyToMono(Estado.class);
    }



}
