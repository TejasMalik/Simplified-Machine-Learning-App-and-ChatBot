package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class UserSpringRestApplication {
	
	@RequestMapping("/home")
	public String getHome() {
		return "Welcome to springboot microservice";
	}

	public static void main(String[] args) {
		SpringApplication.run(UserSpringRestApplication.class, args);
	}

}
