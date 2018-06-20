package com.factory.service.mapper;

import com.factory.domain.Ressource;
import com.factory.service.dto.RessourceDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2018-06-20T10:21:01+0200",
    comments = "version: 1.2.0.Final, compiler: javac, environment: Java 1.8.0_161 (Oracle Corporation)"
)
@Component
public class RessourceMapperImpl implements RessourceMapper {

    @Override
    public Ressource toEntity(RessourceDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Ressource ressource = new Ressource();

        ressource.setId( dto.getId() );
        ressource.setCode( dto.getCode() );
        ressource.setCout( dto.getCout() );

        return ressource;
    }

    @Override
    public RessourceDTO toDto(Ressource entity) {
        if ( entity == null ) {
            return null;
        }

        RessourceDTO ressourceDTO = new RessourceDTO();

        ressourceDTO.setId( entity.getId() );
        ressourceDTO.setCode( entity.getCode() );
        ressourceDTO.setCout( entity.getCout() );

        return ressourceDTO;
    }

    @Override
    public List<Ressource> toEntity(List<RessourceDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Ressource> list = new ArrayList<Ressource>( dtoList.size() );
        for ( RessourceDTO ressourceDTO : dtoList ) {
            list.add( toEntity( ressourceDTO ) );
        }

        return list;
    }

    @Override
    public List<RessourceDTO> toDto(List<Ressource> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<RessourceDTO> list = new ArrayList<RessourceDTO>( entityList.size() );
        for ( Ressource ressource : entityList ) {
            list.add( toDto( ressource ) );
        }

        return list;
    }
}
