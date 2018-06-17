package com.factory.domain;

import com.factory.domain.enumeration.Processeur;
import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Ordinateur.class)
public abstract class Ordinateur_ extends com.factory.domain.Ressource_ {

	public static volatile SingularAttribute<Ordinateur, Integer> quantiteDD;
	public static volatile SingularAttribute<Ordinateur, LocalDate> dateAchat;
	public static volatile SingularAttribute<Ordinateur, Processeur> processeur;
	public static volatile SingularAttribute<Ordinateur, Integer> ram;
	public static volatile SetAttribute<Ordinateur, Stagiaire> stagiaires;

}

