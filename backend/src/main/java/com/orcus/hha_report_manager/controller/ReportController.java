package com.orcus.hha_report_manager.controller;

import com.orcus.hha_report_manager.model.*;
import com.orcus.hha_report_manager.repository.QuestionRepository;
import com.orcus.hha_report_manager.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ReportController {

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    QuestionRepository questionRepository;

    @GetMapping("/reports")
    public ResponseEntity<List<Report>> getAllReports(@RequestParam(required = false) String department, String username) {
        try {
            List<Report> reports = new ArrayList<Report>();

            if (department == null && username == null)
                reportRepository.findAll().forEach(reports::add);
            else if (department != null)
                reportRepository.findByDepartmentContains(department).forEach(reports::add);
            else if (username != null)
                reportRepository.findBySubmitterUsername(username).forEach(reports::add);

            if (reports.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(reports, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/reports/{id}")
    public ResponseEntity<Report> getReportById(@PathVariable("id") long id) {
        Optional<Report> reportData = reportRepository.findById(id);

        if (reportData.isPresent()) {
            return new ResponseEntity<>(reportData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/reports")
    public ResponseEntity<Report> createReport(@RequestBody Report report) {
        try {
            Report newReport = reportRepository
                    .save(new Report(report.getDepartment(), LocalDate.now().getMonth(), report.getSubmitterUsername(), report.getSubmitterFirstName(), report.getSubmitterLastName(), report.isComplete(), report.isSaved(), report.isSubmitted(), report.getQuestions()));
            return new ResponseEntity<>(newReport, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PostMapping("/reports/{id}")
//    public ResponseEntity<Report> addQuestionToReport(@PathVariable("id") long id, @RequestBody List<Question> questions) {
//        Optional<Report> reportData = reportRepository.findById(id);
//        if (reportData.isPresent()) {
//            Report report = reportData.get();
//            for(Question question : questions){
//                report.addQuestion(question);
//            }
//            return new ResponseEntity<>(reportRepository.save(report), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }

    @PostMapping("/reports/{id}")
    public ResponseEntity<Report> addQuestionToReport(@PathVariable("id") long id, @RequestBody Question question) {
        Optional<Report> reportData = reportRepository.findById(id);
        if (reportData.isPresent()) {
            Report report = reportData.get();
            report.addQuestion(question);
            return new ResponseEntity<>(reportRepository.save(report), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/reports/{id}/questions")
    public ResponseEntity<Report> addQuestionToReport(@PathVariable("id") long id, @RequestBody WrittenQuestion writtenQuestion) {
        Optional<Report> reportData = reportRepository.findById(id);
        if (reportData.isPresent()) {
            Report report = reportData.get();
            report.addQuestion(writtenQuestion);
            return new ResponseEntity<>(reportRepository.save(report), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/reports/{id}/questions/mcq")
    public ResponseEntity<Report> addQuestionToReport(@PathVariable("id") long id, @RequestBody MultipleChoiceQuestion multipleChoiceQuestion) {
        Optional<Report> reportData = reportRepository.findById(id);
        if (reportData.isPresent()) {
            Report report = reportData.get();
            report.addQuestion(multipleChoiceQuestion);
            return new ResponseEntity<>(reportRepository.save(report), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/reports/{id}/patient")
    public ResponseEntity<Report> addPatientInfoToReport(@PathVariable("id") long id, @RequestBody PatientInfo patientInfo) {
        Optional<Report> reportData = reportRepository.findById(id);
        if (reportData.isPresent()) {
            Report report = reportData.get();
            report.addPatient(patientInfo);
            return new ResponseEntity<>(reportRepository.save(report), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/reports/{id}")
    public ResponseEntity<Report> updateReportDetails(@PathVariable("id") long id, @RequestBody Report report) {
        Optional<Report> reportData = reportRepository.findById(id);

        if (reportData.isPresent()) {
            Report reportToChange = reportData.get();
            reportToChange.setDepartment(report.getDepartment());
            reportToChange.setMonth(report.getMonth());
            reportToChange.setSubmitterUsername(report.getSubmitterUsername());
            reportToChange.setSubmitterFirstName(report.getSubmitterFirstName());
            reportToChange.setSubmitterLastName(report.getSubmitterLastName());
            reportToChange.setComplete(report.isComplete());
            reportToChange.setSaved(report.isSaved());
            reportToChange.setSubmitted(report.isSubmitted());
            reportToChange.setQuestions(report.getQuestions());
            reportToChange.setPatientInfo(report.getPatientInfo());
            return new ResponseEntity<>(reportRepository.save(reportToChange), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/reports/{id}")
    public ResponseEntity<HttpStatus> deleteReport(@PathVariable("id") long id) {
        try {
            reportRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/reports")
    public ResponseEntity<HttpStatus> deleteAllReports() {
        try {
            reportRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}