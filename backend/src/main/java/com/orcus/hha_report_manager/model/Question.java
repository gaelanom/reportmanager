package com.orcus.hha_report_manager.model;

import javax.persistence.*;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "question")
    private String question;

    public Question(){

    }

    public Question(String question){
        this.question = question;
    }

    public String getQuestion(){
        return this.question;
    }
}
