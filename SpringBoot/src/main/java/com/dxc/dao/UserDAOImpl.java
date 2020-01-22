package com.dxc.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import com.model.User;

@Repository
public class UserDAOImpl implements UserDAO {

	@Autowired
	MongoTemplate mongoTemplate;

	@Override
	public boolean addUser(User user) {
		mongoTemplate.save(user);
		return true;

	}

	@Override
	public boolean isUserExistsWithPassword(String email, String password) {
		User user = mongoTemplate.findById(email, User.class, "user");
		if (user == null) {
			return false;
		}
		if (user.getEmail().equals(email) && user.getPassword().equals(password)) {
			return true;
		} else {
			return false;
		}

	}

	@Override
	public boolean isUserExists(String email) {
		User user = mongoTemplate.findById(email, User.class, "user");

		if (user == null)
			return false;
		else
			return true;
	}

	@Override
	public User getUser(String email) {
		// TODO Auto-generated method stub
		User user = mongoTemplate.findById(email, User.class, "user");
		return user;
	}

	@Override
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return mongoTemplate.findAll(User.class, "user");
	}

}
