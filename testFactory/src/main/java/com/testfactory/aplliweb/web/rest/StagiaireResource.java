package com.testfactory.aplliweb.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.testfactory.aplliweb.service.StagiaireService;
import com.testfactory.aplliweb.web.rest.errors.BadRequestAlertException;
import com.testfactory.aplliweb.web.rest.util.HeaderUtil;
import com.testfactory.aplliweb.service.dto.StagiaireDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Stagiaire.
 */
@RestController
@RequestMapping("/api")
public class StagiaireResource {

    private final Logger log = LoggerFactory.getLogger(StagiaireResource.class);

    private static final String ENTITY_NAME = "stagiaire";

    private final StagiaireService stagiaireService;

    public StagiaireResource(StagiaireService stagiaireService) {
        this.stagiaireService = stagiaireService;
    }

    /**
     * POST  /stagiaires : Create a new stagiaire.
     *
     * @param stagiaireDTO the stagiaireDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stagiaireDTO, or with status 400 (Bad Request) if the stagiaire has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stagiaires")
    @Timed
    public ResponseEntity<StagiaireDTO> createStagiaire(@RequestBody StagiaireDTO stagiaireDTO) throws URISyntaxException {
        log.debug("REST request to save Stagiaire : {}", stagiaireDTO);
        if (stagiaireDTO.getId() != null) {
            throw new BadRequestAlertException("A new stagiaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StagiaireDTO result = stagiaireService.save(stagiaireDTO);
        return ResponseEntity.created(new URI("/api/stagiaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stagiaires : Updates an existing stagiaire.
     *
     * @param stagiaireDTO the stagiaireDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stagiaireDTO,
     * or with status 400 (Bad Request) if the stagiaireDTO is not valid,
     * or with status 500 (Internal Server Error) if the stagiaireDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stagiaires")
    @Timed
    public ResponseEntity<StagiaireDTO> updateStagiaire(@RequestBody StagiaireDTO stagiaireDTO) throws URISyntaxException {
        log.debug("REST request to update Stagiaire : {}", stagiaireDTO);
        if (stagiaireDTO.getId() == null) {
            return createStagiaire(stagiaireDTO);
        }
        StagiaireDTO result = stagiaireService.save(stagiaireDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stagiaireDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stagiaires : get all the stagiaires.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of stagiaires in body
     */
    @GetMapping("/stagiaires")
    @Timed
    public List<StagiaireDTO> getAllStagiaires() {
        log.debug("REST request to get all Stagiaires");
        return stagiaireService.findAll();
        }

    /**
     * GET  /stagiaires/:id : get the "id" stagiaire.
     *
     * @param id the id of the stagiaireDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stagiaireDTO, or with status 404 (Not Found)
     */
    @GetMapping("/stagiaires/{id}")
    @Timed
    public ResponseEntity<StagiaireDTO> getStagiaire(@PathVariable Long id) {
        log.debug("REST request to get Stagiaire : {}", id);
        StagiaireDTO stagiaireDTO = stagiaireService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stagiaireDTO));
    }

    /**
     * DELETE  /stagiaires/:id : delete the "id" stagiaire.
     *
     * @param id the id of the stagiaireDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stagiaires/{id}")
    @Timed
    public ResponseEntity<Void> deleteStagiaire(@PathVariable Long id) {
        log.debug("REST request to delete Stagiaire : {}", id);
        stagiaireService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
