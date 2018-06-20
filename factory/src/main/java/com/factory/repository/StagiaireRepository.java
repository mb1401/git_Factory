package com.factory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.factory.domain.Stagiaire;


/**
 * Spring Data JPA repository for the Stagiaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StagiaireRepository extends JpaRepository<Stagiaire, Long> {

	@Query("select s from Stagiaire s where s.formation.id =:id")
	List<Stagiaire> findAllWithFormation(@Param("id") Long id);

}
