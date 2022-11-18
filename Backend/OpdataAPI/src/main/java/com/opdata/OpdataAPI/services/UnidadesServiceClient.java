package com.opdata.OpdataAPI.services;

import com.opdata.OpdataAPI.dto.msUnidades.Unidad;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class UnidadesServiceClient {

    private WebClient webClient;

    public UnidadesServiceClient(WebClient.Builder builder){
        this.webClient = builder.baseUrl("http://localhost:8084/MSUnidad/V1/unidad").build();
    }

    // Implementar llamados a microservicio

    // GETs

    public Flux<Unidad> getAllUnidades(){
        return this.webClient.get().uri("/all")
                .retrieve().bodyToFlux(Unidad.class);
    }

    public Mono<Unidad> getUnidadById(int id){
        return this.webClient.get().uri("/{id}", id)
                .retrieve()
                .bodyToMono(Unidad.class);
    }

    public Mono<Unidad> getUnidadByJefe(int id){
        return this.webClient.get().uri("/jefe/{id}", id)
                .retrieve()
                .bodyToMono(Unidad.class);
    }

    // POSTs

    public Mono<Unidad> saveUnidad(String nombreUnidad, int UidJefe, int habilitado){
        return this.webClient.post().uri("/{nombreUnidad}/{UidJefe}/{habilitado}", nombreUnidad, UidJefe, habilitado)
                .retrieve().bodyToMono(Unidad.class);
    }

    // PUTs

    public Mono<Unidad> updateUnidad(int id, String nombreUnidad, int uidJefe, int habilitado){
        return this.webClient.put().uri("/{id}/{nombre}/{new_uid}/{habilitado}", id, nombreUnidad, uidJefe, habilitado)
                .retrieve()
                .bodyToMono(Unidad.class);
    }


}
