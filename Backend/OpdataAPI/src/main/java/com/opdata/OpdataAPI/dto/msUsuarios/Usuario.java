package com.opdata.OpdataAPI.dto.msUsuarios;


import com.opdata.OpdataAPI.services.UsuariosServiceClient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Usuario implements UserDetails {

    private UsuariosServiceClient usuariosServiceClient;

    @Id
    private int id;

    private int cod_ins;

    private String nombre;

    private String apellido;

    private String username;

    private String correo;

    private String rol;

    private String hashed_pass;

    private Boolean habilitado;

    public String getRol(){
        return rol;
    }

    @Override
    public List<? extends GrantedAuthority> getAuthorities() {


        // Llama al servicio de usuario y recupera el rol asignado al usuario buscando por le id
        return new ArrayList<>(Arrays.asList(new SimpleGrantedAuthority((rol))));
    }

    @Override
    public String getPassword() {
        return hashed_pass;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return this.habilitado;
    }
}
