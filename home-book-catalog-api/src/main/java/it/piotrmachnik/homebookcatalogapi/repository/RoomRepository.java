package it.piotrmachnik.homebookcatalogapi.repository;

import it.piotrmachnik.homebookcatalogapi.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
    Collection<Room> findRoomByName(String name);
}
