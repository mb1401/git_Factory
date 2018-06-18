package com.factory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.factory.domain.Ordinateur;
import com.factory.domain.Ressource;
import com.factory.domain.Salle;
import com.factory.domain.VideoProjecteur;

/**
 * Spring Data JPA repository for the Ressource entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RessourceRepository extends JpaRepository<Ressource, Long> {
	
}
