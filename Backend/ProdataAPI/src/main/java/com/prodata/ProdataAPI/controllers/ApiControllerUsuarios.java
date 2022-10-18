package com.prodata.ProdataAPI.controllers;

import com.prodata.ProdataAPI.dto.msUsuarios.Preferencia;
import com.prodata.ProdataAPI.dto.msUsuarios.Rol;
import com.prodata.ProdataAPI.dto.msUsuarios.Usuario;
import com.prodata.ProdataAPI.services.UsuariosServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin
@RequestMapping("/opData/API/V1/users/")
public class ApiControllerUsuarios {

    @Autowired
    private UsuariosServiceClient usuariosServiceClient;

    // Metodos Usuarios

    @PostMapping("login/{user}/{pass}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Long> userLogin(@PathVariable String user, @PathVariable String pass){
        return usuariosServiceClient.tryLogin(pass, user);
    }

    @PostMapping("userRol/{uid}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Rol> rolByUid(@PathVariable int uid){
        return usuariosServiceClient.getRolByUid(uid);
    }

    // Gets

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Flux<Usuario> listUsers(){
        return usuariosServiceClient.getAllUsers();
    }


    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Usuario> userById(@PathVariable int id){
        return usuariosServiceClient.getUserById(id);
    }

    // Posts

    @PostMapping("/{cod_ins}/{nombre}/{apellido}/{username}/{correo}/{rol}/{pass}")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Usuario> createUser(@PathVariable int cod_ins, @PathVariable String nombre,
                                    @PathVariable String apellido, @PathVariable String username,
                                    @PathVariable String correo, @PathVariable int rol,
                                    @PathVariable String pass) {

        return usuariosServiceClient.postUsuario(cod_ins, nombre, apellido, username, correo, rol, pass );
    }

    // Puts

    @PutMapping("/{id}/{cod_ins}/{nombre}/{apellido}/{username}/{correo}/{rol}/{pass}")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Usuario> updateUser(@PathVariable int id, @PathVariable int cod_ins, @PathVariable String nombre,
                                    @PathVariable String apellido, @PathVariable String username,
                                    @PathVariable String correo, @PathVariable int rol,
                                    @PathVariable String pass) {

        return usuariosServiceClient.updateUsuario(id,cod_ins, nombre, apellido, username, correo, rol, pass );
    }


    // Metodos roles

    // Gets

    @GetMapping("/rol/roles")
    @ResponseStatus(HttpStatus.OK)
    public Flux<Rol> listRoles(){
        return usuariosServiceClient.getAllRoles();
    }

    @GetMapping("/rol/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Rol> getRolById(@PathVariable int id){
        return usuariosServiceClient.getRolById(id);
    }

    // Posts

    @PostMapping("/rol/{rol}")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Rol> saveRole(@PathVariable String rol){
        return usuariosServiceClient.postRol(rol);
    }

    // Puts

    @PutMapping("/rol/{id}/{rol}")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Rol> updateRol(@PathVariable int id,@PathVariable String rol){
        return usuariosServiceClient.updateRol(id, rol);
    }

    // Metodos preferencias

    // Gets

    @GetMapping("/preferencia/")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Preferencia> preferenciaDefault(){
        return usuariosServiceClient.getPreferenciaDefault();
    }

    @GetMapping("/preferencia/user/{uid}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Preferencia> preferenciaDefault(@PathVariable int uid){
        return usuariosServiceClient.getPreferenciaByUid(uid);
    }

    // Posts

    @PostMapping("/preferencia/{uid}/{orden_pro}/{tema}/{fuente}")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Preferencia> savePreferencia(@PathVariable int uid, @PathVariable int orden_pro,
                                             @PathVariable int tema, @PathVariable int fuente){

        return usuariosServiceClient.postPreferencia(uid, orden_pro, tema, fuente);
    }

    // Puts


    @PutMapping("/preferencia/{id}/{uid}/{orden_pro}/{tema}/{fuente}")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Preferencia> updatePreferencia(@PathVariable int id,@PathVariable int uid, @PathVariable int orden_pro,
                                             @PathVariable int tema, @PathVariable int fuente){

        return usuariosServiceClient.updatePreferencia(id, uid, orden_pro, tema, fuente);
    }
}
