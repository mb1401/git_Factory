package com.testfactory.aplliweb.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Matiere entity.
 */
public class MatiereDTO implements Serializable {

    private Long id;

    private String nom;

    private Set<FormateurDTO> formateurs = new HashSet<>();

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

    public Set<FormateurDTO> getFormateurs() {
        return formateurs;
    }

    public void setFormateurs(Set<FormateurDTO> formateurs) {
        this.formateurs = formateurs;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MatiereDTO matiereDTO = (MatiereDTO) o;
        if(matiereDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), matiereDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MatiereDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            "}";
    }
}
