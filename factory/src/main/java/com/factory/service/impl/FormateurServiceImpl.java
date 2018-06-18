package com.factory.service.impl;

import com.factory.service.FormateurService;
import com.factory.domain.Formateur;
import com.factory.repository.FormateurRepository;
import com.factory.service.dto.FormateurDTO;
import com.factory.service.mapper.FormateurMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Formateur.
 */
@Service
@Transactional
public class FormateurServiceImpl implements FormateurService {

    private final Logger log = LoggerFactory.getLogger(FormateurServiceImpl.class);

    private final FormateurRepository formateurRepository;

    private final FormateurMapper formateurMapper;

    public FormateurServiceImpl(FormateurRepository formateurRepository, FormateurMapper formateurMapper) {
        this.formateurRepository = formateurRepository;
        this.formateurMapper = formateurMapper;
    }

    /**
     * Save a formateur.
     *
     * @param formateurDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FormateurDTO save(FormateurDTO formateurDTO) {
        log.debug("Request to save Formateur : {}", formateurDTO);
        Formateur formateur = formateurMapper.toEntity(formateurDTO);
        formateur = formateurRepository.save(formateur);
        return formateurMapper.toDto(formateur);
    }

    /**
     * Get all the formateurs.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FormateurDTO> findAll() {
        log.debug("Request to get all Formateurs");
        return formateurRepository.findAll().stream()
            .map(formateurMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one formateur by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public FormateurDTO findOne(Long id) {
        log.debug("Request to get Formateur : {}", id);
        Formateur formateur = formateurRepository.findOne(id);
        return formateurMapper.toDto(formateur);
    }

    /**
     * Delete the formateur by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Formateur : {}", id);
        formateurRepository.delete(id);
    }
}
