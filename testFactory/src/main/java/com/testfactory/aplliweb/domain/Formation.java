package com.testfactory.aplliweb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Formation.
 */
@Entity
@Table(name = "formation")
public class Formation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date_debut")
    private Instant dateDebut;

    @Column(name = "date_fin")
    private Instant dateFin;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "formation")
    @JsonIgnore
    private Set<Stagiaire> stagiaires = new HashSet<>();

    @OneToMany(mappedBy = "formation")
    @JsonIgnore
    private Set<Module> modules = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "formation_formateur",
               joinColumns = @JoinColumn(name="formations_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="formateurs_id", referencedColumnName="id"))
    private Set<Formateur> formateurs = new HashSet<>();

    @ManyToOne
    private Gestionnaire gestionnaire;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateDebut() {
        return dateDebut;
    }

    public Formation dateDebut(Instant dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(Instant dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Instant getDateFin() {
        return dateFin;
    }

    public Formation dateFin(Instant dateFin) {
        this.dateFin = dateFin;
        return this;
    }

    public void setDateFin(Instant dateFin) {
        this.dateFin = dateFin;
    }

    public String getDescription() {
        return description;
    }

    public Formation description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Stagiaire> getStagiaires() {
        return stagiaires;
    }

    public Formation stagiaires(Set<Stagiaire> stagiaires) {
        this.stagiaires = stagiaires;
        return this;
    }

    public Formation addStagiaire(Stagiaire stagiaire) {
        this.stagiaires.add(stagiaire);
        stagiaire.setFormation(this);
        return this;
    }

    public Formation removeStagiaire(Stagiaire stagiaire) {
        this.stagiaires.remove(stagiaire);
        stagiaire.setFormation(null);
        return this;
    }

    public void setStagiaires(Set<Stagiaire> stagiaires) {
        this.stagiaires = stagiaires;
    }

    public Set<Module> getModules() {
        return modules;
    }

    public Formation modules(Set<Module> modules) {
        this.modules = modules;
        return this;
    }

    public Formation addModule(Module module) {
        this.modules.add(module);
        module.setFormation(this);
        return this;
    }

    public Formation removeModule(Module module) {
        this.modules.remove(module);
        module.setFormation(null);
        return this;
    }

    public void setModules(Set<Module> modules) {
        this.modules = modules;
    }

    public Set<Formateur> getFormateurs() {
        return formateurs;
    }

    public Formation formateurs(Set<Formateur> formateurs) {
        this.formateurs = formateurs;
        return this;
    }

    public Formation addFormateur(Formateur formateur) {
        this.formateurs.add(formateur);
        formateur.getFormations().add(this);
        return this;
    }

    public Formation removeFormateur(Formateur formateur) {
        this.formateurs.remove(formateur);
        formateur.getFormations().remove(this);
        return this;
    }

    public void setFormateurs(Set<Formateur> formateurs) {
        this.formateurs = formateurs;
    }

    public Gestionnaire getGestionnaire() {
        return gestionnaire;
    }

    public Formation gestionnaire(Gestionnaire gestionnaire) {
        this.gestionnaire = gestionnaire;
        return this;
    }

    public void setGestionnaire(Gestionnaire gestionnaire) {
        this.gestionnaire = gestionnaire;
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
        Formation formation = (Formation) o;
        if (formation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), formation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Formation{" +
            "id=" + getId() +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
