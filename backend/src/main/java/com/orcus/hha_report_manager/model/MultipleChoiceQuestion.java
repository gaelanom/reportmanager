package com.orcus.hha_report_manager.model;

import java.util.List;
import java.util.Map;

public class MultipleChoiceQuestion extends Question {

    private String question;
    private Map<Character, String> choices;
    private Character choice;

    public MultipleChoiceQuestion(){

    }

    public MultipleChoiceQuestion(String question, Map<Character, String> choices){
        this.question = question;
        this.choices = choices;
    }

    public MultipleChoiceQuestion(String question, Map<Character, String> choices, Character choice){
        this.question = question;
        this.choices = choices;
        this.choice = choice;
    }

    public Map<Character, String> getChoices(){
        return this.choices;
    }

    public void setChoices(Map<Character, String> choices){
        this.choices = choices;
    }

    public Character getChoice() {
        return choice;
    }

    public void setChoice(Character choice) {
        this.choice = choice;
    }
}
