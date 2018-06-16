package com.testfactory.aplliweb.service;

import com.testfactory.aplliweb.service.dto.TechnicienDTO;
import java.util.List;

/**
 * Service Interface for managing Technicien.
 */
public interface TechnicienService {

    /**
     * Save a technicien.
     *
     * @param technicienDTO the entity to save
     * @return the persisted entity
     */
    TechnicienDTO save(TechnicienDTO technicienDTO);

    /**
     * Get all the techniciens.
     *
     * @return the list of entities
     */
    List<TechnicienDTO> findAll();

    /**
     * Get the "id" technicien.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TechnicienDTO findOne(Long id);

    /**
     * Delete the "id" technicien.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
