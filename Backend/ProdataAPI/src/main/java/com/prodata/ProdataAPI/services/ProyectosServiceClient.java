package com.prodata.ProdataAPI.services;

import com.prodata.ProdataAPI.dto.Estado;
import com.prodata.ProdataAPI.dto.Proyecto;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.sql.Date;
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
        this.webClient.get().uri("estado/add/{estado}", estado)
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
    public void saveProyecto(int unidad, Date feReg, Date feEnd, String desc, int id_estado, String obs){
        this.webClient.get().uri("proyecto/{unidad}/{feReg}/{feEnd}/{desc}/{id_estado}/{obs}",
                unidad, feReg, feEnd, desc, id_estado, obs)
                .retrieve();

    }


}
