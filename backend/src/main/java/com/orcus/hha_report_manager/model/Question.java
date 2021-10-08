package com.orcus.hha_report_manager.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "questions")
public class Question {
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
