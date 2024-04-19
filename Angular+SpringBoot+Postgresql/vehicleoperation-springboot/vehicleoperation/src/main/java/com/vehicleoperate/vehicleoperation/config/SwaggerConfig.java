package com.vehicleoperate.vehicleoperation.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
    info = @Info(
        title = "Vehicle Management API",
        description = "This API is for managing vehicle information.",
        version = "1.0",
        termsOfService = "Terms and Conditions Applied",
        contact = @Contact(
            name = "Jackson",
            email = "jack@gmail.com"
        ),
        license = @License(
            name = "My License"
        )
    ),
    servers = {
        @Server(
            description = "Test Environment",
            url = "http://localhost:8080"
        ),
        @Server(
            description = "Development Environment",
            url = "http://localhost:8080"
        )
    },
    security = @SecurityRequirement(name = "autoSecurity")
)
@SecurityScheme(
    name = "autoSecurity",
    in = SecuritySchemeIn.HEADER,
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    scheme = "bearer",
    description = "Bearer Token Authentication"
)
public class SwaggerConfig {

}
