package com.factory.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Matiere.class)
public abstract class Matiere_ {

	public static volatile SingularAttribute<Matiere, Long> id;
	public static volatile SetAttribute<Matiere, Formateur> formateurs;
	public static volatile SingularAttribute<Matiere, String> nom;
	public static volatile SetAttribute<Matiere, Module> modules;

}

