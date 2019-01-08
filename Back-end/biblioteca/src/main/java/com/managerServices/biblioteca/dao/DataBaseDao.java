package com.managerServices.biblioteca.dao;

import java.sql.CallableStatement;
import java.sql.Connection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.managerServices.biblioteca.dao.storedProcedures.CreateUserSP;
import com.managerServices.biblioteca.dto.Usuario;

@Repository
public class DataBaseDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public boolean createNewUser(Usuario user) throws Exception {
		try {
//			CreateUserSP sp = new CreateUserSP(jdbcTemplate.getDataSource());
//			sp.execute(user);

			return true;
		} catch (Exception e) {
			throw e;
		}
	}
	
}
