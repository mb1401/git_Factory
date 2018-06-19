package com.factory.web.rest;

import com.factory.FactoryApp;

import com.factory.domain.Ordinateur;
import com.factory.repository.OrdinateurRepository;
import com.factory.service.OrdinateurService;
import com.factory.service.dto.OrdinateurDTO;
import com.factory.service.mapper.OrdinateurMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.factory.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.factory.domain.enumeration.Processeur;
/**
 * Test class for the OrdinateurResource REST controller.
 *
 * @see OrdinateurResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FactoryApp.class)
public class OrdinateurResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final Float DEFAULT_COUT = 1F;
    private static final Float UPDATED_COUT = 2F;

    private static final Processeur DEFAULT_PROCESSEUR = Processeur.P1;
    private static final Processeur UPDATED_PROCESSEUR = Processeur.P2;

    private static final Integer DEFAULT_RAM = 1;
    private static final Integer UPDATED_RAM = 2;

    private static final Integer DEFAULT_QUANTITE_DD = 1;
    private static final Integer UPDATED_QUANTITE_DD = 2;

    private static final LocalDate DEFAULT_DATE_ACHAT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_ACHAT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private OrdinateurRepository ordinateurRepository;

    @Autowired
    private OrdinateurMapper ordinateurMapper;

    @Autowired
    private OrdinateurService ordinateurService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrdinateurMockMvc;

    private Ordinateur ordinateur;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrdinateurResource ordinateurResource = new OrdinateurResource(ordinateurService);
        this.restOrdinateurMockMvc = MockMvcBuilders.standaloneSetup(ordinateurResource)
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
    public static Ordinateur createEntity(EntityManager em) {
        Ordinateur ordinateur = new Ordinateur()
            .code(DEFAULT_CODE)
            .cout(DEFAULT_COUT)
            .processeur(DEFAULT_PROCESSEUR)
            .ram(DEFAULT_RAM)
            .quantiteDD(DEFAULT_QUANTITE_DD)
            .dateAchat(DEFAULT_DATE_ACHAT);
        return ordinateur;
    }

    @Before
    public void initTest() {
        ordinateur = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrdinateur() throws Exception {
        int databaseSizeBeforeCreate = ordinateurRepository.findAll().size();

        // Create the Ordinateur
        OrdinateurDTO ordinateurDTO = ordinateurMapper.toDto(ordinateur);
        restOrdinateurMockMvc.perform(post("/api/ordinateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordinateurDTO)))
            .andExpect(status().isCreated());

        // Validate the Ordinateur in the database
        List<Ordinateur> ordinateurList = ordinateurRepository.findAll();
        assertThat(ordinateurList).hasSize(databaseSizeBeforeCreate + 1);
        Ordinateur testOrdinateur = ordinateurList.get(ordinateurList.size() - 1);
        assertThat(testOrdinateur.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testOrdinateur.getCout()).isEqualTo(DEFAULT_COUT);
        assertThat(testOrdinateur.getProcesseur()).isEqualTo(DEFAULT_PROCESSEUR);
        assertThat(testOrdinateur.getRam()).isEqualTo(DEFAULT_RAM);
        assertThat(testOrdinateur.getQuantiteDD()).isEqualTo(DEFAULT_QUANTITE_DD);
        assertThat(testOrdinateur.getDateAchat()).isEqualTo(DEFAULT_DATE_ACHAT);
    }

    @Test
    @Transactional
    public void createOrdinateurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ordinateurRepository.findAll().size();

        // Create the Ordinateur with an existing ID
        ordinateur.setId(1L);
        OrdinateurDTO ordinateurDTO = ordinateurMapper.toDto(ordinateur);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrdinateurMockMvc.perform(post("/api/ordinateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordinateurDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Ordinateur in the database
        List<Ordinateur> ordinateurList = ordinateurRepository.findAll();
        assertThat(ordinateurList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordinateurRepository.findAll().size();
        // set the field null
        ordinateur.setCode(null);

        // Create the Ordinateur, which fails.
        OrdinateurDTO ordinateurDTO = ordinateurMapper.toDto(ordinateur);

        restOrdinateurMockMvc.perform(post("/api/ordinateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordinateurDTO)))
            .andExpect(status().isBadRequest());

        List<Ordinateur> ordinateurList = ordinateurRepository.findAll();
        assertThat(ordinateurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCoutIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordinateurRepository.findAll().size();
        // set the field null
        ordinateur.setCout(null);

        // Create the Ordinateur, which fails.
        OrdinateurDTO ordinateurDTO = ordinateurMapper.toDto(ordinateur);

        restOrdinateurMockMvc.perform(post("/api/ordinateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordinateurDTO)))
            .andExpect(status().isBadRequest());

        List<Ordinateur> ordinateurList = ordinateurRepository.findAll();
        assertThat(ordinateurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateAchatIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordinateurRepository.findAll().size();
        // set the field null
        ordinateur.setDateAchat(null);

        // Create the Ordinateur, which fails.
        OrdinateurDTO ordinateurDTO = ordinateurMapper.toDto(ordinateur);

        restOrdinateurMockMvc.perform(post("/api/ordinateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordinateurDTO)))
            .andExpect(status().isBadRequest());

        List<Ordinateur> ordinateurList = ordinateurRepository.findAll();
        assertThat(ordinateurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrdinateurs() throws Exception {
        // Initialize the database
        ordinateurRepository.saveAndFlush(ordinateur);

        // Get all the ordinateurList
        restOrdinateurMockMvc.perform(get("/api/ordinateurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ordinateur.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].cout").value(hasItem(DEFAULT_COUT.doubleValue())))
            .andExpect(jsonPath("$.[*].processeur").value(hasItem(DEFAULT_PROCESSEUR.toString())))
            .andExpect(jsonPath("$.[*].ram").value(hasItem(DEFAULT_RAM)))
            .andExpect(jsonPath("$.[*].quantiteDD").value(hasItem(DEFAULT_QUANTITE_DD)))
            .andExpect(jsonPath("$.[*].dateAchat").value(hasItem(DEFAULT_DATE_ACHAT.toString())));
    }

    @Test
    @Transactional
    public void getOrdinateur() throws Exception {
        // Initialize the database
        ordinateurRepository.saveAndFlush(ordinateur);

        // Get the ordinateur
        restOrdinateurMockMvc.perform(get("/api/ordinateurs/{id}", ordinateur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ordinateur.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.cout").value(DEFAULT_COUT.doubleValue()))
            .andExpect(jsonPath("$.processeur").value(DEFAULT_PROCESSEUR.toString()))
            .andExpect(jsonPath("$.ram").value(DEFAULT_RAM))
            .andExpect(jsonPath("$.quantiteDD").value(DEFAULT_QUANTITE_DD))
            .andExpect(jsonPath("$.dateAchat").value(DEFAULT_DATE_ACHAT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrdinateur() throws Exception {
        // Get the ordinateur
        restOrdinateurMockMvc.perform(get("/api/ordinateurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrdinateur() throws Exception {
        // Initialize the database
        ordinateurRepository.saveAndFlush(ordinateur);
        int databaseSizeBeforeUpdate = ordinateurRepository.findAll().size();

        // Update the ordinateur
        Ordinateur updatedOrdinateur = ordinateurRepository.findOne(ordinateur.getId());
        // Disconnect from session so that the updates on updatedOrdinateur are not directly saved in db
        em.detach(updatedOrdinateur);
        updatedOrdinateur
            .code(UPDATED_CODE)
            .cout(UPDATED_COUT)
            .processeur(UPDATED_PROCESSEUR)
            .ram(UPDATED_RAM)
            .quantiteDD(UPDATED_QUANTITE_DD)
            .dateAchat(UPDATED_DATE_ACHAT);
        OrdinateurDTO ordinateurDTO = ordinateurMapper.toDto(updatedOrdinateur);

        restOrdinateurMockMvc.perform(put("/api/ordinateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordinateurDTO)))
            .andExpect(status().isOk());

        // Validate the Ordinateur in the database
        List<Ordinateur> ordinateurList = ordinateurRepository.findAll();
        assertThat(ordinateurList).hasSize(databaseSizeBeforeUpdate);
        Ordinateur testOrdinateur = ordinateurList.get(ordinateurList.size() - 1);
        assertThat(testOrdinateur.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testOrdinateur.getCout()).isEqualTo(UPDATED_COUT);
        assertThat(testOrdinateur.getProcesseur()).isEqualTo(UPDATED_PROCESSEUR);
        assertThat(testOrdinateur.getRam()).isEqualTo(UPDATED_RAM);
        assertThat(testOrdinateur.getQuantiteDD()).isEqualTo(UPDATED_QUANTITE_DD);
        assertThat(testOrdinateur.getDateAchat()).isEqualTo(UPDATED_DATE_ACHAT);
    }

    @Test
    @Transactional
    public void updateNonExistingOrdinateur() throws Exception {
        int databaseSizeBeforeUpdate = ordinateurRepository.findAll().size();

        // Create the Ordinateur
        OrdinateurDTO ordinateurDTO = ordinateurMapper.toDto(ordinateur);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrdinateurMockMvc.perform(put("/api/ordinateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordinateurDTO)))
            .andExpect(status().isCreated());

        // Validate the Ordinateur in the database
        List<Ordinateur> ordinateurList = ordinateurRepository.findAll();
        assertThat(ordinateurList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOrdinateur() throws Exception {
        // Initialize the database
        ordinateurRepository.saveAndFlush(ordinateur);
        int databaseSizeBeforeDelete = ordinateurRepository.findAll().size();

        // Get the ordinateur
        restOrdinateurMockMvc.perform(delete("/api/ordinateurs/{id}", ordinateur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ordinateur> ordinateurList = ordinateurRepository.findAll();
        assertThat(ordinateurList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ordinateur.class);
        Ordinateur ordinateur1 = new Ordinateur();
        ordinateur1.setId(1L);
        Ordinateur ordinateur2 = new Ordinateur();
        ordinateur2.setId(ordinateur1.getId());
        assertThat(ordinateur1).isEqualTo(ordinateur2);
        ordinateur2.setId(2L);
        assertThat(ordinateur1).isNotEqualTo(ordinateur2);
        ordinateur1.setId(null);
        assertThat(ordinateur1).isNotEqualTo(ordinateur2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrdinateurDTO.class);
        OrdinateurDTO ordinateurDTO1 = new OrdinateurDTO();
        ordinateurDTO1.setId(1L);
        OrdinateurDTO ordinateurDTO2 = new OrdinateurDTO();
        assertThat(ordinateurDTO1).isNotEqualTo(ordinateurDTO2);
        ordinateurDTO2.setId(ordinateurDTO1.getId());
        assertThat(ordinateurDTO1).isEqualTo(ordinateurDTO2);
        ordinateurDTO2.setId(2L);
        assertThat(ordinateurDTO1).isNotEqualTo(ordinateurDTO2);
        ordinateurDTO1.setId(null);
        assertThat(ordinateurDTO1).isNotEqualTo(ordinateurDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(ordinateurMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(ordinateurMapper.fromId(null)).isNull();
    }
}
