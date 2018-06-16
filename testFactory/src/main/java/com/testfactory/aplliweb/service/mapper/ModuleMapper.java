package com.testfactory.aplliweb.service.mapper;

import com.testfactory.aplliweb.domain.*;
import com.testfactory.aplliweb.service.dto.ModuleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Module and its DTO ModuleDTO.
 */
@Mapper(componentModel = "spring", uses = {FormationMapper.class, FormateurMapper.class, MatiereMapper.class, SalleMapper.class, VideoProjecteurMapper.class})
public interface ModuleMapper extends EntityMapper<ModuleDTO, Module> {

    @Mapping(source = "formation.id", target = "formationId")
    @Mapping(source = "formateur.id", target = "formateurId")
    @Mapping(source = "matiere.id", target = "matiereId")
    @Mapping(source = "salle.id", target = "salleId")
    @Mapping(source = "videoProjecteur.id", target = "videoProjecteurId")
    ModuleDTO toDto(Module module);

    @Mapping(source = "formationId", target = "formation")
    @Mapping(source = "formateurId", target = "formateur")
    @Mapping(source = "matiereId", target = "matiere")
    @Mapping(source = "salleId", target = "salle")
    @Mapping(source = "videoProjecteurId", target = "videoProjecteur")
    Module toEntity(ModuleDTO moduleDTO);

    default Module fromId(Long id) {
        if (id == null) {
            return null;
        }
        Module module = new Module();
        module.setId(id);
        return module;
    }
}
