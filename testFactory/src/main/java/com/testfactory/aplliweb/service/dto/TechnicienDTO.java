package com.testfactory.aplliweb.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Technicien entity.
 */
public class TechnicienDTO implements Serializable {

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

        TechnicienDTO technicienDTO = (TechnicienDTO) o;
        if(technicienDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), technicienDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TechnicienDTO{" +
            "id=" + getId() +
            "}";
    }
}
