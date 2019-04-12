package com.biblioteca.library.repository

import org.springframework.data.jpa.repository.JpaRepository
import com.biblioteca.library.dto.Usuario

interface UserRepository : JpaRepository<Usuario, Int> {
	
	fun findByEmailAndSenha(mail: String?, senha: String?) : Usuario
	
	fun findByIdAndSenha(id: Int, senha: String): Usuario
}