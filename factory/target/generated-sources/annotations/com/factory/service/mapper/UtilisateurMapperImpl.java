package com.factory.service.mapper;

import com.factory.domain.Utilisateur;
import com.factory.service.dto.UtilisateurDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2018-06-20T15:47:05+0200",
    comments = "version: 1.2.0.Final, compiler: javac, environment: Java 1.8.0_161 (Oracle Corporation)"
)
@Component
public class UtilisateurMapperImpl implements UtilisateurMapper {

    @Override
    public Utilisateur toEntity(UtilisateurDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Utilisateur utilisateur = new Utilisateur();

        utilisateur.setId( dto.getId() );
        utilisateur.setNom( dto.getNom() );
        utilisateur.setPrenom( dto.getPrenom() );
        utilisateur.setNumeroRue( dto.getNumeroRue() );
        utilisateur.setCodePostal( dto.getCodePostal() );
        utilisateur.setVille( dto.getVille() );
        utilisateur.setPays( dto.getPays() );
        utilisateur.setMail( dto.getMail() );
        utilisateur.setNumeroTel( dto.getNumeroTel() );
        utilisateur.setUsername( dto.getUsername() );
        utilisateur.setPassword( dto.getPassword() );
        utilisateur.setEnable( dto.isEnable() );

        return utilisateur;
    }

    @Override
    public UtilisateurDTO toDto(Utilisateur entity) {
        if ( entity == null ) {
            return null;
        }

        UtilisateurDTO utilisateurDTO = new UtilisateurDTO();

        utilisateurDTO.setId( entity.getId() );
        utilisateurDTO.setNom( entity.getNom() );
        utilisateurDTO.setPrenom( entity.getPrenom() );
        utilisateurDTO.setNumeroRue( entity.getNumeroRue() );
        utilisateurDTO.setCodePostal( entity.getCodePostal() );
        utilisateurDTO.setVille( entity.getVille() );
        utilisateurDTO.setPays( entity.getPays() );
        utilisateurDTO.setMail( entity.getMail() );
        utilisateurDTO.setNumeroTel( entity.getNumeroTel() );
        utilisateurDTO.setUsername( entity.getUsername() );
        utilisateurDTO.setPassword( entity.getPassword() );
        utilisateurDTO.setEnable( entity.isEnable() );

        return utilisateurDTO;
    }

    @Override
    public List<Utilisateur> toEntity(List<UtilisateurDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Utilisateur> list = new ArrayList<Utilisateur>( dtoList.size() );
        for ( UtilisateurDTO utilisateurDTO : dtoList ) {
            list.add( toEntity( utilisateurDTO ) );
        }

        return list;
    }

    @Override
    public List<UtilisateurDTO> toDto(List<Utilisateur> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<UtilisateurDTO> list = new ArrayList<UtilisateurDTO>( entityList.size() );
        for ( Utilisateur utilisateur : entityList ) {
            list.add( toDto( utilisateur ) );
        }

        return list;
    }
}
