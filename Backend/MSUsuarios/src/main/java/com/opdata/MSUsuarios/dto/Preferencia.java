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

public class Preferencia {

    @Id
    private int id;

    private int uid;

    private int orden_pro;

    private int tema;

    private int fuente;

}
