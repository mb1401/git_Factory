package com.factory.service;

import com.factory.service.dto.VideoProjecteurDTO;
import java.util.List;

/**
 * Service Interface for managing VideoProjecteur.
 */
public interface VideoProjecteurService {

    /**
     * Save a videoProjecteur.
     *
     * @param videoProjecteurDTO the entity to save
     * @return the persisted entity
     */
    VideoProjecteurDTO save(VideoProjecteurDTO videoProjecteurDTO);

    /**
     * Get all the videoProjecteurs.
     *
     * @return the list of entities
     */
    List<VideoProjecteurDTO> findAll();

    /**
     * Get the "id" videoProjecteur.
     *
     * @param id the id of the entity
     * @return the entity
     */
    VideoProjecteurDTO findOne(Long id);

    /**
     * Delete the "id" videoProjecteur.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
