package com.managerServices.biblioteca.controller;

import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Calendar;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.managerServices.biblioteca.dao.repository.AuthRepository;
import com.managerServices.biblioteca.dao.repository.ChangePasswordRepository;
import com.managerServices.biblioteca.dao.repository.ImageRepository;
import com.managerServices.biblioteca.dao.repository.LivroRepository;
import com.managerServices.biblioteca.dao.repository.RentRepository;
import com.managerServices.biblioteca.dao.repository.UserEditRepository;
import com.managerServices.biblioteca.dao.repository.UserRepository;
import com.managerServices.biblioteca.dto.AluguelLivros;
import com.managerServices.biblioteca.dto.AluguelLivrosKey;
import com.managerServices.biblioteca.dto.AuthChangeRequest;
import com.managerServices.biblioteca.dto.AuthRequest;
import com.managerServices.biblioteca.dto.AvatarImage;
import com.managerServices.biblioteca.dto.AvatarImageSendRequest;
import com.managerServices.biblioteca.dto.ChangePasswordRequest;
import com.managerServices.biblioteca.dto.HttpReturn;
import com.managerServices.biblioteca.dto.Livro;
import com.managerServices.biblioteca.dto.LoginRequest;
import com.managerServices.biblioteca.dto.UserEdit;
import com.managerServices.biblioteca.dto.Usuario;
import com.managerServices.biblioteca.exception.HttpReturnException;
import com.managerServices.biblioteca.service.DataBaseService;
//import com.managerServices.biblioteca.service.DataBaseService;

@RestController
@RequestMapping(value = "/library")
public class ManagerController {

	private static final Logger log = LoggerFactory.getLogger(ManagerController.class);

	@Autowired
	private DataBaseService service;

	@Autowired
	private UserRepository repo;

	@Autowired
	private RentRepository rentRepo;

	@Autowired
	private ImageRepository imgRepo;

	@Autowired
	private UserEditRepository userRepo;

	@Autowired
	private ChangePasswordRepository passRepo;

	@Autowired
	private AuthRepository authRepo;

	@Autowired
	private LivroRepository livroRepo;

