package com.factory.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Salle.class)
public abstract class Salle_ {

	public static volatile SingularAttribute<Salle, Integer> capacite;
	public static volatile SingularAttribute<Salle, Float> cout;
	public static volatile SingularAttribute<Salle, Long> id;
	public static volatile SingularAttribute<Salle, String> nom;
	public static volatile SetAttribute<Salle, Module> modules;

}

