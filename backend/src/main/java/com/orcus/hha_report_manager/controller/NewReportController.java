package com.orcus.hha_report_manager.controller;

import com.orcus.hha_report_manager.model.*;
import com.orcus.hha_report_manager.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class NewReportController {

    @Autowired
    NewReportRepository newReportRepository;

    @Autowired
    QuestionRepository questionRepository;

    @GetMapping("/newreports")
    public ResponseEntity<List<NewReport>> getAllNewReports(@RequestParam(required = false) Integer departmentId, String departmentName){
        try {
            List<NewReport> reports = new ArrayList<NewReport>();

            if (departmentId == null && departmentName == null)
                newReportRepository.findAll().forEach(reports::add);
            else if (departmentId != null && departmentName == null)
                newReportRepository.findByDepartmentId(departmentId).forEach(reports::add);
            else if (departmentName != null && departmentId == null)
                newReportRepository.findByDepartmentNameContains(departmentName).forEach(reports::add);
            else if (departmentName != null && departmentName != null)
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            if (reports.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(reports, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/newreports/{id}")
    public ResponseEntity<NewReport> getNewReportById(@PathVariable("id") long id){
        Optional<NewReport> reportData = newReportRepository.findById(id);
        if(reportData.isPresent()) {
            return new ResponseEntity<>(reportData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/newreports")
    public ResponseEntity<NewReport> createNewReport(@RequestBody NewReport report) {
        try {
            NewReport newNewReport;
            Month currentMonth;
            String reportName;
            if(Objects.nonNull(report.getMonth())) {
                currentMonth = report.getMonth();
            }
            else {
                currentMonth = LocalDate.now().getMonth();
            }
            if(Objects.nonNull(report.getName())) {
                reportName = report.getName();
            }
            else {
                reportName = report.getDepartmentName() + " " + currentMonth;
            }
            newNewReport = newReportRepository
                    .save(new NewReport(reportName, report.getDepartmentName(), report.getDepartmentId(), currentMonth, report.getCreator(), report.getLastContributor(), report.getQuestions(), report.getGroupings()));
            return new ResponseEntity<>(newNewReport, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/newreports/{id}")
    public ResponseEntity<NewReport> updateNewReportDetails(@PathVariable("id") long id, @RequestBody NewReport report) {
        Optional<NewReport> reportData = newReportRepository.findById(id);

        if (reportData.isPresent()) {
            NewReport reportToChange = reportData.get();
            if(Objects.nonNull(report.getName())){
                reportToChange.setName(report.getName());
            }
            if(Objects.nonNull(report.getDepartmentName())){
                reportToChange.setDepartmentName(report.getDepartmentName());
            }
            if(Objects.nonNull(report.getMonth())){
                reportToChange.setMonth(report.getMonth());
            }
            if(Objects.nonNull(report.getCreator())){
                reportToChange.setCreator(report.getCreator());
            }
            if(Objects.nonNull(report.getLastContributor())){
                reportToChange.setLastContributor(report.getLastContributor());
            }
            if(Objects.nonNull(report.getQuestions())){
                reportToChange.setQuestions(report.getQuestions());
            }
            if(Objects.nonNull(report.getGroupings())){
                reportToChange.setGroupings(report.getGroupings());
            }
            return new ResponseEntity<>(newReportRepository.save(reportToChange), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/newreports/{id}")
    public ResponseEntity<HttpStatus> deleteNewReport(@PathVariable("id") long id) {
        try {
            newReportRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/newreports")
    public ResponseEntity<HttpStatus> deleteAllNewReports() {
        try {
            newReportRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