	@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.POST })
	@PostMapping("/user/manager/image-edit")
	public AvatarImageSendRequest addAvatarImage(@RequestBody AvatarImage img) throws Exception {
		log.info("Request: {}", "New Image");

		try {
			if (img.getImage() == null) {
				AvatarImageSendRequest request = new AvatarImageSendRequest();
				request.setId(img.getId());
				return imgRepo.save(request);
			} else {
				String base64 = img.getImage().replace("data:image/png;base64,", "");
				AvatarImageSendRequest request = new AvatarImageSendRequest();
				request.setId(img.getId());
				byte[] icon = Base64.getEncoder().encode(base64.getBytes());
				request.setProfile_icon(Base64.getDecoder().decode(new String(icon).getBytes("UTF-8")));

				return imgRepo.save(request);
			}
		} catch (Exception e) {
			throw e;
		}

	}

	@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.POST })
	@PostMapping("/user/manager/new")
	public Usuario createNewUser(@RequestBody Usuario user) {
		log.info("Request: {}", "New User");
		user.setDatanasc(this.addDay(user.getDatanasc()));
		return repo.save(user);
	}

	public Date addDay(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(Calendar.DATE, 1);
		return new Date(c.getTimeInMillis());

	}

	@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.POST })
	@PostMapping("/user/manager/login")
	public Usuario login(@RequestBody LoginRequest request) {
		log.info("Request: {}", "Login");
		Usuario user = repo.findByEmailAndSenha(request.getEmail(), request.getSenha());
		if (user.getProfile_icon() == null) {
			return user;
		} else {
			String encoded = Base64.getEncoder().encodeToString(user.getProfile_icon());
			String decoded = new String(Base64.getDecoder().decode(encoded.getBytes()));

			user.setProfileIconDecoded(decoded);
			user.setProfile_icon(null);

			return user;
		}

	}

	@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET })
	@GetMapping("/management/manager/manage-access")
	public List<Usuario> findAllUsers() {
		log.info("Request: {}", "Manage Access");
		List<Usuario> user = repo.findAll();

		for (Usuario usuario : user) {

			if (usuario.getProfile_icon() == null) {
				return user;
			} else {
				String encoded = Base64.getEncoder().encodeToString(usuario.getProfile_icon());
				String decoded = new String(Base64.getDecoder().decode(encoded.getBytes()));

				usuario.setProfileIconDecoded(decoded);
				usuario.setProfile_icon(null);
			}
		}

		return user;

	}

	@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.POST })
	@PostMapping("/user/manager/edit-info")
	public UserEdit editUserInfo(@RequestBody UserEdit updateUserRquest) {
		log.info("Request: {}", "Edit User Info: ");
		return userRepo.save(updateUserRquest);
	}

	@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.POST })
	@PostMapping("/user/manager/password-change")
	public ChangePasswordRequest changePassword(@RequestBody ChangePasswordRequest changePasswordRquest) {
		log.info("Request: {}", "Edit User Info: ");
		return passRepo.save(changePasswordRquest);
	}

	@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.POST })
	@PostMapping("/management/manager/adm-auth")
	public List<AuthChangeRequest> increaseAccessLevel(@RequestBody List<AuthChangeRequest> users) {
		log.info("Request: {}", "Admin Auth: ");
		for (AuthChangeRequest usr : users) {
			usr.setAdm(true);
		}
		return authRepo.saveAll(users);
	}

	@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.POST })
	@PostMapping("/management/manager/adm-unauth")
	public List<AuthChangeRequest> decreaseAccessLevel(@RequestBody List<AuthChangeRequest> users) {
		log.info("Request: {}", "Admin Auth: ");
		for (AuthChangeRequest usr : users) {
			usr.setAdm(false);
		}
		return authRepo.saveAll(users);
	}

	@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.POST })
	@PostMapping("/management/manager/remove-user")
	public HttpStatus removeUser(@RequestBody List<AuthChangeRequest> users) {
		log.info("Request: {}", "Remove User: ");
		authRepo.deleteAll(users);
		return HttpStatus.OK;
	}

	@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.POST })
	@PostMapping("/collection/book/book-search")
	public List<Livro> findBooksLike(@RequestBody Livro book) {
		log.info("Request: {}", "find books: " + book.getNome());

		return livroRepo.findBookSearch(book.getNome());

	}
	
	@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET })
	@GetMapping("/collection/book/return-all-book")
	public List<Livro> findBookByName() {
		log.info("Request: {}", "find book: " + "All Books");

		return livroRepo.findAll();

	}

	@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.POST })
	@PostMapping("/collection/book/return-book")
	public Livro findBookByName(@RequestBody Livro book) {
		log.info("Request: {}", "find book: " + book.getNome());

		return livroRepo.findBookByNome(book.getNome());

	}

	@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.PUT })
	@PutMapping("/collection/user/autenticate")
	public Object autenticateUser(@RequestBody AuthRequest request) throws HttpReturnException {
		log.info("Request: {}", "find book: ");
		Usuario usuario = repo.findByIdAndSenha(request.getId(), request.getSenha());
		if (usuario != null)
			return usuario;

		throw new HttpReturnException(HttpReturnException.NOT_FOUND, HttpStatus.NOT_FOUND, "Usuário/Senha incorreta");

	}

	@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.PUT })
	@PostMapping("/collection/user/my-rents")
	public Object findUserRent(@RequestBody AluguelLivrosKey id) throws HttpReturnException {
		log.info("Request: {}", "find book: ");
		try {

			return service.findRent(id.getId_cliente());
		} catch (SQLException e) {
			throw new HttpReturnException(HttpReturnException.NO_CONTENT, HttpStatus.NO_CONTENT, e.getMessage());
		} catch (Exception e) {
			throw new HttpReturnException(HttpReturnException.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}

	}

	@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.POST })
	@PostMapping("/collection/user/rent-book")
	public HttpReturn rentBook(@RequestBody AluguelLivros rent) throws Exception {
		log.info("Request: {}", "Rent book: ");

		try {
			if (rentRepo.findById(rent.getId_cliente(), rent.getId_livro()) != null)
				throw new HttpReturnException(HttpReturnException.CONFLICT, HttpStatus.CONFLICT,
						"Este livro já foi alugado");
			Livro livro = livroRepo.findById(rent.getId_livro()).get();

			if (livro.getQtde() > 0) {
				rent.setData_emprestimo(LocalDateTime.now());
				livro.setQtde(livro.getQtde() - 1);
				rentRepo.save(rent);
				livroRepo.save(livro);

				return new HttpReturn(HttpReturn.OK, HttpStatus.OK, "Alteração com Sucesso");
			} else {
				throw new HttpReturnException(HttpReturnException.CONFLICT, HttpStatus.CONFLICT,
						"Quantidades do livro esgotadas");
			}
		} catch (Exception ex) {
			throw new HttpReturnException(HttpReturnException.CONFLICT, HttpStatus.CONFLICT, ex.getMessage());
		}
	}

}
