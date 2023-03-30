package com.kpz.codereview.user.controller;

import com.kpz.codereview.user.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/person")
public class PersonController {

    @Autowired
    private PersonService personService;

    @GetMapping("/getTestPerson")
    public ResponseEntity<String> getTestPerson(){
        return ResponseEntity.ok("Git");
    }
}
