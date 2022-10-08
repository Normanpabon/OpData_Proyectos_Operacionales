package com.prodata.MSProyectos.repository;

import com.prodata.MSProyectos.dto.Proyecto;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface ProyectoRepository extends ReactiveCrudRepository<Proyecto, Long> {

    @Query("SELECT * FROM proyecto WHERE unidad_p=:idUnidad")
    Flux<Proyecto> getProyectoByUnidad(int idUnidad);


}
