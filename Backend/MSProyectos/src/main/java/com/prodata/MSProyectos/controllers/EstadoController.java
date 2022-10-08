package com.prodata.MSProyectos.controllers;


import com.prodata.MSProyectos.dto.Estado;
import com.prodata.MSProyectos.repository.EstadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/MSProyect/V1/estado")
public class EstadoController {

    @Autowired
    EstadoRepository estadoRepository;

    // GET

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.ACCEPTED)
    Flux<Estado> getAllEstados(){
        return estadoRepository.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    Mono<Estado> estadoById(@PathVariable int id){
        return estadoRepository.findById((long) id);
    }

    // POST

    @PostMapping("add/{estado}")
    @ResponseStatus(HttpStatus.CREATED)
    void createEstado(@PathVariable String estado){
        Estado tmpEstado = new Estado();
        tmpEstado.setEstado(estado);
        estadoRepository.save(tmpEstado).subscribe();
    }

    // Quizas metodo para verificar que el id del estado exista ?
}
