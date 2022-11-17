package com.opdata.OpdataAPI.security.JwtModel;

public enum Roles {
    ROLE_JefeUnidad, ROLE_Administrador, ROLE_NoAsignado

}

// @PreAuthorize("hasRole('Administrador')")

// @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
