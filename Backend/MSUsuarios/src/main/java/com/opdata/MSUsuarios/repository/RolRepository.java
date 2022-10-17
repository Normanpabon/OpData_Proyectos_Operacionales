package com.opdata.MSUsuarios.repository;


import com.opdata.MSUsuarios.dto.Rol;
import com.opdata.MSUsuarios.dto.Usuario;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface RolRepository extends R2dbcRepository<Rol, Long> {

    @Query("SELECT * FROM rol ORDER BY id DESC LIMIT 1;")
    Mono<Rol> getLastRoladded();




}
