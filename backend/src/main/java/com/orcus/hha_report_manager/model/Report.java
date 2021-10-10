package com.orcus.hha_report_manager.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "reports",
        uniqueConstraints = @UniqueConstraint(columnNames = {"month", "department"}))
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "department")
    private String department;

    @Column(name = "month")
    private Month month;

    @Column(name = "submitter")
    private String submitterUsername;

    @Column(name = "submitterFirstName")
    private String submitterFirstName;

    @Column(name = "submitterLastName")
    private String submitterLastName;

    @Column(name = "complete")
    private boolean complete;

    @Column(name = "saved")
    private boolean saved;

    @Column(name = "submitted")
    private boolean submitted;

    @Column(name = "questions")
    @OneToMany(targetEntity = Question.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "report_id", referencedColumnName = "id")
    private List<Question> questions;

    @Column(name = "patientInfo")
    @OneToMany(targetEntity = PatientInfo.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "report_id", referencedColumnName = "id")
    private List<PatientInfo> patientInfo;


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

    public Report(String department, Month month, String submitterUsername, String submitterFirstName, String submitterLastName, boolean complete, boolean saved, boolean submitted, List<Question> questions) {
        this.department = department;
        this.month = month;
        this.submitterUsername = submitterUsername;
        this.submitterFirstName = submitterFirstName;
        this.submitterLastName = submitterLastName;
        this.complete = complete;
        this.saved = saved;
        this.submitted = submitted;
        this.questions = questions;
    }

    public long getId() {
        return id;
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

    public String getSubmitterUsername() {
        return submitterUsername;
    }

    public void setSubmitterUsername(String submitterUsername) {
        this.submitterUsername = submitterUsername;
    }

    public String getSubmitterFirstName() {
        return submitterFirstName;
    }

    public void setSubmitterFirstName(String submitterFirstName) {
        this.submitterFirstName = submitterFirstName;
    }

    public String getSubmitterLastName() {
        return submitterLastName;
    }

    public void setSubmitterLastName(String submitterLastName) {
        this.submitterLastName = submitterLastName;
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

    public List<PatientInfo> getPatientInfo() {
        return patientInfo;
    }

    public void setPatientInfo(List<PatientInfo> patientInfo) {
        this.patientInfo = patientInfo;
    }

    public void addPatient(PatientInfo patientInfo){
        this.patientInfo.add(patientInfo);
    }
}
