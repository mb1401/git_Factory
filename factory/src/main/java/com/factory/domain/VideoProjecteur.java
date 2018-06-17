package com.factory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A VideoProjecteur.
 */
@Entity
@DiscriminatorValue("video_projecteur")
public class VideoProjecteur extends Ressource implements Serializable {

    private static final long serialVersionUID = 1L;

   

    @OneToMany(mappedBy = "videoProjecteur")
    @JsonIgnore
    private Set<Module> modules = new HashSet<>();

   

    public Set<Module> getModules() {
        return modules;
    }

    public VideoProjecteur modules(Set<Module> modules) {
        this.modules = modules;
        return this;
    }

    public VideoProjecteur addModule(Module module) {
        this.modules.add(module);
        module.setVideoProjecteur(this);
        return this;
    }

    public VideoProjecteur removeModule(Module module) {
        this.modules.remove(module);
        module.setVideoProjecteur(null);
        return this;
    }

    public void setModules(Set<Module> modules) {
        this.modules = modules;
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
        VideoProjecteur videoProjecteur = (VideoProjecteur) o;
        if (videoProjecteur.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), videoProjecteur.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VideoProjecteur{" +
            "id=" + getId() +
            "}";
    }
}
