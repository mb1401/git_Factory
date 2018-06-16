package com.testfactory.aplliweb.service.mapper;

import com.testfactory.aplliweb.domain.*;
import com.testfactory.aplliweb.service.dto.GestionnaireDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Gestionnaire and its DTO GestionnaireDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GestionnaireMapper extends EntityMapper<GestionnaireDTO, Gestionnaire> {


    @Mapping(target = "formations", ignore = true)
    Gestionnaire toEntity(GestionnaireDTO gestionnaireDTO);

    default Gestionnaire fromId(Long id) {
        if (id == null) {
            return null;
        }
        Gestionnaire gestionnaire = new Gestionnaire();
        gestionnaire.setId(id);
        return gestionnaire;
    }
}
