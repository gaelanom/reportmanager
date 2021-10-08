package com.orcus.hha_report_manager.model;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "reports")
public class Report {

    private String department;
    private Month month;
    private boolean complete;
    private boolean saved;
    private boolean submitted;
    private List<Question> questions;


    public Report() {

    }

    public Report(String department) {
        this.department = department;
        this.month = LocalDateTime.now().getMonth();
        this.complete = false;
        this.saved = false;
        this.submitted = false;
        this.questions = new ArrayList<Question>();
    }

    public Report(String department, String monthName){
        this.department = department;
        this.month = LocalDateTime.parse(monthName).getMonth();
        this.complete = false;
        this.saved = false;
        this.submitted = false;
        this.questions = new ArrayList<Question>();
    }

    public Report(String department, List<Question> questions){
        this.department = department;
        this.month = LocalDateTime.now().getMonth();
        this.complete = false;
        this.saved = false;
        this.submitted = false;
        this.questions = questions;
    }

    public Report(String department, String monthName, List<Question> questions) {
        this.department = department;
        this.month = LocalDateTime.parse(monthName).getMonth();
        this.complete = false;
        this.saved = false;
        this.submitted = false;
        this.questions = questions;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Month getMonth() {
        return month;
    }

    public void setMonth(Month month) {
        this.month = month;
    }

    public boolean isComplete() {
        return complete;
    }

    public void setComplete(boolean complete) {
        this.complete = complete;
    }

    public boolean isSaved() {
        return saved;
    }

    public void setSaved(boolean saved) {
        this.saved = saved;
    }

    public boolean isSubmitted() {
        return submitted;
    }

    public void setSubmitted(boolean submitted) {
        this.submitted = submitted;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public void addQuestion(Question question) {
        this.questions.add(question);
    }

    public void removeQuestion(Question question){
        this.questions.remove(question);
    }

}
