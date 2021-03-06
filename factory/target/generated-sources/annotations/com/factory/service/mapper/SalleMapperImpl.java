package com.factory.service.mapper;

import com.factory.domain.Salle;
import com.factory.service.dto.SalleDTO;
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
public class SalleMapperImpl implements SalleMapper {

    @Override
    public SalleDTO toDto(Salle entity) {
        if ( entity == null ) {
            return null;
        }

        SalleDTO salleDTO = new SalleDTO();

        salleDTO.setId( entity.getId() );
        salleDTO.setNom( entity.getNom() );
        salleDTO.setCout( entity.getCout() );
        salleDTO.setCapacite( entity.getCapacite() );

        return salleDTO;
    }

    @Override
    public List<Salle> toEntity(List<SalleDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Salle> list = new ArrayList<Salle>( dtoList.size() );
        for ( SalleDTO salleDTO : dtoList ) {
            list.add( toEntity( salleDTO ) );
        }

        return list;
    }

    @Override
    public List<SalleDTO> toDto(List<Salle> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<SalleDTO> list = new ArrayList<SalleDTO>( entityList.size() );
        for ( Salle salle : entityList ) {
            list.add( toDto( salle ) );
        }

        return list;
    }

    @Override
    public Salle toEntity(SalleDTO salleDTO) {
        if ( salleDTO == null ) {
            return null;
        }

        Salle salle = new Salle();

        salle.setId( salleDTO.getId() );
        salle.setNom( salleDTO.getNom() );
        salle.setCout( salleDTO.getCout() );
        salle.setCapacite( salleDTO.getCapacite() );

        return salle;
    }
}
