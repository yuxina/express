package com.zxx.service.impl;

import java.util.LinkedList;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.zxx.dao.UserDao;
import com.zxx.entity.User;
import com.zxx.service.UserService;

@Service("UserService")
public class UserServiceImpl implements UserService {

	@Resource
	private UserDao userDao;
	
	@Override
	public void add(User user) {
		userDao.add(user);
	}

	@Override
	public void update(User user) {
		// TODO Auto-generated method stub
		userDao.update(user);

	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		userDao.delete(id);
	}

	@Override
	public User getById(String id) {
		// TODO Auto-generated method stub
		return userDao.getById(id);
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		return userDao.getCount();
	}

	@Override
	public List<User> queryForPage(int offset, int length) {
		// TODO Auto-generated method stub
		List<User> list = userDao.queryForPage(offset, length);
		return list;
	}

	@Override
	public List<User> getAll() {
		List<User> list = userDao.getAll();
		return list;
	}

	@Override
	public List<User> getMemberList() {
		List<User> list = userDao.getMemberList();
		return list;
	}

	@Override
	public List<User> getAdminList() {
		List<User> list = userDao.getAdminList();
		return list;
	}

	@Override
	public User login(User user) {
		List<Object> param=new LinkedList<Object>();
		StringBuffer hql=new StringBuffer("from User u where u.uname=? and u.upwd=?");
		param.add(user.getUname());
		param.add(user.getUpwd());
		return userDao.get(hql.toString(), param);		
	}

	@Override
	public void register(User user) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean existUserWithName(String uname) {
		String hql="select count(*) from User where uname=?";
		long count=userDao.count(hql, new Object[]{uname});
		if (count>0) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public User getByName(String name) {
		List<Object> param=new LinkedList<Object>();
		StringBuffer hql=new StringBuffer("from User u where u.uname=?");
		param.add(name);
		return userDao.get(hql.toString(), param);		
	}
}
