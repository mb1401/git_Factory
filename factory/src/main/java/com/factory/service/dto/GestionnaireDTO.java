package com.factory.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Gestionnaire entity.
 */
public class GestionnaireDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 25)
    private String nom;

    @NotNull
    @Size(min = 3, max = 25)
    private String prenom;

    @Size(max = 25)
    private String numeroRue;

    @Size(max = 25)
    private String codePostal;

    @Size(max = 25)
    private String ville;

    @Size(max = 25)
    private String pays;

    @Size(max = 25)
    private String mail;

    @Size(max = 25)
    private String numeroTel;

    @Size(max = 25)
    private String username;

    @Size(max = 25)
    private String password;

    private Boolean enable;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNumeroRue() {
        return numeroRue;
    }

    public void setNumeroRue(String numeroRue) {
        this.numeroRue = numeroRue;
    }

    public String getCodePostal() {
        return codePostal;
    }

    public void setCodePostal(String codePostal) {
        this.codePostal = codePostal;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getPays() {
        return pays;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getNumeroTel() {
        return numeroTel;
    }

    public void setNumeroTel(String numeroTel) {
        this.numeroTel = numeroTel;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean isEnable() {
        return enable;
    }

    public void setEnable(Boolean enable) {
        this.enable = enable;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GestionnaireDTO gestionnaireDTO = (GestionnaireDTO) o;
        if(gestionnaireDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gestionnaireDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GestionnaireDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", numeroRue='" + getNumeroRue() + "'" +
            ", codePostal='" + getCodePostal() + "'" +
            ", ville='" + getVille() + "'" +
            ", pays='" + getPays() + "'" +
            ", mail='" + getMail() + "'" +
            ", numeroTel='" + getNumeroTel() + "'" +
            ", username='" + getUsername() + "'" +
            ", password='" + getPassword() + "'" +
            ", enable='" + isEnable() + "'" +
            "}";
    }
}
