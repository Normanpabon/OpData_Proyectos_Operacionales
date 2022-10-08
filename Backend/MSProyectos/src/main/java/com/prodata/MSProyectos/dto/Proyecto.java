package com.prodata.MSProyectos.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Date;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table("proyecto")
public class Proyecto {

    @Id
    private int id;

    private int unidad_p;

    private Date fecha_reg;
    private Date fecha_ini;
    private Date fecha_fin;

    private String desc_pro;

    private int id_estado;

    private String observaciones;


}
