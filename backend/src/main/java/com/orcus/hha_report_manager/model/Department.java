package com.orcus.hha_report_manager.model;

import javax.persistence.*;

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


}
