package com.orcus.hha_report_manager;

import com.orcus.hha_report_manager.model.CaseStudy;
import com.orcus.hha_report_manager.model.NewReport;
import com.orcus.hha_report_manager.model.Question;

import java.time.Instant;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ReportManagerUtilities {

    private static final String DEFAULT_DEPARTMENT_NAME = "HHA";
    private static final String DEFAULT_GROUPINGS = "MSPP:1";
    private static final String DEFAULT_CREATOR_USERNAME = "unknown";

    private static final String DEFAULT_SUMMARY = "HHA has been doing great work!";
    private static final String DEFAULT_STORY = "Hope Health Action’s mission is to build long-term partnerships with local communities and health systems to facilitate sustainable, innovative and life-saving health and disability care for the most vulnerable.";
    private static final String DEFAULT_IMAGE_PATH = "missing";

    public NewReport checkForAndReplaceNullReportFields(NewReport report){
        Month currentMonth;
        if(Objects.nonNull(report.getMonth())) {
            currentMonth = report.getMonth();
        }
        else {
            currentMonth = LocalDate.now().getMonth();
        }

        String departmentName;
        if(Objects.nonNull(report.getDepartmentName())){
            departmentName = report.getDepartmentName();
        }
        else {
            departmentName = DEFAULT_DEPARTMENT_NAME;
        }

        String reportName;
        if(Objects.nonNull(report.getName())) {
            reportName = report.getName();
        }
        else {
            reportName = departmentName + " " + currentMonth;
        }
        String createdBy;
        if(Objects.nonNull(report.getCreatedBy())){
            createdBy = report.getCreatedBy();
        }
        else {
            createdBy = DEFAULT_CREATOR_USERNAME;
        }
        List<Question> questions;
        if(Objects.nonNull(report.getQuestions())){
            questions = report.getQuestions();
        }
        else {
            questions = new ArrayList<Question>();
        }
        String groupings;
        if(Objects.nonNull(report.getGroupings())){
            groupings = report.getGroupings();
        }
        else {
            groupings = DEFAULT_GROUPINGS;
        }
        return new NewReport(reportName, departmentName, report.getDepartmentId(), currentMonth, report.getCreatedBy(), report.getEditedBy(), questions, groupings);
    }

    public NewReport replaceNonNullReportFields(NewReport report, NewReport reportToChange) {
        if(Objects.nonNull(report.getName())){
            reportToChange.setName(report.getName());
        }
        if(Objects.nonNull(report.getDepartmentName())){
            reportToChange.setDepartmentName(report.getDepartmentName());
        }
        if(Objects.nonNull(report.getMonth())){
            reportToChange.setMonth(report.getMonth());
        }
        if(Objects.nonNull(report.getCreatedBy())){
            reportToChange.setCreatedBy(report.getCreatedBy());
        }
        if(Objects.nonNull(report.getEditedBy())){
            reportToChange.setEditedBy(report.getEditedBy());
        }
        if(Objects.nonNull(report.getQuestions())){
            reportToChange.setQuestions(report.getQuestions());
        }
        if(Objects.nonNull(report.getGroupings())){
            reportToChange.setGroupings(report.getGroupings());
        }
        reportToChange.setEditedAt(Instant.now().toEpochMilli());
        return reportToChange;
    }

    public Question replaceNonNullQuestionFields(Question question, Question questionToUpdate) {
        if(Objects.nonNull(question.getDepartmentId())){
            questionToUpdate.setQuestion(question.getDepartmentId());
        }
        if(Objects.nonNull(question.getGroup())){
            questionToUpdate.setGroup(question.getGroup());
        }
        if(Objects.nonNull(question.getOrder())){
            questionToUpdate.setOrder(question.getOrder());
        }
        if(Objects.nonNull(question.getQuestion())){
            questionToUpdate.setQuestion(question.getQuestion());
        }
        if(Objects.nonNull(question.getAnswer())){
            questionToUpdate.setAnswer(question.getAnswer());
        }
        if(Objects.nonNull(question.getType())){
            questionToUpdate.setType(question.getType());
        }
        if(Objects.nonNull(question.getChoices())){
            questionToUpdate.setChoices(question.getChoices());
        }
        questionToUpdate.setEditedAt(Instant.now().toEpochMilli());
        return questionToUpdate;
    }

    public CaseStudy checkForAndReplaceNullCaseStudyFields(CaseStudy caseStudy){
        String departmentName;
        if(Objects.nonNull(caseStudy.getDepartmentName())){
            departmentName = caseStudy.getDepartmentName();
        }
        else {
            departmentName = DEFAULT_DEPARTMENT_NAME;
        }
        String summary = DEFAULT_SUMMARY;
        if(Objects.nonNull(caseStudy.getSummary())){
            summary = caseStudy.getSummary();
        }

        String story = DEFAULT_STORY;
        if(Objects.nonNull(caseStudy.getStory()){
            story = caseStudy.getStory();
        }

        String pathToImage = DEFAULT_IMAGE_PATH;
        if(Objects.nonNull(caseStudy.getPathToImage())){
            pathToImage = caseStudy.getPathToImage();
        }

        return new CaseStudy(caseStudy.getDepartmentId(), departmentName, caseStudy.getAuthor(), summary, story, pathToImage);
    }

    public CaseStudy replaceNonNullCaseStudyFields(CaseStudy caseStudy, CaseStudy caseStudyToChange) {
        if(Objects.nonNull(caseStudy.getDepartmentId())){
            caseStudyToChange.setDepartmentId(caseStudy.getDepartmentId());
        }
        if(Objects.nonNull(caseStudy.getDepartmentName())){
            caseStudyToChange.setDepartmentName(caseStudy.getDepartmentName());
        }
        if(Objects.nonNull(caseStudy.getAuthor())){
            caseStudyToChange.setAuthor(caseStudy.getAuthor());
        }
        if(Objects.nonNull(caseStudy.getSummary())){
            caseStudyToChange.setSummary(caseStudy.getSummary());
        }
        if(Objects.nonNull(caseStudy.getStory())){
            caseStudyToChange.setStory(caseStudy.getStory());
        }
        if(Objects.nonNull(caseStudy.getPathToImage())) {
            caseStudyToChange.setPathToImage(caseStudy.getPathToImage());
        }
        return caseStudyToChange;
    }
}
