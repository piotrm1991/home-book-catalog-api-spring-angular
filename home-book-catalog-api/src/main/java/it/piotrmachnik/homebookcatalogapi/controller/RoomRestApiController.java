package it.piotrmachnik.homebookcatalogapi.controller;

import it.piotrmachnik.homebookcatalogapi.config.ApiVersion;
import it.piotrmachnik.homebookcatalogapi.model.Room;
import it.piotrmachnik.homebookcatalogapi.modelDTO.RoomDTO;
import it.piotrmachnik.homebookcatalogapi.repository.RoomRepository;
import it.piotrmachnik.homebookcatalogapi.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping(value = "/api/rooms", produces = {ApiVersion.V1_HAL_JSON, MediaType.ALL_VALUE})
public class RoomRestApiController {

    private static final String REL_SELF = "self";
    private static final String REL_BOOKS = "books";
    private static final String REL_SHELVES = "shelves";
    @Autowired
    private RoomRepository roomRepository;

    private RoomService roomService;

    public RoomRestApiController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<EntityModel<Room>> getRoom(@PathVariable Integer id) {
        return this.roomRepository.findById(id).map(this::resource)
                .map(this::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public ResponseEntity<EntityModel<Room>> getRoomForAngular(@PathVariable Integer id) {
        return this.roomRepository.findById(id).map(this::resource)
                .map(this::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public CollectionModel<EntityModel<Room>> getRooms() {
        CollectionModel<EntityModel<Room>> resources = CollectionModel.of(
                this.roomRepository.findAll().stream().map(this::resource)
                        .collect(Collectors.toList()));
        addRoomLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(produces = ApiVersion.V2_FOR_ANGULAR)
    public List<EntityModel<RoomDTO>> getRoomsForAngular() {
        return this.roomService.getRoomsForAngular().stream().map(this::resourceAngular)
                .collect(Collectors.toList());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(params = "name", produces = ApiVersion.V2_FOR_ANGULAR)
    public CollectionModel<EntityModel<Room>> findRoomByNameForAngular(@RequestParam("name") String name) {
        CollectionModel<EntityModel<Room>> resources = CollectionModel.of(
                this.roomRepository.findRoomByName(name).stream()
                        .map(this::resource)
                        .collect(Collectors.toList()));
        addRoomLink(resources, REL_SELF);
        return resources;
    }

    @GetMapping(params = "name")
    public CollectionModel<EntityModel<Room>> findRoomByName(@RequestParam("name") String name) {
        CollectionModel<EntityModel<Room>> resources = CollectionModel.of(
                this.roomRepository.findRoomByName(name).stream()
                        .map(this::resource)
                        .collect(Collectors.toList()));
        addRoomLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(produces = ApiVersion.V2_FOR_ANGULAR)
    public ResponseEntity<?> addRoomForAngular(@RequestBody Room room) {
        Room addedRoom = this.roomRepository.save(room);
        return ResponseEntity.created(URI.create(
                resource(addedRoom).getLink(REL_SELF).get().getHref()))
                .build();
    }

    @PostMapping
    public ResponseEntity<?> addRoom(@RequestBody Room room) {
        Room addedRoom = this.roomRepository.save(room);
        return ResponseEntity.created(URI.create(
                resource(addedRoom).getLink(REL_SELF).get().getHref()))
                .build();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public void deleteRoomForAngular(@PathVariable("id") Integer id) {
        this.roomRepository.deleteById(id);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteRoom(@PathVariable("id") Integer id) {
        this.roomRepository.deleteById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PatchMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public void updateRoomForAngular(@PathVariable Integer id, @RequestBody Room newPartialRoom) {
        this.roomService.updateRoom(id, newPartialRoom);
    }

    @PatchMapping(path = "/{id}")
    public void updateRoom(@PathVariable Integer id, @RequestBody Room newPartialRoom) {
        this.roomService.updateRoom(id, newPartialRoom);
    }

    private ResponseEntity<String> notFound() {
        return ResponseEntity.notFound().build();
    }

    private <T> ResponseEntity<T> ok(T body) {
        return ResponseEntity.ok().body(body);
    }

    private EntityModel<Room> resource(Room room) {
        EntityModel<Room> roomResource = EntityModel.of(room);
        roomResource.add(linkTo(
                methodOn(RoomRestApiController.class)
                        .getRoom(room.getId()))
                .withSelfRel());
        this.addRoomBooksLink(roomResource, REL_BOOKS, room.getId());
        this.addRoomShelvesLink(roomResource, REL_SHELVES, room.getId());
        return roomResource;
    }

    private EntityModel<RoomDTO> resourceAngular(RoomDTO room) {
        EntityModel<RoomDTO> roomDTOResource = EntityModel.of(room);
        roomDTOResource.add(linkTo(
                methodOn(RoomRestApiController.class)
                        .getRoom(room.getId()))
                .withSelfRel());
        return roomDTOResource;
    }

    private void addRoomBooksLink(EntityModel<Room> resources, String rel, Integer id) {
        resources.add(linkTo(methodOn(BookRestApiController.class)
                .getBooksByRoom(id))
                .withRel(rel));
    }

    private void addRoomShelvesLink(EntityModel<Room> resources, String rel, Integer id) {
        resources.add(linkTo(methodOn(ShelfRestApiController.class)
                .getShelvesByRoom(id))
                .withRel(rel));
    }

    private void addRoomLink(CollectionModel<EntityModel<Room>> resources, String rel) {
        resources.add(linkTo(RoomRestApiController.class)
                .withRel(rel));
    }
}
