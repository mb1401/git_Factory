package com.factory.service.mapper;

import com.factory.domain.*;
import com.factory.service.dto.TechnicienDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Technicien and its DTO TechnicienDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TechnicienMapper extends EntityMapper<TechnicienDTO, Technicien> {



    default Technicien fromId(Long id) {
        if (id == null) {
            return null;
        }
        Technicien technicien = new Technicien();
        technicien.setId(id);
        return technicien;
    }
}
