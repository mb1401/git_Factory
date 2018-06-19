package com.factory.service;

import com.factory.service.dto.RessourceDTO;
import java.util.List;

/**
 * Service Interface for managing Ressource.
 */
public interface RessourceService {

    /**
     * Save a ressource.
     *
     * @param ressourceDTO the entity to save
     * @return the persisted entity
     */
    RessourceDTO save(RessourceDTO ressourceDTO);

    /**
     * Get all the ressources.
     *
     * @return the list of entities
     */
    List<RessourceDTO> findAll();

    /**
     * Get the "id" ressource.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RessourceDTO findOne(Long id);

    /**
     * Delete the "id" ressource.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
