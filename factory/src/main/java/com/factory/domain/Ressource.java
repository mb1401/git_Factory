package com.factory.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Ressource.
 */
@Entity
@Table(name = "ressource")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING, length = 20)
public class Ressource implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cout")
    private Float cout;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getCout() {
        return cout;
    }

    public Ressource cout(Float cout) {
        this.cout = cout;
        return this;
    }

    public void setCout(Float cout) {
        this.cout = cout;
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
        Ressource ressource = (Ressource) o;
        if (ressource.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ressource.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ressource{" +
            "id=" + getId() +
            ", cout=" + getCout() +
            "}";
    }
}
