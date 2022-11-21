package com.opdata.MSUsuarios.repository;


import com.opdata.MSUsuarios.dto.Preferencia;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;




@Repository
@EnableR2dbcRepositories(basePackages = {"PreferenciaRepository", "UsuarioRepository"})
public interface PreferenciaRepository extends R2dbcRepository<Preferencia, Long> {

    // Obtener preferencia por id de usuario
    @Query("SELECT * FROM preferencia WHERE uid=:uid")
    Mono<Preferencia> getPreferenciaByuserId(int uid);



}
