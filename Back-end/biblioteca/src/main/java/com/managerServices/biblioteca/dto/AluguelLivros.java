package com.managerServices.biblioteca.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name="aluguel_livros")
@IdClass(AluguelLivrosKey.class)
public class AluguelLivros implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "id_cliente", updatable = false)
	private int id_cliente;
	
	@Id
	@Column(name = "id_livro", updatable = false)
	private int id_livro;
	
	@Column(name = "data_emprestimo", updatable = false)
	@CreationTimestamp
	private LocalDateTime data_emprestimo ;
	

	public int getId_cliente() {
		return id_cliente;
	}

	public void setId_cliente(int id_cliente) {
		this.id_cliente = id_cliente;
	}

	public int getId_livro() {
		return id_livro;
	}

	public void setId_livro(int id_livro) {
		this.id_livro = id_livro;
	}

	public LocalDateTime getData_emprestimo() {
		return data_emprestimo;
	}

	public void setData_emprestimo(LocalDateTime data_emprestimo) {
		this.data_emprestimo = data_emprestimo;
	}

	
}
