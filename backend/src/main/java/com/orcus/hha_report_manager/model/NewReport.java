package com.orcus.hha_report_manager.model;

import javax.persistence.*;
import java.time.Month;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "newReports")
public class NewReport {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "reportName")
    private String name;

    @Column(name = "departmentName")
    private String departmentName;

    @Column(name = "departmentId")
    private Integer departmentId;

    @Column(name = "month")
    private Month month;

    @Column(name = "creator")
    private String creator;

    @Column(name = "lastContributor")
    private String lastContributor;

    @Column(name = "questions")
    @OneToMany(targetEntity = Question.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "newReport_id", referencedColumnName = "id")
    private List<Question> questions;

    @Column(name = "groupings")
    private String groupings;

    public NewReport(){

    }

    public NewReport(String name, String departmentName, Integer departmentId, Month month, String creator, String lastContributor, List<Question> questions, String groupings) {
        this.name = name;
        this.departmentName = departmentName;
        this.departmentId = departmentId;
        this.month = month;
        this.creator = creator;
        this.lastContributor = lastContributor;
        this.questions = questions;
        this.groupings = groupings;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    public Month getMonth() {
        return month;
    }

    public void setMonth(Month month) {
        this.month = month;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getLastContributor() {
        return lastContributor;
    }

    public void setLastContributor(String lastContributor) {
        this.lastContributor = lastContributor;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public String getGroupings() {
        return groupings;
    }

    public void setGroupings(String groupings) {
        this.groupings = groupings;
    }
}
