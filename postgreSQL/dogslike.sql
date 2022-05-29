CREATE TABLE public.dogslikes (
	dogsID serial4 NOT NULL,
	userID int4 NOT NULL,
  CONSTRAINT fk_doglikes_dog FOREIGN KEY (dogsID) REFERENCES dogs (id);
  CONSTRAINT fk_doglikes_user FOREIGN KEY (userID) REFERENCES users (id);
);

ALTER TABLE doglikes
ADD CONSTRAINT NoDuplicateLike UNIQUE (dogsID, userID);

ON CONFLICT ON CONSTRAINT  NoDuplicateLike  
DO NOTHING;