package com.factory.repository;

import com.factory.domain.Formateur;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Formateur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormateurRepository extends JpaRepository<Formateur, Long> {

}
