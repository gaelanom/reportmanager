package com.orcus.hha_report_manager.repository;

import com.orcus.hha_report_manager.model.Employee;
import com.orcus.hha_report_manager.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Employee> findByIsSubmitted(boolean submitted);

    List<Employee> findByDepartmentContains(String departmentName);
}
