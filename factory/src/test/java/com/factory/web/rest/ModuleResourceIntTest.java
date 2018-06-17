package com.factory.web.rest;

import com.factory.FactoryApp;

import com.factory.domain.Module;
import com.factory.repository.ModuleRepository;
import com.factory.service.ModuleService;
import com.factory.service.dto.ModuleDTO;
import com.factory.service.mapper.ModuleMapper;
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

import com.factory.domain.enumeration.Niveau;
/**
 * Test class for the ModuleResource REST controller.
 *
 * @see ModuleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FactoryApp.class)
public class ModuleResourceIntTest {

    private static final String DEFAULT_TIRE = "AAAAAAAAAA";
    private static final String UPDATED_TIRE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENU = "AAAAAAAAAA";
    private static final String UPDATED_CONTENU = "BBBBBBBBBB";

    private static final String DEFAULT_OBJECTIF = "AAAAAAAAAA";
    private static final String UPDATED_OBJECTIF = "BBBBBBBBBB";

    private static final Niveau DEFAULT_NIVEAU = Niveau.FACILE;
    private static final Niveau UPDATED_NIVEAU = Niveau.MOYEN;

    private static final LocalDate DEFAULT_DATE_DEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FIN = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private ModuleMapper moduleMapper;

    @Autowired
    private ModuleService moduleService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restModuleMockMvc;

    private Module module;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ModuleResource moduleResource = new ModuleResource(moduleService);
        this.restModuleMockMvc = MockMvcBuilders.standaloneSetup(moduleResource)
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
    public static Module createEntity(EntityManager em) {
        Module module = new Module()
            .tire(DEFAULT_TIRE)
            .contenu(DEFAULT_CONTENU)
            .objectif(DEFAULT_OBJECTIF)
            .niveau(DEFAULT_NIVEAU)
            .dateDebut(DEFAULT_DATE_DEBUT)
            .dateFin(DEFAULT_DATE_FIN);
        return module;
    }

    @Before
    public void initTest() {
        module = createEntity(em);
    }

    @Test
    @Transactional
    public void createModule() throws Exception {
        int databaseSizeBeforeCreate = moduleRepository.findAll().size();

        // Create the Module
        ModuleDTO moduleDTO = moduleMapper.toDto(module);
        restModuleMockMvc.perform(post("/api/modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moduleDTO)))
            .andExpect(status().isCreated());

        // Validate the Module in the database
        List<Module> moduleList = moduleRepository.findAll();
        assertThat(moduleList).hasSize(databaseSizeBeforeCreate + 1);
        Module testModule = moduleList.get(moduleList.size() - 1);
        assertThat(testModule.getTire()).isEqualTo(DEFAULT_TIRE);
        assertThat(testModule.getContenu()).isEqualTo(DEFAULT_CONTENU);
        assertThat(testModule.getObjectif()).isEqualTo(DEFAULT_OBJECTIF);
        assertThat(testModule.getNiveau()).isEqualTo(DEFAULT_NIVEAU);
        assertThat(testModule.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testModule.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
    }

    @Test
    @Transactional
    public void createModuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = moduleRepository.findAll().size();

        // Create the Module with an existing ID
        module.setId(1L);
        ModuleDTO moduleDTO = moduleMapper.toDto(module);

        // An entity with an existing ID cannot be created, so this API call must fail
        restModuleMockMvc.perform(post("/api/modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moduleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Module in the database
        List<Module> moduleList = moduleRepository.findAll();
        assertThat(moduleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllModules() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get all the moduleList
        restModuleMockMvc.perform(get("/api/modules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(module.getId().intValue())))
            .andExpect(jsonPath("$.[*].tire").value(hasItem(DEFAULT_TIRE.toString())))
            .andExpect(jsonPath("$.[*].contenu").value(hasItem(DEFAULT_CONTENU.toString())))
            .andExpect(jsonPath("$.[*].objectif").value(hasItem(DEFAULT_OBJECTIF.toString())))
            .andExpect(jsonPath("$.[*].niveau").value(hasItem(DEFAULT_NIVEAU.toString())))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())));
    }

    @Test
    @Transactional
    public void getModule() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get the module
        restModuleMockMvc.perform(get("/api/modules/{id}", module.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(module.getId().intValue()))
            .andExpect(jsonPath("$.tire").value(DEFAULT_TIRE.toString()))
            .andExpect(jsonPath("$.contenu").value(DEFAULT_CONTENU.toString()))
            .andExpect(jsonPath("$.objectif").value(DEFAULT_OBJECTIF.toString()))
            .andExpect(jsonPath("$.niveau").value(DEFAULT_NIVEAU.toString()))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingModule() throws Exception {
        // Get the module
        restModuleMockMvc.perform(get("/api/modules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateModule() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);
        int databaseSizeBeforeUpdate = moduleRepository.findAll().size();

        // Update the module
        Module updatedModule = moduleRepository.findOne(module.getId());
        // Disconnect from session so that the updates on updatedModule are not directly saved in db
        em.detach(updatedModule);
        updatedModule
            .tire(UPDATED_TIRE)
            .contenu(UPDATED_CONTENU)
            .objectif(UPDATED_OBJECTIF)
            .niveau(UPDATED_NIVEAU)
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN);
        ModuleDTO moduleDTO = moduleMapper.toDto(updatedModule);

        restModuleMockMvc.perform(put("/api/modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moduleDTO)))
            .andExpect(status().isOk());

        // Validate the Module in the database
        List<Module> moduleList = moduleRepository.findAll();
        assertThat(moduleList).hasSize(databaseSizeBeforeUpdate);
        Module testModule = moduleList.get(moduleList.size() - 1);
        assertThat(testModule.getTire()).isEqualTo(UPDATED_TIRE);
        assertThat(testModule.getContenu()).isEqualTo(UPDATED_CONTENU);
        assertThat(testModule.getObjectif()).isEqualTo(UPDATED_OBJECTIF);
        assertThat(testModule.getNiveau()).isEqualTo(UPDATED_NIVEAU);
        assertThat(testModule.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testModule.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
    }

    @Test
    @Transactional
    public void updateNonExistingModule() throws Exception {
        int databaseSizeBeforeUpdate = moduleRepository.findAll().size();

        // Create the Module
        ModuleDTO moduleDTO = moduleMapper.toDto(module);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restModuleMockMvc.perform(put("/api/modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moduleDTO)))
            .andExpect(status().isCreated());

        // Validate the Module in the database
        List<Module> moduleList = moduleRepository.findAll();
        assertThat(moduleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteModule() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);
        int databaseSizeBeforeDelete = moduleRepository.findAll().size();

        // Get the module
        restModuleMockMvc.perform(delete("/api/modules/{id}", module.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Module> moduleList = moduleRepository.findAll();
        assertThat(moduleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Module.class);
        Module module1 = new Module();
        module1.setId(1L);
        Module module2 = new Module();
        module2.setId(module1.getId());
        assertThat(module1).isEqualTo(module2);
        module2.setId(2L);
        assertThat(module1).isNotEqualTo(module2);
        module1.setId(null);
        assertThat(module1).isNotEqualTo(module2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ModuleDTO.class);
        ModuleDTO moduleDTO1 = new ModuleDTO();
        moduleDTO1.setId(1L);
        ModuleDTO moduleDTO2 = new ModuleDTO();
        assertThat(moduleDTO1).isNotEqualTo(moduleDTO2);
        moduleDTO2.setId(moduleDTO1.getId());
        assertThat(moduleDTO1).isEqualTo(moduleDTO2);
        moduleDTO2.setId(2L);
        assertThat(moduleDTO1).isNotEqualTo(moduleDTO2);
        moduleDTO1.setId(null);
        assertThat(moduleDTO1).isNotEqualTo(moduleDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(moduleMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(moduleMapper.fromId(null)).isNull();
    }
}
