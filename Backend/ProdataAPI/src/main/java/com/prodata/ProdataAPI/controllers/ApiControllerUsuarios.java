package com.prodata.ProdataAPI.controllers;

import com.prodata.ProdataAPI.dto.msUsuarios.Preferencia;
import com.prodata.ProdataAPI.dto.msUsuarios.Usuario;
import com.prodata.ProdataAPI.services.UsuariosServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.ConstraintViolationException;

@RestController
@CrossOrigin
@RequestMapping("/opData/API/V2/users/")
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

    @GetMapping("/{username}")
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

    @PostMapping("/{cod_ins}/{nombre}/{apellido}/{username}/{correo}/{rol}/{pass}")
    @PreAuthorize("hasRole('Administrador')")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Usuario> createUser(@PathVariable int cod_ins, @PathVariable String nombre,
                                    @PathVariable String apellido, @PathVariable String username,
                                    @PathVariable String correo, @PathVariable int rol,
                                    @PathVariable String pass) {

        return usuariosServiceClient.postUsuario(cod_ins, nombre, apellido, username, correo, rol, pass );
    }

    // Puts

    @PutMapping("/{id}/{cod_ins}/{nombre}/{apellido}/{username}/{correo}/{rol}/{pass}")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Usuario> updateUser(@PathVariable int id, @PathVariable int cod_ins, @PathVariable String nombre,
                                    @PathVariable String apellido, @PathVariable String username,
                                    @PathVariable String correo, @PathVariable int rol,
                                    @PathVariable String pass) {

        return usuariosServiceClient.updateUsuario(id,cod_ins, nombre, apellido, username, correo, rol, pass );
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


    // Todo: Manejo de excepcion para servidor caido (MS) ?
}
