package com.factory.service.mapper;

import com.factory.domain.Formateur;
import com.factory.service.dto.FormateurDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2018-06-17T21:20:31+0200",
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

        return formateur;
    }
}
