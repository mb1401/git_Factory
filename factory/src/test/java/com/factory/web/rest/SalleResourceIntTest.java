package com.factory.web.rest;

import com.factory.FactoryApp;

import com.factory.domain.Salle;
import com.factory.repository.SalleRepository;
import com.factory.service.SalleService;
import com.factory.service.dto.SalleDTO;
import com.factory.service.mapper.SalleMapper;
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
 * Test class for the SalleResource REST controller.
 *
 * @see SalleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FactoryApp.class)
public class SalleResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final Float DEFAULT_COUT = 1F;
    private static final Float UPDATED_COUT = 2F;

    private static final Integer DEFAULT_CAPACITE = 1;
    private static final Integer UPDATED_CAPACITE = 2;

    @Autowired
    private SalleRepository salleRepository;

    @Autowired
    private SalleMapper salleMapper;

    @Autowired
    private SalleService salleService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSalleMockMvc;

    private Salle salle;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SalleResource salleResource = new SalleResource(salleService);
        this.restSalleMockMvc = MockMvcBuilders.standaloneSetup(salleResource)
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
    public static Salle createEntity(EntityManager em) {
        Salle salle = new Salle()
            .nom(DEFAULT_NOM)
            .cout(DEFAULT_COUT)
            .capacite(DEFAULT_CAPACITE);
        return salle;
    }

    @Before
    public void initTest() {
        salle = createEntity(em);
    }

    @Test
    @Transactional
    public void createSalle() throws Exception {
        int databaseSizeBeforeCreate = salleRepository.findAll().size();

        // Create the Salle
        SalleDTO salleDTO = salleMapper.toDto(salle);
        restSalleMockMvc.perform(post("/api/salles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salleDTO)))
            .andExpect(status().isCreated());

        // Validate the Salle in the database
        List<Salle> salleList = salleRepository.findAll();
        assertThat(salleList).hasSize(databaseSizeBeforeCreate + 1);
        Salle testSalle = salleList.get(salleList.size() - 1);
        assertThat(testSalle.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testSalle.getCout()).isEqualTo(DEFAULT_COUT);
        assertThat(testSalle.getCapacite()).isEqualTo(DEFAULT_CAPACITE);
    }

    @Test
    @Transactional
    public void createSalleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = salleRepository.findAll().size();

        // Create the Salle with an existing ID
        salle.setId(1L);
        SalleDTO salleDTO = salleMapper.toDto(salle);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSalleMockMvc.perform(post("/api/salles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Salle in the database
        List<Salle> salleList = salleRepository.findAll();
        assertThat(salleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = salleRepository.findAll().size();
        // set the field null
        salle.setNom(null);

        // Create the Salle, which fails.
        SalleDTO salleDTO = salleMapper.toDto(salle);

        restSalleMockMvc.perform(post("/api/salles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salleDTO)))
            .andExpect(status().isBadRequest());

        List<Salle> salleList = salleRepository.findAll();
        assertThat(salleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSalles() throws Exception {
        // Initialize the database
        salleRepository.saveAndFlush(salle);

        // Get all the salleList
        restSalleMockMvc.perform(get("/api/salles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(salle.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].cout").value(hasItem(DEFAULT_COUT.doubleValue())))
            .andExpect(jsonPath("$.[*].capacite").value(hasItem(DEFAULT_CAPACITE)));
    }

    @Test
    @Transactional
    public void getSalle() throws Exception {
        // Initialize the database
        salleRepository.saveAndFlush(salle);

        // Get the salle
        restSalleMockMvc.perform(get("/api/salles/{id}", salle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(salle.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.cout").value(DEFAULT_COUT.doubleValue()))
            .andExpect(jsonPath("$.capacite").value(DEFAULT_CAPACITE));
    }

    @Test
    @Transactional
    public void getNonExistingSalle() throws Exception {
        // Get the salle
        restSalleMockMvc.perform(get("/api/salles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSalle() throws Exception {
        // Initialize the database
        salleRepository.saveAndFlush(salle);
        int databaseSizeBeforeUpdate = salleRepository.findAll().size();

        // Update the salle
        Salle updatedSalle = salleRepository.findOne(salle.getId());
        // Disconnect from session so that the updates on updatedSalle are not directly saved in db
        em.detach(updatedSalle);
        updatedSalle
            .nom(UPDATED_NOM)
            .cout(UPDATED_COUT)
            .capacite(UPDATED_CAPACITE);
        SalleDTO salleDTO = salleMapper.toDto(updatedSalle);

        restSalleMockMvc.perform(put("/api/salles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salleDTO)))
            .andExpect(status().isOk());

        // Validate the Salle in the database
        List<Salle> salleList = salleRepository.findAll();
        assertThat(salleList).hasSize(databaseSizeBeforeUpdate);
        Salle testSalle = salleList.get(salleList.size() - 1);
        assertThat(testSalle.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testSalle.getCout()).isEqualTo(UPDATED_COUT);
        assertThat(testSalle.getCapacite()).isEqualTo(UPDATED_CAPACITE);
    }

    @Test
    @Transactional
    public void updateNonExistingSalle() throws Exception {
        int databaseSizeBeforeUpdate = salleRepository.findAll().size();

        // Create the Salle
        SalleDTO salleDTO = salleMapper.toDto(salle);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSalleMockMvc.perform(put("/api/salles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salleDTO)))
            .andExpect(status().isCreated());

        // Validate the Salle in the database
        List<Salle> salleList = salleRepository.findAll();
        assertThat(salleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSalle() throws Exception {
        // Initialize the database
        salleRepository.saveAndFlush(salle);
        int databaseSizeBeforeDelete = salleRepository.findAll().size();

        // Get the salle
        restSalleMockMvc.perform(delete("/api/salles/{id}", salle.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Salle> salleList = salleRepository.findAll();
        assertThat(salleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Salle.class);
        Salle salle1 = new Salle();
        salle1.setId(1L);
        Salle salle2 = new Salle();
        salle2.setId(salle1.getId());
        assertThat(salle1).isEqualTo(salle2);
        salle2.setId(2L);
        assertThat(salle1).isNotEqualTo(salle2);
        salle1.setId(null);
        assertThat(salle1).isNotEqualTo(salle2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SalleDTO.class);
        SalleDTO salleDTO1 = new SalleDTO();
        salleDTO1.setId(1L);
        SalleDTO salleDTO2 = new SalleDTO();
        assertThat(salleDTO1).isNotEqualTo(salleDTO2);
        salleDTO2.setId(salleDTO1.getId());
        assertThat(salleDTO1).isEqualTo(salleDTO2);
        salleDTO2.setId(2L);
        assertThat(salleDTO1).isNotEqualTo(salleDTO2);
        salleDTO1.setId(null);
        assertThat(salleDTO1).isNotEqualTo(salleDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(salleMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(salleMapper.fromId(null)).isNull();
    }
}
