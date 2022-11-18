package com.opdata.OpdataAPI.services;

import com.opdata.OpdataAPI.dto.msUsuarios.Preferencia;
import com.opdata.OpdataAPI.dto.msUsuarios.Usuario;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class UsuariosServiceClient {

    private WebClient webClient;

    public UsuariosServiceClient(WebClient.Builder builder){
        this.webClient = builder.baseUrl("http://localhost:8088/MSUsers/V1").build();
    }

    // Implementar llamados
    // Usuarios


    @Deprecated
    public Mono<Long> tryLogin(String pass, String username){
        return this.webClient.post().uri("/usuario/login/{pass}/{username}", pass, username)
                .retrieve().bodyToMono(Long.class);
    }
    /*
    public Mono<Rol> getRolByUid(int uid){
        return this.webClient.post().uri("/usuario/getRol/{uid}", uid).retrieve()
                .bodyToMono(Rol.class);

    }*/

    // GETS

    public Flux<Usuario> getAllUsers(){
        return this.webClient.get().uri("/usuario/all").retrieve().bodyToFlux(Usuario.class);
    }

    public Mono<Usuario> getUserById(int id){
        return this.webClient.get().uri("/usuario/{id}", id).retrieve().bodyToMono(Usuario.class);
    }

    public Mono<Usuario> getUserbyUsername(String username){
        return this.webClient.get().uri("/usuario/username/{username}", username).retrieve().bodyToMono(Usuario.class);
    }

    // POSTs

    public Mono<Usuario> postUsuario(int cod_ins, String nombre, String apellido, String username,
                                     String correo, String rol, String pass, int habilitado){
        return this.webClient.post().uri("/usuario/{cod_ins}/{nombre}/{apellido}/{username}/{correo}/{rol}/{pass}/{habilitado}",
                cod_ins, nombre, apellido, username, correo, rol, pass, habilitado).retrieve().bodyToMono(Usuario.class);

    }

    // Updates

    public Mono<Usuario> updateUsuario(int id,int cod_ins, String nombre, String apellido, String username,
                                       String correo, String rol, String pass, int habilitado){
        return this.webClient.put().uri("/usuario/{id}/{cod_ins}/{nombre}/{apellido}/{username}/{correo}/{rol}/{pass}/{habilitado}", id,
                cod_ins, nombre, apellido, username, correo, rol, pass, habilitado).retrieve().bodyToMono(Usuario.class);

    }




    // Preferencias


    // Gets

    public Mono<Preferencia> getPreferenciaDefault(){
        return this.webClient.get().uri("/pref/default").retrieve().bodyToMono(Preferencia.class);
    }

    public Mono<Preferencia> getPreferenciaByUid(int uid){
        return this.webClient.get().uri("/pref/usr/{uid}", uid).retrieve().bodyToMono(Preferencia.class);
    }

    // Posts

    public Mono<Preferencia> postPreferencia(int uid, int orden_pro, int tema, int fuente){
        return this.webClient.post().uri("/pref/{uid}/{orden_pro}/{tema}/{fuente}",
                uid, orden_pro, tema, fuente).retrieve()
                .bodyToMono(Preferencia.class);
    }

    // Updates

    public Mono<Preferencia> updatePreferencia(int id, int uid, int orden_pro, int tema, int fuente){
        return this.webClient.put().uri("/pref/{id}/{uid}/{orden_pro}/{tema}/{fuente}",
                        id ,uid, orden_pro, tema, fuente).retrieve()
                .bodyToMono(Preferencia.class);
    }

}

