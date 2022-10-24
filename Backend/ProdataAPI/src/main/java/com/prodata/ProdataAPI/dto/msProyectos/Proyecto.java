package com.prodata.ProdataAPI.dto.msProyectos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table("proyecto")
public class Proyecto {

    @Id
    private int id;

    @NotNull(message = "La unidad asociada es obligatoria.")
    private int unidad_p;

    @NotBlank(message = "La fecha de registro es obligatoria.")
    private LocalDate fecha_reg;

    @NotBlank(message = "La fecha de inicio es obligatoria.")
    private LocalDate fecha_ini;

    @NotBlank(message = "La fecha de fin es obligatoria.")
    @Future(message = "La fecha de finalizacion debe ser posterior a la actual.")
    private LocalDate fecha_fin;
    /*
    private Date fecha_reg;
    private Date fecha_ini;
    private Date fecha_fin;
*/
    @NotBlank(message = "El nombre del proyecto es obligatorio.")
    @Length(min=1, max=128, message = "La longitud maxima del nombre son 128 caracteres.")
    private String desc_pro;

    @NotNull(message = "El id de estado es obligatorio.")
    private int id_estado;

    @Length(max=500, message = "La longitud maxima de las observaciones son 500 caracteres.")
    private String observaciones;


}
