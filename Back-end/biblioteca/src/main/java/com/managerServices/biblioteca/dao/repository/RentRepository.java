package com.managerServices.biblioteca.dao.repository;
import org.postgresql.util.PSQLException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.managerServices.biblioteca.dto.AluguelLivros;

public interface RentRepository extends JpaRepository<AluguelLivros, Integer>{
	
	@Query(value = "select id_cliente, id_livro,data_emprestimo from aluguel_livros where id_cliente = :idCliente and id_livro = :idLivro", nativeQuery = true)

	AluguelLivros findById(@Param("idCliente") int id_cliente, @Param("idLivro") int id_livro) throws PSQLException;
}
