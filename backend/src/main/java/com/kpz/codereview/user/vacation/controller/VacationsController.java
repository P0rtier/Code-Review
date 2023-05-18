package com.kpz.codereview.user.vacation.controller;

import com.kpz.codereview.user.vacation.dto.VacationDTO;
import com.kpz.codereview.user.vacation.service.VacationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
@RequestMapping("/api/users/vacations")
public class VacationsController {

    @Autowired
    private VacationService service;

    @GetMapping("/all")
    public List<VacationDTO> getAll(){
        return service.getAll();
    }

    @PostMapping("/add")
    public void addVacation(@RequestBody VacationDTO vacationDTO){
        service.addVacation(vacationDTO);
    }

    @PostMapping("/add-all")
    public void addAllVacations(@RequestBody List<VacationDTO> vacationDTOS){
        service.addAllVacations(vacationDTOS);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteVacation(@PathVariable Long id){
        service.deleteVacation(id);
    }

    @DeleteMapping("/delete-all")
    public void deleteAllVacations(@RequestBody List<Long> idList){
        service.deleteAllVacationsById(idList);
    }
}
