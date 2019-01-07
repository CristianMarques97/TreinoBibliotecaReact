package com.managerServices.biblioteca.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.managerServices.biblioteca.dao.storedProcedures.CreateUserSP;
import com.managerServices.biblioteca.dto.Usuario;

@Repository
public class DataBaseDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public boolean createNewUser(Usuario user) {
		try {
			CreateUserSP sp = new CreateUserSP(jdbcTemplate.getDataSource());
			sp.execute(user);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
