package com.factory.domain;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Formation.class)
public abstract class Formation_ {

	public static volatile SingularAttribute<Formation, Formateur> formateur;
	public static volatile SingularAttribute<Formation, Gestionnaire> gestionnaire;
	public static volatile SingularAttribute<Formation, LocalDate> dateDebut;
	public static volatile SingularAttribute<Formation, String> description;
	public static volatile SingularAttribute<Formation, Long> id;
	public static volatile SingularAttribute<Formation, LocalDate> dateFin;
	public static volatile SetAttribute<Formation, Module> modules;
	public static volatile SetAttribute<Formation, Stagiaire> stagiaires;

}

