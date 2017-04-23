package com.zxx.dao;

import java.util.List;

import com.zxx.entity.User;

public interface UserDao extends BaseDao<User>  {

	public List<User> getMemberList();
	
	public List<User> getAdminList();

}
