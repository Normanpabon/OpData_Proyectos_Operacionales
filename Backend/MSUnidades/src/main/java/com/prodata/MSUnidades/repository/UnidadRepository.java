package com.prodata.MSUnidades.repository;

import com.prodata.MSUnidades.dto.Unidad;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface UnidadRepository extends ReactiveCrudRepository<Unidad, Long> {


    // todo : Cambiar logica, esta limitado a 1 pues se supone que un jefe tiene max una unidad
    // adicional a que devolvemos un mono entonces esperamos un unico dato
    @Query("SELECT * FROM unidad WHERE uid_jefe=:uid LIMIT 1")
    Mono<Unidad> getUnidadByJefe(int uid);

    @Query("SELECT * FROM unidad ORDER BY id DESC LIMIT 1")
    Mono<Unidad> getLastUnidadAdded();
}
