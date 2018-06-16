package com.testfactory.aplliweb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.testfactory.aplliweb.domain.enumeration.Processeur;

/**
 * A Ordinateur.
 */
@Entity
@Table(name = "ordinateur")
public class Ordinateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "processeur")
    private Processeur processeur;

    @Column(name = "ram")
    private Integer ram;

    @Column(name = "quantite_dd")
    private Integer quantiteDD;

    @Column(name = "date_achat")
    private Instant dateAchat;

    @OneToMany(mappedBy = "ordinateur")
    @JsonIgnore
    private Set<Stagiaire> stagiaires = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Processeur getProcesseur() {
        return processeur;
    }

    public Ordinateur processeur(Processeur processeur) {
        this.processeur = processeur;
        return this;
    }

    public void setProcesseur(Processeur processeur) {
        this.processeur = processeur;
    }

    public Integer getRam() {
        return ram;
    }

    public Ordinateur ram(Integer ram) {
        this.ram = ram;
        return this;
    }

    public void setRam(Integer ram) {
        this.ram = ram;
    }

    public Integer getQuantiteDD() {
        return quantiteDD;
    }

    public Ordinateur quantiteDD(Integer quantiteDD) {
        this.quantiteDD = quantiteDD;
        return this;
    }

    public void setQuantiteDD(Integer quantiteDD) {
        this.quantiteDD = quantiteDD;
    }

    public Instant getDateAchat() {
        return dateAchat;
    }

    public Ordinateur dateAchat(Instant dateAchat) {
        this.dateAchat = dateAchat;
        return this;
    }

    public void setDateAchat(Instant dateAchat) {
        this.dateAchat = dateAchat;
    }

    public Set<Stagiaire> getStagiaires() {
        return stagiaires;
    }

    public Ordinateur stagiaires(Set<Stagiaire> stagiaires) {
        this.stagiaires = stagiaires;
        return this;
    }

    public Ordinateur addStagiaire(Stagiaire stagiaire) {
        this.stagiaires.add(stagiaire);
        stagiaire.setOrdinateur(this);
        return this;
    }

    public Ordinateur removeStagiaire(Stagiaire stagiaire) {
        this.stagiaires.remove(stagiaire);
        stagiaire.setOrdinateur(null);
        return this;
    }

    public void setStagiaires(Set<Stagiaire> stagiaires) {
        this.stagiaires = stagiaires;
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
        Ordinateur ordinateur = (Ordinateur) o;
        if (ordinateur.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ordinateur.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ordinateur{" +
            "id=" + getId() +
            ", processeur='" + getProcesseur() + "'" +
            ", ram=" + getRam() +
            ", quantiteDD=" + getQuantiteDD() +
            ", dateAchat='" + getDateAchat() + "'" +
            "}";
    }
}
