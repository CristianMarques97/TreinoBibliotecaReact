package com.managerServices.biblioteca.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.managerServices.biblioteca.exception.response.ErrorResponse;

@ControllerAdvice
@RestController
public class HttpReturnExceptionHandler extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler(HttpReturnException.class)
	public final ResponseEntity<ErrorResponse> handleProviderError(HttpReturnException e, WebRequest request) {
		
		ErrorResponse res = new ErrorResponse();
		res.setMessage(e.getMessage());
		res.setStatus(e.getStatus());
		res.setStatus_code(e.getStatus_code());
		
		return new ResponseEntity<ErrorResponse>(res, e.getStatus());

	}
	

	
}
