package it.piotrmachnik.homebookcatalogapi.controller;

import it.piotrmachnik.homebookcatalogapi.config.ApiVersion;
import it.piotrmachnik.homebookcatalogapi.model.Book;
import it.piotrmachnik.homebookcatalogapi.repository.BookRepository;
import it.piotrmachnik.homebookcatalogapi.service.BookService;
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
@RequestMapping(value = "/api/books", produces = {ApiVersion.V1_HAL_JSON, MediaType.ALL_VALUE})
public class BookRestApiController {

    private static final String REL_SELF = "self";
    @Autowired
    private BookRepository bookRepository;

    private BookService bookService;

    public BookRestApiController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<EntityModel<Book>> getBook(@PathVariable Integer id) {
        return this.bookRepository.findById(id)
                .map(this::resource)
                .map(this::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public ResponseEntity<EntityModel<Book>> getBookForAngular(@PathVariable Integer id) {
        return this.bookRepository.findById(id)
                .map(this::resource)
                .map(this::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public CollectionModel<EntityModel<Book>> getBooks() {
        CollectionModel<EntityModel<Book>> resources = CollectionModel.of(
                this.bookRepository.findAll().stream().map(this::resource)
                        .collect(Collectors.toList()));
        addBookLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(produces = ApiVersion.V2_FOR_ANGULAR)
    public List<EntityModel<Book>> getBooksForAngular() {
        List<EntityModel<Book>> resources = this.bookRepository.findAll().stream().map(this::resource)
                        .collect(Collectors.toList());
        return resources;
    }

    @GetMapping(params = "idAuthor")
    public CollectionModel<EntityModel<Book>> getBooksByAuthor(@RequestParam("idAuthor") Integer idAuthor) {
        CollectionModel<EntityModel<Book>> resources = CollectionModel.of(
                this.bookRepository.findByAuthorId(idAuthor).stream().map(this::resource)
                        .collect(Collectors.toList()));
        addBookLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(params = "idAuthor", produces = ApiVersion.V2_FOR_ANGULAR)
    public List<EntityModel<Book>> getBooksByAuthorForAngular(@RequestParam("idAuthor") Integer idAuthor) {
        List<EntityModel<Book>> resources = this.bookRepository.findByAuthorId(idAuthor).stream().map(this::resource)
                        .collect(Collectors.toList());
        return resources;
    }

    @GetMapping(params = "idRoom")
    public CollectionModel<EntityModel<Book>> getBooksByRoom(@RequestParam("idRoom") Integer idRoom) {
        CollectionModel<EntityModel<Book>> resources = CollectionModel.of(
                this.bookRepository.findByShelfRoomId(idRoom).stream().map(this::resource)
                        .collect(Collectors.toList()));
        addBookLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(params = "idRoom", produces = ApiVersion.V2_FOR_ANGULAR)
    public List<EntityModel<Book>> getBooksByRoomForAuthor(@RequestParam("idRoom") Integer idRoom) {
        List<EntityModel<Book>> resources = this.bookRepository.findByShelfRoomId(idRoom).stream().map(this::resource)
                        .collect(Collectors.toList());
        return resources;
    }

    @GetMapping(params = "idPublisher")
    public CollectionModel<EntityModel<Book>> getBooksByPublisher(@RequestParam("idPublisher") Integer idAuthor) {
        CollectionModel<EntityModel<Book>> resources = CollectionModel.of(
                this.bookRepository.findByPublisherId(idAuthor).stream().map(this::resource)
                        .collect(Collectors.toList()));
        addBookLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(params = "idPublisher", produces = ApiVersion.V2_FOR_ANGULAR)
    public List<EntityModel<Book>> getBooksByPublisherForAngular(@RequestParam("idPublisher") Integer idAuthor) {
        List<EntityModel<Book>> resources = this.bookRepository.findByPublisherId(idAuthor).stream().map(this::resource)
                        .collect(Collectors.toList());
        return resources;
    }

    @GetMapping(params = "idShelf")
    public CollectionModel<EntityModel<Book>> getBooksByShelf(@RequestParam("idShelf") Integer idShelf) {
        CollectionModel<EntityModel<Book>> resources = CollectionModel.of(
                this.bookRepository.findByShelfId(idShelf).stream().map(this::resource)
                        .collect(Collectors.toList()));
        addBookLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(params = "idShelf", produces = ApiVersion.V2_FOR_ANGULAR)
    public List<EntityModel<Book>> getBooksByShelfForAngular(@RequestParam("idShelf") Integer idShelf) {
        List<EntityModel<Book>> resources = this.bookRepository.findByShelfId(idShelf).stream().map(this::resource)
                        .collect(Collectors.toList());
        return resources;
    }

    @GetMapping(params = "idStatusType")
    public CollectionModel<EntityModel<Book>> getBooksByStatusType(@RequestParam("idStatusType") Integer idStatusType) {
        CollectionModel<EntityModel<Book>> resources = CollectionModel.of(
                this.bookRepository.findByStatusStatusTypeId(idStatusType).stream().map(this::resource)
                        .collect(Collectors.toList()));
        addBookLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(params = "idStatusType", produces = ApiVersion.V2_FOR_ANGULAR)
    public List<EntityModel<Book>> getBooksByStatusTypeForAngular(@RequestParam("idStatusType") Integer idStatusType) {
        List<EntityModel<Book>> resources = this.bookRepository.findByStatusStatusTypeId(idStatusType).stream().map(this::resource)
                        .collect(Collectors.toList());
        return resources;
    }

    @GetMapping(params = "idStatus")
    public ResponseEntity<EntityModel<Book>> getBookByStatus(@RequestParam("idStatus") Integer idStatus) {
                return this.bookRepository.findByStatusId(idStatus)
                        .map(this::resource)
                        .map(this::ok)
                        .orElse(ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(params = "idStatus", produces = ApiVersion.V2_FOR_ANGULAR)
    public ResponseEntity<EntityModel<Book>> getBookByStatusForAngular(@RequestParam("idStatus") Integer idStatus) {
                return this.bookRepository.findByStatusId(idStatus)
                        .map(this::resource)
                        .map(this::ok)
                        .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping(params = "name")
    public CollectionModel<EntityModel<Book>> findBookByName(@RequestParam("name") String name) {
        CollectionModel<EntityModel<Book>> resources = CollectionModel.of(
                this.bookRepository.findBookByName(name).stream()
                        .map(this::resource)
                        .collect(Collectors.toList()));
        addBookLink(resources, REL_SELF);
        return resources;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(params = "name", produces = ApiVersion.V2_FOR_ANGULAR)
    public List<EntityModel<Book>> findBookByNameForAngular(@RequestParam("name") String name) {
        List<EntityModel<Book>> resources = this.bookRepository.findBookByName(name).stream()
                        .map(this::resource)
                        .collect(Collectors.toList());
        return resources;
    }

    @PostMapping
    public ResponseEntity<?> addBook(@RequestBody Book book) {
        Book addedBook = this.bookService.addBook(book);
        return ResponseEntity.created(URI.create(
                resource(addedBook).getLink(REL_SELF).get().getHref()))
                .build();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(produces = ApiVersion.V2_FOR_ANGULAR)
    public ResponseEntity<?> addBookForAngular(@RequestBody Book book) {
        Book addedBook = this.bookService.addBook(book);
        return ResponseEntity.created(URI.create(
                resource(addedBook).getLink(REL_SELF).get().getHref()))
                .build();
    }

    @PatchMapping(path = "/{id}")
    public void updateBook(@PathVariable Integer id, @RequestBody Book newPartialBook) {
        this.bookService.updateBook(id, newPartialBook);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PatchMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public void updateBookForAngular(@PathVariable Integer id, @RequestBody Book newPartialBook) {
        this.bookService.updateBook(id, newPartialBook);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteBook(@PathVariable("id") Integer id) {
        this.bookRepository.deleteById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping(path = "/{id}", produces = ApiVersion.V2_FOR_ANGULAR)
    public void deleteBookForAngular(@PathVariable("id") Integer id) {
        this.bookRepository.deleteById(id);
    }

    private ResponseEntity<String> notFound() {
        return ResponseEntity.notFound().build();
    }

    private <T> ResponseEntity<T> ok(T body) {
        return ResponseEntity.ok().body(body);
    }

    private EntityModel<Book> resource(Book book) {
        EntityModel<Book> bookResource = EntityModel.of(book);
        bookResource.add(linkTo(
                methodOn(BookRestApiController.class)
                        .getBook(book.getId()))
                .withSelfRel());
        return bookResource;
    }

    private void addBookLink(CollectionModel<EntityModel<Book>> resources, String rel) {
        resources.add(linkTo(BookRestApiController.class)
                .withRel(rel));
    }
}
