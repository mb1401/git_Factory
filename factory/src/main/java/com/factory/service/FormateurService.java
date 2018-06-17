package com.factory.service;

import com.factory.service.dto.FormateurDTO;
import java.util.List;

/**
 * Service Interface for managing Formateur.
 */
public interface FormateurService {

    /**
     * Save a formateur.
     *
     * @param formateurDTO the entity to save
     * @return the persisted entity
     */
    FormateurDTO save(FormateurDTO formateurDTO);

    /**
     * Get all the formateurs.
     *
     * @return the list of entities
     */
    List<FormateurDTO> findAll();

    /**
     * Get the "id" formateur.
     *
     * @param id the id of the entity
     * @return the entity
     */
    FormateurDTO findOne(Long id);

    /**
     * Delete the "id" formateur.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
