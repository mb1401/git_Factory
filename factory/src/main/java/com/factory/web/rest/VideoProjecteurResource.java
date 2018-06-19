package com.factory.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.factory.service.VideoProjecteurService;
import com.factory.web.rest.errors.BadRequestAlertException;
import com.factory.web.rest.util.HeaderUtil;
import com.factory.service.dto.VideoProjecteurDTO;
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
 * REST controller for managing VideoProjecteur.
 */
@RestController
@RequestMapping("/api")
public class VideoProjecteurResource {

    private final Logger log = LoggerFactory.getLogger(VideoProjecteurResource.class);

    private static final String ENTITY_NAME = "videoProjecteur";

    private final VideoProjecteurService videoProjecteurService;

    public VideoProjecteurResource(VideoProjecteurService videoProjecteurService) {
        this.videoProjecteurService = videoProjecteurService;
    }

    /**
     * POST  /video-projecteurs : Create a new videoProjecteur.
     *
     * @param videoProjecteurDTO the videoProjecteurDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new videoProjecteurDTO, or with status 400 (Bad Request) if the videoProjecteur has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/video-projecteurs")
    @Timed
    public ResponseEntity<VideoProjecteurDTO> createVideoProjecteur(@Valid @RequestBody VideoProjecteurDTO videoProjecteurDTO) throws URISyntaxException {
        log.debug("REST request to save VideoProjecteur : {}", videoProjecteurDTO);
        if (videoProjecteurDTO.getId() != null) {
            throw new BadRequestAlertException("A new videoProjecteur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VideoProjecteurDTO result = videoProjecteurService.save(videoProjecteurDTO);
        return ResponseEntity.created(new URI("/api/video-projecteurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /video-projecteurs : Updates an existing videoProjecteur.
     *
     * @param videoProjecteurDTO the videoProjecteurDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated videoProjecteurDTO,
     * or with status 400 (Bad Request) if the videoProjecteurDTO is not valid,
     * or with status 500 (Internal Server Error) if the videoProjecteurDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/video-projecteurs")
    @Timed
    public ResponseEntity<VideoProjecteurDTO> updateVideoProjecteur(@Valid @RequestBody VideoProjecteurDTO videoProjecteurDTO) throws URISyntaxException {
        log.debug("REST request to update VideoProjecteur : {}", videoProjecteurDTO);
        if (videoProjecteurDTO.getId() == null) {
            return createVideoProjecteur(videoProjecteurDTO);
        }
        VideoProjecteurDTO result = videoProjecteurService.save(videoProjecteurDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, videoProjecteurDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /video-projecteurs : get all the videoProjecteurs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of videoProjecteurs in body
     */
    @GetMapping("/video-projecteurs")
    @Timed
    public List<VideoProjecteurDTO> getAllVideoProjecteurs() {
        log.debug("REST request to get all VideoProjecteurs");
        return videoProjecteurService.findAll();
        }

    /**
     * GET  /video-projecteurs/:id : get the "id" videoProjecteur.
     *
     * @param id the id of the videoProjecteurDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the videoProjecteurDTO, or with status 404 (Not Found)
     */
    @GetMapping("/video-projecteurs/{id}")
    @Timed
    public ResponseEntity<VideoProjecteurDTO> getVideoProjecteur(@PathVariable Long id) {
        log.debug("REST request to get VideoProjecteur : {}", id);
        VideoProjecteurDTO videoProjecteurDTO = videoProjecteurService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(videoProjecteurDTO));
    }

    /**
     * DELETE  /video-projecteurs/:id : delete the "id" videoProjecteur.
     *
     * @param id the id of the videoProjecteurDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/video-projecteurs/{id}")
    @Timed
    public ResponseEntity<Void> deleteVideoProjecteur(@PathVariable Long id) {
        log.debug("REST request to delete VideoProjecteur : {}", id);
        videoProjecteurService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
