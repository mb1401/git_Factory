package com.factory.web.rest;

import com.factory.FactoryApp;

import com.factory.domain.Formateur;
import com.factory.repository.FormateurRepository;
import com.factory.service.FormateurService;
import com.factory.service.dto.FormateurDTO;
import com.factory.service.mapper.FormateurMapper;
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
 * Test class for the FormateurResource REST controller.
 *
 * @see FormateurResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FactoryApp.class)
public class FormateurResourceIntTest {

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
    private FormateurRepository formateurRepository;

    @Autowired
    private FormateurMapper formateurMapper;

    @Autowired
    private FormateurService formateurService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFormateurMockMvc;

    private Formateur formateur;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FormateurResource formateurResource = new FormateurResource(formateurService);
        this.restFormateurMockMvc = MockMvcBuilders.standaloneSetup(formateurResource)
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
    public static Formateur createEntity(EntityManager em) {
        Formateur formateur = new Formateur()
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
        return formateur;
    }

    @Before
    public void initTest() {
        formateur = createEntity(em);
    }

    @Test
    @Transactional
    public void createFormateur() throws Exception {
        int databaseSizeBeforeCreate = formateurRepository.findAll().size();

        // Create the Formateur
        FormateurDTO formateurDTO = formateurMapper.toDto(formateur);
        restFormateurMockMvc.perform(post("/api/formateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formateurDTO)))
            .andExpect(status().isCreated());

        // Validate the Formateur in the database
        List<Formateur> formateurList = formateurRepository.findAll();
        assertThat(formateurList).hasSize(databaseSizeBeforeCreate + 1);
        Formateur testFormateur = formateurList.get(formateurList.size() - 1);
        assertThat(testFormateur.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testFormateur.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testFormateur.getNumeroRue()).isEqualTo(DEFAULT_NUMERO_RUE);
        assertThat(testFormateur.getRue()).isEqualTo(DEFAULT_RUE);
        assertThat(testFormateur.getCodePostal()).isEqualTo(DEFAULT_CODE_POSTAL);
        assertThat(testFormateur.getVille()).isEqualTo(DEFAULT_VILLE);
        assertThat(testFormateur.getPays()).isEqualTo(DEFAULT_PAYS);
        assertThat(testFormateur.getMail()).isEqualTo(DEFAULT_MAIL);
        assertThat(testFormateur.getNumeroTel()).isEqualTo(DEFAULT_NUMERO_TEL);
        assertThat(testFormateur.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testFormateur.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testFormateur.isEnable()).isEqualTo(DEFAULT_ENABLE);
    }

    @Test
    @Transactional
    public void createFormateurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formateurRepository.findAll().size();

        // Create the Formateur with an existing ID
        formateur.setId(1L);
        FormateurDTO formateurDTO = formateurMapper.toDto(formateur);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormateurMockMvc.perform(post("/api/formateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formateurDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Formateur in the database
        List<Formateur> formateurList = formateurRepository.findAll();
        assertThat(formateurList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFormateurs() throws Exception {
        // Initialize the database
        formateurRepository.saveAndFlush(formateur);

        // Get all the formateurList
        restFormateurMockMvc.perform(get("/api/formateurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(formateur.getId().intValue())))
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
    public void getFormateur() throws Exception {
        // Initialize the database
        formateurRepository.saveAndFlush(formateur);

        // Get the formateur
        restFormateurMockMvc.perform(get("/api/formateurs/{id}", formateur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(formateur.getId().intValue()))
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
    public void getNonExistingFormateur() throws Exception {
        // Get the formateur
        restFormateurMockMvc.perform(get("/api/formateurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFormateur() throws Exception {
        // Initialize the database
        formateurRepository.saveAndFlush(formateur);
        int databaseSizeBeforeUpdate = formateurRepository.findAll().size();

        // Update the formateur
        Formateur updatedFormateur = formateurRepository.findOne(formateur.getId());
        // Disconnect from session so that the updates on updatedFormateur are not directly saved in db
        em.detach(updatedFormateur);
        updatedFormateur
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
        FormateurDTO formateurDTO = formateurMapper.toDto(updatedFormateur);

        restFormateurMockMvc.perform(put("/api/formateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formateurDTO)))
            .andExpect(status().isOk());

        // Validate the Formateur in the database
        List<Formateur> formateurList = formateurRepository.findAll();
        assertThat(formateurList).hasSize(databaseSizeBeforeUpdate);
        Formateur testFormateur = formateurList.get(formateurList.size() - 1);
        assertThat(testFormateur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testFormateur.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testFormateur.getNumeroRue()).isEqualTo(UPDATED_NUMERO_RUE);
        assertThat(testFormateur.getRue()).isEqualTo(UPDATED_RUE);
        assertThat(testFormateur.getCodePostal()).isEqualTo(UPDATED_CODE_POSTAL);
        assertThat(testFormateur.getVille()).isEqualTo(UPDATED_VILLE);
        assertThat(testFormateur.getPays()).isEqualTo(UPDATED_PAYS);
        assertThat(testFormateur.getMail()).isEqualTo(UPDATED_MAIL);
        assertThat(testFormateur.getNumeroTel()).isEqualTo(UPDATED_NUMERO_TEL);
        assertThat(testFormateur.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testFormateur.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testFormateur.isEnable()).isEqualTo(UPDATED_ENABLE);
    }

    @Test
    @Transactional
    public void updateNonExistingFormateur() throws Exception {
        int databaseSizeBeforeUpdate = formateurRepository.findAll().size();

        // Create the Formateur
        FormateurDTO formateurDTO = formateurMapper.toDto(formateur);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFormateurMockMvc.perform(put("/api/formateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formateurDTO)))
            .andExpect(status().isCreated());

        // Validate the Formateur in the database
        List<Formateur> formateurList = formateurRepository.findAll();
        assertThat(formateurList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFormateur() throws Exception {
        // Initialize the database
        formateurRepository.saveAndFlush(formateur);
        int databaseSizeBeforeDelete = formateurRepository.findAll().size();

        // Get the formateur
        restFormateurMockMvc.perform(delete("/api/formateurs/{id}", formateur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Formateur> formateurList = formateurRepository.findAll();
        assertThat(formateurList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Formateur.class);
        Formateur formateur1 = new Formateur();
        formateur1.setId(1L);
        Formateur formateur2 = new Formateur();
        formateur2.setId(formateur1.getId());
        assertThat(formateur1).isEqualTo(formateur2);
        formateur2.setId(2L);
        assertThat(formateur1).isNotEqualTo(formateur2);
        formateur1.setId(null);
        assertThat(formateur1).isNotEqualTo(formateur2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FormateurDTO.class);
        FormateurDTO formateurDTO1 = new FormateurDTO();
        formateurDTO1.setId(1L);
        FormateurDTO formateurDTO2 = new FormateurDTO();
        assertThat(formateurDTO1).isNotEqualTo(formateurDTO2);
        formateurDTO2.setId(formateurDTO1.getId());
        assertThat(formateurDTO1).isEqualTo(formateurDTO2);
        formateurDTO2.setId(2L);
        assertThat(formateurDTO1).isNotEqualTo(formateurDTO2);
        formateurDTO1.setId(null);
        assertThat(formateurDTO1).isNotEqualTo(formateurDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(formateurMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(formateurMapper.fromId(null)).isNull();
    }
}
