package com.managerServices.biblioteca.dao.repository;

import java.util.List;

//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.managerServices.biblioteca.dto.Livro;

@Repository
public interface LivroRepository extends CrudRepository<Livro, Long> {

@Query("select u from user u where u.username like '%username%'")
List<Livro> findUserByUsernameLike(@Param("username") String username);
}

