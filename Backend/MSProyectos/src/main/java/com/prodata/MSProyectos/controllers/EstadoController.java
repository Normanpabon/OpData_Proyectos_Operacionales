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
    @ResponseStatus(HttpStatus.OK)
    Flux<Estado> getAllEstados(){
        return estadoRepository.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    Mono<Estado> estadoById(@PathVariable int id){
        return estadoRepository.findById((long) id);
    }

    // POST

    @PostMapping("add/{estado}")
    @ResponseStatus(HttpStatus.CREATED)
    Mono<Estado> createEstado(@PathVariable String estado){
        Estado tmpEstado = new Estado();
        tmpEstado.setEstado(estado);
        estadoRepository.save(tmpEstado).subscribe();

        return estadoRepository.getLastEstadoAdded();
    }

    // PUT

    @PutMapping("/{id}/{estado}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    Mono<Estado> updateEstado(@PathVariable int id, @PathVariable String estado){
        Estado tmpEstado = new Estado(id, estado);
        estadoRepository.save(tmpEstado).subscribe();

        return estadoRepository.findById((long) id);
    }

    // Quizas metodo para verificar que el id del estado exista ?
}
