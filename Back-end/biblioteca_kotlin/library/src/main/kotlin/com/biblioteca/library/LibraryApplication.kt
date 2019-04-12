package com.biblioteca.library

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.boot.SpringApplication

@SpringBootApplication
open class LibraryApplication {

	companion object {
		@JvmStatic fun main(args: Array<String>) {
			SpringApplication.run(LibraryApplication::class.java, *args)
		}
	}

}