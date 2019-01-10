package com.managerServices.biblioteca.controller;

import java.sql.Date;
import java.util.Calendar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.managerServices.biblioteca.dao.repository.UserRepository;
import com.managerServices.biblioteca.dto.LoginRequest;
import com.managerServices.biblioteca.dto.Usuario;
//import com.managerServices.biblioteca.service.DataBaseService;

@RestController
@RequestMapping(value="/library")
public class ManagerController {
	
	private static final Logger log = LoggerFactory.getLogger(ManagerController.class);
	
//	@Autowired
//	private DataBaseService service;
	@Autowired
	private UserRepository repo;
	
	@PostMapping("/user/manager/new")
	public Usuario createNewUser(@RequestBody Usuario user) {
		log.info("Request: {}", "New User");
		return repo.save(user);
	}
	
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.POST})
@PostMapping("/user/manager/login")
public Usuario login(@RequestBody LoginRequest request) {
	return repo.findByEmailAndSenha(request.getEmail(), request.getSenha());
	
}
	
	public Date addDay(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(Calendar.DATE, 1);
		return new Date(c.getTimeInMillis());
		
	}

}
