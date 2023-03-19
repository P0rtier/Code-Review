package com.kpz.codereview.client.controller;

import com.kpz.codereview.client.service.AzureClientServiceMock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(name = "/azure")
public class AzureClientController {

    @Autowired
    private AzureClientServiceMock azureClientServiceMock;

    @GetMapping(name = "/test")
    public ResponseEntity<String> testGetAzureClient(){
        return ResponseEntity.ok("Azure client accepted");
    }
}
