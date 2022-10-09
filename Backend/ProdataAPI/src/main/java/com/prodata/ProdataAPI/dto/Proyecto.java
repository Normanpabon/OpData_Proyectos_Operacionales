package com.prodata.ProdataAPI.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table("proyecto")
public class Proyecto {

    @Id
    private int id;

    private int unidad_p;


    private LocalDate fecha_reg;
    private LocalDate fecha_ini;
    private LocalDate fecha_fin;
    /*
    private Date fecha_reg;
    private Date fecha_ini;
    private Date fecha_fin;
*/
    private String desc_pro;

    private int id_estado;

    private String observaciones;


}
