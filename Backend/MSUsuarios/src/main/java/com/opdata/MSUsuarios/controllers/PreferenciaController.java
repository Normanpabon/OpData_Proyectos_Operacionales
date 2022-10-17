package com.opdata.MSUsuarios.controllers;


import com.opdata.MSUsuarios.dto.Preferencia;
import com.opdata.MSUsuarios.repository.PreferenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/MSUsers/V1/pref")
public class PreferenciaController {

    @Autowired
    PreferenciaRepository preferenciaRepository;

    // GET
    @GetMapping("/default")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Preferencia> getPreferenciaDefault(){
        return preferenciaRepository.findById((long) 1);
    }



    // Obtener preferencia por id de usuario (implementar)

    @GetMapping("usr/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Preferencia> getPreferenciaByUser(@PathVariable int id){
        return preferenciaRepository.getPreferenciaByuserId(id);
    }

    // POST

    @PostMapping("/{uid}/{orden_pro}/{tema}/{fuente}")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Preferencia> savePreferencia(@PathVariable int uid, @PathVariable int orden_pro,
                                             @PathVariable int tema, @PathVariable int funete){
        Preferencia tmpPreferencia = new Preferencia();

        tmpPreferencia.setUid(uid);
        tmpPreferencia.setOrden_pro(orden_pro);
        tmpPreferencia.setTema(tema);
        tmpPreferencia.setFuente(funete);

        preferenciaRepository.save(tmpPreferencia).subscribe();

        return preferenciaRepository.getPreferenciaByuserId(uid);

    }


    // PUT

    @PutMapping("/{id}/{uid}/{orden_pro}/{tema}/{fuente}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Mono<Preferencia> updatePreferencia(@PathVariable int id, @PathVariable int uid, @PathVariable int orden_pro,
                                               @PathVariable int tema, @PathVariable int funete){

        Preferencia tmpPreferencia = new Preferencia(id, uid, orden_pro, tema, funete);

        preferenciaRepository.save(tmpPreferencia).subscribe();

        return preferenciaRepository.findById((long) id);

    }


    // DELETE todo: revisar si borrar






}
