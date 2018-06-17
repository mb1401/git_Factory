package com.factory.service.mapper;

import com.factory.domain.*;
import com.factory.service.dto.MatiereDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Matiere and its DTO MatiereDTO.
 */
@Mapper(componentModel = "spring", uses = {FormateurMapper.class})
public interface MatiereMapper extends EntityMapper<MatiereDTO, Matiere> {


    @Mapping(target = "modules", ignore = true)
    Matiere toEntity(MatiereDTO matiereDTO);

    default Matiere fromId(Long id) {
        if (id == null) {
            return null;
        }
        Matiere matiere = new Matiere();
        matiere.setId(id);
        return matiere;
    }
}
