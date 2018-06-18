package com.factory.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.factory.domain.enumeration.Niveau;

/**
 * A Module.
 */
@Entity
@Table(name = "module")
public class Module implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "titre")
    private String titre;

    @Column(name = "contenu")
    private String contenu;

    @Column(name = "objectif")
    private String objectif;

    @Enumerated(EnumType.STRING)
    @Column(name = "niveau")
    private Niveau niveau;

    @Column(name = "date_debut")
    private LocalDate dateDebut;

    @Column(name = "date_fin")
    private LocalDate dateFin;

    @ManyToOne
    private Formation formation;

    @ManyToOne
    private Formateur formateur;

    @ManyToOne
    private Matiere matiere;

    @ManyToOne
    private Salle salle;

    @ManyToOne
    private VideoProjecteur videoProjecteur;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public Module titre(String titre) {
        this.titre = titre;
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getContenu() {
        return contenu;
    }

    public Module contenu(String contenu) {
        this.contenu = contenu;
        return this;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public String getObjectif() {
        return objectif;
    }

    public Module objectif(String objectif) {
        this.objectif = objectif;
        return this;
    }

    public void setObjectif(String objectif) {
        this.objectif = objectif;
    }

    public Niveau getNiveau() {
        return niveau;
    }

    public Module niveau(Niveau niveau) {
        this.niveau = niveau;
        return this;
    }

    public void setNiveau(Niveau niveau) {
        this.niveau = niveau;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public Module dateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public Module dateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
        return this;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public Formation getFormation() {
        return formation;
    }

    public Module formation(Formation formation) {
        this.formation = formation;
        return this;
    }

    public void setFormation(Formation formation) {
        this.formation = formation;
    }

    public Formateur getFormateur() {
        return formateur;
    }

    public Module formateur(Formateur formateur) {
        this.formateur = formateur;
        return this;
    }

    public void setFormateur(Formateur formateur) {
        this.formateur = formateur;
    }

    public Matiere getMatiere() {
        return matiere;
    }

    public Module matiere(Matiere matiere) {
        this.matiere = matiere;
        return this;
    }

    public void setMatiere(Matiere matiere) {
        this.matiere = matiere;
    }

    public Salle getSalle() {
        return salle;
    }

    public Module salle(Salle salle) {
        this.salle = salle;
        return this;
    }

    public void setSalle(Salle salle) {
        this.salle = salle;
    }

    public VideoProjecteur getVideoProjecteur() {
        return videoProjecteur;
    }

    public Module videoProjecteur(VideoProjecteur videoProjecteur) {
        this.videoProjecteur = videoProjecteur;
        return this;
    }

    public void setVideoProjecteur(VideoProjecteur videoProjecteur) {
        this.videoProjecteur = videoProjecteur;
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
        Module module = (Module) o;
        if (module.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), module.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Module{" +
            "id=" + getId() +
            ", titre='" + getTitre() + "'" +
            ", contenu='" + getContenu() + "'" +
            ", objectif='" + getObjectif() + "'" +
            ", niveau='" + getNiveau() + "'" +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            "}";
    }
}
