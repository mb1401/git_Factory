package com.factory.web.rest;

import com.factory.FactoryApp;

import com.factory.domain.Gestionnaire;
import com.factory.repository.GestionnaireRepository;
import com.factory.service.GestionnaireService;
import com.factory.service.dto.GestionnaireDTO;
import com.factory.service.mapper.GestionnaireMapper;
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
 * Test class for the GestionnaireResource REST controller.
 *
 * @see GestionnaireResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FactoryApp.class)
public class GestionnaireResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO_RUE = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_RUE = "BBBBBBBBBB";

    private static final String DEFAULT_RUE = "AAAAAAAAAA";
    private static final String UPDATED_RUE = "BBBBBBBBBB";

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
    private GestionnaireRepository gestionnaireRepository;

    @Autowired
    private GestionnaireMapper gestionnaireMapper;

    @Autowired
    private GestionnaireService gestionnaireService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGestionnaireMockMvc;

    private Gestionnaire gestionnaire;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GestionnaireResource gestionnaireResource = new GestionnaireResource(gestionnaireService);
        this.restGestionnaireMockMvc = MockMvcBuilders.standaloneSetup(gestionnaireResource)
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
    public static Gestionnaire createEntity(EntityManager em) {
        Gestionnaire gestionnaire = new Gestionnaire()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .numeroRue(DEFAULT_NUMERO_RUE)
            .rue(DEFAULT_RUE)
            .codePostal(DEFAULT_CODE_POSTAL)
            .ville(DEFAULT_VILLE)
            .pays(DEFAULT_PAYS)
            .mail(DEFAULT_MAIL)
            .numeroTel(DEFAULT_NUMERO_TEL)
            .username(DEFAULT_USERNAME)
            .password(DEFAULT_PASSWORD)
            .enable(DEFAULT_ENABLE);
        return gestionnaire;
    }

    @Before
    public void initTest() {
        gestionnaire = createEntity(em);
    }

    @Test
    @Transactional
    public void createGestionnaire() throws Exception {
        int databaseSizeBeforeCreate = gestionnaireRepository.findAll().size();

        // Create the Gestionnaire
        GestionnaireDTO gestionnaireDTO = gestionnaireMapper.toDto(gestionnaire);
        restGestionnaireMockMvc.perform(post("/api/gestionnaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gestionnaireDTO)))
            .andExpect(status().isCreated());

        // Validate the Gestionnaire in the database
        List<Gestionnaire> gestionnaireList = gestionnaireRepository.findAll();
        assertThat(gestionnaireList).hasSize(databaseSizeBeforeCreate + 1);
        Gestionnaire testGestionnaire = gestionnaireList.get(gestionnaireList.size() - 1);
        assertThat(testGestionnaire.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testGestionnaire.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testGestionnaire.getNumeroRue()).isEqualTo(DEFAULT_NUMERO_RUE);
        assertThat(testGestionnaire.getRue()).isEqualTo(DEFAULT_RUE);
        assertThat(testGestionnaire.getCodePostal()).isEqualTo(DEFAULT_CODE_POSTAL);
        assertThat(testGestionnaire.getVille()).isEqualTo(DEFAULT_VILLE);
        assertThat(testGestionnaire.getPays()).isEqualTo(DEFAULT_PAYS);
        assertThat(testGestionnaire.getMail()).isEqualTo(DEFAULT_MAIL);
        assertThat(testGestionnaire.getNumeroTel()).isEqualTo(DEFAULT_NUMERO_TEL);
        assertThat(testGestionnaire.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testGestionnaire.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testGestionnaire.isEnable()).isEqualTo(DEFAULT_ENABLE);
    }

    @Test
    @Transactional
    public void createGestionnaireWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gestionnaireRepository.findAll().size();

        // Create the Gestionnaire with an existing ID
        gestionnaire.setId(1L);
        GestionnaireDTO gestionnaireDTO = gestionnaireMapper.toDto(gestionnaire);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGestionnaireMockMvc.perform(post("/api/gestionnaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gestionnaireDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Gestionnaire in the database
        List<Gestionnaire> gestionnaireList = gestionnaireRepository.findAll();
        assertThat(gestionnaireList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGestionnaires() throws Exception {
        // Initialize the database
        gestionnaireRepository.saveAndFlush(gestionnaire);

        // Get all the gestionnaireList
        restGestionnaireMockMvc.perform(get("/api/gestionnaires?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gestionnaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].numeroRue").value(hasItem(DEFAULT_NUMERO_RUE.toString())))
            .andExpect(jsonPath("$.[*].rue").value(hasItem(DEFAULT_RUE.toString())))
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
    public void getGestionnaire() throws Exception {
        // Initialize the database
        gestionnaireRepository.saveAndFlush(gestionnaire);

        // Get the gestionnaire
        restGestionnaireMockMvc.perform(get("/api/gestionnaires/{id}", gestionnaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gestionnaire.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.numeroRue").value(DEFAULT_NUMERO_RUE.toString()))
            .andExpect(jsonPath("$.rue").value(DEFAULT_RUE.toString()))
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
    public void getNonExistingGestionnaire() throws Exception {
        // Get the gestionnaire
        restGestionnaireMockMvc.perform(get("/api/gestionnaires/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGestionnaire() throws Exception {
        // Initialize the database
        gestionnaireRepository.saveAndFlush(gestionnaire);
        int databaseSizeBeforeUpdate = gestionnaireRepository.findAll().size();

        // Update the gestionnaire
        Gestionnaire updatedGestionnaire = gestionnaireRepository.findOne(gestionnaire.getId());
        // Disconnect from session so that the updates on updatedGestionnaire are not directly saved in db
        em.detach(updatedGestionnaire);
        updatedGestionnaire
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .numeroRue(UPDATED_NUMERO_RUE)
            .rue(UPDATED_RUE)
            .codePostal(UPDATED_CODE_POSTAL)
            .ville(UPDATED_VILLE)
            .pays(UPDATED_PAYS)
            .mail(UPDATED_MAIL)
            .numeroTel(UPDATED_NUMERO_TEL)
            .username(UPDATED_USERNAME)
            .password(UPDATED_PASSWORD)
            .enable(UPDATED_ENABLE);
        GestionnaireDTO gestionnaireDTO = gestionnaireMapper.toDto(updatedGestionnaire);

        restGestionnaireMockMvc.perform(put("/api/gestionnaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gestionnaireDTO)))
            .andExpect(status().isOk());

        // Validate the Gestionnaire in the database
        List<Gestionnaire> gestionnaireList = gestionnaireRepository.findAll();
        assertThat(gestionnaireList).hasSize(databaseSizeBeforeUpdate);
        Gestionnaire testGestionnaire = gestionnaireList.get(gestionnaireList.size() - 1);
        assertThat(testGestionnaire.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testGestionnaire.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testGestionnaire.getNumeroRue()).isEqualTo(UPDATED_NUMERO_RUE);
        assertThat(testGestionnaire.getRue()).isEqualTo(UPDATED_RUE);
        assertThat(testGestionnaire.getCodePostal()).isEqualTo(UPDATED_CODE_POSTAL);
        assertThat(testGestionnaire.getVille()).isEqualTo(UPDATED_VILLE);
        assertThat(testGestionnaire.getPays()).isEqualTo(UPDATED_PAYS);
        assertThat(testGestionnaire.getMail()).isEqualTo(UPDATED_MAIL);
        assertThat(testGestionnaire.getNumeroTel()).isEqualTo(UPDATED_NUMERO_TEL);
        assertThat(testGestionnaire.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testGestionnaire.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testGestionnaire.isEnable()).isEqualTo(UPDATED_ENABLE);
    }

    @Test
    @Transactional
    public void updateNonExistingGestionnaire() throws Exception {
        int databaseSizeBeforeUpdate = gestionnaireRepository.findAll().size();

        // Create the Gestionnaire
        GestionnaireDTO gestionnaireDTO = gestionnaireMapper.toDto(gestionnaire);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGestionnaireMockMvc.perform(put("/api/gestionnaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gestionnaireDTO)))
            .andExpect(status().isCreated());

        // Validate the Gestionnaire in the database
        List<Gestionnaire> gestionnaireList = gestionnaireRepository.findAll();
        assertThat(gestionnaireList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGestionnaire() throws Exception {
        // Initialize the database
        gestionnaireRepository.saveAndFlush(gestionnaire);
        int databaseSizeBeforeDelete = gestionnaireRepository.findAll().size();

        // Get the gestionnaire
        restGestionnaireMockMvc.perform(delete("/api/gestionnaires/{id}", gestionnaire.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Gestionnaire> gestionnaireList = gestionnaireRepository.findAll();
        assertThat(gestionnaireList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Gestionnaire.class);
        Gestionnaire gestionnaire1 = new Gestionnaire();
        gestionnaire1.setId(1L);
        Gestionnaire gestionnaire2 = new Gestionnaire();
        gestionnaire2.setId(gestionnaire1.getId());
        assertThat(gestionnaire1).isEqualTo(gestionnaire2);
        gestionnaire2.setId(2L);
        assertThat(gestionnaire1).isNotEqualTo(gestionnaire2);
        gestionnaire1.setId(null);
        assertThat(gestionnaire1).isNotEqualTo(gestionnaire2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GestionnaireDTO.class);
        GestionnaireDTO gestionnaireDTO1 = new GestionnaireDTO();
        gestionnaireDTO1.setId(1L);
        GestionnaireDTO gestionnaireDTO2 = new GestionnaireDTO();
        assertThat(gestionnaireDTO1).isNotEqualTo(gestionnaireDTO2);
        gestionnaireDTO2.setId(gestionnaireDTO1.getId());
        assertThat(gestionnaireDTO1).isEqualTo(gestionnaireDTO2);
        gestionnaireDTO2.setId(2L);
        assertThat(gestionnaireDTO1).isNotEqualTo(gestionnaireDTO2);
        gestionnaireDTO1.setId(null);
        assertThat(gestionnaireDTO1).isNotEqualTo(gestionnaireDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gestionnaireMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gestionnaireMapper.fromId(null)).isNull();
    }
}
