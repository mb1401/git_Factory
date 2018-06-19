package com.factory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A VideoProjecteur.
 */
@Entity
@Table(name = "video_projecteur")
public class VideoProjecteur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 3, max = 25)
    @Column(name = "code", length = 25, nullable = false)
    private String code;

    @NotNull
    @Column(name = "cout", nullable = false)
    private Float cout;

    @OneToMany(mappedBy = "videoProjecteur")
    @JsonIgnore
    private Set<Module> modules = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public VideoProjecteur code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Float getCout() {
        return cout;
    }

    public VideoProjecteur cout(Float cout) {
        this.cout = cout;
        return this;
    }

    public void setCout(Float cout) {
        this.cout = cout;
    }

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
            ", code='" + getCode() + "'" +
            ", cout=" + getCout() +
            "}";
    }
}
