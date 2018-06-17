package com.factory.service.mapper;

import com.factory.domain.*;
import com.factory.service.dto.VideoProjecteurDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity VideoProjecteur and its DTO VideoProjecteurDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface VideoProjecteurMapper extends EntityMapper<VideoProjecteurDTO, VideoProjecteur> {


    @Mapping(target = "modules", ignore = true)
    VideoProjecteur toEntity(VideoProjecteurDTO videoProjecteurDTO);

    default VideoProjecteur fromId(Long id) {
        if (id == null) {
            return null;
        }
        VideoProjecteur videoProjecteur = new VideoProjecteur();
        videoProjecteur.setId(id);
        return videoProjecteur;
    }
}
