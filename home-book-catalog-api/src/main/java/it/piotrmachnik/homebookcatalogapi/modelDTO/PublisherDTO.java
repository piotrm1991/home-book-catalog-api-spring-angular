package it.piotrmachnik.homebookcatalogapi.modelDTO;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PublisherDTO {

    private Integer id;
    private String name;
    private Integer noBooks;

    public PublisherDTO(String name) {
        this.name = name;
    }
}
