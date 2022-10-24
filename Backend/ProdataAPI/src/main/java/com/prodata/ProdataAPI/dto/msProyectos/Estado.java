package com.prodata.ProdataAPI.dto.msProyectos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table("estado")

public class Estado {

    @Id
    private int id;

    @NotBlank(message = "El estado debe tener un nombre.")
    private String estado;



}
