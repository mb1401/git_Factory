package com.testfactory.aplliweb.service.mapper;

import com.testfactory.aplliweb.domain.*;
import com.testfactory.aplliweb.service.dto.FormateurDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Formateur and its DTO FormateurDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FormateurMapper extends EntityMapper<FormateurDTO, Formateur> {


    @Mapping(target = "modules", ignore = true)
    @Mapping(target = "formations", ignore = true)
    @Mapping(target = "matieres", ignore = true)
    Formateur toEntity(FormateurDTO formateurDTO);

    default Formateur fromId(Long id) {
        if (id == null) {
            return null;
        }
        Formateur formateur = new Formateur();
        formateur.setId(id);
        return formateur;
    }
}
