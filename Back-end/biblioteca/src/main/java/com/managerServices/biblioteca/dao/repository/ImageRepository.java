package com.managerServices.biblioteca.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.managerServices.biblioteca.dto.AvatarImageSendRequest;

public interface ImageRepository extends JpaRepository<AvatarImageSendRequest, Integer>{
	
//	public AvatarImage saveImage(int id, byte[] profile_icon);
}
