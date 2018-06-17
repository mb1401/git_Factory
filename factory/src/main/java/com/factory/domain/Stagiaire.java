package com.factory.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Stagiaire.
 */
@Entity
@DiscriminatorValue("stagiaire")
public class Stagiaire  extends Utilisateur implements Serializable {

    private static final long serialVersionUID = 1L;

  

    @ManyToOne
    private Formation formation;

    @ManyToOne
    private Ordinateur ordinateur;

  

    public Formation getFormation() {
        return formation;
    }

    public Stagiaire formation(Formation formation) {
        this.formation = formation;
        return this;
    }

    public void setFormation(Formation formation) {
        this.formation = formation;
    }

    public Ordinateur getOrdinateur() {
        return ordinateur;
    }

    public Stagiaire ordinateur(Ordinateur ordinateur) {
        this.ordinateur = ordinateur;
        return this;
    }

    public void setOrdinateur(Ordinateur ordinateur) {
        this.ordinateur = ordinateur;
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
        Stagiaire stagiaire = (Stagiaire) o;
        if (stagiaire.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stagiaire.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Stagiaire{" +
            "id=" + getId() +
            "}";
    }
}
