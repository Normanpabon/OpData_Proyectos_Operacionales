package com.prodata.ProdataAPI.controllers;

import com.prodata.ProdataAPI.dto.msProyectos.Estado;
import com.prodata.ProdataAPI.dto.msProyectos.Proyecto;
import com.prodata.ProdataAPI.services.ProyectosServiceClient;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.hibernate.validator.constraints.Length;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.ConstraintViolationException;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@CrossOrigin
@RequestMapping("/opData/API/V2/proyectos/")
@Validated
@SecurityRequirement(name = "Jwt Authentication")
public class ApiControllerProyectos {

    @Autowired
    private ProyectosServiceClient proyectosServiceClient;

    private DateTimeFormatter DATEFORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    // GET Proyectos

    @GetMapping("/")
    @PreAuthorize("hasRole('Administrador')")
    @ResponseStatus(HttpStatus.OK)
    public Flux<Proyecto> getAll(){
        return proyectosServiceClient.getProyectos();
    }

    @GetMapping("/unidad/{id}")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.OK)
    public Flux<Proyecto> getAllByUnidad(@PathVariable @Positive(message = "El id debe ser mayor a 0 ") @NotNull(message = "Debe suministrarse un id") int id){
        return proyectosServiceClient.getProyectosByUnidad(id);
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Proyecto> getProyectoBy(@PathVariable @Positive(message = "El id debe ser mayor a 0 ") @NotNull(message = "Debe suministrarse un id") int id){
        return proyectosServiceClient.getProyectoById(id);
    }


    // GET Estado

    @GetMapping("/estado/{id}")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Estado> getEstadoById(@PathVariable @Positive(message = "El id debe ser mayor a 0 ") @NotNull(message = "Debe suministrarse un id") int id){
        return proyectosServiceClient.getEstadoById(id);
    }

    @GetMapping("/estado/all")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.OK)
    public Flux<Estado> getAllEstados(){
        return proyectosServiceClient.getEstados();
    }


    // POST Proyectos y estado

