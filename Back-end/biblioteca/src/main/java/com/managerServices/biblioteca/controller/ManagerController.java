package com.managerServices.biblioteca.controller;

import java.sql.Date;
import java.util.Calendar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.managerServices.biblioteca.dao.repository.UserRepository;
import com.managerServices.biblioteca.dto.Usuario;
//import com.managerServices.biblioteca.service.DataBaseService;

@RestController
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
		
		
//		user.setDataNasc(addDay(user.getDataNasc()));
//		try {
//			if(!service.createUser(user))
//				throw new Exception();
//		}catch(Exception e) {
//			return e.getMessage();
//		}
//		
//		return  "Nome: " + user.getNome() + "\n" +
//				"Sobrenome: " + user.getSobrenome() + "\n" +
//				"Nascimento: " + user.getDataNasc() + "\n" +
//				"E-mail: " + user.getEmail() + "\n" +
//				"Senha: " + user.getSenha();
	}
	
	public Date addDay(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(Calendar.DATE, 1);
		return new Date(c.getTimeInMillis());
		
	}

}
