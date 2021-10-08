package com.orcus.hha_report_manager.model;

public class WrittenQuestion extends Question {
    private String question;
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

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

}
