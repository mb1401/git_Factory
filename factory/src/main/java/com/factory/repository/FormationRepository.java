package com.factory.repository;

import com.factory.domain.Formation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Formation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormationRepository extends JpaRepository<Formation, Long> {

}
