package com.managerServices.biblioteca.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.managerServices.biblioteca.dto.UserEdit;

public interface UserEditRepository extends JpaRepository<UserEdit, Integer>{
	
}
