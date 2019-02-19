package com.managerServices.biblioteca.dao.repository;
import java.util.List;

import org.postgresql.util.PSQLException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.managerServices.biblioteca.dto.AluguelLivros;
import com.managerServices.biblioteca.dto.RentJoin;

public interface RentRepository extends JpaRepository<AluguelLivros, Integer>{
	
	@Query(value = "select id_cliente, id_livro,data_emprestimo from aluguel_livros where id_cliente = :idCliente and id_livro = :idLivro", nativeQuery = true)

	AluguelLivros findById(@Param("idCliente") int id_cliente, @Param("idLivro") int id_livro) throws PSQLException;
	
	@Query(value = "select c.nome, c.sobrenome, c.email,"
				 + "l.nome as \"nome_livro\",l.editora,"
				 + "a.data_emprestimo "
				 + "from clientes c "
				 + "inner join aluguel_livros a on c.id = :idCliente and a.id_cliente = :idCliente "
				 + "inner join livros l on a.id_livro = l.id", nativeQuery = true)

	List<RentJoin> findRent (@Param("idCliente") int id_cliente);
	
	
}
