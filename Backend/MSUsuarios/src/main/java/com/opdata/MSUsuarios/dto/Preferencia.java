package com.opdata.MSUsuarios.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.annotation.Id;

import javax.sql.DataSource;

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
