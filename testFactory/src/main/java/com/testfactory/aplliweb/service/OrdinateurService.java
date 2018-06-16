package com.testfactory.aplliweb.service;

import com.testfactory.aplliweb.service.dto.OrdinateurDTO;
import java.util.List;

/**
 * Service Interface for managing Ordinateur.
 */
public interface OrdinateurService {

    /**
     * Save a ordinateur.
     *
     * @param ordinateurDTO the entity to save
     * @return the persisted entity
     */
    OrdinateurDTO save(OrdinateurDTO ordinateurDTO);

    /**
     * Get all the ordinateurs.
     *
     * @return the list of entities
     */
    List<OrdinateurDTO> findAll();

    /**
     * Get the "id" ordinateur.
     *
     * @param id the id of the entity
     * @return the entity
     */
    OrdinateurDTO findOne(Long id);

    /**
     * Delete the "id" ordinateur.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
