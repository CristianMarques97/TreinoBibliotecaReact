package com.biblioteca.library.exception

import org.springframework.http.HttpStatus
import java.lang.Exception

class HttpReturnException(status_code: Int, status: HttpStatus, message: String) : Exception() {
	
	

	override fun hashCode(): Int {
		return super.hashCode()
	}

	var status_code = status_code
	var status = status
	override var message = message
	
	companion object {
		final val OK = 200
		final val CONFLICT = 409
		final val NOT_FOUND = 404;
	 	final val NO_CONTENT = 204;
	 	final val INTERNAL_SERVER_ERROR = 500;

	 	final val SQL_ERR_01 = "Não possui nenhum aluguel de livro";
	
	}
	
}