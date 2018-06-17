package com.factory.service.impl;

import com.factory.service.MatiereService;
import com.factory.domain.Matiere;
import com.factory.repository.MatiereRepository;
import com.factory.service.dto.MatiereDTO;
import com.factory.service.mapper.MatiereMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Matiere.
 */
@Service
@Transactional
public class MatiereServiceImpl implements MatiereService {

    private final Logger log = LoggerFactory.getLogger(MatiereServiceImpl.class);

    private final MatiereRepository matiereRepository;

    private final MatiereMapper matiereMapper;

    public MatiereServiceImpl(MatiereRepository matiereRepository, MatiereMapper matiereMapper) {
        this.matiereRepository = matiereRepository;
        this.matiereMapper = matiereMapper;
    }

    /**
     * Save a matiere.
     *
     * @param matiereDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MatiereDTO save(MatiereDTO matiereDTO) {
        log.debug("Request to save Matiere : {}", matiereDTO);
        Matiere matiere = matiereMapper.toEntity(matiereDTO);
        matiere = matiereRepository.save(matiere);
        return matiereMapper.toDto(matiere);
    }

    /**
     * Get all the matieres.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MatiereDTO> findAll() {
        log.debug("Request to get all Matieres");
        return matiereRepository.findAllWithEagerRelationships().stream()
            .map(matiereMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one matiere by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MatiereDTO findOne(Long id) {
        log.debug("Request to get Matiere : {}", id);
        Matiere matiere = matiereRepository.findOneWithEagerRelationships(id);
        return matiereMapper.toDto(matiere);
    }

    /**
     * Delete the matiere by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Matiere : {}", id);
        matiereRepository.delete(id);
    }
}
