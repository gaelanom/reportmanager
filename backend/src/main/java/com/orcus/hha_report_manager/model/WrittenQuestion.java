package com.orcus.hha_report_manager.model;

import javax.persistence.*;

@Entity
//@Table(name = "WrittenQuestion")
public class WrittenQuestion extends Question {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "question")
    private String question;

    @Column(name = "answer")
    private String answer;

    public WrittenQuestion(){

    }

    public WrittenQuestion(String question){
        this.question = question;
    }

    public WrittenQuestion(String question, String answer){
        this.question = question;
        this.answer = answer;
    }

    public long getId() {
        return id;
    }

    @Override
    public String getQuestion() {
        return question;
    }

    @Override
    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

}
