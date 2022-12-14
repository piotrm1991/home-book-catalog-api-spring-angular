package it.piotrmachnik.homebookcatalogapi.model;

import lombok.*;

import javax.persistence.*;

@Entity(name = "Publisher")
@Table(name = "PUBLISHER")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Publisher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_publisher")
    private Integer id;

    @Column(name = "name")
    private String name;

    public Publisher(String name) {
        this.name = name;
    }
}