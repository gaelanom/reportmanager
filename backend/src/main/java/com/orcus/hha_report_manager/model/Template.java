package com.orcus.hha_report_manager.model;

import javax.persistence.*;

@Entity
@Table(name = "templates")
public class Template {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "departmentId")
    private long departmentId;

    @Column(name = "templateName")
    private String templateName;

    @Column(name = "reportJSON")
    private String reportJSON;

    public Template(){

    }

    public Template(long departmentId, String templateName, String reportJSON) {
        this.departmentId = departmentId;
        this.templateName = templateName;
        this.reportJSON = reportJSON;
    }

    public long getId() {
        return id;
    }

    public long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(long departmentId) {
        this.departmentId = departmentId;
    }

    public String getTemplateName() {
        return templateName;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public String getReportJSON() {
        return reportJSON;
    }

    public void setReportJSON(String reportJSON) {
        this.reportJSON = reportJSON;
    }
}
