package com.testfactory.aplliweb.repository;

import com.testfactory.aplliweb.domain.VideoProjecteur;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the VideoProjecteur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VideoProjecteurRepository extends JpaRepository<VideoProjecteur, Long> {

}
