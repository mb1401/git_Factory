package com.factory.service.mapper;

import com.factory.domain.Formateur;
import com.factory.service.dto.FormateurDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
<<<<<<< Updated upstream
    date = "2018-06-19T10:26:52+0200",
=======
    date = "2018-06-19T09:05:03+0200",
>>>>>>> Stashed changes
    comments = "version: 1.2.0.Final, compiler: javac, environment: Java 1.8.0_171 (Oracle Corporation)"
)
@Component
public class FormateurMapperImpl implements FormateurMapper {

    @Override
    public FormateurDTO toDto(Formateur entity) {
        if ( entity == null ) {
            return null;
        }

        FormateurDTO formateurDTO = new FormateurDTO();

        formateurDTO.setId( entity.getId() );
        formateurDTO.setNom( entity.getNom() );
        formateurDTO.setPrenom( entity.getPrenom() );
        formateurDTO.setNumeroRue( entity.getNumeroRue() );
        formateurDTO.setRue( entity.getRue() );
        formateurDTO.setCodePostal( entity.getCodePostal() );
        formateurDTO.setVille( entity.getVille() );
        formateurDTO.setPays( entity.getPays() );
        formateurDTO.setMail( entity.getMail() );
        formateurDTO.setNumeroTel( entity.getNumeroTel() );
        formateurDTO.setUsername( entity.getUsername() );
        formateurDTO.setPassword( entity.getPassword() );
        formateurDTO.setEnable( entity.isEnable() );

        return formateurDTO;
    }

    @Override
    public List<Formateur> toEntity(List<FormateurDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Formateur> list = new ArrayList<Formateur>( dtoList.size() );
        for ( FormateurDTO formateurDTO : dtoList ) {
            list.add( toEntity( formateurDTO ) );
        }

        return list;
    }

    @Override
    public List<FormateurDTO> toDto(List<Formateur> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<FormateurDTO> list = new ArrayList<FormateurDTO>( entityList.size() );
        for ( Formateur formateur : entityList ) {
            list.add( toDto( formateur ) );
        }

        return list;
    }

    @Override
    public Formateur toEntity(FormateurDTO formateurDTO) {
        if ( formateurDTO == null ) {
            return null;
        }

        Formateur formateur = new Formateur();

        formateur.setId( formateurDTO.getId() );
        formateur.setNom( formateurDTO.getNom() );
        formateur.setPrenom( formateurDTO.getPrenom() );
        formateur.setNumeroRue( formateurDTO.getNumeroRue() );
        formateur.setRue( formateurDTO.getRue() );
        formateur.setCodePostal( formateurDTO.getCodePostal() );
        formateur.setVille( formateurDTO.getVille() );
        formateur.setPays( formateurDTO.getPays() );
        formateur.setMail( formateurDTO.getMail() );
        formateur.setNumeroTel( formateurDTO.getNumeroTel() );
        formateur.setUsername( formateurDTO.getUsername() );
        formateur.setPassword( formateurDTO.getPassword() );
        formateur.setEnable( formateurDTO.isEnable() );

        return formateur;
    }
}
