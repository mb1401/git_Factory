package com.factory.service.mapper;

import com.factory.domain.Gestionnaire;
import com.factory.service.dto.GestionnaireDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2018-06-18T17:50:50+0200",
    comments = "version: 1.2.0.Final, compiler: javac, environment: Java 1.8.0_171 (Oracle Corporation)"
)
@Component
public class GestionnaireMapperImpl implements GestionnaireMapper {

    @Override
    public GestionnaireDTO toDto(Gestionnaire entity) {
        if ( entity == null ) {
            return null;
        }

        GestionnaireDTO gestionnaireDTO = new GestionnaireDTO();

        gestionnaireDTO.setId( entity.getId() );
        gestionnaireDTO.setNom( entity.getNom() );
        gestionnaireDTO.setPrenom( entity.getPrenom() );
        gestionnaireDTO.setNumeroRue( entity.getNumeroRue() );
        gestionnaireDTO.setRue( entity.getRue() );
        gestionnaireDTO.setCodePostal( entity.getCodePostal() );
        gestionnaireDTO.setVille( entity.getVille() );
        gestionnaireDTO.setPays( entity.getPays() );
        gestionnaireDTO.setMail( entity.getMail() );
        gestionnaireDTO.setNumeroTel( entity.getNumeroTel() );
        gestionnaireDTO.setUsername( entity.getUsername() );
        gestionnaireDTO.setPassword( entity.getPassword() );
        gestionnaireDTO.setEnable( entity.isEnable() );

        return gestionnaireDTO;
    }

    @Override
    public List<Gestionnaire> toEntity(List<GestionnaireDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Gestionnaire> list = new ArrayList<Gestionnaire>( dtoList.size() );
        for ( GestionnaireDTO gestionnaireDTO : dtoList ) {
            list.add( toEntity( gestionnaireDTO ) );
        }

        return list;
    }

    @Override
    public List<GestionnaireDTO> toDto(List<Gestionnaire> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<GestionnaireDTO> list = new ArrayList<GestionnaireDTO>( entityList.size() );
        for ( Gestionnaire gestionnaire : entityList ) {
            list.add( toDto( gestionnaire ) );
        }

        return list;
    }

    @Override
    public Gestionnaire toEntity(GestionnaireDTO gestionnaireDTO) {
        if ( gestionnaireDTO == null ) {
            return null;
        }

        Gestionnaire gestionnaire = new Gestionnaire();

        gestionnaire.setId( gestionnaireDTO.getId() );
        gestionnaire.setNom( gestionnaireDTO.getNom() );
        gestionnaire.setPrenom( gestionnaireDTO.getPrenom() );
        gestionnaire.setNumeroRue( gestionnaireDTO.getNumeroRue() );
        gestionnaire.setRue( gestionnaireDTO.getRue() );
        gestionnaire.setCodePostal( gestionnaireDTO.getCodePostal() );
        gestionnaire.setVille( gestionnaireDTO.getVille() );
        gestionnaire.setPays( gestionnaireDTO.getPays() );
        gestionnaire.setMail( gestionnaireDTO.getMail() );
        gestionnaire.setNumeroTel( gestionnaireDTO.getNumeroTel() );
        gestionnaire.setUsername( gestionnaireDTO.getUsername() );
        gestionnaire.setPassword( gestionnaireDTO.getPassword() );
        gestionnaire.setEnable( gestionnaireDTO.isEnable() );

        return gestionnaire;
    }
}
