package com.factory.service.mapper;

import com.factory.domain.Technicien;
import com.factory.service.dto.TechnicienDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2018-06-17T21:20:32+0200",
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

        return technicien;
    }

    @Override
    public TechnicienDTO toDto(Technicien entity) {
        if ( entity == null ) {
            return null;
        }

        TechnicienDTO technicienDTO = new TechnicienDTO();

        technicienDTO.setId( entity.getId() );

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
