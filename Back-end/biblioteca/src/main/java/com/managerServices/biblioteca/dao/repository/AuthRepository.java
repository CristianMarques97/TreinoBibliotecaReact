package com.managerServices.biblioteca.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.managerServices.biblioteca.dto.AuthChangeRequest;

public interface AuthRepository extends JpaRepository<AuthChangeRequest, Integer>{
	
}
