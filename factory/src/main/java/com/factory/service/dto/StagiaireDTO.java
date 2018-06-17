package com.factory.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Stagiaire entity.
 */
public class StagiaireDTO implements Serializable {

    private Long id;

    private Long formationId;

    private Long ordinateurId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFormationId() {
        return formationId;
    }

    public void setFormationId(Long formationId) {
        this.formationId = formationId;
    }

    public Long getOrdinateurId() {
        return ordinateurId;
    }

    public void setOrdinateurId(Long ordinateurId) {
        this.ordinateurId = ordinateurId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StagiaireDTO stagiaireDTO = (StagiaireDTO) o;
        if(stagiaireDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stagiaireDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StagiaireDTO{" +
            "id=" + getId() +
            "}";
    }
}
