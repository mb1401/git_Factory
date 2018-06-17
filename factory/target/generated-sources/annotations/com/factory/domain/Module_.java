package com.factory.domain;

import com.factory.domain.enumeration.Niveau;
import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Module.class)
public abstract class Module_ {

	public static volatile SingularAttribute<Module, Formateur> formateur;
	public static volatile SingularAttribute<Module, LocalDate> dateDebut;
	public static volatile SingularAttribute<Module, Salle> salle;
	public static volatile SingularAttribute<Module, String> objectif;
	public static volatile SingularAttribute<Module, Long> id;
	public static volatile SingularAttribute<Module, LocalDate> dateFin;
	public static volatile SingularAttribute<Module, Formation> formation;
	public static volatile SingularAttribute<Module, VideoProjecteur> videoProjecteur;
	public static volatile SingularAttribute<Module, String> contenu;
	public static volatile SingularAttribute<Module, Niveau> niveau;
	public static volatile SingularAttribute<Module, String> tire;
	public static volatile SingularAttribute<Module, Matiere> matiere;

}

