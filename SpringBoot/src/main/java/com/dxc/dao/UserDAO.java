package com.dxc.dao;

import java.util.List;

import com.model.User;

public interface UserDAO {
	public boolean addUser(User user);
	public boolean isUserExistsWithPassword(String email,String password);
	public boolean isUserExists(String email);
	public User getUser(String email);
	public List<User> getAllUsers();
	
	
}
