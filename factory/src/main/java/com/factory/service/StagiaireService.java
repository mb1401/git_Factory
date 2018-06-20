package com.factory.service;

import com.factory.service.dto.StagiaireDTO;
import java.util.List;

/**
 * Service Interface for managing Stagiaire.
 */
public interface StagiaireService {

    /**
     * Save a stagiaire.
     *
     * @param stagiaireDTO the entity to save
     * @return the persisted entity
     */
    StagiaireDTO save(StagiaireDTO stagiaireDTO);

    /**
     * Get all the stagiaires.
     *
     * @return the list of entities
     */
    List<StagiaireDTO> findAll();

    /**
     * Get the "id" stagiaire.
     *
     * @param id the id of the entity
     * @return the entity
     */
    StagiaireDTO findOne(Long id);

    /**
     * Delete the "id" stagiaire.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

	List<StagiaireDTO> findAllWithFormation(Long id);
}
