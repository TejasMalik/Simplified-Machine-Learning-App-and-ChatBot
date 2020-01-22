package com.dxc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dxc.service.UserService;
import com.model.User;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping
	public ResponseEntity<User> saveUser(@RequestBody User user) {
		if (userService.isUserExists(user.getEmail())) {

			return new ResponseEntity<User>(user, HttpStatus.CONFLICT);
		} else {
			userService.addUser(user);
			return new ResponseEntity<User>(user, HttpStatus.CREATED);
		}

	}

	@GetMapping("/{email}/{password}")
	public ResponseEntity<User> userExisting(@PathVariable("email") String email,
			@PathVariable("password") String password) {

		if (userService.isUserExistsWithPassword(email, password)) {
			return new ResponseEntity<User>(HttpStatus.OK);
		} else {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);

		}

	}

	@GetMapping("/{email}")
	public ResponseEntity<User> forgotPassword(@PathVariable("email") String email) {
		email = email + ".com";
		if (userService.isUserExists(email)) {
			userService.forgotPassword(email);
			return new ResponseEntity<User>(HttpStatus.OK);

		} else {

			return new ResponseEntity<User>(HttpStatus.CONFLICT);
		}

	}
	
	@GetMapping
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> allUsers = userService.getAllUsers();
		return new ResponseEntity<List<User>>(allUsers, HttpStatus.OK);
	}
	

}
