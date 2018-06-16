package com.testfactory.aplliweb.service.mapper;

import com.testfactory.aplliweb.domain.*;
import com.testfactory.aplliweb.service.dto.StagiaireDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Stagiaire and its DTO StagiaireDTO.
 */
@Mapper(componentModel = "spring", uses = {FormationMapper.class, OrdinateurMapper.class})
public interface StagiaireMapper extends EntityMapper<StagiaireDTO, Stagiaire> {

    @Mapping(source = "formation.id", target = "formationId")
    @Mapping(source = "ordinateur.id", target = "ordinateurId")
    StagiaireDTO toDto(Stagiaire stagiaire);

    @Mapping(source = "formationId", target = "formation")
    @Mapping(source = "ordinateurId", target = "ordinateur")
    Stagiaire toEntity(StagiaireDTO stagiaireDTO);

    default Stagiaire fromId(Long id) {
        if (id == null) {
            return null;
        }
        Stagiaire stagiaire = new Stagiaire();
        stagiaire.setId(id);
        return stagiaire;
    }
}
