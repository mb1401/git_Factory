package com.factory.service.impl;

import com.factory.service.VideoProjecteurService;
import com.factory.domain.VideoProjecteur;
import com.factory.repository.VideoProjecteurRepository;
import com.factory.service.dto.VideoProjecteurDTO;
import com.factory.service.mapper.VideoProjecteurMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing VideoProjecteur.
 */
@Service
@Transactional
public class VideoProjecteurServiceImpl implements VideoProjecteurService {

    private final Logger log = LoggerFactory.getLogger(VideoProjecteurServiceImpl.class);

    private final VideoProjecteurRepository videoProjecteurRepository;

    private final VideoProjecteurMapper videoProjecteurMapper;

    public VideoProjecteurServiceImpl(VideoProjecteurRepository videoProjecteurRepository, VideoProjecteurMapper videoProjecteurMapper) {
        this.videoProjecteurRepository = videoProjecteurRepository;
        this.videoProjecteurMapper = videoProjecteurMapper;
    }

    /**
     * Save a videoProjecteur.
     *
     * @param videoProjecteurDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public VideoProjecteurDTO save(VideoProjecteurDTO videoProjecteurDTO) {
        log.debug("Request to save VideoProjecteur : {}", videoProjecteurDTO);
        VideoProjecteur videoProjecteur = videoProjecteurMapper.toEntity(videoProjecteurDTO);
        videoProjecteur = videoProjecteurRepository.save(videoProjecteur);
        return videoProjecteurMapper.toDto(videoProjecteur);
    }

    /**
     * Get all the videoProjecteurs.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<VideoProjecteurDTO> findAll() {
        log.debug("Request to get all VideoProjecteurs");
        return videoProjecteurRepository.findAll().stream()
            .map(videoProjecteurMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one videoProjecteur by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public VideoProjecteurDTO findOne(Long id) {
        log.debug("Request to get VideoProjecteur : {}", id);
        VideoProjecteur videoProjecteur = videoProjecteurRepository.findOne(id);
        return videoProjecteurMapper.toDto(videoProjecteur);
    }

    /**
     * Delete the videoProjecteur by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete VideoProjecteur : {}", id);
        videoProjecteurRepository.delete(id);
    }
}
