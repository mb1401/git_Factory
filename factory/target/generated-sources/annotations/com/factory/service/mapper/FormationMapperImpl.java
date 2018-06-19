package com.factory.service.mapper;

import com.factory.domain.Formateur;
import com.factory.domain.Formation;
import com.factory.domain.Gestionnaire;
import com.factory.service.dto.FormationDTO;
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
    date = "2018-06-19T10:26:52+0200",
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
public class FormationMapperImpl implements FormationMapper {

    @Autowired
    private FormateurMapper formateurMapper;
    @Autowired
    private GestionnaireMapper gestionnaireMapper;

    @Override
    public List<Formation> toEntity(List<FormationDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Formation> list = new ArrayList<Formation>( dtoList.size() );
        for ( FormationDTO formationDTO : dtoList ) {
            list.add( toEntity( formationDTO ) );
        }

        return list;
    }

    @Override
    public List<FormationDTO> toDto(List<Formation> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<FormationDTO> list = new ArrayList<FormationDTO>( entityList.size() );
        for ( Formation formation : entityList ) {
            list.add( toDto( formation ) );
        }

        return list;
    }

    @Override
    public FormationDTO toDto(Formation formation) {
        if ( formation == null ) {
            return null;
        }

        FormationDTO formationDTO = new FormationDTO();

        Long id = formationGestionnaireId( formation );
        if ( id != null ) {
            formationDTO.setGestionnaireId( id );
        }
        Long id1 = formationFormateurId( formation );
        if ( id1 != null ) {
            formationDTO.setFormateurId( id1 );
        }
        formationDTO.setId( formation.getId() );
        formationDTO.setDateDebut( formation.getDateDebut() );
        formationDTO.setDateFin( formation.getDateFin() );
        formationDTO.setDescription( formation.getDescription() );

        return formationDTO;
    }

    @Override
    public Formation toEntity(FormationDTO formationDTO) {
        if ( formationDTO == null ) {
            return null;
        }

        Formation formation = new Formation();

        formation.setFormateur( formateurMapper.fromId( formationDTO.getFormateurId() ) );
        formation.setGestionnaire( gestionnaireMapper.fromId( formationDTO.getGestionnaireId() ) );
        formation.setId( formationDTO.getId() );
        formation.setDateDebut( formationDTO.getDateDebut() );
        formation.setDateFin( formationDTO.getDateFin() );
        formation.setDescription( formationDTO.getDescription() );

        return formation;
    }

    private Long formationGestionnaireId(Formation formation) {
        if ( formation == null ) {
            return null;
        }
        Gestionnaire gestionnaire = formation.getGestionnaire();
        if ( gestionnaire == null ) {
            return null;
        }
        Long id = gestionnaire.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long formationFormateurId(Formation formation) {
        if ( formation == null ) {
            return null;
        }
        Formateur formateur = formation.getFormateur();
        if ( formateur == null ) {
            return null;
        }
        Long id = formateur.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
