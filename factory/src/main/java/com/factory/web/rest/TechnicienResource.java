package com.factory.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.factory.service.TechnicienService;
import com.factory.web.rest.errors.BadRequestAlertException;
import com.factory.web.rest.util.HeaderUtil;
import com.factory.service.dto.TechnicienDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Technicien.
 */
@RestController
@RequestMapping("/api")
public class TechnicienResource {

    private final Logger log = LoggerFactory.getLogger(TechnicienResource.class);

    private static final String ENTITY_NAME = "technicien";

    private final TechnicienService technicienService;

    public TechnicienResource(TechnicienService technicienService) {
        this.technicienService = technicienService;
    }

    /**
     * POST  /techniciens : Create a new technicien.
     *
     * @param technicienDTO the technicienDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new technicienDTO, or with status 400 (Bad Request) if the technicien has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/techniciens")
    @Timed
    public ResponseEntity<TechnicienDTO> createTechnicien(@Valid @RequestBody TechnicienDTO technicienDTO) throws URISyntaxException {
        log.debug("REST request to save Technicien : {}", technicienDTO);
        if (technicienDTO.getId() != null) {
            throw new BadRequestAlertException("A new technicien cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TechnicienDTO result = technicienService.save(technicienDTO);
        return ResponseEntity.created(new URI("/api/techniciens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /techniciens : Updates an existing technicien.
     *
     * @param technicienDTO the technicienDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated technicienDTO,
     * or with status 400 (Bad Request) if the technicienDTO is not valid,
     * or with status 500 (Internal Server Error) if the technicienDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/techniciens")
    @Timed
    public ResponseEntity<TechnicienDTO> updateTechnicien(@Valid @RequestBody TechnicienDTO technicienDTO) throws URISyntaxException {
        log.debug("REST request to update Technicien : {}", technicienDTO);
        if (technicienDTO.getId() == null) {
            return createTechnicien(technicienDTO);
        }
        TechnicienDTO result = technicienService.save(technicienDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, technicienDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /techniciens : get all the techniciens.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of techniciens in body
     */
    @GetMapping("/techniciens")
    @Timed
    public List<TechnicienDTO> getAllTechniciens() {
        log.debug("REST request to get all Techniciens");
        return technicienService.findAll();
        }

    /**
     * GET  /techniciens/:id : get the "id" technicien.
     *
     * @param id the id of the technicienDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the technicienDTO, or with status 404 (Not Found)
     */
    @GetMapping("/techniciens/{id}")
    @Timed
    public ResponseEntity<TechnicienDTO> getTechnicien(@PathVariable Long id) {
        log.debug("REST request to get Technicien : {}", id);
        TechnicienDTO technicienDTO = technicienService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(technicienDTO));
    }

    /**
     * DELETE  /techniciens/:id : delete the "id" technicien.
     *
     * @param id the id of the technicienDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/techniciens/{id}")
    @Timed
    public ResponseEntity<Void> deleteTechnicien(@PathVariable Long id) {
        log.debug("REST request to delete Technicien : {}", id);
        technicienService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
