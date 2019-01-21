package com.managerServices.biblioteca.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="clientes")
public class AvatarImageSendRequest implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	int id;
	
	@Column(columnDefinition = "byte")
	byte[] profile_icon;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public byte[] getProfile_icon() {
		return profile_icon;
	}
	public void setProfile_icon(byte[] profile_icon) {
		this.profile_icon = profile_icon;
	}

}
