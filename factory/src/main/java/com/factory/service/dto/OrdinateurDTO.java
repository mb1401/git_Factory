package com.factory.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.factory.domain.enumeration.Processeur;

/**
 * A DTO for the Ordinateur entity.
 */
public class OrdinateurDTO implements Serializable {

    private Long id;

    private Float cout;

    private Processeur processeur;

    private Integer ram;

    private Integer quantiteDD;

    private LocalDate dateAchat;

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

    public LocalDate getDateAchat() {
        return dateAchat;
    }

    public void setDateAchat(LocalDate dateAchat) {
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
            ", cout=" + getCout() +
            ", processeur='" + getProcesseur() + "'" +
            ", ram=" + getRam() +
            ", quantiteDD=" + getQuantiteDD() +
            ", dateAchat='" + getDateAchat() + "'" +
            "}";
    }
}
