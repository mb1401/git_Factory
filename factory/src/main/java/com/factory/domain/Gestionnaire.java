package com.factory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Gestionnaire.
 */
@Entity
@DiscriminatorValue("gestionnaire")
public class Gestionnaire  extends Utilisateur implements Serializable {

    private static final long serialVersionUID = 1L;

   

    @OneToMany(mappedBy = "gestionnaire")
    @JsonIgnore
    private Set<Formation> formations = new HashSet<>();

    

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
            "}";
    }
}
