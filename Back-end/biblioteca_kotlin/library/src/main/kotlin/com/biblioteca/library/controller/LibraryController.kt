package com.biblioteca.library.controller

import org.springframework.web.bind.annotation.RestController
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired

import com.biblioteca.library.repository.UserRepository
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.http.RequestEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMethod;
import com.biblioteca.library.dto.LoginRequest
import java.util.Base64
import com.biblioteca.library.dto.Usuario
import org.springframework.web.bind.annotation.RequestMapping;
import com.biblioteca.library.exception.HttpReturnException
import org.springframework.http.HttpStatus
import java.lang.Exception
import org.springframework.dao.EmptyResultDataAccessException

@RestController
@RequestMapping("/library")
class LibraryController {

	private final val log = LoggerFactory.getLogger(LibraryController::class.java)

	@Autowired
	private val repo: UserRepository? = null


	@PostMapping("/user/manager/login")
	fun userLogin(@RequestBody request: LoginRequest): Usuario {
		log.info("Request: Login($request)")

		try {
			var user = repo!!.findByEmailAndSenha(request.email, request.senha)
			if (user.profile_icon == null)
				return user;
			else {
				var encoded = Base64.getEncoder().encodeToString(user.profile_icon);
				var decoded = String(Base64.getDecoder().decode(encoded));

				user.profileIconDecoded = decoded;
				user.profile_icon = null;

				return user;
			}
		} catch (e: EmptyResultDataAccessException) {
			throw HttpReturnException(HttpReturnException.NOT_FOUND, HttpStatus.NOT_FOUND, "Usuário não encontrado")
		} catch (e: Exception) {
			throw HttpReturnException(
				HttpReturnException.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR, e?.message
					?: "Erro no Servidor"
			)
		}
	}


}