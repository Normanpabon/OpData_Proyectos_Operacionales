package com.opdata.MSUsuarios.repository;


import com.opdata.MSUsuarios.dto.Usuario;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface UsuarioRepository extends R2dbcRepository<Usuario, Long> {
    // Implementar metodos para validaciones

    // Obtener ultimo usuario creado
    @Query("SELECT * FROM usuario ORDER BY id DESC LIMIT 1")
    Mono<Usuario> getLastUserAdded();

    // Obtener usuario por username
    @Query("SELECT usuario.id FROM usuario WHERE usuario.username=:user")
    Mono<Usuario> getUserByUsername(String user);

    @Query("SELECT IFNULL( (SELECT usuario.id FROM usuario WHERE usuario.username=:user) , -1)")
    Long getUserIdByUsername(String user);

    // Devuelve id del usuario si el nombre de usuario y contra son correctas, caso contrario devuelve -1
    @Query("SELECT IFNULL( (SELECT usuario.id FROM usuario WHERE usuario.username=:username AND usuario.hashed_pass=:pass) , -1)")
    Long verificarLogin(String username, String pass);

    // Devuelve id del rol del usuario
    @Query("SELECT usuario.rol FROM usuario WHERE usuario.id=:id")
    Long getRolByUserId(Long id);

    @Query("SELECT usuario.rol FROM usuario WHERE usuario.username=:user")
    Long getRolByUsername(String user);
}
