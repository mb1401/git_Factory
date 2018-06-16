package com.testfactory.aplliweb.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.testfactory.aplliweb.service.FormationService;
import com.testfactory.aplliweb.web.rest.errors.BadRequestAlertException;
import com.testfactory.aplliweb.web.rest.util.HeaderUtil;
import com.testfactory.aplliweb.service.dto.FormationDTO;
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
 * REST controller for managing Formation.
 */
@RestController
@RequestMapping("/api")
public class FormationResource {

    private final Logger log = LoggerFactory.getLogger(FormationResource.class);

    private static final String ENTITY_NAME = "formation";

    private final FormationService formationService;

    public FormationResource(FormationService formationService) {
        this.formationService = formationService;
    }

    /**
     * POST  /formations : Create a new formation.
     *
     * @param formationDTO the formationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new formationDTO, or with status 400 (Bad Request) if the formation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/formations")
    @Timed
    public ResponseEntity<FormationDTO> createFormation(@RequestBody FormationDTO formationDTO) throws URISyntaxException {
        log.debug("REST request to save Formation : {}", formationDTO);
        if (formationDTO.getId() != null) {
            throw new BadRequestAlertException("A new formation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FormationDTO result = formationService.save(formationDTO);
        return ResponseEntity.created(new URI("/api/formations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /formations : Updates an existing formation.
     *
     * @param formationDTO the formationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated formationDTO,
     * or with status 400 (Bad Request) if the formationDTO is not valid,
     * or with status 500 (Internal Server Error) if the formationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/formations")
    @Timed
    public ResponseEntity<FormationDTO> updateFormation(@RequestBody FormationDTO formationDTO) throws URISyntaxException {
        log.debug("REST request to update Formation : {}", formationDTO);
        if (formationDTO.getId() == null) {
            return createFormation(formationDTO);
        }
        FormationDTO result = formationService.save(formationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, formationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /formations : get all the formations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of formations in body
     */
    @GetMapping("/formations")
    @Timed
    public List<FormationDTO> getAllFormations() {
        log.debug("REST request to get all Formations");
        return formationService.findAll();
        }

    /**
     * GET  /formations/:id : get the "id" formation.
     *
     * @param id the id of the formationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the formationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/formations/{id}")
    @Timed
    public ResponseEntity<FormationDTO> getFormation(@PathVariable Long id) {
        log.debug("REST request to get Formation : {}", id);
        FormationDTO formationDTO = formationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(formationDTO));
    }

    /**
     * DELETE  /formations/:id : delete the "id" formation.
     *
     * @param id the id of the formationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/formations/{id}")
    @Timed
    public ResponseEntity<Void> deleteFormation(@PathVariable Long id) {
        log.debug("REST request to delete Formation : {}", id);
        formationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
