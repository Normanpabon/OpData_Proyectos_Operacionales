package com.opdata.OpdataAPI.security;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@SecurityScheme(
        name = "Jwt Authentication",
        type = SecuritySchemeType.APIKEY,
        bearerFormat = "Opdata "

)


public class OpenAPI3Config {
}
