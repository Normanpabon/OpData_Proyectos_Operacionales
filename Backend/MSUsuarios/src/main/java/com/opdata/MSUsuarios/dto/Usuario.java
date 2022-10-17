package com.opdata.MSUsuarios.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Id;

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

    private int rol;

    private String hashed_pass;

}
