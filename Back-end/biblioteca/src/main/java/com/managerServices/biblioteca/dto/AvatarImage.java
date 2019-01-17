package com.managerServices.biblioteca.dto;

import java.io.Serializable;



public class AvatarImage implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	

	private int Id;
	private String image;
	

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	

}
