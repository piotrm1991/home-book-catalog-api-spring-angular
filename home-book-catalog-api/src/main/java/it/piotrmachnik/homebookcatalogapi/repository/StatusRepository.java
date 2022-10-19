package it.piotrmachnik.homebookcatalogapi.repository;

import it.piotrmachnik.homebookcatalogapi.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<Status, Integer> {
}
