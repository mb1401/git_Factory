package com.factory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Salle.
 */
@Entity
@DiscriminatorValue("salle")
public class Salle extends Ressource implements Serializable {

    private static final long serialVersionUID = 1L;

   

    @Column(name = "capacite")
    private Integer capacite;

    @OneToMany(mappedBy = "salle")
    @JsonIgnore
    private Set<Module> modules = new HashSet<>();

  
    public Integer getCapacite() {
        return capacite;
    }

    public Salle capacite(Integer capacite) {
        this.capacite = capacite;
        return this;
    }

    public void setCapacite(Integer capacite) {
        this.capacite = capacite;
    }

    public Set<Module> getModules() {
        return modules;
    }

    public Salle modules(Set<Module> modules) {
        this.modules = modules;
        return this;
    }

    public Salle addModule(Module module) {
        this.modules.add(module);
        module.setSalle(this);
        return this;
    }

    public Salle removeModule(Module module) {
        this.modules.remove(module);
        module.setSalle(null);
        return this;
    }

    public void setModules(Set<Module> modules) {
        this.modules = modules;
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
        Salle salle = (Salle) o;
        if (salle.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Salle{" +
            "id=" + getId() +
            ", capacite=" + getCapacite() +
            "}";
    }
}
