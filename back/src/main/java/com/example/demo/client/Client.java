package com.example.demo.client;

import org.springframework.boot.autoconfigure.domain.EntityScan;

//import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import java.time.LocalDate;

@EntityScan
//@Table
public class Client {

    @Id
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )
    private long id;
    private String email, name;

    private String picture ;

    public Client(long id, String email, String name, String picture) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.picture = picture;
    }

    public Client(String email, String name, String picture) {
        this.email = email;
        this.name = name;
        this.picture = picture;
    }

    public Client() {
    }

    public long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getPicture() {
        return picture;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    @Override
    public String toString() {
        return "Client{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", picture=" + picture +
                '}';
    }
}
