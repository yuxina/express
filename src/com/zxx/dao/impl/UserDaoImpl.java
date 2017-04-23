package com.zxx.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.zxx.dao.UserDao;
import com.zxx.entity.User;

@Repository("userDao")
public class UserDaoImpl extends BaseDaoImpl<User> implements UserDao {
	
	public List<User> getMemberList() {
		// TODO Auto-generated method stub
		return getSession().createQuery("FROM User where utId = 2").list();
	}
	
	public List<User> getAdminList() {
		// TODO Auto-generated method stub
		return getSession().createQuery("FROM User where utId = 1").list();
	}
}
