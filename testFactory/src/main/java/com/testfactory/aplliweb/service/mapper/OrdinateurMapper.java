package com.testfactory.aplliweb.service.mapper;

import com.testfactory.aplliweb.domain.*;
import com.testfactory.aplliweb.service.dto.OrdinateurDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Ordinateur and its DTO OrdinateurDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OrdinateurMapper extends EntityMapper<OrdinateurDTO, Ordinateur> {


    @Mapping(target = "stagiaires", ignore = true)
    Ordinateur toEntity(OrdinateurDTO ordinateurDTO);

    default Ordinateur fromId(Long id) {
        if (id == null) {
            return null;
        }
        Ordinateur ordinateur = new Ordinateur();
        ordinateur.setId(id);
        return ordinateur;
    }
}
