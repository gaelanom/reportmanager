package com.orcus.hha_report_manager.model;

import javax.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastname")
    private String lastName;

    @Column(name = "department")
    private String department;

    @Column(name = "isDepartmentHead")
    private boolean isDepartmentHead;

    public Employee() {

    }


    public Employee(String username, String firstname, String lastname, String department, boolean isDepartmentHead) {
        this.username = username;
        this.firstName = firstname;
        this.lastName = lastname;
        this.department = department;
        this.isDepartmentHead = isDepartmentHead;
    }

    public long getId() {
        return id;
    }

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username; }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDepartment() { return department; }

    public void setDepartment(String department) { this.department = department; }

    public boolean isDepartmentHead() {
        return isDepartmentHead;
    }

    public void setDepartmentHead(boolean isDepartmentHead) {
        this.isDepartmentHead = isDepartmentHead;
    }

    @Override
    public String toString() {
        return "Employee [id=" + id + ", username=" + username + " , first name=" + firstName + ", last name=" + lastName + ", department=" + department + ", department head=" + isDepartmentHead+ "]";
    }
}