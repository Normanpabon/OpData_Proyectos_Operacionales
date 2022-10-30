package com.prodata.ProdataAPI.security.JwtModel;

public enum Roles {
    JefeUnidad, Administrador, NoAsignado

}

// @PreAuthorize("hasRole('Administrador')")

// @PreAuthorize("hasRole('Administrador') or hasRole('JefeUnidad')")
