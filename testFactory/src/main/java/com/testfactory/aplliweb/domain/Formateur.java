package com.testfactory.aplliweb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Formateur.
 */
@Entity
@Table(name = "formateur")
public class Formateur extends Utilisateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToMany(mappedBy = "formateur")
    @JsonIgnore
    private Set<Module> modules = new HashSet<>();

    @ManyToMany(mappedBy = "formateurs")
    @JsonIgnore
    private Set<Formation> formations = new HashSet<>();

    @ManyToMany(mappedBy = "formateurs")
    @JsonIgnore
    private Set<Matiere> matieres = new HashSet<>();
    
    
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Module> getModules() {
        return modules;
    }

    public Formateur modules(Set<Module> modules) {
        this.modules = modules;
        return this;
    }

    public Formateur addModule(Module module) {
        this.modules.add(module);
        module.setFormateur(this);
        return this;
    }

    public Formateur removeModule(Module module) {
        this.modules.remove(module);
        module.setFormateur(null);
        return this;
    }

    public void setModules(Set<Module> modules) {
        this.modules = modules;
    }

    public Set<Formation> getFormations() {
        return formations;
    }

    public Formateur formations(Set<Formation> formations) {
        this.formations = formations;
        return this;
    }

    public Formateur addFormation(Formation formation) {
        this.formations.add(formation);
        formation.getFormateurs().add(this);
        return this;
    }

    public Formateur removeFormation(Formation formation) {
        this.formations.remove(formation);
        formation.getFormateurs().remove(this);
        return this;
    }

    public void setFormations(Set<Formation> formations) {
        this.formations = formations;
    }

    public Set<Matiere> getMatieres() {
        return matieres;
    }

    public Formateur matieres(Set<Matiere> matieres) {
        this.matieres = matieres;
        return this;
    }

    public Formateur addMatiere(Matiere matiere) {
        this.matieres.add(matiere);
        matiere.getFormateurs().add(this);
        return this;
    }

    public Formateur removeMatiere(Matiere matiere) {
        this.matieres.remove(matiere);
        matiere.getFormateurs().remove(this);
        return this;
    }

    public void setMatieres(Set<Matiere> matieres) {
        this.matieres = matieres;
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
        Formateur formateur = (Formateur) o;
        if (formateur.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), formateur.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Formateur{" +
            "id=" + getId() +
            "}";
    }
}
