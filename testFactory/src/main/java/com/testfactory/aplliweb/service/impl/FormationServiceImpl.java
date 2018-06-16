package com.testfactory.aplliweb.service.impl;

import com.testfactory.aplliweb.service.FormationService;
import com.testfactory.aplliweb.domain.Formation;
import com.testfactory.aplliweb.repository.FormationRepository;
import com.testfactory.aplliweb.service.dto.FormationDTO;
import com.testfactory.aplliweb.service.mapper.FormationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Formation.
 */
@Service
@Transactional
public class FormationServiceImpl implements FormationService {

    private final Logger log = LoggerFactory.getLogger(FormationServiceImpl.class);

    private final FormationRepository formationRepository;

    private final FormationMapper formationMapper;

    public FormationServiceImpl(FormationRepository formationRepository, FormationMapper formationMapper) {
        this.formationRepository = formationRepository;
        this.formationMapper = formationMapper;
    }

    /**
     * Save a formation.
     *
     * @param formationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FormationDTO save(FormationDTO formationDTO) {
        log.debug("Request to save Formation : {}", formationDTO);
        Formation formation = formationMapper.toEntity(formationDTO);
        formation = formationRepository.save(formation);
        return formationMapper.toDto(formation);
    }

    /**
     * Get all the formations.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FormationDTO> findAll() {
        log.debug("Request to get all Formations");
        return formationRepository.findAllWithEagerRelationships().stream()
            .map(formationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one formation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public FormationDTO findOne(Long id) {
        log.debug("Request to get Formation : {}", id);
        Formation formation = formationRepository.findOneWithEagerRelationships(id);
        return formationMapper.toDto(formation);
    }

    /**
     * Delete the formation by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Formation : {}", id);
        formationRepository.delete(id);
    }
}
