package com.testfactory.aplliweb.repository;

import com.testfactory.aplliweb.domain.Ordinateur;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Ordinateur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdinateurRepository extends JpaRepository<Ordinateur, Long> {

}
