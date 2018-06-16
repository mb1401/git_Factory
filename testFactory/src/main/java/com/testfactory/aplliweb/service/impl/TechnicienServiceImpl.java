package com.testfactory.aplliweb.service.impl;

import com.testfactory.aplliweb.service.TechnicienService;
import com.testfactory.aplliweb.domain.Technicien;
import com.testfactory.aplliweb.repository.TechnicienRepository;
import com.testfactory.aplliweb.service.dto.TechnicienDTO;
import com.testfactory.aplliweb.service.mapper.TechnicienMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Technicien.
 */
@Service
@Transactional
public class TechnicienServiceImpl implements TechnicienService {

    private final Logger log = LoggerFactory.getLogger(TechnicienServiceImpl.class);

    private final TechnicienRepository technicienRepository;

    private final TechnicienMapper technicienMapper;

    public TechnicienServiceImpl(TechnicienRepository technicienRepository, TechnicienMapper technicienMapper) {
        this.technicienRepository = technicienRepository;
        this.technicienMapper = technicienMapper;
    }

    /**
     * Save a technicien.
     *
     * @param technicienDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TechnicienDTO save(TechnicienDTO technicienDTO) {
        log.debug("Request to save Technicien : {}", technicienDTO);
        Technicien technicien = technicienMapper.toEntity(technicienDTO);
        technicien = technicienRepository.save(technicien);
        return technicienMapper.toDto(technicien);
    }

    /**
     * Get all the techniciens.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TechnicienDTO> findAll() {
        log.debug("Request to get all Techniciens");
        return technicienRepository.findAll().stream()
            .map(technicienMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one technicien by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TechnicienDTO findOne(Long id) {
        log.debug("Request to get Technicien : {}", id);
        Technicien technicien = technicienRepository.findOne(id);
        return technicienMapper.toDto(technicien);
    }

    /**
     * Delete the technicien by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Technicien : {}", id);
        technicienRepository.delete(id);
    }
}
