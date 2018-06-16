package com.testfactory.aplliweb.service.mapper;

import com.testfactory.aplliweb.domain.*;
import com.testfactory.aplliweb.service.dto.SalleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Salle and its DTO SalleDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SalleMapper extends EntityMapper<SalleDTO, Salle> {


    @Mapping(target = "modules", ignore = true)
    Salle toEntity(SalleDTO salleDTO);

    default Salle fromId(Long id) {
        if (id == null) {
            return null;
        }
        Salle salle = new Salle();
        salle.setId(id);
        return salle;
    }
}
