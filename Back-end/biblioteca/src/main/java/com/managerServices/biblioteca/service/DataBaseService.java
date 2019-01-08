package com.managerServices.biblioteca.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.managerServices.biblioteca.dao.DataBaseDao;
import com.managerServices.biblioteca.dto.Usuario;

@Service
public class DataBaseService {
	@Autowired
	private DataBaseDao dao;
	
	public boolean createUser(Usuario user) throws Exception {
		return dao.createNewUser(user);
		
	}
}
