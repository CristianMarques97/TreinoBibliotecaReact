package com.managerServices.biblioteca.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.managerServices.biblioteca.dto.Usuario;

public interface UserRepository extends JpaRepository<Usuario, Integer>{
	
	
}
