package com.managerServices.biblioteca.dto;

import java.io.Serializable;
import java.sql.Date;

public class RentJoin implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
		
	private String nome;
	
	private String Sobrenome;

	private String email;
	
		
	private String nome_livro;
	
	private String editora;
	
	private Date data_emprestimo;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSobrenome() {
		return Sobrenome;
	}

	public void setSobrenome(String sobrenome) {
		Sobrenome = sobrenome;
	}

	public String getNome_livro() {
		return nome_livro;
	}

	public void setNome_livro(String nome_livro) {
		this.nome_livro = nome_livro;
	}

	public String getEditora() {
		return editora;
	}

	public void setEditora(String editora) {
		this.editora = editora;
	}

	public Date getData_emprestimo() {
		return data_emprestimo;
	}

	public void setData_emprestimo(Date data_emprestimo) {
		this.data_emprestimo = data_emprestimo;
	}

	
}