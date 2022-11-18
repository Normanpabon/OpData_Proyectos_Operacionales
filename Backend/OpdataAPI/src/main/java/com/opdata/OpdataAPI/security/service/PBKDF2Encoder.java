package com.opdata.OpdataAPI.security.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;

// Componente encargado de hashear las claves y compararlas
// se puede agregar el salt desde application.properties

@Component
public class PBKDF2Encoder implements PasswordEncoder {

    @Value("${ProdataAPI.password.encoder.secret}")
    private String secret;

    @Value("${ProdataAPI.password.encoder.iteration}")
    private Integer iteration;

    @Value("${ProdataAPI.password.encoder.keylength}")
    private Integer keylength;



    @Override
    public String encode(CharSequence rawPassword) {

        // Encoder para la clave con sha512

        // Todo : Descomentar cuando se tenga los datos de prueba con el hash aplicado
        return rawPassword.toString();

        /*
        try {
            // Genera una instancia del algoritmo sha512 para codificar y usa de secreto la llave asignada en propiedades
            // retorna si es exitoso, la clave codificada a base64
            byte[] result = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512")
                    .generateSecret(new PBEKeySpec(rawPassword.toString().toCharArray(), secret.getBytes(), iteration, keylength))
                    .getEncoded();
            return Base64.getEncoder().encodeToString(result);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException ex) {
            throw new RuntimeException(ex);
        }*/
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return encode(rawPassword).equals(encodedPassword);
    }
}
