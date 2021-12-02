package com.orcus.hha_report_manager.controller;

import com.orcus.hha_report_manager.ReportManagerUtilities;
import com.orcus.hha_report_manager.model.CaseStudy;
import com.orcus.hha_report_manager.model.NewReport;
import com.orcus.hha_report_manager.repository.CaseStudyRepository;
import com.orcus.hha_report_manager.repository.NewReportRepository;
import com.orcus.hha_report_manager.repository.QuestionRepository;
import com.orcus.hha_report_manager.security.beans.HTTPRequestUser;
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
public class CaseStudyController {

    ReportManagerUtilities reportManagerUtilities = new ReportManagerUtilities();

    @Autowired
    CaseStudyRepository caseStudyRepository;

    @Autowired
    private HTTPRequestUser httpRequestUser;

    @GetMapping("/casestudies")
    public ResponseEntity<List<CaseStudy>> getAllCaseStudies(@RequestParam(required = false) Integer departmentId, String departmentName){
        try {
            List<CaseStudy> caseStudies = new ArrayList<>();

            if (departmentId == null && departmentName == null)
                caseStudyRepository.findAll().forEach(caseStudies::add);
            else if (departmentId != null && departmentName == null)
                caseStudyRepository.findByDepartmentId(departmentId).forEach(caseStudies::add);
            else if (departmentName != null && departmentId == null)
                caseStudyRepository.findByDepartmentNameContains(departmentName).forEach(caseStudies::add);
            else if (departmentName != null && departmentName != null)
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            if (caseStudies.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(caseStudies, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/casestudies/{id}")
    public ResponseEntity<CaseStudy> getCaseStudyById(@PathVariable("id") long id){
        Optional<CaseStudy> caseStudyData = caseStudyRepository.findById(id);
        if(caseStudyData.isPresent()) {
            return new ResponseEntity<>(caseStudyData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/casestudy")
    public ResponseEntity<CaseStudy> createNewCaseStudy(@RequestBody CaseStudy caseStudy) {
        caseStudy.setAuthor(httpRequestUser.getEmployee().getUsername());
        try {
            CaseStudy newCaseStudy;
            newCaseStudy = caseStudyRepository
                    .save(reportManagerUtilities.checkForAndReplaceNullCaseStudyFields(caseStudy));
            return new ResponseEntity<>(newCaseStudy, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/casestudies/{id}")
    public ResponseEntity<CaseStudy> updateCaseStudyDetails(@PathVariable("id") long id, @RequestBody CaseStudy caseStudy) {
        Optional<CaseStudy> caseStudyData = caseStudyRepository.findById(id);

        if (caseStudyData.isPresent()) {
            CaseStudy editedCaseStudy = reportManagerUtilities.replaceNonNullCaseStudyFields(caseStudy, caseStudyData.get());
            return new ResponseEntity<>(caseStudyRepository.save(editedCaseStudy), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/casestudies/{id}")
    public ResponseEntity<HttpStatus> deleteCaseStudy(@PathVariable("id") long id) {
        try {
            caseStudyRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/casestudies")
    public ResponseEntity<HttpStatus> deleteAllCaseStudies() {
        try {
            caseStudyRepositoryRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
