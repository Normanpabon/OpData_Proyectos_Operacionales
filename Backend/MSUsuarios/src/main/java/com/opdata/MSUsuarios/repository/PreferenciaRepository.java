package com.opdata.MSUsuarios.repository;


import com.opdata.MSUsuarios.dto.Preferencia;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface PreferenciaRepository extends R2dbcRepository<Preferencia, Long> {

    // Obtener preferencia por id de usuario
    @Query("SELECT * FROM preferencia WHERE uid=:uid")
    Mono<Preferencia> getPreferenciaByuserId(int uid);

}
