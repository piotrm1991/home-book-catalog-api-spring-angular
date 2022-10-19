package it.piotrmachnik.homebookcatalogapi.repository;

import it.piotrmachnik.homebookcatalogapi.model.StatusType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface StatusTypeRepository extends JpaRepository<StatusType, Integer> {
    Collection<StatusType> findStatusTypeByName(String name);
}
