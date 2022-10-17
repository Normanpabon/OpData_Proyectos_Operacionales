package com.opdata.MSUsuarios.controllers;

import com.opdata.MSUsuarios.dto.Rol;
import com.opdata.MSUsuarios.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/MSUsers/V1/rol")
public class RolController {

    @Autowired
    RolRepository rolRepository;

    // GET

    @GetMapping("/roles")
    @ResponseStatus(HttpStatus.OK)
    public Flux<Rol> getRoles(){
        return rolRepository.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Rol> getRolById(@PathVariable int id){
        return rolRepository.findById((long) id);
    }


    // POST

    @PostMapping("/{rol}")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Rol> saveRol(@PathVariable String rol){
        Rol tmpRol = new Rol();

        tmpRol.setRol(rol);
        rolRepository.save(tmpRol).subscribe();
        return rolRepository.getLastRoladded();

    }

    // PUT

    @PutMapping("/{id}/{rol}")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Rol> updateRol(@PathVariable int id, @PathVariable String rol){
        Rol tmpRol = new Rol(id, rol);
        // Todo revisar porque no esta modificando
        rolRepository.save(tmpRol);


        return rolRepository.findById((long) id);

    }


    // DELETE todo: revisar si borrar

}
