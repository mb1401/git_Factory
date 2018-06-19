package com.factory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Gestionnaire.
 */
@Entity
@Table(name = "gestionnaire")
public class Gestionnaire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 3, max = 25)
    @Column(name = "nom", length = 25, nullable = false)
    private String nom;

    @NotNull
    @Size(min = 3, max = 25)
    @Column(name = "prenom", length = 25, nullable = false)
    private String prenom;

    @Size(max = 25)
    @Column(name = "numero_rue", length = 25)
    private String numeroRue;

    @Size(max = 25)
    @Column(name = "code_postal", length = 25)
    private String codePostal;

    @Size(max = 25)
    @Column(name = "ville", length = 25)
    private String ville;

    @Size(max = 25)
    @Column(name = "pays", length = 25)
    private String pays;

    @Size(max = 25)
    @Column(name = "mail", length = 25)
    private String mail;

    @Size(max = 25)
    @Column(name = "numero_tel", length = 25)
    private String numeroTel;

    @Size(max = 25)
    @Column(name = "username", length = 25)
    private String username;

    @Size(max = 25)
    @Column(name = "jhi_password", length = 25)
    private String password;

    @Column(name = "jhi_enable")
    private Boolean enable;

    @OneToMany(mappedBy = "gestionnaire")
    @JsonIgnore
    private Set<Formation> formations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Gestionnaire nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Gestionnaire prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNumeroRue() {
        return numeroRue;
    }

    public Gestionnaire numeroRue(String numeroRue) {
        this.numeroRue = numeroRue;
        return this;
    }

    public void setNumeroRue(String numeroRue) {
        this.numeroRue = numeroRue;
    }

    public String getCodePostal() {
        return codePostal;
    }

    public Gestionnaire codePostal(String codePostal) {
        this.codePostal = codePostal;
        return this;
    }

    public void setCodePostal(String codePostal) {
        this.codePostal = codePostal;
    }

    public String getVille() {
        return ville;
    }

    public Gestionnaire ville(String ville) {
        this.ville = ville;
        return this;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getPays() {
        return pays;
    }

    public Gestionnaire pays(String pays) {
        this.pays = pays;
        return this;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public String getMail() {
        return mail;
    }

    public Gestionnaire mail(String mail) {
        this.mail = mail;
        return this;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getNumeroTel() {
        return numeroTel;
    }

    public Gestionnaire numeroTel(String numeroTel) {
        this.numeroTel = numeroTel;
        return this;
    }

    public void setNumeroTel(String numeroTel) {
        this.numeroTel = numeroTel;
    }

    public String getUsername() {
        return username;
    }

    public Gestionnaire username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public Gestionnaire password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean isEnable() {
        return enable;
    }

    public Gestionnaire enable(Boolean enable) {
        this.enable = enable;
        return this;
    }

    public void setEnable(Boolean enable) {
        this.enable = enable;
    }

    public Set<Formation> getFormations() {
        return formations;
    }

    public Gestionnaire formations(Set<Formation> formations) {
        this.formations = formations;
        return this;
    }

    public Gestionnaire addFormation(Formation formation) {
        this.formations.add(formation);
        formation.setGestionnaire(this);
        return this;
    }

    public Gestionnaire removeFormation(Formation formation) {
        this.formations.remove(formation);
        formation.setGestionnaire(null);
        return this;
    }

    public void setFormations(Set<Formation> formations) {
        this.formations = formations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Gestionnaire gestionnaire = (Gestionnaire) o;
        if (gestionnaire.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gestionnaire.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Gestionnaire{" +
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
