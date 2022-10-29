package com.opdata.MSUsuarios.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Usuario {

    @Id
    private int id;

    private int cod_ins;

    private String nombre;

    private String apellido;

    private String username;

    private String correo;

    private String rol;

    private String hashed_pass;

}
