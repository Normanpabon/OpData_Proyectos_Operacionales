package com.prodata.ProdataAPI.services;

import com.prodata.ProdataAPI.dto.msProyectos.Estado;
import com.prodata.ProdataAPI.dto.msProyectos.Proyecto;
import com.prodata.ProdataAPI.dto.msUsuarios.Usuario;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.function.Executable;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

// Indicamos el uso de mockito
@ExtendWith(MockitoExtension.class)
public class TestProyectosServiceClient {

    //Mockeamos el comportamiento del servicio
    @Mock
    private ProyectosServiceClient proyectosService;


    @BeforeEach
    public void setup(){


    }

    // Tests para estados
    // Happy path
    @Test
    public void getEstadoByIdTest(){
        // Estado de prueba a devolver
        Mono<Estado> estadoEsperado = Mono.just(new Estado(29, "MockTest"));

        // Configuracion del mock a devolver
        Mockito.when(proyectosService.getEstadoById(29)).thenReturn(estadoEsperado);

        // Recuperamos el resultado del test
        final Mono<Estado> estadoResultante = proyectosService.getEstadoById(29);

        // Verificaciones
        Assertions.assertEquals(estadoEsperado, estadoResultante);
    }



    // Test para proyectos


    @Test
    public void getProyectoByIdTest(){
        //Proyecto de prueba a devolver
        Proyecto proyectoTest = new Proyecto();
        proyectoTest.setId(12);
        proyectoTest.setDesc_pro("Proyecto de prueba mocked");
        Mono<Proyecto> proyectoEsperado = Mono.just(proyectoTest);

        // Configuraciopn del mock
        Mockito.when(proyectosService.getProyectoById(12)).thenReturn(proyectoEsperado);

        // Obtenemos el resultado del test
        final Mono<Proyecto> proyectoResultante = proyectosService.getProyectoById(12);

        // Verificamos
        Assertions.assertEquals(proyectoEsperado, proyectoResultante);

    }
}
