package com.orcus.hha_report_manager.repository;

import com.orcus.hha_report_manager.model.NewReport;
import com.orcus.hha_report_manager.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewReportRepository extends JpaRepository<NewReport, Long> {
    List<Report> findBySubmitted(boolean submitted);

    List<Report> findByDepartmentContains(String departmentName);

    List<Report> findBySubmitterUsername(String username);
}
