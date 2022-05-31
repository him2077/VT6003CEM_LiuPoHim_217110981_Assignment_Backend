CREATE TABLE public.dogs (
	id serial4 NOT NULL,
	name varchar(32) NOT NULL,
	gender text NOT NULL,
	breed text NOT NULL,
  description text NULL,
  age smallint NOT NULL,
	datecreated timestamp NOT NULL DEFAULT now(),
	datemodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	imageurl varchar(2048) NULL,
	userid int4 NULL,
	CONSTRAINT dogs_pkey PRIMARY KEY (id),
  CONSTRAINT fk_dogs FOREIGN KEY (userid) REFERENCES users (id);
);


INSERT INTO dogs (nam, allText, authorID) VALUES
	('title 1', 'some stuff', 1),
	('another title', 'interesting', 1),
	('last one', 'ok', 1),
	('this title is good', 'some text', 3);
