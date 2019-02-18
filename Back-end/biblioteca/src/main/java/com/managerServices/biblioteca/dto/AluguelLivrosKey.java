package com.managerServices.biblioteca.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class AluguelLivrosKey implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	
	@Column(name = "id_cliente")
	private int id_cliente;
	
	@Column(name = "id_livro")
	private int id_livro;
	


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

}
