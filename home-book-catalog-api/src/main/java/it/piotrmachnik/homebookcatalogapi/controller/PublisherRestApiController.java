package it.piotrmachnik.homebookcatalogapi.controller;

import it.piotrmachnik.homebookcatalogapi.config.ApiVersion;
import it.piotrmachnik.homebookcatalogapi.model.Publisher;
import it.piotrmachnik.homebookcatalogapi.modelDTO.PublisherDTO;
import it.piotrmachnik.homebookcatalogapi.repository.PublisherRepository;
import it.piotrmachnik.homebookcatalogapi.service.PublisherService;
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
@RequestMapping(value = "/api/publishers", produces = {ApiVersion.V1_HAL_JSON, MediaType.ALL_VALUE})
public class PublisherRestApiController {

    private static final String REL_SELF = "self";
    private static final String REL_BOOKS = "books";
    @Autowired
    private PublisherRepository publisherRepository;

    private PublisherService publisherService;

    public PublisherRestApiController(PublisherService publisherService) {
        this.publisherService = publisherService;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<EntityModel<Publisher>> getPublisher(@PathVariable Integer id) {
        return this.publisherRepository.findById(id).map(this::resource)
                .map(this::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public ResponseEntity<EntityModel<Publisher>> getPublisherForAngular(@PathVariable Integer id) {
        return this.publisherRepository.findById(id).map(this::resource)
                .map(this::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public CollectionModel<EntityModel<Publisher>> getPublishers() {
        CollectionModel<EntityModel<Publisher>> resources = CollectionModel.of(
                this.publisherRepository.findAll().stream().map(this::resource)
                        .collect(Collectors.toList()));
        addPublisherLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(produces = ApiVersion.V2_FOR_ANGULAR)
    public List<EntityModel<PublisherDTO>> getPublishersForAngular() {
        return this.publisherService.getPublishersForAngular().stream().map(this::resourceAngular)
                .collect(Collectors.toList());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PatchMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public void updatePublisherForAngular(@PathVariable Integer id, @RequestBody Publisher newPartialPublisher) {
        this.publisherService.updatePublisher(id, newPartialPublisher);
    }

    @PatchMapping(path = "/{id}")
    public void updatePublisher(@PathVariable Integer id, @RequestBody Publisher newPartialPublisher) {
        this.publisherService.updatePublisher(id, newPartialPublisher);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(params = "name", produces = ApiVersion.V2_FOR_ANGULAR)
    public CollectionModel<EntityModel<Publisher>> findPublisherByNameForAngular(@RequestParam("name") String name) {
        CollectionModel<EntityModel<Publisher>> resources = CollectionModel.of(
                this.publisherRepository.findPublisherByName(name).stream()
                        .map(this::resource)
                        .collect(Collectors.toList()));
        addPublisherLink(resources, REL_SELF);
        return resources;
    }

    @GetMapping(params = "name")
    public CollectionModel<EntityModel<Publisher>> findPublisherByName(@RequestParam("name") String name) {
        CollectionModel<EntityModel<Publisher>> resources = CollectionModel.of(
                this.publisherRepository.findPublisherByName(name).stream()
                        .map(this::resource)
                        .collect(Collectors.toList()));
        addPublisherLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(produces = ApiVersion.V2_FOR_ANGULAR)
    public ResponseEntity<?> addPublisherForAngular(@RequestBody Publisher publisher) {
        Publisher addedPublisher = this.publisherRepository.save(publisher);
        return ResponseEntity.created(URI.create(
                        resource(addedPublisher).getLink(REL_SELF).get().getHref()))
                .build();
    }

    @PostMapping
    public ResponseEntity<?> addPublisher(@RequestBody Publisher publisher) {
        Publisher addedPublisher = this.publisherRepository.save(publisher);
        return ResponseEntity.created(URI.create(
                        resource(addedPublisher).getLink(REL_SELF).get().getHref()))
                .build();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public void deletePublisherForAngular(@PathVariable("id") Integer id) {
        this.publisherRepository.deleteById(id);
    }

    @DeleteMapping(path = "/{id}")
    public void deletePublisher(@PathVariable("id") Integer id) {
        this.publisherRepository.deleteById(id);
    }

    private ResponseEntity<String> notFound() {
        return ResponseEntity.notFound().build();
    }

    private <T> ResponseEntity<T> ok(T body) {
        return ResponseEntity.ok().body(body);
    }

    private EntityModel<Publisher> resource(Publisher publisher) {
        EntityModel<Publisher> publisherResource = EntityModel.of(publisher);
        publisherResource.add(linkTo(
                methodOn(PublisherRestApiController.class)
                        .getPublisher(publisher.getId()))
                .withSelfRel());
        publisherResource.add(linkTo(methodOn(BookRestApiController.class)
                .getBooksByPublisher(publisher.getId()))
                .withRel(REL_BOOKS));
        return publisherResource;
    }

    private EntityModel<PublisherDTO> resourceAngular(PublisherDTO publisher) {
        EntityModel<PublisherDTO> publisherDTOResource = EntityModel.of(publisher);
        publisherDTOResource.add(linkTo(
                methodOn(PublisherRestApiController.class)
                        .getPublisher(publisher.getId()))
                .withSelfRel());
        publisherDTOResource.add(linkTo(methodOn(BookRestApiController.class)
                .getBooksByPublisher(publisher.getId()))
                .withRel(REL_BOOKS));
        return publisherDTOResource;
    }

    private void addPublisherLink(CollectionModel<EntityModel<Publisher>> resources, String rel) {
        resources.add(linkTo(PublisherRestApiController.class)
                .withRel(rel));
    }
}
