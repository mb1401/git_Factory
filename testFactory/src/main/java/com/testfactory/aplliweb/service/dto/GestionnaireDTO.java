package com.testfactory.aplliweb.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Gestionnaire entity.
 */
public class GestionnaireDTO implements Serializable {

    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GestionnaireDTO gestionnaireDTO = (GestionnaireDTO) o;
        if(gestionnaireDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gestionnaireDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GestionnaireDTO{" +
            "id=" + getId() +
            "}";
    }
}
