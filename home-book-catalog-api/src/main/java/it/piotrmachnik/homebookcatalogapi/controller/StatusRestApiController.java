package it.piotrmachnik.homebookcatalogapi.controller;

import it.piotrmachnik.homebookcatalogapi.config.ApiVersion;
import it.piotrmachnik.homebookcatalogapi.model.Status;
import it.piotrmachnik.homebookcatalogapi.repository.StatusRepository;
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
@RequestMapping(value = "/api/statuses", produces = {ApiVersion.V1_HAL_JSON, MediaType.ALL_VALUE})
public class StatusRestApiController {

    private static final String REL_SELF = "self";
    private static final String REL_BOOK = "book";

    @Autowired
    private StatusRepository statusRepository;

    @GetMapping(path = "/{id}")
    public ResponseEntity<EntityModel<Status>> getStatus(@PathVariable Integer id) {
        return this.statusRepository.findById(id).map(this::resource)
                .map(this::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public ResponseEntity<EntityModel<Status>> getStatusForAngular(@PathVariable Integer id) {
        return this.statusRepository.findById(id).map(this::resource)
                .map(this::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public CollectionModel<EntityModel<Status>> getStatuses() {
        CollectionModel<EntityModel<Status>> resources = CollectionModel.of(
                this.statusRepository.findAll().stream().map(this::resource)
                        .collect(Collectors.toList()));
        addStatusLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(produces = ApiVersion.V2_FOR_ANGULAR)
    public List<EntityModel<Status>> getStatusesForAngular() {
        List<EntityModel<Status>> resources = this.statusRepository.findAll().stream().map(this::resource)
                        .collect(Collectors.toList());
        return resources;
    }

    @PostMapping
    public ResponseEntity<?> addStatus(@RequestBody Status status) {
        Status addedStatus = this.statusRepository.save(status);
        return ResponseEntity.created(URI.create(
                resource(addedStatus).getLink(REL_SELF).get().getHref()))
                .build();
    }

    @PostMapping(produces = ApiVersion.V2_FOR_ANGULAR)
    public ResponseEntity<?> addStatusForAngular(@RequestBody Status status) {
        Status addedStatus = this.statusRepository.save(status);
        return ResponseEntity.created(URI.create(
                resource(addedStatus).getLink(REL_SELF).get().getHref()))
                .build();
    }

    @DeleteMapping(path = "/{id}")
    public void deleteStatus(@PathVariable("id") Integer id) {
        this.statusRepository.deleteById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public void deleteStatusForAngular(@PathVariable("id") Integer id) {
        this.statusRepository.deleteById(id);
    }

    private ResponseEntity<String> notFound() {
        return ResponseEntity.notFound().build();
    }

    private <T> ResponseEntity<T> ok(T body) {
        return ResponseEntity.ok().body(body);
    }

    private EntityModel<Status> resource(Status status) {
        EntityModel<Status> statusResource = EntityModel.of(status);
        statusResource.add(linkTo(
                methodOn(StatusRestApiController.class)
                        .getStatus(status.getId()))
                .withSelfRel());
        statusResource.add(linkTo(methodOn(BookRestApiController.class)
                        .getBookByStatus(status.getId()))
                .withRel(REL_BOOK));
        return statusResource;
    }

    private void addStatusLink(CollectionModel<EntityModel<Status>> resources, String rel) {
        resources.add(linkTo(StatusRestApiController.class)
                .withRel(rel));
    }
}
