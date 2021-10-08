package com.orcus.hha_report_manager.model;

import java.util.List;

public class MultipleChoiceQuestion extends Question {

    private String question;
    private List<Character> choices;
    private Character choice;

    public MultipleChoiceQuestion(){

    }

    public MultipleChoiceQuestion(String question, List<Character> choices){
        this.question = question;
        this.choices = choices;
    }

    public MultipleChoiceQuestion(String question, List<Character> choices, Character choice){
        this.question = question;
        this.choices = choices;
        this.choice = choice;
    }

    public List<Character> getChoices(){
        return this.choices;
    }

    public void setChoices(List<Character> choices){
        this.choices = choices;
    }

    public Character getChoice() {
        return choice;
    }

    public void setChoice(Character choice) {
        this.choice = choice;
    }
}
