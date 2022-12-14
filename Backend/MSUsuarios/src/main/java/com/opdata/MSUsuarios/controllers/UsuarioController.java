package com.opdata.MSUsuarios.controllers;


import com.opdata.MSUsuarios.dto.Usuario;
import com.opdata.MSUsuarios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.TransientDataAccessResourceException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/MSUsers/V1/usuario/")

public class UsuarioController {

    @Autowired
    UsuarioRepository usuarioRepository;




    // Metodo usuarios

    // ------------ Metodos temporales
    // Verificar claves (devolver true o false si es correcto el login ?

    /*
    // Todo: verificar si va a ser temporal, creeria que si pues en caso tal el springboot security haria esta parte

    // Login
    @PostMapping("/login/{pass}/{username}")
    boolean login(@PathVariable String pass, @PathVariable String username){
        // Todo : Algoritmos de hash
        // Todo pasar a modo sin bloqueo
        // Verificar si existe el usuario
        long userId = -1;
        // Todo : Debug lanza excepcion al intentar ejecutar
        userId =  usuarioRepository.getUserIdByUsername(username);

        if(userId == -1){
            return false;
        }else{
            if(usuarioRepository.verificarLogin(username, pass) == userId){
                return true;
            }else{
                return false;
            }
        }

            // Obtener rol
    @PostMapping("/getRol/{username}")
    Mono<Rol> getRol(@PathVariable String username){

        long userId = usuarioRepository.getUserIdByUsername(username);

        if(userId == -1){
            return null;
        }else{

            long tmpRolId = usuarioRepository.getRolByUserId(userId);

            return rolController.getRolById((int)tmpRolId);

        }





    }



    }*/

    // Login
    @PostMapping("/login/{pass}/{username}")
    Mono<Long> login(@PathVariable String pass, @PathVariable String username){
        // Todo : Algoritmos de hash
        // Todo corregir, devuelve -1 si los datos enviados son invalidos
        return usuarioRepository.verificarLogin(username, pass);


    }



    // Fin metodos temporales  -------------
    // GETs usuarios

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    Flux<Usuario> getAllUsuarios(){
        return usuarioRepository.findAll();
    }

    /* Todo : Modificar para devolver solo informacion realmente requerida,
        excluir el hashed pass
    */
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    Mono<Usuario> usuarioById(@PathVariable int id){
        return usuarioRepository.findById((long) id );
    }

    @GetMapping("/username/{user}")
    @ResponseStatus(HttpStatus.OK)
    Mono<Usuario> usuarioByUsername(@PathVariable String user){
        return usuarioRepository.getUserByUsername(user);
    }

    // POSTs Usuario

    @PostMapping("/{cod_ins}/{nombre}/{apellido}/{username}/{correo}/{rol}/{pass}/{habilitado}")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Usuario> saveUsuario(@PathVariable int cod_ins, @PathVariable String nombre,
                                     @PathVariable String apellido, @PathVariable String username,
                                     @PathVariable String correo, @PathVariable String rol,
                                     @PathVariable String pass, @PathVariable int habilitado){

        Boolean tmp = false;

        if(habilitado == 1){
            tmp = true;
        }


        Usuario tmpUsuario = new Usuario();

        tmpUsuario.setCod_ins(cod_ins);
        tmpUsuario.setNombre(nombre);
        tmpUsuario.setApellido(apellido);
        tmpUsuario.setUsername(username);
        tmpUsuario.setCorreo(correo);
        tmpUsuario.setRol(rol);
        tmpUsuario.setHashed_pass(pass);
        tmpUsuario.setHabilitado(tmp);

        usuarioRepository.save(tmpUsuario).subscribe();

        return usuarioRepository.getLastUserAdded();

    }

    // PUT

    @PutMapping("/{id}/{cod_ins}/{nombre}/{apellido}/{username}/{correo}/{rol}/{pass}/{habilitado}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Mono<Usuario> updateUsuario(@PathVariable int id, @PathVariable int cod_ins, @PathVariable String nombre,
                                       @PathVariable String apellido, @PathVariable String username,
                                       @PathVariable String correo, @PathVariable String rol,
                                       @PathVariable String pass, @PathVariable int habilitado) {

        Boolean tmp = false;

        if(habilitado == 1){
            tmp = true;
        }

        Usuario  tmpUsuario = new Usuario(id, cod_ins, nombre, apellido, username, correo, rol, pass, tmp);

        usuarioRepository.save(tmpUsuario).subscribe();

        return usuarioRepository.findById((long) id);


    }

    // DELETE

    // TODO: Implementar

    // Manejo excepciones


}
