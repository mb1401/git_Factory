package com.factory.service;

import com.factory.service.dto.UtilisateurDTO;
import java.util.List;

/**
 * Service Interface for managing Utilisateur.
 */
public interface UtilisateurService {

    /**
     * Save a utilisateur.
     *
     * @param utilisateurDTO the entity to save
     * @return the persisted entity
     */
    UtilisateurDTO save(UtilisateurDTO utilisateurDTO);

    /**
     * Get all the utilisateurs.
     *
     * @return the list of entities
     */
    List<UtilisateurDTO> findAll();

    /**
     * Get the "id" utilisateur.
     *
     * @param id the id of the entity
     * @return the entity
     */
    UtilisateurDTO findOne(Long id);

    /**
     * Delete the "id" utilisateur.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
