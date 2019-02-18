package com.managerServices.biblioteca.dto;

import java.io.Serializable;

public class AuthRequest implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int id;
	private String senha;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String nome) {
		this.senha = nome;
	}
	
	

}
