package com.orcus.hha_report_manager.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    public Department() {

    }

    public Department(String name) {
        this.name = name;
    }

    public String getName() { return this.name; }

    public void setName(String name) { this.name = name; }

}
