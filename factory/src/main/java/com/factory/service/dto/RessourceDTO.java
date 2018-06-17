package com.factory.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Ressource entity.
 */
public class RessourceDTO implements Serializable {

    private Long id;

    private Float cout;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getCout() {
        return cout;
    }

    public void setCout(Float cout) {
        this.cout = cout;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RessourceDTO ressourceDTO = (RessourceDTO) o;
        if(ressourceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ressourceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RessourceDTO{" +
            "id=" + getId() +
            ", cout=" + getCout() +
            "}";
    }
}
