package com.orcus.hha_report_manager.model;

import javax.persistence.*;
import java.time.Month;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "reports", uniqueConstraints = @UniqueConstraint(columnNames = {"month", "departmentId"}))
public class NewReport {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "departmentId")
    private String departmentId;

    @Column(name = "month")
    private Month month;

    @Column(name = "questions")
    @OneToMany(targetEntity = Question.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "report_id", referencedColumnName = "id")
    private List<Question> questions;

    @ElementCollection (fetch = FetchType.EAGER)
    @CollectionTable(name = "groupings", joinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"))
    @MapKeyColumn(name = "name")
    @Column(name = "order")
    private Map<String, Integer> groupings;

    public NewReport(){

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
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

    public Map<String, Integer> getGroupings() {
        return groupings;
    }

    public void setGroupings(Map<String, Integer> groupings) {
        this.groupings = groupings;
    }
}
