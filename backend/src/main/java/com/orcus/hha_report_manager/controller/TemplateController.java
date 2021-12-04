package com.orcus.hha_report_manager.controller;

import com.orcus.hha_report_manager.ReportManagerUtilities;
import com.orcus.hha_report_manager.model.NewReport;
import com.orcus.hha_report_manager.model.Question;
import com.orcus.hha_report_manager.model.Template;
import com.orcus.hha_report_manager.repository.NewReportRepository;
import com.orcus.hha_report_manager.repository.QuestionRepository;
import com.orcus.hha_report_manager.repository.TemplateRepository;
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
public class TemplateController {

    ReportManagerUtilities reportManagerUtilities = new ReportManagerUtilities();

    @Autowired
    TemplateRepository templateRepository;

    @Autowired
    private HTTPRequestUser httpRequestUser;


    @GetMapping("/newreports/templates")
    public ResponseEntity<List<Template>> getTemplates(@RequestParam(required = true) Integer departmentId, @RequestParam(required = false) String templateName){

        List<Template> templateData = templateRepository.findByDepartmentId(departmentId);
        if(templateData.isEmpty()){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        if(templateName != null){
            List<Template> templatesMatchingName = new ArrayList<>();
            for(Template t : templateData) {
                if (t.getTemplateName().equalsIgnoreCase(templateName)) {
                    templatesMatchingName.add(t);
                }
            }
            if(templatesMatchingName.isEmpty()) {
               return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>(templateData, HttpStatus.OK);
    }

    @GetMapping("/newreports/templates/{id}")
    public ResponseEntity<Template> getTemplateById(@PathVariable("id") long id){
        Optional<Template> templateData = templateRepository.findById(id);
        if(templateData.isPresent()) {
            return new ResponseEntity<>(templateData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/newreports/templates")
    public ResponseEntity<Template> createNewTemplate(@RequestBody Template template) {
        try {
            Template newTemplate;
            newTemplate = templateRepository
                    .save(new Template(template.getDepartmentId(), template.getTemplateName(), template.getReportJSON()));
            return new ResponseEntity<>(newTemplate, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/newreports/templates/{id}")
    public ResponseEntity<Template> editTemplate(@PathVariable("id") long id, @RequestBody Template template) {
        Optional<Template> templateData = templateRepository.findById(id);
        if (templateData.isPresent()) {
            Template templateToUpdate = reportManagerUtilities.replaceNonNullTemplateFields(template, templateData.get());
            return new ResponseEntity<>(templateRepository.save(templateToUpdate), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/newreports/templates/{id}")
    public ResponseEntity<HttpStatus> deleteTemplate(@PathVariable("id") long id) {
        try {
            templateRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
