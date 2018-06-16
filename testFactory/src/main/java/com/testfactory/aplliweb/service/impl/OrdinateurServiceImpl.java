package com.testfactory.aplliweb.service.impl;

import com.testfactory.aplliweb.service.OrdinateurService;
import com.testfactory.aplliweb.domain.Ordinateur;
import com.testfactory.aplliweb.repository.OrdinateurRepository;
import com.testfactory.aplliweb.service.dto.OrdinateurDTO;
import com.testfactory.aplliweb.service.mapper.OrdinateurMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Ordinateur.
 */
@Service
@Transactional
public class OrdinateurServiceImpl implements OrdinateurService {

    private final Logger log = LoggerFactory.getLogger(OrdinateurServiceImpl.class);

    private final OrdinateurRepository ordinateurRepository;

    private final OrdinateurMapper ordinateurMapper;

    public OrdinateurServiceImpl(OrdinateurRepository ordinateurRepository, OrdinateurMapper ordinateurMapper) {
        this.ordinateurRepository = ordinateurRepository;
        this.ordinateurMapper = ordinateurMapper;
    }

    /**
     * Save a ordinateur.
     *
     * @param ordinateurDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrdinateurDTO save(OrdinateurDTO ordinateurDTO) {
        log.debug("Request to save Ordinateur : {}", ordinateurDTO);
        Ordinateur ordinateur = ordinateurMapper.toEntity(ordinateurDTO);
        ordinateur = ordinateurRepository.save(ordinateur);
        return ordinateurMapper.toDto(ordinateur);
    }

    /**
     * Get all the ordinateurs.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<OrdinateurDTO> findAll() {
        log.debug("Request to get all Ordinateurs");
        return ordinateurRepository.findAll().stream()
            .map(ordinateurMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one ordinateur by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OrdinateurDTO findOne(Long id) {
        log.debug("Request to get Ordinateur : {}", id);
        Ordinateur ordinateur = ordinateurRepository.findOne(id);
        return ordinateurMapper.toDto(ordinateur);
    }

    /**
     * Delete the ordinateur by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Ordinateur : {}", id);
        ordinateurRepository.delete(id);
    }
}
