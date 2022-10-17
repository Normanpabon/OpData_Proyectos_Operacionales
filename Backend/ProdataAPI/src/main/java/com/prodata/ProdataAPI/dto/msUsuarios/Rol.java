package com.prodata.ProdataAPI.dto.msUsuarios;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Rol {

    @Id
    private int id;

    private String rol;
}
