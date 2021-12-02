package com.orcus.hha_report_manager.repository;

import com.orcus.hha_report_manager.model.CaseStudy;
import com.orcus.hha_report_manager.model.NumericalQuestion;
import com.orcus.hha_report_manager.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CaseStudyRepository extends JpaRepository<CaseStudy, Long> {

    List<CaseStudy> findByStoryContains(String story);

    List<CaseStudy> findBySummaryContains(String summary);

    List<CaseStudy> findByDepartmentId(long id);

    List<CaseStudy> findByDepartmentName(String departmentName);
}
