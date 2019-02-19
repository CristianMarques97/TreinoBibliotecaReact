package com.managerServices.biblioteca.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.managerServices.biblioteca.dao.DataBaseDao;
import com.managerServices.biblioteca.dto.RentJoin;

@Service
public class DataBaseService {
	@Autowired
	private DataBaseDao dao;
	
	public List<RentJoin> findRent(int id) throws Exception {
		return dao.selectRents(id);
	}

}
