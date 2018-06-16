package com.testfactory.aplliweb.service;

import com.testfactory.aplliweb.service.dto.GestionnaireDTO;
import java.util.List;

/**
 * Service Interface for managing Gestionnaire.
 */
public interface GestionnaireService {

    /**
     * Save a gestionnaire.
     *
     * @param gestionnaireDTO the entity to save
     * @return the persisted entity
     */
    GestionnaireDTO save(GestionnaireDTO gestionnaireDTO);

    /**
     * Get all the gestionnaires.
     *
     * @return the list of entities
     */
    List<GestionnaireDTO> findAll();

    /**
     * Get the "id" gestionnaire.
     *
     * @param id the id of the entity
     * @return the entity
     */
    GestionnaireDTO findOne(Long id);

    /**
     * Delete the "id" gestionnaire.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
