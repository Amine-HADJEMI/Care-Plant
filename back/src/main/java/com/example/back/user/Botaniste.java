package com.example.back.user;

import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan
//@Table
public class Botaniste {

    private long id;
    private String email, name;

    public Botaniste(long id, String email, String name) {
        this.id = id;
        this.email = email;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
