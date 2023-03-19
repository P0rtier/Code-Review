package com.kpz.codereview.user.repository;

import com.kpz.codereview.user.model.Person;
import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<Person, Long> {
}
