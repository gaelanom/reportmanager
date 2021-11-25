package com.orcus.hha_report_manager.model;

import javax.persistence.*;
import java.time.Month;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "newReports", uniqueConstraints = @UniqueConstraint(columnNames = {"month", "departmentId"}))
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

    @Column(name = "questions")
    @OneToMany(targetEntity = Question.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "newReport_id", referencedColumnName = "id")
    private List<Question> questions;

    @ElementCollection (fetch = FetchType.EAGER)
    @CollectionTable(name = "groupings", joinColumns = @JoinColumn(name = "newReport_id", referencedColumnName = "id"))
    @MapKeyColumn(name = "groupName")
    @Column(name = "groupOrder")
    private Map<String, String> groupings;

    public NewReport(){

    }

    public NewReport(String name, String departmentName, Integer departmentId, Month month, List<Question> questions, Map<String, String> groupings) {
        this.name = name;
        this.departmentName = departmentName;
        this.departmentId = departmentId;
        this.month = month;
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

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public Map<String, String> getGroupings() {
        return groupings;
    }

    public void setGroupings(Map<String, String> groupings) {
        this.groupings = groupings;
    }
}
