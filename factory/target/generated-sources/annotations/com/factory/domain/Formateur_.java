package com.factory.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Formateur.class)
public abstract class Formateur_ {

	public static volatile SetAttribute<Formateur, Matiere> matieres;
	public static volatile SingularAttribute<Formateur, String> ville;
	public static volatile SingularAttribute<Formateur, String> mail;
	public static volatile SingularAttribute<Formateur, String> numeroRue;
	public static volatile SingularAttribute<Formateur, String> codePostal;
	public static volatile SingularAttribute<Formateur, String> nom;
	public static volatile SetAttribute<Formateur, Module> modules;
	public static volatile SingularAttribute<Formateur, String> password;
	public static volatile SingularAttribute<Formateur, String> numeroTel;
	public static volatile SetAttribute<Formateur, Formation> formations;
	public static volatile SingularAttribute<Formateur, Boolean> enable;
	public static volatile SingularAttribute<Formateur, Long> id;
	public static volatile SingularAttribute<Formateur, String> prenom;
	public static volatile SingularAttribute<Formateur, String> pays;
	public static volatile SingularAttribute<Formateur, String> username;

}

