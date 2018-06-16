package com.testfactory.aplliweb.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.testfactory.aplliweb.service.OrdinateurService;
import com.testfactory.aplliweb.web.rest.errors.BadRequestAlertException;
import com.testfactory.aplliweb.web.rest.util.HeaderUtil;
import com.testfactory.aplliweb.service.dto.OrdinateurDTO;
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
 * REST controller for managing Ordinateur.
 */
@RestController
@RequestMapping("/api")
public class OrdinateurResource {

    private final Logger log = LoggerFactory.getLogger(OrdinateurResource.class);

    private static final String ENTITY_NAME = "ordinateur";

    private final OrdinateurService ordinateurService;

    public OrdinateurResource(OrdinateurService ordinateurService) {
        this.ordinateurService = ordinateurService;
    }

    /**
     * POST  /ordinateurs : Create a new ordinateur.
     *
     * @param ordinateurDTO the ordinateurDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ordinateurDTO, or with status 400 (Bad Request) if the ordinateur has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ordinateurs")
    @Timed
    public ResponseEntity<OrdinateurDTO> createOrdinateur(@RequestBody OrdinateurDTO ordinateurDTO) throws URISyntaxException {
        log.debug("REST request to save Ordinateur : {}", ordinateurDTO);
        if (ordinateurDTO.getId() != null) {
            throw new BadRequestAlertException("A new ordinateur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrdinateurDTO result = ordinateurService.save(ordinateurDTO);
        return ResponseEntity.created(new URI("/api/ordinateurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ordinateurs : Updates an existing ordinateur.
     *
     * @param ordinateurDTO the ordinateurDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ordinateurDTO,
     * or with status 400 (Bad Request) if the ordinateurDTO is not valid,
     * or with status 500 (Internal Server Error) if the ordinateurDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ordinateurs")
    @Timed
    public ResponseEntity<OrdinateurDTO> updateOrdinateur(@RequestBody OrdinateurDTO ordinateurDTO) throws URISyntaxException {
        log.debug("REST request to update Ordinateur : {}", ordinateurDTO);
        if (ordinateurDTO.getId() == null) {
            return createOrdinateur(ordinateurDTO);
        }
        OrdinateurDTO result = ordinateurService.save(ordinateurDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ordinateurDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ordinateurs : get all the ordinateurs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ordinateurs in body
     */
    @GetMapping("/ordinateurs")
    @Timed
    public List<OrdinateurDTO> getAllOrdinateurs() {
        log.debug("REST request to get all Ordinateurs");
        return ordinateurService.findAll();
        }

    /**
     * GET  /ordinateurs/:id : get the "id" ordinateur.
     *
     * @param id the id of the ordinateurDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ordinateurDTO, or with status 404 (Not Found)
     */
    @GetMapping("/ordinateurs/{id}")
    @Timed
    public ResponseEntity<OrdinateurDTO> getOrdinateur(@PathVariable Long id) {
        log.debug("REST request to get Ordinateur : {}", id);
        OrdinateurDTO ordinateurDTO = ordinateurService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ordinateurDTO));
    }

    /**
     * DELETE  /ordinateurs/:id : delete the "id" ordinateur.
     *
     * @param id the id of the ordinateurDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ordinateurs/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrdinateur(@PathVariable Long id) {
        log.debug("REST request to delete Ordinateur : {}", id);
        ordinateurService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
