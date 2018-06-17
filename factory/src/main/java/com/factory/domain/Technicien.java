package com.factory.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Technicien.
 */
@Entity
@DiscriminatorValue("technicien")
public class Technicien extends Utilisateur implements Serializable {

    private static final long serialVersionUID = 1L;

    

   
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Technicien technicien = (Technicien) o;
        if (technicien.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), technicien.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Technicien{" +
            "id=" + getId() +
            "}";
    }
}
