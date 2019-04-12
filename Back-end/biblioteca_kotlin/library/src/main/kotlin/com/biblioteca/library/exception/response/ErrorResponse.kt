package com.biblioteca.library.exception.response

import org.springframework.http.HttpStatus

class ErrorResponse {
	
	// Modeling of error response
	
	var status_code: Int = 0
	var status: HttpStatus? = null
	var message: String? = null
	
	override fun hashCode(): Int {
		return super.hashCode()
	}
}