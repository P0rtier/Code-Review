package com.kpz.codereview.user.controller;

import com.kpz.codereview.user.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(name = "/person")
public class PersonController {

    @Autowired
    private PersonService personService;

    @GetMapping(name = "/test")
    public ResponseEntity<String> testGetPersonController(){
        return ResponseEntity.ok("Person controller works");
    }
}
