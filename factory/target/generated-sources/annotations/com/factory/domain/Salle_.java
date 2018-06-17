package com.factory.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Salle.class)
public abstract class Salle_ extends com.factory.domain.Ressource_ {

	public static volatile SingularAttribute<Salle, Integer> capacite;
	public static volatile SetAttribute<Salle, Module> modules;

}

