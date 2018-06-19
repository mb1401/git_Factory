package com.factory.web.rest;

import com.factory.FactoryApp;

import com.factory.domain.VideoProjecteur;
import com.factory.repository.VideoProjecteurRepository;
import com.factory.service.VideoProjecteurService;
import com.factory.service.dto.VideoProjecteurDTO;
import com.factory.service.mapper.VideoProjecteurMapper;
import com.factory.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.factory.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the VideoProjecteurResource REST controller.
 *
 * @see VideoProjecteurResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FactoryApp.class)
public class VideoProjecteurResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final Float DEFAULT_COUT = 1F;
    private static final Float UPDATED_COUT = 2F;

    @Autowired
    private VideoProjecteurRepository videoProjecteurRepository;

    @Autowired
    private VideoProjecteurMapper videoProjecteurMapper;

    @Autowired
    private VideoProjecteurService videoProjecteurService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVideoProjecteurMockMvc;

    private VideoProjecteur videoProjecteur;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VideoProjecteurResource videoProjecteurResource = new VideoProjecteurResource(videoProjecteurService);
        this.restVideoProjecteurMockMvc = MockMvcBuilders.standaloneSetup(videoProjecteurResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VideoProjecteur createEntity(EntityManager em) {
        VideoProjecteur videoProjecteur = new VideoProjecteur()
            .code(DEFAULT_CODE)
            .cout(DEFAULT_COUT);
        return videoProjecteur;
    }

    @Before
    public void initTest() {
        videoProjecteur = createEntity(em);
    }

    @Test
    @Transactional
    public void createVideoProjecteur() throws Exception {
        int databaseSizeBeforeCreate = videoProjecteurRepository.findAll().size();

        // Create the VideoProjecteur
        VideoProjecteurDTO videoProjecteurDTO = videoProjecteurMapper.toDto(videoProjecteur);
        restVideoProjecteurMockMvc.perform(post("/api/video-projecteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoProjecteurDTO)))
            .andExpect(status().isCreated());

        // Validate the VideoProjecteur in the database
        List<VideoProjecteur> videoProjecteurList = videoProjecteurRepository.findAll();
        assertThat(videoProjecteurList).hasSize(databaseSizeBeforeCreate + 1);
        VideoProjecteur testVideoProjecteur = videoProjecteurList.get(videoProjecteurList.size() - 1);
        assertThat(testVideoProjecteur.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testVideoProjecteur.getCout()).isEqualTo(DEFAULT_COUT);
    }

    @Test
    @Transactional
    public void createVideoProjecteurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = videoProjecteurRepository.findAll().size();

        // Create the VideoProjecteur with an existing ID
        videoProjecteur.setId(1L);
        VideoProjecteurDTO videoProjecteurDTO = videoProjecteurMapper.toDto(videoProjecteur);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVideoProjecteurMockMvc.perform(post("/api/video-projecteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoProjecteurDTO)))
            .andExpect(status().isBadRequest());

        // Validate the VideoProjecteur in the database
        List<VideoProjecteur> videoProjecteurList = videoProjecteurRepository.findAll();
        assertThat(videoProjecteurList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = videoProjecteurRepository.findAll().size();
        // set the field null
        videoProjecteur.setCode(null);

        // Create the VideoProjecteur, which fails.
        VideoProjecteurDTO videoProjecteurDTO = videoProjecteurMapper.toDto(videoProjecteur);

        restVideoProjecteurMockMvc.perform(post("/api/video-projecteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoProjecteurDTO)))
            .andExpect(status().isBadRequest());

        List<VideoProjecteur> videoProjecteurList = videoProjecteurRepository.findAll();
        assertThat(videoProjecteurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCoutIsRequired() throws Exception {
        int databaseSizeBeforeTest = videoProjecteurRepository.findAll().size();
        // set the field null
        videoProjecteur.setCout(null);

        // Create the VideoProjecteur, which fails.
        VideoProjecteurDTO videoProjecteurDTO = videoProjecteurMapper.toDto(videoProjecteur);

        restVideoProjecteurMockMvc.perform(post("/api/video-projecteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoProjecteurDTO)))
            .andExpect(status().isBadRequest());

        List<VideoProjecteur> videoProjecteurList = videoProjecteurRepository.findAll();
        assertThat(videoProjecteurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVideoProjecteurs() throws Exception {
        // Initialize the database
        videoProjecteurRepository.saveAndFlush(videoProjecteur);

        // Get all the videoProjecteurList
        restVideoProjecteurMockMvc.perform(get("/api/video-projecteurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(videoProjecteur.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].cout").value(hasItem(DEFAULT_COUT.doubleValue())));
    }

    @Test
    @Transactional
    public void getVideoProjecteur() throws Exception {
        // Initialize the database
        videoProjecteurRepository.saveAndFlush(videoProjecteur);

        // Get the videoProjecteur
        restVideoProjecteurMockMvc.perform(get("/api/video-projecteurs/{id}", videoProjecteur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(videoProjecteur.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.cout").value(DEFAULT_COUT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingVideoProjecteur() throws Exception {
        // Get the videoProjecteur
        restVideoProjecteurMockMvc.perform(get("/api/video-projecteurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVideoProjecteur() throws Exception {
        // Initialize the database
        videoProjecteurRepository.saveAndFlush(videoProjecteur);
        int databaseSizeBeforeUpdate = videoProjecteurRepository.findAll().size();

        // Update the videoProjecteur
        VideoProjecteur updatedVideoProjecteur = videoProjecteurRepository.findOne(videoProjecteur.getId());
        // Disconnect from session so that the updates on updatedVideoProjecteur are not directly saved in db
        em.detach(updatedVideoProjecteur);
        updatedVideoProjecteur
            .code(UPDATED_CODE)
            .cout(UPDATED_COUT);
        VideoProjecteurDTO videoProjecteurDTO = videoProjecteurMapper.toDto(updatedVideoProjecteur);

        restVideoProjecteurMockMvc.perform(put("/api/video-projecteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoProjecteurDTO)))
            .andExpect(status().isOk());

        // Validate the VideoProjecteur in the database
        List<VideoProjecteur> videoProjecteurList = videoProjecteurRepository.findAll();
        assertThat(videoProjecteurList).hasSize(databaseSizeBeforeUpdate);
        VideoProjecteur testVideoProjecteur = videoProjecteurList.get(videoProjecteurList.size() - 1);
        assertThat(testVideoProjecteur.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testVideoProjecteur.getCout()).isEqualTo(UPDATED_COUT);
    }

    @Test
    @Transactional
    public void updateNonExistingVideoProjecteur() throws Exception {
        int databaseSizeBeforeUpdate = videoProjecteurRepository.findAll().size();

        // Create the VideoProjecteur
        VideoProjecteurDTO videoProjecteurDTO = videoProjecteurMapper.toDto(videoProjecteur);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVideoProjecteurMockMvc.perform(put("/api/video-projecteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoProjecteurDTO)))
            .andExpect(status().isCreated());

        // Validate the VideoProjecteur in the database
        List<VideoProjecteur> videoProjecteurList = videoProjecteurRepository.findAll();
        assertThat(videoProjecteurList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteVideoProjecteur() throws Exception {
        // Initialize the database
        videoProjecteurRepository.saveAndFlush(videoProjecteur);
        int databaseSizeBeforeDelete = videoProjecteurRepository.findAll().size();

        // Get the videoProjecteur
        restVideoProjecteurMockMvc.perform(delete("/api/video-projecteurs/{id}", videoProjecteur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<VideoProjecteur> videoProjecteurList = videoProjecteurRepository.findAll();
        assertThat(videoProjecteurList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VideoProjecteur.class);
        VideoProjecteur videoProjecteur1 = new VideoProjecteur();
        videoProjecteur1.setId(1L);
        VideoProjecteur videoProjecteur2 = new VideoProjecteur();
        videoProjecteur2.setId(videoProjecteur1.getId());
        assertThat(videoProjecteur1).isEqualTo(videoProjecteur2);
        videoProjecteur2.setId(2L);
        assertThat(videoProjecteur1).isNotEqualTo(videoProjecteur2);
        videoProjecteur1.setId(null);
        assertThat(videoProjecteur1).isNotEqualTo(videoProjecteur2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VideoProjecteurDTO.class);
        VideoProjecteurDTO videoProjecteurDTO1 = new VideoProjecteurDTO();
        videoProjecteurDTO1.setId(1L);
        VideoProjecteurDTO videoProjecteurDTO2 = new VideoProjecteurDTO();
        assertThat(videoProjecteurDTO1).isNotEqualTo(videoProjecteurDTO2);
        videoProjecteurDTO2.setId(videoProjecteurDTO1.getId());
        assertThat(videoProjecteurDTO1).isEqualTo(videoProjecteurDTO2);
        videoProjecteurDTO2.setId(2L);
        assertThat(videoProjecteurDTO1).isNotEqualTo(videoProjecteurDTO2);
        videoProjecteurDTO1.setId(null);
        assertThat(videoProjecteurDTO1).isNotEqualTo(videoProjecteurDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(videoProjecteurMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(videoProjecteurMapper.fromId(null)).isNull();
    }
}
