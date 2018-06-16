package com.testfactory.aplliweb.service.mapper;

import com.testfactory.aplliweb.domain.*;
import com.testfactory.aplliweb.service.dto.RessourceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Ressource and its DTO RessourceDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface RessourceMapper extends EntityMapper<RessourceDTO, Ressource> {



    default Ressource fromId(Long id) {
        if (id == null) {
            return null;
        }
        Ressource ressource = new Ressource();
        ressource.setId(id);
        return ressource;
    }
}
