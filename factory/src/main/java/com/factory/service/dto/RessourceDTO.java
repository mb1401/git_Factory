package com.factory.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Ressource entity.
 */
public class RessourceDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 25)
    private String code;

    private Float cout;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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
            ", code='" + getCode() + "'" +
            ", cout=" + getCout() +
            "}";
    }
}
