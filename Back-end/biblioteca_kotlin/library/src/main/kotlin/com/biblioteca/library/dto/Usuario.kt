package com.biblioteca.library.dto

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name= "clientes")
class Usuario : Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	var id : Int = 0
	
	@Column(ColumnDefinition = "text")
	var nome: String? = null
	
	@Column(ColumnDefinition = "text")
	var sobrenome: String? = null
	
	@Column(ColumnDefinition = "date")
	var datanasc : Date? = null
	
	@Column(unique = true, ColumnDefinition = "text")
	var email : String? = null
	
	@Column(ColumnDefinition = "text")
	var senha : String? = null
	
	@Column(ColumnDefinition = "boolean")
	var adm: Boolean = false
	
	@Transient
	var profileIconDecoded: String? = null
	
	@Column(ColumnDefinition = "byte")
	var profile_icon: ByteArray? = null

	companion object {
		private final val serialVersionUID = 1L
	}
	
}