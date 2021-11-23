package com.orcus.hha_report_manager.controller;

import com.orcus.hha_report_manager.model.*;
import com.orcus.hha_report_manager.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class NewReportController {

    @Autowired
    NewReportRepository newReportRepository;

    @Autowired
    QuestionRepository questionRepository;

    @GetMapping("/newreports")
    public ResponseEntity<List<NewReport>> getAllReports(@RequestParam(required = false) String department, String username) {
        try {
            List<NewReport> reports = new ArrayList<NewReport>();

            if (department == null && username == null)
                newReportRepository.findAll().forEach(reports::add);
            else if (department != null)
                newReportRepository.findByDepartmentContains(department).forEach(reports::add);
            else if (username != null)
                newReportRepository.findBySubmitterUsername(username).forEach(reports::add);

            if (reports.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(reports, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
