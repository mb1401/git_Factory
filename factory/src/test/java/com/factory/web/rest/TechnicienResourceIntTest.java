package com.factory.web.rest;

import com.factory.FactoryApp;

import com.factory.domain.Technicien;
import com.factory.repository.TechnicienRepository;
import com.factory.service.TechnicienService;
import com.factory.service.dto.TechnicienDTO;
import com.factory.service.mapper.TechnicienMapper;
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
 * Test class for the TechnicienResource REST controller.
 *
 * @see TechnicienResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FactoryApp.class)
public class TechnicienResourceIntTest {

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
    private TechnicienRepository technicienRepository;

    @Autowired
    private TechnicienMapper technicienMapper;

    @Autowired
    private TechnicienService technicienService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTechnicienMockMvc;

    private Technicien technicien;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TechnicienResource technicienResource = new TechnicienResource(technicienService);
        this.restTechnicienMockMvc = MockMvcBuilders.standaloneSetup(technicienResource)
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
    public static Technicien createEntity(EntityManager em) {
        Technicien technicien = new Technicien()
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
        return technicien;
    }

    @Before
    public void initTest() {
        technicien = createEntity(em);
    }

    @Test
    @Transactional
    public void createTechnicien() throws Exception {
        int databaseSizeBeforeCreate = technicienRepository.findAll().size();

        // Create the Technicien
        TechnicienDTO technicienDTO = technicienMapper.toDto(technicien);
        restTechnicienMockMvc.perform(post("/api/techniciens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(technicienDTO)))
            .andExpect(status().isCreated());

        // Validate the Technicien in the database
        List<Technicien> technicienList = technicienRepository.findAll();
        assertThat(technicienList).hasSize(databaseSizeBeforeCreate + 1);
        Technicien testTechnicien = technicienList.get(technicienList.size() - 1);
        assertThat(testTechnicien.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testTechnicien.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testTechnicien.getNumeroRue()).isEqualTo(DEFAULT_NUMERO_RUE);
        assertThat(testTechnicien.getCodePostal()).isEqualTo(DEFAULT_CODE_POSTAL);
        assertThat(testTechnicien.getVille()).isEqualTo(DEFAULT_VILLE);
        assertThat(testTechnicien.getPays()).isEqualTo(DEFAULT_PAYS);
        assertThat(testTechnicien.getMail()).isEqualTo(DEFAULT_MAIL);
        assertThat(testTechnicien.getNumeroTel()).isEqualTo(DEFAULT_NUMERO_TEL);
        assertThat(testTechnicien.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testTechnicien.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testTechnicien.isEnable()).isEqualTo(DEFAULT_ENABLE);
    }

    @Test
    @Transactional
    public void createTechnicienWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = technicienRepository.findAll().size();

        // Create the Technicien with an existing ID
        technicien.setId(1L);
        TechnicienDTO technicienDTO = technicienMapper.toDto(technicien);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTechnicienMockMvc.perform(post("/api/techniciens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(technicienDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Technicien in the database
        List<Technicien> technicienList = technicienRepository.findAll();
        assertThat(technicienList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = technicienRepository.findAll().size();
        // set the field null
        technicien.setNom(null);

        // Create the Technicien, which fails.
        TechnicienDTO technicienDTO = technicienMapper.toDto(technicien);

        restTechnicienMockMvc.perform(post("/api/techniciens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(technicienDTO)))
            .andExpect(status().isBadRequest());

        List<Technicien> technicienList = technicienRepository.findAll();
        assertThat(technicienList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = technicienRepository.findAll().size();
        // set the field null
        technicien.setPrenom(null);

        // Create the Technicien, which fails.
        TechnicienDTO technicienDTO = technicienMapper.toDto(technicien);

        restTechnicienMockMvc.perform(post("/api/techniciens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(technicienDTO)))
            .andExpect(status().isBadRequest());

        List<Technicien> technicienList = technicienRepository.findAll();
        assertThat(technicienList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTechniciens() throws Exception {
        // Initialize the database
        technicienRepository.saveAndFlush(technicien);

        // Get all the technicienList
        restTechnicienMockMvc.perform(get("/api/techniciens?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(technicien.getId().intValue())))
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
    public void getTechnicien() throws Exception {
        // Initialize the database
        technicienRepository.saveAndFlush(technicien);

        // Get the technicien
        restTechnicienMockMvc.perform(get("/api/techniciens/{id}", technicien.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(technicien.getId().intValue()))
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
    public void getNonExistingTechnicien() throws Exception {
        // Get the technicien
        restTechnicienMockMvc.perform(get("/api/techniciens/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTechnicien() throws Exception {
        // Initialize the database
        technicienRepository.saveAndFlush(technicien);
        int databaseSizeBeforeUpdate = technicienRepository.findAll().size();

        // Update the technicien
        Technicien updatedTechnicien = technicienRepository.findOne(technicien.getId());
        // Disconnect from session so that the updates on updatedTechnicien are not directly saved in db
        em.detach(updatedTechnicien);
        updatedTechnicien
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
        TechnicienDTO technicienDTO = technicienMapper.toDto(updatedTechnicien);

        restTechnicienMockMvc.perform(put("/api/techniciens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(technicienDTO)))
            .andExpect(status().isOk());

        // Validate the Technicien in the database
        List<Technicien> technicienList = technicienRepository.findAll();
        assertThat(technicienList).hasSize(databaseSizeBeforeUpdate);
        Technicien testTechnicien = technicienList.get(technicienList.size() - 1);
        assertThat(testTechnicien.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testTechnicien.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testTechnicien.getNumeroRue()).isEqualTo(UPDATED_NUMERO_RUE);
        assertThat(testTechnicien.getCodePostal()).isEqualTo(UPDATED_CODE_POSTAL);
        assertThat(testTechnicien.getVille()).isEqualTo(UPDATED_VILLE);
        assertThat(testTechnicien.getPays()).isEqualTo(UPDATED_PAYS);
        assertThat(testTechnicien.getMail()).isEqualTo(UPDATED_MAIL);
        assertThat(testTechnicien.getNumeroTel()).isEqualTo(UPDATED_NUMERO_TEL);
        assertThat(testTechnicien.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testTechnicien.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testTechnicien.isEnable()).isEqualTo(UPDATED_ENABLE);
    }

    @Test
    @Transactional
    public void updateNonExistingTechnicien() throws Exception {
        int databaseSizeBeforeUpdate = technicienRepository.findAll().size();

        // Create the Technicien
        TechnicienDTO technicienDTO = technicienMapper.toDto(technicien);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTechnicienMockMvc.perform(put("/api/techniciens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(technicienDTO)))
            .andExpect(status().isCreated());

        // Validate the Technicien in the database
        List<Technicien> technicienList = technicienRepository.findAll();
        assertThat(technicienList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTechnicien() throws Exception {
        // Initialize the database
        technicienRepository.saveAndFlush(technicien);
        int databaseSizeBeforeDelete = technicienRepository.findAll().size();

        // Get the technicien
        restTechnicienMockMvc.perform(delete("/api/techniciens/{id}", technicien.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Technicien> technicienList = technicienRepository.findAll();
        assertThat(technicienList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Technicien.class);
        Technicien technicien1 = new Technicien();
        technicien1.setId(1L);
        Technicien technicien2 = new Technicien();
        technicien2.setId(technicien1.getId());
        assertThat(technicien1).isEqualTo(technicien2);
        technicien2.setId(2L);
        assertThat(technicien1).isNotEqualTo(technicien2);
        technicien1.setId(null);
        assertThat(technicien1).isNotEqualTo(technicien2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TechnicienDTO.class);
        TechnicienDTO technicienDTO1 = new TechnicienDTO();
        technicienDTO1.setId(1L);
        TechnicienDTO technicienDTO2 = new TechnicienDTO();
        assertThat(technicienDTO1).isNotEqualTo(technicienDTO2);
        technicienDTO2.setId(technicienDTO1.getId());
        assertThat(technicienDTO1).isEqualTo(technicienDTO2);
        technicienDTO2.setId(2L);
        assertThat(technicienDTO1).isNotEqualTo(technicienDTO2);
        technicienDTO1.setId(null);
        assertThat(technicienDTO1).isNotEqualTo(technicienDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(technicienMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(technicienMapper.fromId(null)).isNull();
    }
}
