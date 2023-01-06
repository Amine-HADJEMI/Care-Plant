package com.example.demo.client;

//import org.springframework.security.config.web.server.ServerSecurityMarker;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import com.example.demo.client.Client;


@Service
public class ClientService {
    public List<Client> getStudents() {
        return List.of(
                new Client(
                        1,
                        "med.fath9@gmail.com",
                        "fathallah",
                        "picutre 1"
                )
        );
    }
}
