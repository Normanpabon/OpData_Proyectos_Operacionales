package com.prodata.MSUnidades.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table("unidad")

public class Unidad {

    @Id
    private int id;

    private String nombre_unidad;

    private int uid_jefe;

    private Boolean habilitado;
}
