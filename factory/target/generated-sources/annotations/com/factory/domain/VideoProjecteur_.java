package com.factory.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(VideoProjecteur.class)
public abstract class VideoProjecteur_ {

	public static volatile SingularAttribute<VideoProjecteur, String> code;
	public static volatile SingularAttribute<VideoProjecteur, Float> cout;
	public static volatile SingularAttribute<VideoProjecteur, Long> id;
	public static volatile SetAttribute<VideoProjecteur, Module> modules;

}