/*
@Deprecated
    @PostMapping("/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/{obs}")
    @ResponseStatus(HttpStatus.CREATED)
    public void createProyecto(@PathVariable int unidad, @PathVariable String feReg,@PathVariable String feIni, @PathVariable String feEnd,
                               @PathVariable String desc, @PathVariable int id_estado,
                               @PathVariable String obs){

        proyectosServiceClient.saveProyecto(unidad, feReg, feIni, feEnd, desc, id_estado, obs);

    }

 */

    @Deprecated
    @PostMapping("/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/{obs}")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.CREATED)
    @Validated
    public Mono<Proyecto> createProyecto(@PathVariable @Positive(message = "El id debe ser mayor a 0 ") @NotNull(message = "La unidad asociada es obligatoria.") int unidad,
                                         @PathVariable @NotBlank(message = "La fecha de registro es obligatoria.") String feReg,
                                         @PathVariable @NotBlank(message = "La fecha de inicio es obligatoria.") String feIni,
                                         @PathVariable @NotBlank(message = "La fecha de fin es obligatoria.")  String feEnd,
                                         @PathVariable @NotBlank(message = "El nombre del proyecto es obligatorio.")  @Length(min=4, max=500, message = "La longitud maxima del nombre son 500 caracteres.") String desc,
                                         @PathVariable @Positive(message = "El id debe ser mayor a 0 ") @NotNull(message = "El id de estado es obligatorio.") int id_estado,
                                         @PathVariable @Length(max=12000, message = "La longitud maxima de las observaciones son 12000 caracteres.") String obs){

        // TODO: Abstraer a un validador externo

        // si la primera fecha es mayor devuelve 0 > 1, si es igual 0
        // Validar que la fecha de inicio sea mayor o igual a la de registro
        /*
        if (!((LocalDate.parse(feIni, DATEFORMATTER)).compareTo(LocalDate.parse(feReg, DATEFORMATTER)) >= 0)) {

            throw new ConstraintViolationException("La fecha de inicio debe ser mayor a la fecha de registro.", null);
        }*/

        // Validar que la fecha de fin sea mayor o igual a la de inicio
        if(!((LocalDate.parse(feEnd, DATEFORMATTER)).compareTo(LocalDate.parse(feIni, DATEFORMATTER)) >= 0)){
            throw new ConstraintViolationException("La fecha de finalizacion debe ser mayor a la fecha de registro e inicio.", null);
        }

        // Todo : Validar que la unidad exista
        // Todo : Validar que el estado exista

        // Validar que si el estado es anulado tenga una observacion
        // todo : cambiar logica
        if (id_estado == 4) {
            // Si no tiene observaciones para justificar la anulacion
            if(obs.length() <= 2){
                throw new ConstraintViolationException("Debe colocarse la justificacion de la anulacion", null);
            }
        }


        // Si se cumple la validacion de las fechas, se crea el proyecto

        return proyectosServiceClient.addProyecto(unidad, feReg, feIni, feEnd, desc, id_estado, obs);




    }

    @PostMapping("/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.CREATED)
    @Validated
    public Mono<Proyecto> createProyectoV2(@PathVariable @Positive(message = "El id debe ser mayor a 0 ") @NotNull(message = "La unidad asociada es obligatoria.") int unidad,
                                         @PathVariable @NotBlank(message = "La fecha de registro es obligatoria.") String feReg,
                                         @PathVariable @NotBlank(message = "La fecha de inicio es obligatoria.") String feIni,
                                         @PathVariable @NotBlank(message = "La fecha de fin es obligatoria.")  String feEnd,
                                         @PathVariable @NotBlank(message = "El nombre del proyecto es obligatorio.")  @Length(min=4, max=500, message = "La longitud maxima del nombre son 500 caracteres.") String desc,
                                         @PathVariable @Positive(message = "El id debe ser mayor a 0 ") @NotNull(message = "El id de estado es obligatorio.") int id_estado,
                                         @RequestBody @Length(max=12000, message = "La longitud maxima de las observaciones son 12000 caracteres.") String obs){

        // TODO: Abstraer a un validador externo

        // si la primera fecha es mayor devuelve 0 > 1, si es igual 0
        // Validar que la fecha de inicio sea mayor o igual a la de registro
        /*
        if (!((LocalDate.parse(feIni, DATEFORMATTER)).compareTo(LocalDate.parse(feReg, DATEFORMATTER)) >= 0)) {

            throw new ConstraintViolationException("La fecha de inicio debe ser mayor a la fecha de registro.", null);
        }*/

        // Validar que la fecha de fin sea mayor o igual a la de inicio
        if(!((LocalDate.parse(feEnd, DATEFORMATTER)).compareTo(LocalDate.parse(feIni, DATEFORMATTER)) >= 0)){
            throw new ConstraintViolationException("La fecha de finalizacion debe ser mayor a la fecha de registro e inicio.", null);
        }

        // Todo : Validar que la unidad exista
        // Todo : Validar que el estado exista

        // Validar que si el estado es anulado tenga una observacion
        // todo : cambiar logica
        if (id_estado == 4) {
            // Si no tiene observaciones para justificar la anulacion
            if(obs.length() <= 2){
                throw new ConstraintViolationException("Debe colocarse la justificacion de la anulacion", null);
            }
        }


        // Si se cumple la validacion de las fechas, se crea el proyecto

        //return proyectosServiceClient.addProyecto(unidad, feReg, feIni, feEnd, desc, id_estado, obs);
        return proyectosServiceClient.saveProyecto(unidad, feReg, feIni, feEnd, desc, id_estado, obs);




    }

/*
    // Metodo post si no se envia observacion
    @PostMapping("/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.CREATED)
    @Validated
    public Mono<Proyecto> createProyecto(@PathVariable @Positive(message = "El id debe ser mayor a 0 ") @NotNull(message = "La unidad asociada es obligatoria.") int unidad,
                                         @PathVariable @NotBlank(message = "La fecha de registro es obligatoria.") String feReg,
                                         @PathVariable @NotBlank(message = "La fecha de inicio es obligatoria.") String feIni,
                                         @PathVariable @NotBlank(message = "La fecha de fin es obligatoria.")  String feEnd,
                                         @PathVariable @NotBlank(message = "El nombre del proyecto es obligatorio.")  @Length(min=4, max=500, message = "La longitud maxima del nombre son 500 caracteres.") String desc,
                                         @PathVariable @Positive(message = "El id debe ser mayor a 0 ") @NotNull(message = "El id de estado es obligatorio.") int id_estado){

        // TODO: Abstraer a un validador externo

        // si la primera fecha es mayor devuelve 0 > 1, si es igual 0
        // Validar que la fecha de inicio sea mayor o igual a la de registro
/*
        if (!((LocalDate.parse(feIni, DATEFORMATTER)).compareTo(LocalDate.parse(feReg, DATEFORMATTER)) >= 0)) {

            throw new ConstraintViolationException("La fecha de inicio debe ser mayor a la fecha de registro.", null);
        }*/
    /*

        // Validar que la fecha de fin sea mayor o igual a la de inicio
        if(!((LocalDate.parse(feEnd, DATEFORMATTER)).compareTo(LocalDate.parse(feIni, DATEFORMATTER)) >= 0)){
            throw new ConstraintViolationException("La fecha de finalizacion debe ser mayor a la fecha de registro e inicio.", null);
        }

        // Todo : Validar que la unidad exista
        // Todo : Validar que el estado exista

        // Validar que si el estado es anulado tenga una observacion
        // todo : cambiar logica
        if (id_estado == 4) {
            throw new ConstraintViolationException("Para el estado anulado, se debe especificar la justificacion", null);
        }


        // Si se cumple la validacion de las fechas, se crea el proyecto

        return proyectosServiceClient.addProyecto(unidad, feReg, feIni, feEnd, desc, id_estado, "NA");




    }*/

    @PostMapping("/estado/{est}/{habilitado}")
    @PreAuthorize("hasRole('Administrador')")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Estado> createEstado(@PathVariable  @NotBlank(message = "El estado debe tener un nombre.") @Length(min=1, max=32, message = "La longitud maxima del nombre son 32 caracteres.")String est,
                                     @PathVariable @NotNull(message = "debe especificarse un estado 0: deshabilitado, 1: habilitado")  @PositiveOrZero(message = "El campo habilitado puede tomar solo valor 0 o 1") int habilitado){



        return proyectosServiceClient.saveEstado(est, habilitado);

    }

    // PUT Proyectos y estado
/*
    @PutMapping("/{id}/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Proyecto> updateProyecto(@PathVariable @Positive(message = "El id debe ser mayor a 0 ") @NotNull int id, @PathVariable  @NotNull(message = "La unidad asociada es obligatoria.") int unidad,
                                         @PathVariable @NotBlank(message = "La fecha de registro es obligatoria.") String feReg,
                                         @PathVariable @NotBlank(message = "La fecha de inicio es obligatoria.") String feIni,
                                         @PathVariable @NotBlank(message = "La fecha de fin es obligatoria.") String feEnd,
                                         @PathVariable @NotBlank(message = "El nombre del proyecto es obligatorio y claro.") @Length(min=4, max=500, message = "La longitud mininma del nombre son minimo 2 y maximo 500 caracteres.") String desc,
                                         @PathVariable @Positive(message = "El id debe ser mayor a 0 ") @NotNull(message = "El id de estado es obligatorio.") int id_estado){

        // TODO: Abstraer a un validador externo


        // si la primera fecha es mayor devuelve 0 > 1, si es igual 0
        // Validar que la fecha de inicio sea mayor o igual a la de registro
        /*
        if (!((LocalDate.parse(feIni, DATEFORMATTER)).compareTo(LocalDate.parse(feReg, DATEFORMATTER)) >= 0)) {

            throw new ConstraintViolationException("La fecha de inicio debe ser mayor a la fecha de registro.", null);
        }*/

        // Todo : Validar que la unidad exista
        // Todo : Validar que el estado exista

        // Validar que la fecha de fin sea mayor o igual a la de registro e inicio
    /*
        if(!((LocalDate.parse(feEnd, DATEFORMATTER)).compareTo(LocalDate.parse(feIni, DATEFORMATTER)) >= 0)){
            throw new ConstraintViolationException("La fecha de finalizacion debe ser mayor a la fecha de registro e inicio.", null);
        }

        // Validar que si el estado es anulado tenga una observacion
        // todo : cambiar logica
        if (id_estado == 4) {
            // Si no tiene observaciones para justificar la anulacion
            throw new ConstraintViolationException("Debe colocarse la justificacion de la anulacion", null);
        }

        return proyectosServiceClient.updateProyecto(id, unidad, feReg, feIni, feEnd, desc, id_estado, "NA");
    }
    */@Deprecated
    @PutMapping("/{id}/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/{obs}")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Proyecto> updateProyecto(@PathVariable @Positive(message = "El id debe ser mayor a 0 ") @NotNull int id, @PathVariable  @NotNull(message = "La unidad asociada es obligatoria.") int unidad,
                                         @PathVariable @NotBlank(message = "La fecha de registro es obligatoria.") String feReg,
                                         @PathVariable @NotBlank(message = "La fecha de inicio es obligatoria.") String feIni,
                                         @PathVariable @NotBlank(message = "La fecha de fin es obligatoria.") String feEnd,
                                         @PathVariable @NotBlank(message = "El nombre del proyecto es obligatorio.") @Length(min=4, max=500, message = "La longitud mininma del nombre son minimo 2 y maximo 500 caracteres.") String desc,
                                         @PathVariable @Positive(message = "El id debe ser mayor a 0 ") @NotNull(message = "El id de estado es obligatorio.") int id_estado,
                                         @PathVariable @Length(max=12000, message = "La longitud maxima de las observaciones son 12000 caracteres.") String obs){

        // TODO: Abstraer a un validador externo


        // si la primera fecha es mayor devuelve 0 > 1, si es igual 0
        // Validar que la fecha de inicio sea mayor o igual a la de registro
        /*
        if (!((LocalDate.parse(feIni, DATEFORMATTER)).compareTo(LocalDate.parse(feReg, DATEFORMATTER)) >= 0)) {

            throw new ConstraintViolationException("La fecha de inicio debe ser mayor a la fecha de registro.", null);
        }*/

        // Todo : Validar que la unidad exista
        // Todo : Validar que el estado exista

        // Validar que la fecha de fin sea mayor o igual a la de registro e inicio
        if(!((LocalDate.parse(feEnd, DATEFORMATTER)).compareTo(LocalDate.parse(feIni, DATEFORMATTER)) >= 0)){
            throw new ConstraintViolationException("La fecha de finalizacion debe ser mayor a la fecha de registro e inicio.", null);
        }

        // Validar que si el estado es anulado tenga una observacion
        // todo : cambiar logica
        if (id_estado == 4) {
            // Si no tiene observaciones para justificar la anulacion
            if(obs.length() <= 2){
                throw new ConstraintViolationException("Debe colocarse la justificacion de la anulacion", null);
            }
        }

        return proyectosServiceClient.updateProyecto(id, unidad, feReg, feIni, feEnd, desc, id_estado, obs);
    }

    @PutMapping("/{id}/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}")
    @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Proyecto> updateProyectoV2(@PathVariable @Positive(message = "El id debe ser mayor a 0 ") @NotNull int id, @PathVariable  @NotNull(message = "La unidad asociada es obligatoria.") int unidad,
                                         @PathVariable @NotBlank(message = "La fecha de registro es obligatoria.") String feReg,
                                         @PathVariable @NotBlank(message = "La fecha de inicio es obligatoria.") String feIni,
                                         @PathVariable @NotBlank(message = "La fecha de fin es obligatoria.") String feEnd,
                                         @PathVariable @NotBlank(message = "El nombre del proyecto es obligatorio.") @Length(min=4, max=500, message = "La longitud mininma del nombre son minimo 2 y maximo 500 caracteres.") String desc,
                                         @PathVariable @Positive(message = "El id debe ser mayor a 0 ") @NotNull(message = "El id de estado es obligatorio.") int id_estado,
                                         @RequestBody @Length(max=12000, message = "La longitud maxima de las observaciones son 12000 caracteres.") String obs){

        // TODO: Abstraer a un validador externo


        // si la primera fecha es mayor devuelve 0 > 1, si es igual 0
        // Validar que la fecha de inicio sea mayor o igual a la de registro
        /*
        if (!((LocalDate.parse(feIni, DATEFORMATTER)).compareTo(LocalDate.parse(feReg, DATEFORMATTER)) >= 0)) {

            throw new ConstraintViolationException("La fecha de inicio debe ser mayor a la fecha de registro.", null);
        }*/

        // Todo : Validar que la unidad exista
        // Todo : Validar que el estado exista

        // Validar que la fecha de fin sea mayor o igual a la de registro e inicio
        if(!((LocalDate.parse(feEnd, DATEFORMATTER)).compareTo(LocalDate.parse(feIni, DATEFORMATTER)) >= 0)){
            throw new ConstraintViolationException("La fecha de finalizacion debe ser mayor a la fecha de registro e inicio.", null);
        }

        // Validar que si el estado es anulado tenga una observacion
        // todo : cambiar logica
        if (id_estado == 4) {
            // Si no tiene observaciones para justificar la anulacion
            if(obs.length() <= 2){
                throw new ConstraintViolationException("Debe colocarse la justificacion de la anulacion", null);
            }
        }

        return proyectosServiceClient.updateProyectoV2(id, unidad, feReg, feIni, feEnd, desc, id_estado, obs);
    }

    @PutMapping("/estado/{id}/{estado}/{habilitado}")
    @PreAuthorize("hasRole('Administrador')")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Mono<Estado> updateEstado(@PathVariable @Positive(message = "El id debe ser mayor a 0 ") @NotNull int id,
                                     @PathVariable  @NotBlank(message = "El estado debe tener un nombre.") @Length(min=1, max=32, message = "La longitud maxima del nombre son 32 caracteres.") String estado,
                                     @PathVariable @NotNull(message = "debe especificarse un estado 0: deshabilitado, 1: habilitado")  @PositiveOrZero(message = "El campo habilitado puede tomar solo valor 0 o 1") int habilitado){

        return proyectosServiceClient.updateEstado(id, estado, habilitado);
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
