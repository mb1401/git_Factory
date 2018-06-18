package com.factory.repository;

import com.factory.domain.Technicien;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Technicien entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TechnicienRepository extends JpaRepository<Technicien, Long> {

}
