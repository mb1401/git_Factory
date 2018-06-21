package com.factory.service.mapper;

import com.factory.domain.Technicien;
import com.factory.service.dto.TechnicienDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
<<<<<<< Updated upstream
    date = "2018-06-21T09:46:46+0200",
=======
    date = "2018-06-21T09:28:37+0200",
>>>>>>> Stashed changes
    comments = "version: 1.2.0.Final, compiler: javac, environment: Java 1.8.0_171 (Oracle Corporation)"
)
@Component
public class TechnicienMapperImpl implements TechnicienMapper {

    @Override
    public Technicien toEntity(TechnicienDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Technicien technicien = new Technicien();

        technicien.setId( dto.getId() );
        technicien.setNom( dto.getNom() );
        technicien.setPrenom( dto.getPrenom() );
        technicien.setNumeroRue( dto.getNumeroRue() );
        technicien.setCodePostal( dto.getCodePostal() );
        technicien.setVille( dto.getVille() );
        technicien.setPays( dto.getPays() );
        technicien.setMail( dto.getMail() );
        technicien.setNumeroTel( dto.getNumeroTel() );
        technicien.setUsername( dto.getUsername() );
        technicien.setPassword( dto.getPassword() );
        technicien.setEnable( dto.isEnable() );

        return technicien;
    }

    @Override
    public TechnicienDTO toDto(Technicien entity) {
        if ( entity == null ) {
            return null;
        }

        TechnicienDTO technicienDTO = new TechnicienDTO();

        technicienDTO.setId( entity.getId() );
        technicienDTO.setNom( entity.getNom() );
        technicienDTO.setPrenom( entity.getPrenom() );
        technicienDTO.setNumeroRue( entity.getNumeroRue() );
        technicienDTO.setCodePostal( entity.getCodePostal() );
        technicienDTO.setVille( entity.getVille() );
        technicienDTO.setPays( entity.getPays() );
        technicienDTO.setMail( entity.getMail() );
        technicienDTO.setNumeroTel( entity.getNumeroTel() );
        technicienDTO.setUsername( entity.getUsername() );
        technicienDTO.setPassword( entity.getPassword() );
        technicienDTO.setEnable( entity.isEnable() );

        return technicienDTO;
    }

    @Override
    public List<Technicien> toEntity(List<TechnicienDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Technicien> list = new ArrayList<Technicien>( dtoList.size() );
        for ( TechnicienDTO technicienDTO : dtoList ) {
            list.add( toEntity( technicienDTO ) );
        }

        return list;
    }

    @Override
    public List<TechnicienDTO> toDto(List<Technicien> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<TechnicienDTO> list = new ArrayList<TechnicienDTO>( entityList.size() );
        for ( Technicien technicien : entityList ) {
            list.add( toDto( technicien ) );
        }

        return list;
    }
}
