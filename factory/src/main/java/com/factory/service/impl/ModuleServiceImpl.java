package com.factory.service.impl;

import com.factory.service.ModuleService;
import com.factory.domain.Module;
import com.factory.repository.ModuleRepository;
import com.factory.service.dto.ModuleDTO;
import com.factory.service.mapper.ModuleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Module.
 */
@Service
@Transactional
public class ModuleServiceImpl implements ModuleService {

    private final Logger log = LoggerFactory.getLogger(ModuleServiceImpl.class);

    private final ModuleRepository moduleRepository;

    private final ModuleMapper moduleMapper;

    public ModuleServiceImpl(ModuleRepository moduleRepository, ModuleMapper moduleMapper) {
        this.moduleRepository = moduleRepository;
        this.moduleMapper = moduleMapper;
    }

    /**
     * Save a module.
     *
     * @param moduleDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ModuleDTO save(ModuleDTO moduleDTO) {
        log.debug("Request to save Module : {}", moduleDTO);
        Module module = moduleMapper.toEntity(moduleDTO);
        module = moduleRepository.save(module);
        return moduleMapper.toDto(module);
    }

    /**
     * Get all the modules.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ModuleDTO> findAll() {
        log.debug("Request to get all Modules");
        return moduleRepository.findAll().stream()
            .map(moduleMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one module by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ModuleDTO findOne(Long id) {
        log.debug("Request to get Module : {}", id);
        Module module = moduleRepository.findOne(id);
        return moduleMapper.toDto(module);
    }

    /**
     * Delete the module by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Module : {}", id);
        moduleRepository.delete(id);
    }

	@Override
	public List<ModuleDTO> findAllWithFormation(Long id) {
		log.debug("Request to get Modules in a specific Formation");
        return moduleRepository.findAllWithFormation(id).stream()
                .map(moduleMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
	}
}
