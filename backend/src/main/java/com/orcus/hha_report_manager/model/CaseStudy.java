package com.orcus.hha_report_manager.model;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "case studies")
public class CaseStudy {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "departmentId")
    private long departmentId;

    @Column(name = "departmentName")
    private String departmentName;

    @Column(name = "author")
    private String author;

    @Column(name = "createdAt")
    private long createdAt;

    @Column(name = "summary")
    private String summary;

    @Column(name = "story")
    private String story;

    @Column(name = "pathToImage")
    private String pathToImage;

    public CaseStudy(){

    }

    public CaseStudy(long departmentId, String departmentName, String summary, String story) {
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.summary = summary;
        this.story = story;
    }

    public CaseStudy(long departmentId, String departmentName, String author, String summary, String story, String pathToImage) {
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.author = author;
        this.createdAt = Instant.now().toEpochMilli();
        this.summary = summary;
        this.story = story;
        this.pathToImage = pathToImage;
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

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(long createdAt) {
        this.createdAt = createdAt;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getStory() {
        return story;
    }

    public void setStory(String story) {
        this.story = story;
    }

    public String getPathToImage() {
        return pathToImage;
    }

    public void setPathToImage(String pathToImage) {
        this.pathToImage = pathToImage;
    }
}
