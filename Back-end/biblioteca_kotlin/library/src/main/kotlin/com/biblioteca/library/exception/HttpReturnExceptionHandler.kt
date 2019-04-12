package com.biblioteca.library.exception

import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.http.ResponseEntity
import com.biblioteca.library.exception.response.ErrorResponse
import org.springframework.web.context.request.WebRequest

@ControllerAdvice
@RestController
class HttpReturnExceptionHandler : ResponseEntityExceptionHandler() {
	
	@ExceptionHandler(HttpReturnException::class)
	final fun handleProviderError(e: HttpReturnException, request: WebRequest) : ResponseEntity<ErrorResponse>{
		
		var res = ErrorResponse();
		res.message = e.message
		res.status =  e.status
		res.status_code = e.status_code
		
		return ResponseEntity<ErrorResponse>(res, e.status)
		
	}
}