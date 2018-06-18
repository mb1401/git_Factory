package com.factory.repository;

import com.factory.domain.Gestionnaire;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Gestionnaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GestionnaireRepository extends JpaRepository<Gestionnaire, Long> {

}
