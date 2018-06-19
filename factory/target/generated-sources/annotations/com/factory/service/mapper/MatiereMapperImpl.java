package com.factory.service.mapper;

import com.factory.domain.Formateur;
import com.factory.domain.Matiere;
import com.factory.service.dto.FormateurDTO;
import com.factory.service.dto.MatiereDTO;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2018-06-19T16:19:22+0200",
    comments = "version: 1.2.0.Final, compiler: javac, environment: Java 1.8.0_171 (Oracle Corporation)"
)
@Component
public class MatiereMapperImpl implements MatiereMapper {

    @Autowired
    private FormateurMapper formateurMapper;

    @Override
    public MatiereDTO toDto(Matiere entity) {
        if ( entity == null ) {
            return null;
        }

        MatiereDTO matiereDTO = new MatiereDTO();

        matiereDTO.setId( entity.getId() );
        matiereDTO.setNom( entity.getNom() );
        matiereDTO.setFormateurs( formateurSetToFormateurDTOSet( entity.getFormateurs() ) );

        return matiereDTO;
    }

    @Override
    public List<Matiere> toEntity(List<MatiereDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Matiere> list = new ArrayList<Matiere>( dtoList.size() );
        for ( MatiereDTO matiereDTO : dtoList ) {
            list.add( toEntity( matiereDTO ) );
        }

        return list;
    }

    @Override
    public List<MatiereDTO> toDto(List<Matiere> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<MatiereDTO> list = new ArrayList<MatiereDTO>( entityList.size() );
        for ( Matiere matiere : entityList ) {
            list.add( toDto( matiere ) );
        }

        return list;
    }

    @Override
    public Matiere toEntity(MatiereDTO matiereDTO) {
        if ( matiereDTO == null ) {
            return null;
        }

        Matiere matiere = new Matiere();

        matiere.setId( matiereDTO.getId() );
        matiere.setNom( matiereDTO.getNom() );
        matiere.setFormateurs( formateurDTOSetToFormateurSet( matiereDTO.getFormateurs() ) );

        return matiere;
    }

    protected Set<FormateurDTO> formateurSetToFormateurDTOSet(Set<Formateur> set) {
        if ( set == null ) {
            return null;
        }

        Set<FormateurDTO> set1 = new HashSet<FormateurDTO>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( Formateur formateur : set ) {
            set1.add( formateurMapper.toDto( formateur ) );
        }

        return set1;
    }

    protected Set<Formateur> formateurDTOSetToFormateurSet(Set<FormateurDTO> set) {
        if ( set == null ) {
            return null;
        }

        Set<Formateur> set1 = new HashSet<Formateur>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( FormateurDTO formateurDTO : set ) {
            set1.add( formateurMapper.toEntity( formateurDTO ) );
        }

        return set1;
    }
}
