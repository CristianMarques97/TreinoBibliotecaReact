package com.managerServices.biblioteca.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="clientes")
public class UserWithImage implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	private int id;
	
	@Column(columnDefinition = "text")
	private String nome;
	
	@Column(columnDefinition = "text")
	private String sobrenome;
	
	@Column(columnDefinition = "date")
	private Date datanasc;
	
	@Column(unique = true, columnDefinition = "text")
	private String email;
	
	@Column(columnDefinition = "text")
	private String senha;
	
	@Column(columnDefinition = "byte")
	private byte[] profile_icon;
	
	public Date getDatanasc() {
		return datanasc;
	}
	public void setDatanasc(Date datanasc) {
		this.datanasc = datanasc;
	}
	public byte[] getProfile_icon() {
		return profile_icon;
	}
	public void setProfile_icon(byte[] profile_icon) {
		this.profile_icon = profile_icon;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	
	public String getSobrenome() {
		return sobrenome;
	}
	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}
	public Date getDataNasc() {
		return datanasc;
	}
	public void setDataNasc(Date dataNasc) {
		this.datanasc = dataNasc;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}

}
