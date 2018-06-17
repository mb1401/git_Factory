package com.factory.service.mapper;

import com.factory.domain.*;
import com.factory.service.dto.UtilisateurDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Utilisateur and its DTO UtilisateurDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface UtilisateurMapper extends EntityMapper<UtilisateurDTO, Utilisateur> {



    default Utilisateur fromId(Long id) {
        if (id == null) {
            return null;
        }
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(id);
        return utilisateur;
    }
}
