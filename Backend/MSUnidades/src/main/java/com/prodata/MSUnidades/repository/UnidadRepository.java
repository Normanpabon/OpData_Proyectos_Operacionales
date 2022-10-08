package com.prodata.MSUnidades.repository;

import com.prodata.MSUnidades.dto.Unidad;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface UnidadRepository extends ReactiveCrudRepository<Unidad, Long> {


    @Query("SELECT * FROM unidad WHERE uid_jefe=:uid")
    Mono<Unidad> getUnidadByJefe(int uid);
}
