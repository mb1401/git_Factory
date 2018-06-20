package com.factory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.factory.domain.Module;
import com.factory.service.dto.ModuleDTO;


/**
 * Spring Data JPA repository for the Module entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {
	
	@Query("select m from Module m where m.formation.id =:id")
	List<Module> findAllWithFormation(@Param("id") Long formationId);

}
