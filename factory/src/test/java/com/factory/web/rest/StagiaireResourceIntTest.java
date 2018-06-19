package com.factory.web.rest;

import com.factory.FactoryApp;

import com.factory.domain.Stagiaire;
import com.factory.repository.StagiaireRepository;
import com.factory.service.StagiaireService;
import com.factory.service.dto.StagiaireDTO;
import com.factory.service.mapper.StagiaireMapper;
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
 * Test class for the StagiaireResource REST controller.
 *
 * @see StagiaireResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FactoryApp.class)
public class StagiaireResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO_RUE = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_RUE = "BBBBBBBBBB";

    private static final String DEFAULT_CODE_POSTAL = "AAAAAAAAAA";
    private static final String UPDATED_CODE_POSTAL = "BBBBBBBBBB";

    private static final String DEFAULT_VILLE = "AAAAAAAAAA";
    private static final String UPDATED_VILLE = "BBBBBBBBBB";

    private static final String DEFAULT_PAYS = "AAAAAAAAAA";
    private static final String UPDATED_PAYS = "BBBBBBBBBB";

    private static final String DEFAULT_MAIL = "AAAAAAAAAA";
    private static final String UPDATED_MAIL = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO_TEL = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_TEL = "BBBBBBBBBB";

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ENABLE = false;
    private static final Boolean UPDATED_ENABLE = true;

    @Autowired
    private StagiaireRepository stagiaireRepository;

    @Autowired
    private StagiaireMapper stagiaireMapper;

    @Autowired
    private StagiaireService stagiaireService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStagiaireMockMvc;

    private Stagiaire stagiaire;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StagiaireResource stagiaireResource = new StagiaireResource(stagiaireService);
        this.restStagiaireMockMvc = MockMvcBuilders.standaloneSetup(stagiaireResource)
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
    public static Stagiaire createEntity(EntityManager em) {
        Stagiaire stagiaire = new Stagiaire()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .numeroRue(DEFAULT_NUMERO_RUE)
            .codePostal(DEFAULT_CODE_POSTAL)
            .ville(DEFAULT_VILLE)
            .pays(DEFAULT_PAYS)
            .mail(DEFAULT_MAIL)
            .numeroTel(DEFAULT_NUMERO_TEL)
            .username(DEFAULT_USERNAME)
            .password(DEFAULT_PASSWORD)
            .enable(DEFAULT_ENABLE);
        return stagiaire;
    }

    @Before
    public void initTest() {
        stagiaire = createEntity(em);
    }

    @Test
    @Transactional
    public void createStagiaire() throws Exception {
        int databaseSizeBeforeCreate = stagiaireRepository.findAll().size();

        // Create the Stagiaire
        StagiaireDTO stagiaireDTO = stagiaireMapper.toDto(stagiaire);
        restStagiaireMockMvc.perform(post("/api/stagiaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stagiaireDTO)))
            .andExpect(status().isCreated());

        // Validate the Stagiaire in the database
        List<Stagiaire> stagiaireList = stagiaireRepository.findAll();
        assertThat(stagiaireList).hasSize(databaseSizeBeforeCreate + 1);
        Stagiaire testStagiaire = stagiaireList.get(stagiaireList.size() - 1);
        assertThat(testStagiaire.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testStagiaire.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testStagiaire.getNumeroRue()).isEqualTo(DEFAULT_NUMERO_RUE);
        assertThat(testStagiaire.getCodePostal()).isEqualTo(DEFAULT_CODE_POSTAL);
        assertThat(testStagiaire.getVille()).isEqualTo(DEFAULT_VILLE);
        assertThat(testStagiaire.getPays()).isEqualTo(DEFAULT_PAYS);
        assertThat(testStagiaire.getMail()).isEqualTo(DEFAULT_MAIL);
        assertThat(testStagiaire.getNumeroTel()).isEqualTo(DEFAULT_NUMERO_TEL);
        assertThat(testStagiaire.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testStagiaire.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testStagiaire.isEnable()).isEqualTo(DEFAULT_ENABLE);
    }

    @Test
    @Transactional
    public void createStagiaireWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stagiaireRepository.findAll().size();

        // Create the Stagiaire with an existing ID
        stagiaire.setId(1L);
        StagiaireDTO stagiaireDTO = stagiaireMapper.toDto(stagiaire);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStagiaireMockMvc.perform(post("/api/stagiaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stagiaireDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Stagiaire in the database
        List<Stagiaire> stagiaireList = stagiaireRepository.findAll();
        assertThat(stagiaireList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = stagiaireRepository.findAll().size();
        // set the field null
        stagiaire.setNom(null);

        // Create the Stagiaire, which fails.
        StagiaireDTO stagiaireDTO = stagiaireMapper.toDto(stagiaire);

        restStagiaireMockMvc.perform(post("/api/stagiaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stagiaireDTO)))
            .andExpect(status().isBadRequest());

        List<Stagiaire> stagiaireList = stagiaireRepository.findAll();
        assertThat(stagiaireList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = stagiaireRepository.findAll().size();
        // set the field null
        stagiaire.setPrenom(null);

        // Create the Stagiaire, which fails.
        StagiaireDTO stagiaireDTO = stagiaireMapper.toDto(stagiaire);

        restStagiaireMockMvc.perform(post("/api/stagiaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stagiaireDTO)))
            .andExpect(status().isBadRequest());

        List<Stagiaire> stagiaireList = stagiaireRepository.findAll();
        assertThat(stagiaireList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStagiaires() throws Exception {
        // Initialize the database
        stagiaireRepository.saveAndFlush(stagiaire);

        // Get all the stagiaireList
        restStagiaireMockMvc.perform(get("/api/stagiaires?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stagiaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].numeroRue").value(hasItem(DEFAULT_NUMERO_RUE.toString())))
            .andExpect(jsonPath("$.[*].codePostal").value(hasItem(DEFAULT_CODE_POSTAL.toString())))
            .andExpect(jsonPath("$.[*].ville").value(hasItem(DEFAULT_VILLE.toString())))
            .andExpect(jsonPath("$.[*].pays").value(hasItem(DEFAULT_PAYS.toString())))
            .andExpect(jsonPath("$.[*].mail").value(hasItem(DEFAULT_MAIL.toString())))
            .andExpect(jsonPath("$.[*].numeroTel").value(hasItem(DEFAULT_NUMERO_TEL.toString())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME.toString())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD.toString())))
            .andExpect(jsonPath("$.[*].enable").value(hasItem(DEFAULT_ENABLE.booleanValue())));
    }

    @Test
    @Transactional
    public void getStagiaire() throws Exception {
        // Initialize the database
        stagiaireRepository.saveAndFlush(stagiaire);

        // Get the stagiaire
        restStagiaireMockMvc.perform(get("/api/stagiaires/{id}", stagiaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stagiaire.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.numeroRue").value(DEFAULT_NUMERO_RUE.toString()))
            .andExpect(jsonPath("$.codePostal").value(DEFAULT_CODE_POSTAL.toString()))
            .andExpect(jsonPath("$.ville").value(DEFAULT_VILLE.toString()))
            .andExpect(jsonPath("$.pays").value(DEFAULT_PAYS.toString()))
            .andExpect(jsonPath("$.mail").value(DEFAULT_MAIL.toString()))
            .andExpect(jsonPath("$.numeroTel").value(DEFAULT_NUMERO_TEL.toString()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME.toString()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD.toString()))
            .andExpect(jsonPath("$.enable").value(DEFAULT_ENABLE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingStagiaire() throws Exception {
        // Get the stagiaire
        restStagiaireMockMvc.perform(get("/api/stagiaires/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStagiaire() throws Exception {
        // Initialize the database
        stagiaireRepository.saveAndFlush(stagiaire);
        int databaseSizeBeforeUpdate = stagiaireRepository.findAll().size();

        // Update the stagiaire
        Stagiaire updatedStagiaire = stagiaireRepository.findOne(stagiaire.getId());
        // Disconnect from session so that the updates on updatedStagiaire are not directly saved in db
        em.detach(updatedStagiaire);
        updatedStagiaire
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .numeroRue(UPDATED_NUMERO_RUE)
            .codePostal(UPDATED_CODE_POSTAL)
            .ville(UPDATED_VILLE)
            .pays(UPDATED_PAYS)
            .mail(UPDATED_MAIL)
            .numeroTel(UPDATED_NUMERO_TEL)
            .username(UPDATED_USERNAME)
            .password(UPDATED_PASSWORD)
            .enable(UPDATED_ENABLE);
        StagiaireDTO stagiaireDTO = stagiaireMapper.toDto(updatedStagiaire);

        restStagiaireMockMvc.perform(put("/api/stagiaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stagiaireDTO)))
            .andExpect(status().isOk());

        // Validate the Stagiaire in the database
        List<Stagiaire> stagiaireList = stagiaireRepository.findAll();
        assertThat(stagiaireList).hasSize(databaseSizeBeforeUpdate);
        Stagiaire testStagiaire = stagiaireList.get(stagiaireList.size() - 1);
        assertThat(testStagiaire.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testStagiaire.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testStagiaire.getNumeroRue()).isEqualTo(UPDATED_NUMERO_RUE);
        assertThat(testStagiaire.getCodePostal()).isEqualTo(UPDATED_CODE_POSTAL);
        assertThat(testStagiaire.getVille()).isEqualTo(UPDATED_VILLE);
        assertThat(testStagiaire.getPays()).isEqualTo(UPDATED_PAYS);
        assertThat(testStagiaire.getMail()).isEqualTo(UPDATED_MAIL);
        assertThat(testStagiaire.getNumeroTel()).isEqualTo(UPDATED_NUMERO_TEL);
        assertThat(testStagiaire.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testStagiaire.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testStagiaire.isEnable()).isEqualTo(UPDATED_ENABLE);
    }

    @Test
    @Transactional
    public void updateNonExistingStagiaire() throws Exception {
        int databaseSizeBeforeUpdate = stagiaireRepository.findAll().size();

        // Create the Stagiaire
        StagiaireDTO stagiaireDTO = stagiaireMapper.toDto(stagiaire);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStagiaireMockMvc.perform(put("/api/stagiaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stagiaireDTO)))
            .andExpect(status().isCreated());

        // Validate the Stagiaire in the database
        List<Stagiaire> stagiaireList = stagiaireRepository.findAll();
        assertThat(stagiaireList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStagiaire() throws Exception {
        // Initialize the database
        stagiaireRepository.saveAndFlush(stagiaire);
        int databaseSizeBeforeDelete = stagiaireRepository.findAll().size();

        // Get the stagiaire
        restStagiaireMockMvc.perform(delete("/api/stagiaires/{id}", stagiaire.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Stagiaire> stagiaireList = stagiaireRepository.findAll();
        assertThat(stagiaireList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Stagiaire.class);
        Stagiaire stagiaire1 = new Stagiaire();
        stagiaire1.setId(1L);
        Stagiaire stagiaire2 = new Stagiaire();
        stagiaire2.setId(stagiaire1.getId());
        assertThat(stagiaire1).isEqualTo(stagiaire2);
        stagiaire2.setId(2L);
        assertThat(stagiaire1).isNotEqualTo(stagiaire2);
        stagiaire1.setId(null);
        assertThat(stagiaire1).isNotEqualTo(stagiaire2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StagiaireDTO.class);
        StagiaireDTO stagiaireDTO1 = new StagiaireDTO();
        stagiaireDTO1.setId(1L);
        StagiaireDTO stagiaireDTO2 = new StagiaireDTO();
        assertThat(stagiaireDTO1).isNotEqualTo(stagiaireDTO2);
        stagiaireDTO2.setId(stagiaireDTO1.getId());
        assertThat(stagiaireDTO1).isEqualTo(stagiaireDTO2);
        stagiaireDTO2.setId(2L);
        assertThat(stagiaireDTO1).isNotEqualTo(stagiaireDTO2);
        stagiaireDTO1.setId(null);
        assertThat(stagiaireDTO1).isNotEqualTo(stagiaireDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(stagiaireMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(stagiaireMapper.fromId(null)).isNull();
    }
}
