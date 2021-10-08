package com.orcus.hha_report_manager.controller;

import com.orcus.hha_report_manager.model.Employee;
import com.orcus.hha_report_manager.model.Department;
import com.orcus.hha_report_manager.repository.DepartmentRepository;
import com.orcus.hha_report_manager.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class DepartmentController {

    @Autowired
    DepartmentRepository departmentRepository;

    @GetMapping("/departments")
    public ResponseEntity<List<Department>> getAllDepartments(@RequestParam(required = false) String name) {
        try {
            List<Department> departments = new ArrayList<Department>();

            if (name == null)
                departmentRepository.findAll().forEach(departments::add);
            else
                departmentRepository.findByNameContains(name).forEach(departments::add);

            if (departments.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(departments, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/departments/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable("id") long id) {
        Optional<Department> departmentData = departmentRepository.findById(id);

        if (departmentData.isPresent()) {
            return new ResponseEntity<>(departmentData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/departments")
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        try {
            Department newDepartment = departmentRepository
                    .save(new Department(department.getName()));
            return new ResponseEntity<>(newDepartment, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/departments/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable("id") long id, @RequestBody Department department) {
        Optional<Department> departmentData = departmentRepository.findById(id);

        if (departmentData.isPresent()) {
            Department departmentToChange = departmentData.get();
            departmentToChange.setName(department.getName());
            return new ResponseEntity<>(departmentRepository.save(departmentToChange), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/departments/{id}")
    public ResponseEntity<HttpStatus> deleteDepartment(@PathVariable("id") long id) {
        try {
            departmentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/departments")
    public ResponseEntity<HttpStatus> deleteAllDepartments() {
        try {
            departmentRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

//    @GetMapping("/employees/departmentheads")
//    public ResponseEntity<List<Employee>> findByPublished() {
//        try {
//            List<Employee> employees = employeeRepository.findByIsDepartmentHead(true);
//
//            if (employees.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//            return new ResponseEntity<>(employees, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}