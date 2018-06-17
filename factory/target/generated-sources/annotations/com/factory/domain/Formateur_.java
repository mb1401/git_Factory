package com.factory.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Formateur.class)
public abstract class Formateur_ extends com.factory.domain.Utilisateur_ {

	public static volatile SetAttribute<Formateur, Matiere> matieres;
	public static volatile SetAttribute<Formateur, Formation> formations;
	public static volatile SetAttribute<Formateur, Module> modules;

}

