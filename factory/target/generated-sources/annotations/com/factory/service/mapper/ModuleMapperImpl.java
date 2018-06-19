package com.factory.service.mapper;

import com.factory.domain.Formateur;
import com.factory.domain.Formation;
import com.factory.domain.Matiere;
import com.factory.domain.Module;
import com.factory.domain.Salle;
import com.factory.domain.VideoProjecteur;
import com.factory.service.dto.ModuleDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
<<<<<<< Updated upstream
<<<<<<< HEAD
    date = "2018-06-19T10:44:20+0200",
=======
<<<<<<< Updated upstream
    date = "2018-06-19T10:26:53+0200",
=======
    date = "2018-06-19T09:05:03+0200",
>>>>>>> Stashed changes
>>>>>>> master
=======
    date = "2018-06-19T11:54:27+0200",
>>>>>>> Stashed changes
    comments = "version: 1.2.0.Final, compiler: javac, environment: Java 1.8.0_171 (Oracle Corporation)"
)
@Component
public class ModuleMapperImpl implements ModuleMapper {

    @Autowired
    private FormationMapper formationMapper;
    @Autowired
    private FormateurMapper formateurMapper;
    @Autowired
    private MatiereMapper matiereMapper;
    @Autowired
    private SalleMapper salleMapper;
    @Autowired
    private VideoProjecteurMapper videoProjecteurMapper;

    @Override
    public List<Module> toEntity(List<ModuleDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Module> list = new ArrayList<Module>( dtoList.size() );
        for ( ModuleDTO moduleDTO : dtoList ) {
            list.add( toEntity( moduleDTO ) );
        }

        return list;
    }

    @Override
    public List<ModuleDTO> toDto(List<Module> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<ModuleDTO> list = new ArrayList<ModuleDTO>( entityList.size() );
        for ( Module module : entityList ) {
            list.add( toDto( module ) );
        }

        return list;
    }

    @Override
    public ModuleDTO toDto(Module module) {
        if ( module == null ) {
            return null;
        }

        ModuleDTO moduleDTO = new ModuleDTO();

        Long id = moduleVideoProjecteurId( module );
        if ( id != null ) {
            moduleDTO.setVideoProjecteurId( id );
        }
        Long id1 = moduleFormateurId( module );
        if ( id1 != null ) {
            moduleDTO.setFormateurId( id1 );
        }
        Long id2 = moduleMatiereId( module );
        if ( id2 != null ) {
            moduleDTO.setMatiereId( id2 );
        }
        Long id3 = moduleSalleId( module );
        if ( id3 != null ) {
            moduleDTO.setSalleId( id3 );
        }
        Long id4 = moduleFormationId( module );
        if ( id4 != null ) {
            moduleDTO.setFormationId( id4 );
        }
        moduleDTO.setId( module.getId() );
        moduleDTO.setTitre( module.getTitre() );
        moduleDTO.setContenu( module.getContenu() );
        moduleDTO.setObjectif( module.getObjectif() );
        moduleDTO.setNiveau( module.getNiveau() );
        moduleDTO.setDateDebut( module.getDateDebut() );
        moduleDTO.setDateFin( module.getDateFin() );

        return moduleDTO;
    }

    @Override
    public Module toEntity(ModuleDTO moduleDTO) {
        if ( moduleDTO == null ) {
            return null;
        }

        Module module = new Module();

        module.setFormateur( formateurMapper.fromId( moduleDTO.getFormateurId() ) );
        module.setFormation( formationMapper.fromId( moduleDTO.getFormationId() ) );
        module.setVideoProjecteur( videoProjecteurMapper.fromId( moduleDTO.getVideoProjecteurId() ) );
        module.setSalle( salleMapper.fromId( moduleDTO.getSalleId() ) );
        module.setMatiere( matiereMapper.fromId( moduleDTO.getMatiereId() ) );
        module.setId( moduleDTO.getId() );
        module.setTitre( moduleDTO.getTitre() );
        module.setContenu( moduleDTO.getContenu() );
        module.setObjectif( moduleDTO.getObjectif() );
        module.setNiveau( moduleDTO.getNiveau() );
        module.setDateDebut( moduleDTO.getDateDebut() );
        module.setDateFin( moduleDTO.getDateFin() );

        return module;
    }

    private Long moduleVideoProjecteurId(Module module) {
        if ( module == null ) {
            return null;
        }
        VideoProjecteur videoProjecteur = module.getVideoProjecteur();
        if ( videoProjecteur == null ) {
            return null;
        }
        Long id = videoProjecteur.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long moduleFormateurId(Module module) {
        if ( module == null ) {
            return null;
        }
        Formateur formateur = module.getFormateur();
        if ( formateur == null ) {
            return null;
        }
        Long id = formateur.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long moduleMatiereId(Module module) {
        if ( module == null ) {
            return null;
        }
        Matiere matiere = module.getMatiere();
        if ( matiere == null ) {
            return null;
        }
        Long id = matiere.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long moduleSalleId(Module module) {
        if ( module == null ) {
            return null;
        }
        Salle salle = module.getSalle();
        if ( salle == null ) {
            return null;
        }
        Long id = salle.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long moduleFormationId(Module module) {
        if ( module == null ) {
            return null;
        }
        Formation formation = module.getFormation();
        if ( formation == null ) {
            return null;
        }
        Long id = formation.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
