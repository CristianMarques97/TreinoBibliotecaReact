package com.managerServices.biblioteca.dao.storedProcedures;

import java.sql.SQLException;
import java.sql.Types;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import com.managerServices.biblioteca.dto.Usuario;

public class CreateUserSP extends StoredProcedure {
	
	private static final String CREATE_USER_PROC = "nada";
	private static final String DATA_NASCIMENTO_PARAM = "data_nascimento";
	private static final String NOME_PARAM = "nome";
	private static final String SOBRENOME_PARAM = "sobrenome";
	private static final String EMAIL_PARAM = "email";
	private static final String SENHA_PARAM = "senha";
	
	public CreateUserSP(DataSource dataSource) {
		super(dataSource, CREATE_USER_PROC);
//		declareParameter(new SqlParameter(DATA_NASCIMENTO_PARAM, Types.DATE));
//		declareParameter(new SqlParameter(NOME_PARAM, Types.VARCHAR));
//		declareParameter(new SqlParameter(SOBRENOME_PARAM, Types.VARCHAR));
//		declareParameter(new SqlParameter(EMAIL_PARAM, Types.VARCHAR));
//		declareParameter(new SqlParameter(SENHA_PARAM, Types.VARCHAR));


	}
	
	
	public Map<String, Object> execute(Usuario user) throws SQLException {
//		Map<String, Object> inputs = new HashMap<String, Object>();
//	
//		String date = user.getDataNasc().toString();
//		LocalDate localDate = LocalDate.parse(date,DateTimeFormatter.ofPattern("yyyy-MM-dd"));
//	
//		inputs.put(DATA_NASCIMENTO_PARAM, localDate);
//		inputs.put(NOME_PARAM, user.getNome());
//		inputs.put(SOBRENOME_PARAM, user.getSobrenome());
//		inputs.put(EMAIL_PARAM, user.getEmail());
//		inputs.put(SENHA_PARAM, user.getSenha());
		
		return super.execute();

	}

}
