package com.factory.service.mapper;

import com.factory.domain.Ordinateur;
import com.factory.service.dto.OrdinateurDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
<<<<<<< HEAD
    date = "2018-06-20T15:47:05+0200",
    comments = "version: 1.2.0.Final, compiler: javac, environment: Java 1.8.0_161 (Oracle Corporation)"
=======
<<<<<<< HEAD
    date = "2018-06-20T10:50:49+0200",
=======
    date = "2018-06-20T10:02:43+0200",
>>>>>>> master
    comments = "version: 1.2.0.Final, compiler: javac, environment: Java 1.8.0_171 (Oracle Corporation)"
>>>>>>> master
)
@Component
public class OrdinateurMapperImpl implements OrdinateurMapper {

    @Override
    public OrdinateurDTO toDto(Ordinateur entity) {
        if ( entity == null ) {
            return null;
        }

        OrdinateurDTO ordinateurDTO = new OrdinateurDTO();

        ordinateurDTO.setId( entity.getId() );
        ordinateurDTO.setCode( entity.getCode() );
        ordinateurDTO.setCout( entity.getCout() );
        ordinateurDTO.setProcesseur( entity.getProcesseur() );
        ordinateurDTO.setRam( entity.getRam() );
        ordinateurDTO.setQuantiteDD( entity.getQuantiteDD() );
        ordinateurDTO.setDateAchat( entity.getDateAchat() );

        return ordinateurDTO;
    }

    @Override
    public List<Ordinateur> toEntity(List<OrdinateurDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Ordinateur> list = new ArrayList<Ordinateur>( dtoList.size() );
        for ( OrdinateurDTO ordinateurDTO : dtoList ) {
            list.add( toEntity( ordinateurDTO ) );
        }

        return list;
    }

    @Override
    public List<OrdinateurDTO> toDto(List<Ordinateur> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<OrdinateurDTO> list = new ArrayList<OrdinateurDTO>( entityList.size() );
        for ( Ordinateur ordinateur : entityList ) {
            list.add( toDto( ordinateur ) );
        }

        return list;
    }

    @Override
    public Ordinateur toEntity(OrdinateurDTO ordinateurDTO) {
        if ( ordinateurDTO == null ) {
            return null;
        }

        Ordinateur ordinateur = new Ordinateur();

        ordinateur.setId( ordinateurDTO.getId() );
        ordinateur.setCode( ordinateurDTO.getCode() );
        ordinateur.setCout( ordinateurDTO.getCout() );
        ordinateur.setProcesseur( ordinateurDTO.getProcesseur() );
        ordinateur.setRam( ordinateurDTO.getRam() );
        ordinateur.setQuantiteDD( ordinateurDTO.getQuantiteDD() );
        ordinateur.setDateAchat( ordinateurDTO.getDateAchat() );

        return ordinateur;
    }
}
