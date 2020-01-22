package com.dxc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dxc.dao.UserDAO;
import com.model.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserDAO userDAO;

	@Override
	public boolean addUser(User user) {
		// TODO Auto-generated method stub
		System.out.println("Inside user service" + user);

		return userDAO.addUser(user);
	}

	@Override
	public boolean isUserExistsWithPassword(String email, String password) {
		// TODO Auto-generated method stub
		return userDAO.isUserExistsWithPassword(email, password);
	}

	@Override
	public boolean isUserExists(String email) {
		// TODO Auto-generated method stub
		return userDAO.isUserExists(email);
	}

	@Override
	public boolean forgotPassword(String email) {
		// TODO Auto-generated method stub
		User user = new User();
		user = userDAO.getUser(email);
		SendEmailTLS emailTLS = new SendEmailTLS();
		emailTLS.sendEmail("Forgot Your password", "Your Password is " + user.getPassword(), email);
		return false;
	}

	@Override
	public User getUser(String email) {
		// TODO Auto-generated method stub
		return userDAO.getUser(email);
	}

	@Override
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return userDAO.getAllUsers();
	}

}
