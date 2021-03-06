package com.factory.service.mapper;

import com.factory.domain.VideoProjecteur;
import com.factory.service.dto.VideoProjecteurDTO;
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
public class VideoProjecteurMapperImpl implements VideoProjecteurMapper {

    @Override
    public VideoProjecteurDTO toDto(VideoProjecteur entity) {
        if ( entity == null ) {
            return null;
        }

        VideoProjecteurDTO videoProjecteurDTO = new VideoProjecteurDTO();

        videoProjecteurDTO.setId( entity.getId() );
        videoProjecteurDTO.setCode( entity.getCode() );
        videoProjecteurDTO.setCout( entity.getCout() );

        return videoProjecteurDTO;
    }

    @Override
    public List<VideoProjecteur> toEntity(List<VideoProjecteurDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<VideoProjecteur> list = new ArrayList<VideoProjecteur>( dtoList.size() );
        for ( VideoProjecteurDTO videoProjecteurDTO : dtoList ) {
            list.add( toEntity( videoProjecteurDTO ) );
        }

        return list;
    }

    @Override
    public List<VideoProjecteurDTO> toDto(List<VideoProjecteur> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<VideoProjecteurDTO> list = new ArrayList<VideoProjecteurDTO>( entityList.size() );
        for ( VideoProjecteur videoProjecteur : entityList ) {
            list.add( toDto( videoProjecteur ) );
        }

        return list;
    }

    @Override
    public VideoProjecteur toEntity(VideoProjecteurDTO videoProjecteurDTO) {
        if ( videoProjecteurDTO == null ) {
            return null;
        }

        VideoProjecteur videoProjecteur = new VideoProjecteur();

        videoProjecteur.setId( videoProjecteurDTO.getId() );
        videoProjecteur.setCode( videoProjecteurDTO.getCode() );
        videoProjecteur.setCout( videoProjecteurDTO.getCout() );

        return videoProjecteur;
    }
}
