package com.managerServices.biblioteca.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.managerServices.biblioteca.dto.ChangePasswordRequest;

public interface ChangePasswordRepository extends JpaRepository<ChangePasswordRequest, Integer>{
	
}
