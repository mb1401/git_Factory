package com.testfactory.aplliweb.service;

import com.testfactory.aplliweb.service.dto.FormationDTO;
import java.util.List;

/**
 * Service Interface for managing Formation.
 */
public interface FormationService {

    /**
     * Save a formation.
     *
     * @param formationDTO the entity to save
     * @return the persisted entity
     */
    FormationDTO save(FormationDTO formationDTO);

    /**
     * Get all the formations.
     *
     * @return the list of entities
     */
    List<FormationDTO> findAll();

    /**
     * Get the "id" formation.
     *
     * @param id the id of the entity
     * @return the entity
     */
    FormationDTO findOne(Long id);

    /**
     * Delete the "id" formation.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
