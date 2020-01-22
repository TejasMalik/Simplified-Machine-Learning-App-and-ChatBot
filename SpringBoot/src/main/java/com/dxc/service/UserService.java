package com.dxc.service;

import java.util.List;

import com.model.User;

public interface UserService {
	
	public boolean addUser(User user);
	public boolean isUserExistsWithPassword(String email,String password);
	public boolean isUserExists(String email);
	public boolean forgotPassword(String email);
	public User getUser(String email);
	public List<User> getAllUsers();


}