package it.piotrmachnik.homebookcatalogapi.controller;

import it.piotrmachnik.homebookcatalogapi.config.ApiVersion;
import it.piotrmachnik.homebookcatalogapi.model.Author;
import it.piotrmachnik.homebookcatalogapi.modelDTO.AuthorDTO;
import it.piotrmachnik.homebookcatalogapi.repository.AuthorRepository;
import it.piotrmachnik.homebookcatalogapi.service.AuthorService;
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
@RequestMapping(value = "/api/authors", produces = {ApiVersion.V1_HAL_JSON, MediaType.ALL_VALUE})
public class AuthorRestApiController {


    private static final String REL_SELF = "self";
    private static final String REL_BOOKS = "books";
    @Autowired
    private AuthorRepository authorRepository;

    private AuthorService authorService;

    public AuthorRestApiController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<EntityModel<Author>> getAuthor(@PathVariable Integer id) {
        return this.authorRepository.findById(id).map(this::resource)
                .map(this::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public ResponseEntity<EntityModel<Author>> getAuthorForAngular(@PathVariable Integer id) {
        return this.authorRepository.findById(id).map(this::resource)
                .map(this::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(produces = ApiVersion.V2_FOR_ANGULAR)
    public List<EntityModel<AuthorDTO>> getAuthorsForAngular() {
        return this.authorService.getAuthorsForAngular().stream().map(this::resourceAngular)
                .collect(Collectors.toList());
    }

    @GetMapping
    public CollectionModel<EntityModel<Author>> getAuthors() {
        CollectionModel<EntityModel<Author>> resources = CollectionModel.of(
                this.authorRepository.findAll().stream().map(this::resource)
                        .collect(Collectors.toList()));
        addAuthorLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(params = "name", produces = ApiVersion.V2_FOR_ANGULAR)
    public CollectionModel<EntityModel<Author>> findAuthorsByNameForAngular(@RequestParam("name") String name) {
        CollectionModel<EntityModel<Author>> resources = CollectionModel.of(
                this.authorRepository.findAuthorsByName(name).stream()
                        .map(this::resource)
                        .collect(Collectors.toList()));
        addAuthorLink(resources, REL_SELF);
        return resources;
    }

    @GetMapping(params = "name")
    public CollectionModel<EntityModel<Author>> findAuthorsByName(@RequestParam("name") String name) {
        CollectionModel<EntityModel<Author>> resources = CollectionModel.of(
                this.authorRepository.findAuthorsByName(name).stream()
                        .map(this::resource)
                        .collect(Collectors.toList()));
        addAuthorLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PatchMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public void updateAuthorForAngular(@PathVariable Integer id, @RequestBody Author newPartialAuthor) {
        this.authorService.updateAuthor(id, newPartialAuthor);
    }

    @PatchMapping(path = "/{id}")
    public void updateAuthor(@PathVariable Integer id, @RequestBody Author newPartialAuthor) {
        this.authorService.updateAuthor(id, newPartialAuthor);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(produces = ApiVersion.V2_FOR_ANGULAR)
    public ResponseEntity<?> addAuthorForAngular(@RequestBody Author author) {
        Author addedAuthor = this.authorRepository.save(author);
        return ResponseEntity.created(URI.create(
                        resource(addedAuthor).getLink(REL_SELF).get().getHref()))
                .build();
    }

    @PostMapping
    public ResponseEntity<?> addAuthor(@RequestBody Author author) {
        Author addedAuthor = this.authorRepository.save(author);
        return ResponseEntity.created(URI.create(
                        resource(addedAuthor).getLink(REL_SELF).get().getHref()))
                .build();
    }

    @DeleteMapping(path = "/{id}")
    public void deleteAuthor(@PathVariable("id") Integer id) {
        this.authorRepository.deleteById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public void deleteAuthorForAngular(@PathVariable("id") Integer id) {
        this.authorRepository.deleteById(id);
    }

    private ResponseEntity<String> notFound() {
        return ResponseEntity.notFound().build();
    }

    private <T> ResponseEntity<T> ok(T body) {
        return ResponseEntity.ok().body(body);
    }

    private EntityModel<Author> resource(Author author) {
        EntityModel<Author> authorResource = EntityModel.of(author);
        authorResource.add(linkTo(
                methodOn(AuthorRestApiController.class)
                        .getAuthor(author.getId()))
                .withSelfRel());
        authorResource.add(linkTo(methodOn(BookRestApiController.class)
                .getBooksByAuthor(author.getId()))
                .withRel(REL_BOOKS));
        return authorResource;
    }

    private EntityModel<AuthorDTO> resourceAngular(AuthorDTO author) {
        EntityModel<AuthorDTO> authorResource = EntityModel.of(author);
        authorResource.add(linkTo(
                methodOn(AuthorRestApiController.class)
                        .getAuthor(author.getId()))
                .withSelfRel());
        authorResource.add(linkTo(methodOn(BookRestApiController.class)
                .getBooksByAuthor(author.getId()))
                .withRel(REL_BOOKS));
        return authorResource;
    }

    private void addAuthorLink(CollectionModel<EntityModel<Author>> resources, String rel) {
        resources.add(linkTo(AuthorRestApiController.class)
                .withRel(rel));
    }
}
