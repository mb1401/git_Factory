package com.testfactory.aplliweb.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.testfactory.aplliweb.service.FormateurService;
import com.testfactory.aplliweb.web.rest.errors.BadRequestAlertException;
import com.testfactory.aplliweb.web.rest.util.HeaderUtil;
import com.testfactory.aplliweb.service.dto.FormateurDTO;
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
 * REST controller for managing Formateur.
 */
@RestController
@RequestMapping("/api")
public class FormateurResource {

    private final Logger log = LoggerFactory.getLogger(FormateurResource.class);

    private static final String ENTITY_NAME = "formateur";

    private final FormateurService formateurService;

    public FormateurResource(FormateurService formateurService) {
        this.formateurService = formateurService;
    }

    /**
     * POST  /formateurs : Create a new formateur.
     *
     * @param formateurDTO the formateurDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new formateurDTO, or with status 400 (Bad Request) if the formateur has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/formateurs")
    @Timed
    public ResponseEntity<FormateurDTO> createFormateur(@RequestBody FormateurDTO formateurDTO) throws URISyntaxException {
        log.debug("REST request to save Formateur : {}", formateurDTO);
        if (formateurDTO.getId() != null) {
            throw new BadRequestAlertException("A new formateur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FormateurDTO result = formateurService.save(formateurDTO);
        return ResponseEntity.created(new URI("/api/formateurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /formateurs : Updates an existing formateur.
     *
     * @param formateurDTO the formateurDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated formateurDTO,
     * or with status 400 (Bad Request) if the formateurDTO is not valid,
     * or with status 500 (Internal Server Error) if the formateurDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/formateurs")
    @Timed
    public ResponseEntity<FormateurDTO> updateFormateur(@RequestBody FormateurDTO formateurDTO) throws URISyntaxException {
        log.debug("REST request to update Formateur : {}", formateurDTO);
        if (formateurDTO.getId() == null) {
            return createFormateur(formateurDTO);
        }
        FormateurDTO result = formateurService.save(formateurDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, formateurDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /formateurs : get all the formateurs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of formateurs in body
     */
    @GetMapping("/formateurs")
    @Timed
    public List<FormateurDTO> getAllFormateurs() {
        log.debug("REST request to get all Formateurs");
        return formateurService.findAll();
        }

    /**
     * GET  /formateurs/:id : get the "id" formateur.
     *
     * @param id the id of the formateurDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the formateurDTO, or with status 404 (Not Found)
     */
    @GetMapping("/formateurs/{id}")
    @Timed
    public ResponseEntity<FormateurDTO> getFormateur(@PathVariable Long id) {
        log.debug("REST request to get Formateur : {}", id);
        FormateurDTO formateurDTO = formateurService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(formateurDTO));
    }

    /**
     * DELETE  /formateurs/:id : delete the "id" formateur.
     *
     * @param id the id of the formateurDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/formateurs/{id}")
    @Timed
    public ResponseEntity<Void> deleteFormateur(@PathVariable Long id) {
        log.debug("REST request to delete Formateur : {}", id);
        formateurService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
