package com.testfactory.aplliweb.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.testfactory.aplliweb.domain.enumeration.Processeur;

/**
 * A DTO for the Ordinateur entity.
 */
public class OrdinateurDTO implements Serializable {

    private Long id;

    private Processeur processeur;

    private Integer ram;

    private Integer quantiteDD;

    private Instant dateAchat;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Processeur getProcesseur() {
        return processeur;
    }

    public void setProcesseur(Processeur processeur) {
        this.processeur = processeur;
    }

    public Integer getRam() {
        return ram;
    }

    public void setRam(Integer ram) {
        this.ram = ram;
    }

    public Integer getQuantiteDD() {
        return quantiteDD;
    }

    public void setQuantiteDD(Integer quantiteDD) {
        this.quantiteDD = quantiteDD;
    }

    public Instant getDateAchat() {
        return dateAchat;
    }

    public void setDateAchat(Instant dateAchat) {
        this.dateAchat = dateAchat;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrdinateurDTO ordinateurDTO = (OrdinateurDTO) o;
        if(ordinateurDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ordinateurDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrdinateurDTO{" +
            "id=" + getId() +
            ", processeur='" + getProcesseur() + "'" +
            ", ram=" + getRam() +
            ", quantiteDD=" + getQuantiteDD() +
            ", dateAchat='" + getDateAchat() + "'" +
            "}";
    }
}
