package com.prodata.MSProyectos.repository;


import com.prodata.MSProyectos.dto.Estado;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface EstadoRepository extends ReactiveCrudRepository<Estado, Long> {

    @Query("SELECT * FROM estado ORDER BY id DESC LIMIT 1;")
    Mono<Estado> getLastEstadoAdded();
}
