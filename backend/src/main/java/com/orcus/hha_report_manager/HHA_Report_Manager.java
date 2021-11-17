package com.orcus.hha_report_manager;

import com.orcus.hha_report_manager.controller.EmployeeController;
import com.orcus.hha_report_manager.model.Employee;
import com.orcus.hha_report_manager.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.util.List;

@SpringBootApplication
public class HHA_Report_Manager {
	public static void main(String[] args) {
		SpringApplication.run(HHA_Report_Manager.class, args);
	}

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private EmployeeController employeeController;

	@EventListener(ApplicationReadyEvent.class)
	public void initializeSomething() {
		initDefaultEmployees();
	}

	private void initDefaultEmployees() {
		List<Employee> defaultEmployees = makeDefaultEmployees();
		for (var employee : defaultEmployees) {
			var employeeList = employeeRepository.findByUsername(employee.getUsername());
			if (employeeList.isEmpty())
				employeeController.createEmployee(employee);
		}
	}

	private List<Employee> makeDefaultEmployees() {
		final String DEFAULT_PW = "12345";
		final Employee DEV = new Employee("dev", DEFAULT_PW, "", "", "NICU", true);
		final Employee ADMIN = new Employee("admin", DEFAULT_PW, "", "", "ADMIN", true);
		ADMIN.setAdmin(true);
		return List.of(DEV, ADMIN);
	}

}
