package com.orcus.hha_report_manager;

import com.orcus.hha_report_manager.model.NewReport;
import com.orcus.hha_report_manager.model.Question;

import java.time.Instant;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ReportUtility {

    private static final String DEFAULT_DEPARTMENT_NAME = "HHA";
    private static final String DEFAULT_GROUPINGS = "MSPP:1";

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
}
