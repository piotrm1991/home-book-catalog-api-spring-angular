package it.piotrmachnik.homebookcatalogapi.controller;

import it.piotrmachnik.homebookcatalogapi.config.ApiVersion;
import it.piotrmachnik.homebookcatalogapi.model.StatusType;
import it.piotrmachnik.homebookcatalogapi.modelDTO.StatusTypeDTO;
import it.piotrmachnik.homebookcatalogapi.repository.StatusTypeRepository;
import it.piotrmachnik.homebookcatalogapi.service.StatusTypeService;
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
@RequestMapping(value = "/api/statustypes", produces = {ApiVersion.V1_HAL_JSON, MediaType.ALL_VALUE})
public class StatusTypeRestApiController {

    private static final String REL_SELF = "self";
    private static final String REL_BOOKS = "books";
    @Autowired
    private StatusTypeRepository statusTypeRepository;

    private StatusTypeService statusTypeService;

    public StatusTypeRestApiController(StatusTypeService statusTypeService) {
        this.statusTypeService = statusTypeService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntityModel<StatusType>> getStatusType(@PathVariable Integer id) {
        return this.statusTypeRepository.findById(id).map(this::resource)
                .map(this::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public ResponseEntity<EntityModel<StatusType>> getStatusTypeForAngular(@PathVariable Integer id) {
        return this.statusTypeRepository.findById(id).map(this::resource)
                .map(this::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public CollectionModel<EntityModel<StatusType>> getStatusTypes() {
        CollectionModel<EntityModel<StatusType>> resources = CollectionModel.of(
                this.statusTypeRepository.findAll().stream().map(this::resource)
                        .collect(Collectors.toList()));
        addStatusTypeLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(produces = ApiVersion.V2_FOR_ANGULAR)
    public List<EntityModel<StatusTypeDTO>> getStatusTypesForAngular() {
        return this.statusTypeService.getStatusTypesForAngular().stream().map(this::resourceAngular)
                .collect(Collectors.toList());
    }

    @GetMapping(params = "name")
    public CollectionModel<EntityModel<StatusType>> findStatusTypeByName(@RequestParam("name") String name) {
        CollectionModel<EntityModel<StatusType>> resources = CollectionModel.of(
                this.statusTypeRepository.findStatusTypeByName(name).stream()
                        .map(this::resource)
                        .collect(Collectors.toList()));
        addStatusTypeLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(params = "name", produces = ApiVersion.V2_FOR_ANGULAR)
    public CollectionModel<EntityModel<StatusType>> findStatusTypeByNameForAngular(@RequestParam("name") String name) {
        CollectionModel<EntityModel<StatusType>> resources = CollectionModel.of(
                this.statusTypeRepository.findStatusTypeByName(name).stream()
                        .map(this::resource)
                        .collect(Collectors.toList()));
        addStatusTypeLink(resources, REL_SELF);
        return resources;
    }

    @PostMapping
    public ResponseEntity<?> addStatusType(@RequestBody StatusType statusType) {
        StatusType addedStatusType = this.statusTypeRepository.save(statusType);
        return ResponseEntity.created(URI.create(
                resource(addedStatusType).getLink(REL_SELF).get().getHref()))
                .build();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(produces = ApiVersion.V2_FOR_ANGULAR)
    public ResponseEntity<?> addStatusTypeForAngular(@RequestBody StatusType statusType) {
        StatusType addedStatusType = this.statusTypeRepository.save(statusType);
        return ResponseEntity.created(URI.create(
                resource(addedStatusType).getLink(REL_SELF).get().getHref()))
                .build();
    }

    @DeleteMapping("/{id}")
    public void deleteStatusType(@PathVariable("id") Integer id) {
        this.statusTypeRepository.deleteById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public void deleteStatusTypeForAngular(@PathVariable("id") Integer id) {
        this.statusTypeRepository.deleteById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PatchMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public void updateStatusTypeForAngular(@PathVariable Integer id, @RequestBody StatusType newPartialStatusType) {
        this.statusTypeService.updateStatusType(id, newPartialStatusType);
    }

    private ResponseEntity<String> notFound() {
        return ResponseEntity.notFound().build();
    }

    private <T> ResponseEntity<T> ok(T body) {
        return ResponseEntity.ok().body(body);
    }

    private EntityModel<StatusType> resource(StatusType statusType) {
        EntityModel<StatusType> statusTypeResource = EntityModel.of(statusType);
        statusTypeResource.add(linkTo(
                methodOn(StatusTypeRestApiController.class)
                        .getStatusType(statusType.getId()))
                .withSelfRel());
        statusTypeResource.add(linkTo(methodOn(BookRestApiController.class)
                        .getBooksByStatusType(statusType.getId()))
                .withRel(REL_BOOKS));
        return statusTypeResource;
    }

    private EntityModel<StatusTypeDTO> resourceAngular(StatusTypeDTO statusType) {
        EntityModel<StatusTypeDTO> statusTypeResource = EntityModel.of(statusType);
        statusTypeResource.add(linkTo(
                methodOn(StatusTypeRestApiController.class)
                        .getStatusType(statusType.getId()))
                .withSelfRel());
        statusTypeResource.add(linkTo(methodOn(BookRestApiController.class)
                .getBooksByStatusType(statusType.getId()))
                .withRel(REL_BOOKS));
        return statusTypeResource;
    }

    private void addStatusTypeLink(CollectionModel<EntityModel<StatusType>> resources, String rel) {
        resources.add(linkTo(StatusTypeRestApiController.class)
                .withRel(rel));
    }
}
