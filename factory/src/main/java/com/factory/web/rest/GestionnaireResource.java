package com.factory.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.factory.service.GestionnaireService;
import com.factory.web.rest.errors.BadRequestAlertException;
import com.factory.web.rest.util.HeaderUtil;
import com.factory.service.dto.GestionnaireDTO;
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
 * REST controller for managing Gestionnaire.
 */
@RestController
@RequestMapping("/api")
public class GestionnaireResource {

    private final Logger log = LoggerFactory.getLogger(GestionnaireResource.class);

    private static final String ENTITY_NAME = "gestionnaire";

    private final GestionnaireService gestionnaireService;

    public GestionnaireResource(GestionnaireService gestionnaireService) {
        this.gestionnaireService = gestionnaireService;
    }

    /**
     * POST  /gestionnaires : Create a new gestionnaire.
     *
     * @param gestionnaireDTO the gestionnaireDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gestionnaireDTO, or with status 400 (Bad Request) if the gestionnaire has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gestionnaires")
    @Timed
    public ResponseEntity<GestionnaireDTO> createGestionnaire(@RequestBody GestionnaireDTO gestionnaireDTO) throws URISyntaxException {
        log.debug("REST request to save Gestionnaire : {}", gestionnaireDTO);
        if (gestionnaireDTO.getId() != null) {
            throw new BadRequestAlertException("A new gestionnaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GestionnaireDTO result = gestionnaireService.save(gestionnaireDTO);
        return ResponseEntity.created(new URI("/api/gestionnaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gestionnaires : Updates an existing gestionnaire.
     *
     * @param gestionnaireDTO the gestionnaireDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gestionnaireDTO,
     * or with status 400 (Bad Request) if the gestionnaireDTO is not valid,
     * or with status 500 (Internal Server Error) if the gestionnaireDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gestionnaires")
    @Timed
    public ResponseEntity<GestionnaireDTO> updateGestionnaire(@RequestBody GestionnaireDTO gestionnaireDTO) throws URISyntaxException {
        log.debug("REST request to update Gestionnaire : {}", gestionnaireDTO);
        if (gestionnaireDTO.getId() == null) {
            return createGestionnaire(gestionnaireDTO);
        }
        GestionnaireDTO result = gestionnaireService.save(gestionnaireDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gestionnaireDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gestionnaires : get all the gestionnaires.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gestionnaires in body
     */
    @GetMapping("/gestionnaires")
    @Timed
    public List<GestionnaireDTO> getAllGestionnaires() {
        log.debug("REST request to get all Gestionnaires");
        return gestionnaireService.findAll();
        }

    /**
     * GET  /gestionnaires/:id : get the "id" gestionnaire.
     *
     * @param id the id of the gestionnaireDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gestionnaireDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gestionnaires/{id}")
    @Timed
    public ResponseEntity<GestionnaireDTO> getGestionnaire(@PathVariable Long id) {
        log.debug("REST request to get Gestionnaire : {}", id);
        GestionnaireDTO gestionnaireDTO = gestionnaireService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(gestionnaireDTO));
    }

    /**
     * DELETE  /gestionnaires/:id : delete the "id" gestionnaire.
     *
     * @param id the id of the gestionnaireDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gestionnaires/{id}")
    @Timed
    public ResponseEntity<Void> deleteGestionnaire(@PathVariable Long id) {
        log.debug("REST request to delete Gestionnaire : {}", id);
        gestionnaireService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
