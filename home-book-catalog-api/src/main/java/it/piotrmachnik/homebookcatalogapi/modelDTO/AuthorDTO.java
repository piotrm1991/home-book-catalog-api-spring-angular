package it.piotrmachnik.homebookcatalogapi.modelDTO;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class AuthorDTO {

    private Integer id;
    private String name;
    private Integer noBooks;

    public AuthorDTO(String name) {
        this.name = name;
    }
}