package com.orcus.hha_report_manager.repository;

import com.orcus.hha_report_manager.model.NumericalQuestion;
import com.orcus.hha_report_manager.model.Question;
import com.orcus.hha_report_manager.model.Template;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TemplateRepository extends JpaRepository<Template, Long> {

    List<Template> findByTemplateNameContains(String name);

    List<Template> findByDepartmentId(long departmentId);
}
