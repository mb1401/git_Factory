package com.factory.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Gestionnaire.class)
public abstract class Gestionnaire_ {

	public static volatile SingularAttribute<Gestionnaire, String> ville;
	public static volatile SingularAttribute<Gestionnaire, String> rue;
	public static volatile SingularAttribute<Gestionnaire, String> mail;
	public static volatile SingularAttribute<Gestionnaire, String> numeroRue;
	public static volatile SingularAttribute<Gestionnaire, String> codePostal;
	public static volatile SingularAttribute<Gestionnaire, String> nom;
	public static volatile SingularAttribute<Gestionnaire, String> password;
	public static volatile SingularAttribute<Gestionnaire, String> numeroTel;
	public static volatile SetAttribute<Gestionnaire, Formation> formations;
	public static volatile SingularAttribute<Gestionnaire, Boolean> enable;
	public static volatile SingularAttribute<Gestionnaire, Long> id;
	public static volatile SingularAttribute<Gestionnaire, String> prenom;
	public static volatile SingularAttribute<Gestionnaire, String> pays;
	public static volatile SingularAttribute<Gestionnaire, String> username;

}

