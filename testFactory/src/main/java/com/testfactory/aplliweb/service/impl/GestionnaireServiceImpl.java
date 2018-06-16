package com.testfactory.aplliweb.service.impl;

import com.testfactory.aplliweb.service.GestionnaireService;
import com.testfactory.aplliweb.domain.Gestionnaire;
import com.testfactory.aplliweb.repository.GestionnaireRepository;
import com.testfactory.aplliweb.service.dto.GestionnaireDTO;
import com.testfactory.aplliweb.service.mapper.GestionnaireMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Gestionnaire.
 */
@Service
@Transactional
public class GestionnaireServiceImpl implements GestionnaireService {

    private final Logger log = LoggerFactory.getLogger(GestionnaireServiceImpl.class);

    private final GestionnaireRepository gestionnaireRepository;

    private final GestionnaireMapper gestionnaireMapper;

    public GestionnaireServiceImpl(GestionnaireRepository gestionnaireRepository, GestionnaireMapper gestionnaireMapper) {
        this.gestionnaireRepository = gestionnaireRepository;
        this.gestionnaireMapper = gestionnaireMapper;
    }

    /**
     * Save a gestionnaire.
     *
     * @param gestionnaireDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GestionnaireDTO save(GestionnaireDTO gestionnaireDTO) {
        log.debug("Request to save Gestionnaire : {}", gestionnaireDTO);
        Gestionnaire gestionnaire = gestionnaireMapper.toEntity(gestionnaireDTO);
        gestionnaire = gestionnaireRepository.save(gestionnaire);
        return gestionnaireMapper.toDto(gestionnaire);
    }

    /**
     * Get all the gestionnaires.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GestionnaireDTO> findAll() {
        log.debug("Request to get all Gestionnaires");
        return gestionnaireRepository.findAll().stream()
            .map(gestionnaireMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one gestionnaire by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public GestionnaireDTO findOne(Long id) {
        log.debug("Request to get Gestionnaire : {}", id);
        Gestionnaire gestionnaire = gestionnaireRepository.findOne(id);
        return gestionnaireMapper.toDto(gestionnaire);
    }

    /**
     * Delete the gestionnaire by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Gestionnaire : {}", id);
        gestionnaireRepository.delete(id);
    }
}
