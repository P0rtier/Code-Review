package com.kpz.codereview.user.service.impl;

import com.kpz.codereview.user.repository.PersonRepository;
import com.kpz.codereview.user.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonRepository personRepository;

    @Override
    public void testPersonService() {

    }
}
