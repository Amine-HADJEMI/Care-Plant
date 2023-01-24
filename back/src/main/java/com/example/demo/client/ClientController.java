package com.example.demo.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController

//@RequestMapping(path = "api/v1/client")
public class ClientController {

    private  final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public List<Client> getClients() {
        return clientService.getClients();
    }

    @RequestMapping(value="/showteams", method= RequestMethod.GET)
    public String teams(Model model)
    {
        List<Client> teams = (List<Client>) clientService.getClients();
        model.addAttribute("teams", teams);
        return "teams";//here your name of your view (html)
    }
}
