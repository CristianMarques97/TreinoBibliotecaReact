package com.managerServices.biblioteca.exception;

import org.springframework.http.HttpStatus;

public class HttpReturnException extends Exception {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	
	public static final int OK = 200;
	public static final int CONFLICT = 409;
	public static final int NOT_FOUND = 404;

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
	public HttpReturnException() {
		super();
	}
	public HttpReturnException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}
	public HttpReturnException(String message, Throwable cause) {
		super(message, cause);
	}
	public HttpReturnException(String message) {
		super(message);
	}
	public HttpReturnException(Throwable cause) {
		super(cause);
	}
	public HttpReturnException(int status_code, HttpStatus status, String message) {
		super();
		this.status_code = status_code;
		this.status = status;
		this.message = message;
	}	
	
}
