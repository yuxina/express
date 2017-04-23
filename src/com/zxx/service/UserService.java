package com.zxx.service;

import java.util.List;

import com.zxx.entity.User;


public interface UserService {
	//用户登录
	public User login(User user);
	
	//用户注册
	public void register(User user);
	
	//添加用户
	public void add(User user);
	
	//更新用户
	public void update(User user);
	
	public List<User> queryForPage(int offset, int length); 
	
	public List<User> getAll();
	
	public List<User> getMemberList();
	
	public List<User> getAdminList();
	
	public int getCount();
	
	public void delete(String id);
	
	public User getById(String id);
	
	public User getByName(String name);
	
	
	//判断用户名是否存在
	public boolean existUserWithName(String uname);
	
}
