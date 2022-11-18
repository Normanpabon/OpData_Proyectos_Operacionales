package com.opData.MSLogs.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Log {

    @Id
    private int id;

    private LocalDate fecha_eve;

    private String evento;

    private String tipo;

    private String servicio;

    private String usuario;


}
