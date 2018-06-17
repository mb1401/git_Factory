package com.factory.service;

import com.factory.service.dto.MatiereDTO;
import java.util.List;

/**
 * Service Interface for managing Matiere.
 */
public interface MatiereService {

    /**
     * Save a matiere.
     *
     * @param matiereDTO the entity to save
     * @return the persisted entity
     */
    MatiereDTO save(MatiereDTO matiereDTO);

    /**
     * Get all the matieres.
     *
     * @return the list of entities
     */
    List<MatiereDTO> findAll();

    /**
     * Get the "id" matiere.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MatiereDTO findOne(Long id);

    /**
     * Delete the "id" matiere.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
