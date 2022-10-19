package it.piotrmachnik.homebookcatalogapi.repository;

import it.piotrmachnik.homebookcatalogapi.model.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Integer> {
    Collection<Publisher> findPublisherByName(String name);
}
