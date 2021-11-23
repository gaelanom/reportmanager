package com.orcus.hha_report_manager.model;

import javax.persistence.*;


@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "departmentId")
    private String departmentId;

    @Column(name = "group")
    private String group;

    @Column(name = "order")
    private int order;

    @Column(name = "question")
    private String question;

    @Column(name = "answer")
    private String answer;

    @Column(name = "type")
    private String type;

    @Column(name = "choices")
    private String choices;

    public Question(){

    }

    public Question(String question){
        this.question = question;
    }

    public Question(String departmentId, String group, int order, String question, String answer, String type, String choices) {
        this.departmentId = departmentId;
        this.group = group;
        this.order = order;
        this.question = question;
        this.answer = answer;
        this.type = type;
        this.choices = choices;
    }

    public long getId() {
        return id;
    }

    public String getQuestion(){
        return this.question;
    }

    public void setQuestion(String question){
        this.question = question;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getChoices() {
        return choices;
    }

    public void setChoices(String choices) {
        this.choices = choices;
    }
}
