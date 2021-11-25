package com.orcus.hha_report_manager.controller;

import com.orcus.hha_report_manager.model.MultipleChoiceQuestion;
import com.orcus.hha_report_manager.model.NewReport;
import com.orcus.hha_report_manager.model.Question;
import com.orcus.hha_report_manager.model.Report;
import com.orcus.hha_report_manager.repository.NewReportRepository;
import com.orcus.hha_report_manager.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
public class QuestionController {

    @Autowired
    NewReportRepository newReportRepository;

    @Autowired
    QuestionRepository questionRepository;

    @GetMapping("/newreports/{id}/questions")
    public ResponseEntity<List<Question>> getAllQuestionsFromNewReportById(@PathVariable("id") long id){
        List<NewReport> reports = new ArrayList<NewReport>();
        Optional<NewReport> reportData = newReportRepository.findById(id);
        if(reportData.isPresent()){
            List<Question> questions = reportData.get().getQuestions();
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/newreports/{id}/questions")
    public ResponseEntity<Question> addQuestionToNewReport(@PathVariable("id") long id, @RequestBody Question question) {
        Optional<NewReport> reportData = newReportRepository.findById(id);
        if (reportData.isPresent()) {
            NewReport report = reportData.get();
            report.getQuestions().add(question);
            Question newQuestion = questionRepository.save(question);
            newReportRepository.save(report);
            return new ResponseEntity<>(question, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/newreports/questions/{id}")
    public ResponseEntity<Question> editQuestion(@PathVariable("id") long id, @RequestBody Question question) {
        Optional<Question> questionData = questionRepository.findById(id);
        if (questionData.isPresent()) {
            Question questionToUpdate = questionData.get();
            if(Objects.nonNull(question.getDepartmentId())){
                questionToUpdate.setQuestion(question.getDepartmentId());
            }
            if(Objects.nonNull(question.getGroup())){
                questionToUpdate.setGroup(question.getGroup());
            }
            if(Objects.nonNull(question.getOrder())){
                questionToUpdate.setOrder(question.getOrder());
            }
            if(Objects.nonNull(question.getQuestion())){
                questionToUpdate.setQuestion(question.getQuestion());
            }
            if(Objects.nonNull(question.getAnswer())){
                questionToUpdate.setAnswer(question.getAnswer());
            }
            if(Objects.nonNull(question.getType())){
                questionToUpdate.setType(question.getType());
            }
            if(Objects.nonNull(question.getChoices())){
                questionToUpdate.setChoices(question.getChoices());
            }
            return new ResponseEntity<>(questionRepository.save(questionToUpdate), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
