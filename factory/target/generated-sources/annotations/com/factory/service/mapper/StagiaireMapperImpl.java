package com.factory.service.mapper;

import com.factory.domain.Formation;
import com.factory.domain.Ordinateur;
import com.factory.domain.Stagiaire;
import com.factory.service.dto.StagiaireDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2018-06-18T09:29:41+0200",
    comments = "version: 1.2.0.Final, compiler: javac, environment: Java 1.8.0_171 (Oracle Corporation)"
)
@Component
public class StagiaireMapperImpl implements StagiaireMapper {

    @Autowired
    private FormationMapper formationMapper;
    @Autowired
    private OrdinateurMapper ordinateurMapper;

    @Override
    public List<Stagiaire> toEntity(List<StagiaireDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Stagiaire> list = new ArrayList<Stagiaire>( dtoList.size() );
        for ( StagiaireDTO stagiaireDTO : dtoList ) {
            list.add( toEntity( stagiaireDTO ) );
        }

        return list;
    }

    @Override
    public List<StagiaireDTO> toDto(List<Stagiaire> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<StagiaireDTO> list = new ArrayList<StagiaireDTO>( entityList.size() );
        for ( Stagiaire stagiaire : entityList ) {
            list.add( toDto( stagiaire ) );
        }

        return list;
    }

    @Override
    public StagiaireDTO toDto(Stagiaire stagiaire) {
        if ( stagiaire == null ) {
            return null;
        }

        StagiaireDTO stagiaireDTO = new StagiaireDTO();

        Long id = stagiaireOrdinateurId( stagiaire );
        if ( id != null ) {
            stagiaireDTO.setOrdinateurId( id );
        }
        Long id1 = stagiaireFormationId( stagiaire );
        if ( id1 != null ) {
            stagiaireDTO.setFormationId( id1 );
        }
        stagiaireDTO.setId( stagiaire.getId() );

        return stagiaireDTO;
    }

    @Override
    public Stagiaire toEntity(StagiaireDTO stagiaireDTO) {
        if ( stagiaireDTO == null ) {
            return null;
        }

        Stagiaire stagiaire = new Stagiaire();

        stagiaire.setOrdinateur( ordinateurMapper.fromId( stagiaireDTO.getOrdinateurId() ) );
        stagiaire.setFormation( formationMapper.fromId( stagiaireDTO.getFormationId() ) );
        stagiaire.setId( stagiaireDTO.getId() );

        return stagiaire;
    }

    private Long stagiaireOrdinateurId(Stagiaire stagiaire) {
        if ( stagiaire == null ) {
            return null;
        }
        Ordinateur ordinateur = stagiaire.getOrdinateur();
        if ( ordinateur == null ) {
            return null;
        }
        Long id = ordinateur.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long stagiaireFormationId(Stagiaire stagiaire) {
        if ( stagiaire == null ) {
            return null;
        }
        Formation formation = stagiaire.getFormation();
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
