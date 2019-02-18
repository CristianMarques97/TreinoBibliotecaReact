package com.managerServices.biblioteca.exception.response;

import org.springframework.http.HttpStatus;

public class ErrorResponse {
	
	/*
	 * modelagem para resposta do sistema em caso não tenha sucesso na transação
	 */

	private int status_code;
	private HttpStatus status;
	private String message;
	
	@Override
	public int hashCode() {
		return super.hashCode();
	}

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