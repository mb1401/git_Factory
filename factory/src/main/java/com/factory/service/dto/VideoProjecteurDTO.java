package com.factory.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the VideoProjecteur entity.
 */
public class VideoProjecteurDTO implements Serializable {

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

        VideoProjecteurDTO videoProjecteurDTO = (VideoProjecteurDTO) o;
        if(videoProjecteurDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), videoProjecteurDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VideoProjecteurDTO{" +
            "id=" + getId() +
            "}";
    }
}
