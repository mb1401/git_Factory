package com.factory.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Stagiaire.class)
public abstract class Stagiaire_ {

	public static volatile SingularAttribute<Stagiaire, String> ville;
	public static volatile SingularAttribute<Stagiaire, String> mail;
	public static volatile SingularAttribute<Stagiaire, String> numeroRue;
	public static volatile SingularAttribute<Stagiaire, String> codePostal;
	public static volatile SingularAttribute<Stagiaire, Formation> formation;
	public static volatile SingularAttribute<Stagiaire, String> nom;
	public static volatile SingularAttribute<Stagiaire, String> password;
	public static volatile SingularAttribute<Stagiaire, String> numeroTel;
	public static volatile SingularAttribute<Stagiaire, Boolean> enable;
	public static volatile SingularAttribute<Stagiaire, Long> id;
	public static volatile SingularAttribute<Stagiaire, String> prenom;
	public static volatile SingularAttribute<Stagiaire, Ordinateur> ordinateur;
	public static volatile SingularAttribute<Stagiaire, String> pays;
	public static volatile SingularAttribute<Stagiaire, String> username;

}

