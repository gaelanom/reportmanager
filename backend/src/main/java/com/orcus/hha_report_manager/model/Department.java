package com.orcus.hha_report_manager.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "departments", uniqueConstraints = @UniqueConstraint(name = "name", columnNames = {"name"}))
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "blurb")
    private String blurb;

    public Department() {

    }

    public Department(String name, String blurb) {
        this.name = name;
        this.blurb = blurb;
    }

    public long getId() {
        return id;
    }

    public String getName() { return this.name; }

    public void setName(String name) { this.name = name; }

    public String getBlurb() {
        return blurb;
    }

    public void setBlurb(String blurb) {
        this.blurb = blurb;
    }
}
