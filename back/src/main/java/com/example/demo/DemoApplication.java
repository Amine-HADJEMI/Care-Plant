package com.example.demo;

//import com.example.demo.student.Student;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;

//import java.time.LocalDate;
//import java.time.Month;
//import java.util.ArrayList;
//import java.util.List;*/
//import com.example.demo.student.StudentController;

@SpringBootApplication
@RestController
//@EntityScan("com.example.demo.student")

public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
