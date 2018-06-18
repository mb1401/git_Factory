package com.factory.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Salle entity.
 */
public class SalleDTO implements Serializable {

    private Long id;

    private Float cout;

    private Integer capacite;

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

    public Integer getCapacite() {
        return capacite;
    }

    public void setCapacite(Integer capacite) {
        this.capacite = capacite;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SalleDTO salleDTO = (SalleDTO) o;
        if(salleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SalleDTO{" +
            "id=" + getId() +
            ", cout=" + getCout() +
            ", capacite=" + getCapacite() +
            "}";
    }
}
