package it.piotrmachnik.homebookcatalogapi.controller;

import it.piotrmachnik.homebookcatalogapi.config.ApiVersion;
import it.piotrmachnik.homebookcatalogapi.model.Shelf;
import it.piotrmachnik.homebookcatalogapi.modelDTO.ShelfDTO;
import it.piotrmachnik.homebookcatalogapi.repository.ShelfRepository;
import it.piotrmachnik.homebookcatalogapi.service.ShelfService;
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
@RequestMapping(value = "/api/shelves", produces = {ApiVersion.V1_HAL_JSON, MediaType.ALL_VALUE})
public class ShelfRestApiController {

    private static final String REL_SELF = "self";
    private static final String REL_BOOKS = "books";
    @Autowired
    private ShelfRepository shelfRepository;

    private ShelfService shelfService;

    public ShelfRestApiController(ShelfService shelfService) {
        this.shelfService = shelfService;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<EntityModel<Shelf>> getShelf(@PathVariable Integer id) {
        return this.shelfRepository.findById(id).map(this::resource)
                .map(this::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public ResponseEntity<EntityModel<Shelf>> getShelfForAngular(@PathVariable Integer id) {
        return this.shelfRepository.findById(id).map(this::resource)
                .map(this::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public CollectionModel<EntityModel<Shelf>> getShelves() {
        CollectionModel<EntityModel<Shelf>> resources = CollectionModel.of(
                this.shelfRepository.findAll().stream().map(this::resource)
                        .collect(Collectors.toList()));
        addShelfLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(produces = ApiVersion.V2_FOR_ANGULAR)
    public List<ShelfDTO> getShelvesForAngular() {
        List<ShelfDTO> resources = this.shelfService.getShelvesForAngular();
        return resources;
    }

    @GetMapping(params = "idRoom")
    public CollectionModel<EntityModel<Shelf>> getShelvesByRoom(@RequestParam("idRoom") Integer idRoom) {
        CollectionModel<EntityModel<Shelf>> resources = CollectionModel.of(
                this.shelfRepository.findByRoomId(idRoom).stream().map(this::resource)
                        .collect(Collectors.toList()));
        addShelfLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(params = "idRoom", produces = ApiVersion.V2_FOR_ANGULAR)
    public List<EntityModel<Shelf>> getShelvesByRoomForAngular(@RequestParam("idRoom") Integer idRoom) {
        List<EntityModel<Shelf>> resources = this.shelfRepository.findByRoomId(idRoom).stream().map(this::resource)
                        .collect(Collectors.toList());
        return resources;
    }

    @GetMapping(params = "letter")
    public CollectionModel<EntityModel<Shelf>> findShelfByLetter(@RequestParam("letter") String letter) {
        CollectionModel<EntityModel<Shelf>> resources = CollectionModel.of(
                this.shelfRepository.findShelfByLetter(letter).stream()
                        .map(this::resource)
                        .collect(Collectors.toList()));
        addShelfLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(params = "letter", produces = ApiVersion.V2_FOR_ANGULAR)
    public List<EntityModel<Shelf>> findShelfByLetterForAngular(@RequestParam("letter") String letter) {
        List<EntityModel<Shelf>> resources = this.shelfRepository.findShelfByLetter(letter).stream()
                        .map(this::resource)
                        .collect(Collectors.toList());
        return resources;
    }

    @GetMapping(params = "number")
    public CollectionModel<EntityModel<Shelf>> findShelfByLetter(@RequestParam("letter") Integer number) {
        CollectionModel<EntityModel<Shelf>> resources = CollectionModel.of(
                this.shelfRepository.findShelfByNumber(number).stream()
                        .map(this::resource)
                        .collect(Collectors.toList()));
        addShelfLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(params = "number", produces = ApiVersion.V2_FOR_ANGULAR)
    public List<EntityModel<Shelf>> findShelfByLetterForAngular(@RequestParam("letter") Integer number) {
        List<EntityModel<Shelf>> resources = this.shelfRepository.findShelfByNumber(number).stream()
                        .map(this::resource)
                        .collect(Collectors.toList());
        return resources;
    }

    @PostMapping
    public ResponseEntity<?> addShelf(@RequestBody Shelf shelf) {
        Shelf addedShelf = this.shelfRepository.save(shelf);
        return ResponseEntity.created(URI.create(
                resource(addedShelf).getLink(REL_SELF).get().getHref()))
                .build();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(produces = ApiVersion.V2_FOR_ANGULAR)
    public ResponseEntity<?> addShelfForAngular(@RequestBody Shelf shelf) {
        Shelf addedShelf = this.shelfService.addShelf(shelf);
        return ResponseEntity.created(URI.create(
                resource(addedShelf).getLink(REL_SELF).get().getHref()))
                .build();
    }

    @DeleteMapping("/{id}")
    public void deleteShelf(@PathVariable("id") Integer id) {
        this.shelfRepository.deleteById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public void deleteShelfForAngular(@PathVariable("id") Integer id) {
        this.shelfRepository.deleteById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PatchMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public void updateShelfForAngular(@PathVariable Integer id, @RequestBody Shelf newPartialShelf) {
        this.shelfService.updateShelf(id, newPartialShelf);
    }

    private ResponseEntity<String> notFound() {
        return ResponseEntity.notFound().build();
    }

    private <T> ResponseEntity<T> ok(T body) {
        return ResponseEntity.ok().body(body);
    }

    private EntityModel<Shelf> resource(Shelf shelf) {
        EntityModel<Shelf> shelfResource = EntityModel.of(shelf);
        shelfResource.add(linkTo(
                methodOn(ShelfRestApiController.class)
                        .getShelf(shelf.getId()))
                .withSelfRel());
        addShelfBooksLink(shelfResource, REL_BOOKS, shelf.getId());
        return shelfResource;
    }

    private void addShelfBooksLink(EntityModel<Shelf> resources, String rel, Integer id) {
        resources.add(linkTo(methodOn(BookRestApiController.class)
                .getBooksByShelf(id))
                .withRel(rel));
    }

    private void addShelfLink(CollectionModel<EntityModel<Shelf>> resources, String rel) {
        resources.add(linkTo(ShelfRestApiController.class)
                .withRel(rel));
    }
}
