package com.factory.service.mapper;

import com.factory.domain.*;
import com.factory.service.dto.FormationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Formation and its DTO FormationDTO.
 */
@Mapper(componentModel = "spring", uses = {FormateurMapper.class, GestionnaireMapper.class})
public interface FormationMapper extends EntityMapper<FormationDTO, Formation> {

    @Mapping(source = "formateur.id", target = "formateurId")
    @Mapping(source = "gestionnaire.id", target = "gestionnaireId")
    FormationDTO toDto(Formation formation);

    @Mapping(target = "stagiaires", ignore = true)
    @Mapping(target = "modules", ignore = true)
    @Mapping(source = "formateurId", target = "formateur")
    @Mapping(source = "gestionnaireId", target = "gestionnaire")
    Formation toEntity(FormationDTO formationDTO);

    default Formation fromId(Long id) {
        if (id == null) {
            return null;
        }
        Formation formation = new Formation();
        formation.setId(id);
        return formation;
    }
}
