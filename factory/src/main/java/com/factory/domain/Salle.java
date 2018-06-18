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
@Table(name = "salle")
public class Salle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cout")
    private Float cout;

    @Column(name = "capacite")
    private Integer capacite;

    @OneToMany(mappedBy = "salle")
    @JsonIgnore
    private Set<Module> modules = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getCout() {
        return cout;
    }

    public Salle cout(Float cout) {
        this.cout = cout;
        return this;
    }

    public void setCout(Float cout) {
        this.cout = cout;
    }

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
            ", cout=" + getCout() +
            ", capacite=" + getCapacite() +
            "}";
    }
}
