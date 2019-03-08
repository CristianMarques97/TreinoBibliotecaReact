package com.managerServices.biblioteca.dao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.managerServices.biblioteca.dto.Livro;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Integer> {

@Query(value = "select * from livros where livros.nome like %:bookName%", nativeQuery = true)

List<Livro> findBookSearch(@Param("bookName") String bookName);

Livro findBookByNome(String nome);

List<Livro> findAllByOrderByNome();
}

