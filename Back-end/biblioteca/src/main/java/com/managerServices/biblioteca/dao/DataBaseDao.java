package com.managerServices.biblioteca.dao;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.managerServices.biblioteca.dto.RentJoin;
import com.managerServices.biblioteca.exception.HttpReturnException;

@Repository
public class DataBaseDao {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	private final String QRY_JOIN = "select c.nome, c.sobrenome, c.email,"
			 + "l.nome as \"nome_livro\",l.editora,"
			 + "a.data_emprestimo "
			 + "from clientes c "
			 + "inner join aluguel_livros a on c.id = ? and a.id_cliente = ? "
			 + "inner join livros l on a.id_livro = l.id;";
	Connection conn;
	PreparedStatement pst;
	ResultSet rs;
	public List<RentJoin> selectRents(int id) throws Exception {
		try {
			
			 conn = jdbcTemplate.getDataSource().getConnection();
			PreparedStatement pst = conn.prepareStatement(this.QRY_JOIN);
			pst.setInt(1, id);
			pst.setInt(2, id);
			rs = pst.executeQuery();
			List<RentJoin> rent = new ArrayList<RentJoin>();
			int result = 0;
			while(rs.next()) {
				result ++;
				RentJoin j = new RentJoin();
				j.setNome(rs.getString(1));
				j.setSobrenome(rs.getString(2));
				j.setEmail(rs.getString(3));
				j.setNome_livro(rs.getString(4));
				j.setEditora(rs.getString(5));
				j.setData_emprestimo(rs.getDate(6));
				rent.add(j);
			}
			
			if(result == 0)
				throw new SQLException();
			
			rs.close();
			pst.close();
			conn.close();
			return rent;
			
		} catch (SQLException e) {
			throw new SQLException(HttpReturnException.SQL_ERR_01);
		}
		catch (Exception e) {
			rs.close();
			pst.close();
			conn.close();
			throw e;
		}finally {
				
		}
	}
	
}
