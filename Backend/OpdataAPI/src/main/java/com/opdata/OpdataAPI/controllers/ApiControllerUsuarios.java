package com.opdata.OpdataAPI.controllers;

import com.opdata.OpdataAPI.dto.msUsuarios.Preferencia;
import com.opdata.OpdataAPI.dto.msUsuarios.Usuario;
import com.opdata.OpdataAPI.services.UsuariosServiceClient;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.ConstraintViolationException;

@RestController
@CrossOrigin
@RequestMapping("/opData/API/V2/users/")
@SecurityRequirement(name = "Jwt Authentication")
public class ApiControllerUsuarios {

    @Autowired
    private UsuariosServiceClient usuariosServiceClient;

    // Metodos Usuarios

    @Deprecated
    @PostMapping("login/{user}/{pass}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Long> userLogin(@PathVariable String user, @PathVariable String pass){
        return usuariosServiceClient.tryLogin(pass, user);
    }

    @GetMapping("username/{username}")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Usuario> getUserByUsername(@PathVariable String username){
        return usuariosServiceClient.getUserbyUsername(username);
    }


    /*

    @PostMapping("userRol/{uid}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Rol> rolByUid(@PathVariable int uid){
        return usuariosServiceClient.getRolByUid(uid);
    }*/

    // Gets

    @GetMapping("/all")
    @PreAuthorize("hasRole('Administrador')")
    @ResponseStatus(HttpStatus.OK)
    public Flux<Usuario> listUsers(){
        return usuariosServiceClient.getAllUsers();
    }


    @GetMapping("{id}")
    @PreAuthorize("hasRole('Administrador')")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Usuario> userById(@PathVariable int id){
        return usuariosServiceClient.getUserById(id);
    }

    // Posts

    @PostMapping("/{cod_ins}/{nombre}/{apellido}/{username}/{correo}/{rol}/{pass}/{habilitado}")
    @PreAuthorize("hasRole('Administrador')")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Usuario> createUser(@PathVariable int cod_ins, @PathVariable String nombre,
                                    @PathVariable String apellido, @PathVariable String username,
                                    @PathVariable String correo, @PathVariable String rol,
                                    @PathVariable String pass, @PathVariable int habilitado) {

        return usuariosServiceClient.postUsuario(cod_ins, nombre, apellido, username, correo, rol, pass, habilitado );
    }

    // Puts

    @PutMapping("/{id}/{cod_ins}/{nombre}/{apellido}/{username}/{correo}/{rol}/{pass}/{habilitado}")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Usuario> updateUser(@PathVariable int id, @PathVariable int cod_ins, @PathVariable String nombre,
                                    @PathVariable String apellido, @PathVariable String username,
                                    @PathVariable String correo, @PathVariable String rol,
                                    @PathVariable String pass, @PathVariable int habilitado) {

        return usuariosServiceClient.updateUsuario(id,cod_ins, nombre, apellido, username, correo, rol, pass, habilitado );
    }




    // Metodos preferencias

    // Gets

    @GetMapping("/preferencia/")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Preferencia> preferenciaDefault(){
        return usuariosServiceClient.getPreferenciaDefault();
    }

    @GetMapping("/preferencia/user/{uid}")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Preferencia> preferenciaDefault(@PathVariable int uid){
        return usuariosServiceClient.getPreferenciaByUid(uid);
    }

    // Posts

    @PostMapping("/preferencia/{uid}/{orden_pro}/{tema}/{fuente}")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Preferencia> savePreferencia(@PathVariable int uid, @PathVariable int orden_pro,
                                             @PathVariable int tema, @PathVariable int fuente){

        return usuariosServiceClient.postPreferencia(uid, orden_pro, tema, fuente);
    }

    // Puts


    @PutMapping("/preferencia/{id}/{uid}/{orden_pro}/{tema}/{fuente}")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Preferencia> updatePreferencia(@PathVariable int id,@PathVariable int uid, @PathVariable int orden_pro,
                                             @PathVariable int tema, @PathVariable int fuente){

        return usuariosServiceClient.updatePreferencia(id, uid, orden_pro, tema, fuente);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Mono<String> handleException(ConstraintViolationException exception) {

        String errMsg = exception.getMessage();

        return Mono.just(errMsg);
    }


    // Excepcion si el micorservicio no responde la peticion de la API
    @ExceptionHandler
    @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
    public Mono<String> handleDownService(WebClientRequestException ex){
        String errMsg = "El servidor no responde, porfavor intentelo mas tarde";
        // Todo : Llamar a ms de logs para registrar fallo
        return Mono.just(errMsg);
    }
}
