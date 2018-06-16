package com.testfactory.aplliweb.service.impl;

import com.testfactory.aplliweb.service.StagiaireService;
import com.testfactory.aplliweb.domain.Stagiaire;
import com.testfactory.aplliweb.repository.StagiaireRepository;
import com.testfactory.aplliweb.service.dto.StagiaireDTO;
import com.testfactory.aplliweb.service.mapper.StagiaireMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Stagiaire.
 */
@Service
@Transactional
public class StagiaireServiceImpl implements StagiaireService {

    private final Logger log = LoggerFactory.getLogger(StagiaireServiceImpl.class);

    private final StagiaireRepository stagiaireRepository;

    private final StagiaireMapper stagiaireMapper;

    public StagiaireServiceImpl(StagiaireRepository stagiaireRepository, StagiaireMapper stagiaireMapper) {
        this.stagiaireRepository = stagiaireRepository;
        this.stagiaireMapper = stagiaireMapper;
    }

    /**
     * Save a stagiaire.
     *
     * @param stagiaireDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public StagiaireDTO save(StagiaireDTO stagiaireDTO) {
        log.debug("Request to save Stagiaire : {}", stagiaireDTO);
        Stagiaire stagiaire = stagiaireMapper.toEntity(stagiaireDTO);
        stagiaire = stagiaireRepository.save(stagiaire);
        return stagiaireMapper.toDto(stagiaire);
    }

    /**
     * Get all the stagiaires.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<StagiaireDTO> findAll() {
        log.debug("Request to get all Stagiaires");
        return stagiaireRepository.findAll().stream()
            .map(stagiaireMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one stagiaire by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public StagiaireDTO findOne(Long id) {
        log.debug("Request to get Stagiaire : {}", id);
        Stagiaire stagiaire = stagiaireRepository.findOne(id);
        return stagiaireMapper.toDto(stagiaire);
    }

    /**
     * Delete the stagiaire by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Stagiaire : {}", id);
        stagiaireRepository.delete(id);
    }
}
