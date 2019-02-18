package com.managerServices.biblioteca.dto;

import org.springframework.http.HttpStatus;

public class HttpReturn {
	
	public HttpReturn(int status_code, HttpStatus status, String message) {
		super();
		this.status_code = status_code;
		this.status = status;
		this.message = message;
	}
	
	public static final int OK = 200;
	public static final int CONFLICT = 409;

	private int status_code;
	private HttpStatus status;
	private String message;
	
	public int getStatus_code() {
		return status_code;
	}
	public void setStatus_code(int status_code) {
		this.status_code = status_code;
	}
	public HttpStatus getStatus() {
		return status;
	}
	public void setStatus(HttpStatus status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}	
	
}
