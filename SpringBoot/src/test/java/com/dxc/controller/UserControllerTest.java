package com.dxc.controller;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.model.User;

public class UserControllerTest extends AbstractTest {

	@Before
	public void setUp() {
		super.setUp();
	}

	@Test
	public void testSaveUser() throws Exception {

		String uri = "/user";
		User user = new User();
		user.setEmail("tony@gmail.com");
		user.setName("tony");
		user.setPassword("starkreddy");
		user.setConfirmPassword("starkreddy");
		user.setPhoneNo(1876822222);
		String inputJson = super.mapToJson(user);
		MvcResult mvcResult = mvc.perform(
				MockMvcRequestBuilders.post(uri).contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson))
				.andReturn();

		int status = mvcResult.getResponse().getStatus();
		assertEquals(201, status);

	}

	@Test
	public void testUserExisting() throws Exception {
		String uri="/user/tony@gmail.com/starkreddy";
		MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri).accept(MediaType.APPLICATION_JSON_VALUE))
				.andReturn();

		int status = mvcResult.getResponse().getStatus();

		assertEquals(200, status);

	}

	@Test
	public void testForgotPassword() throws Exception {
		String uri = "/user/tony@gmail";

		MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri).accept(MediaType.APPLICATION_JSON_VALUE))
				.andReturn();

		int status = mvcResult.getResponse().getStatus();

		assertEquals(200, status);

	}

	@Test
	public void testGetAllUsers() throws Exception {
		String uri = "/user";

		MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri).accept(MediaType.APPLICATION_JSON_VALUE))
				.andReturn();

		int status = mvcResult.getResponse().getStatus();

		assertEquals(200, status);

		String content = mvcResult.getResponse().getContentAsString();
		User[] userlist = super.mapFromJson(content, User[].class);
		assertTrue(userlist.length > 0);
	}

}