package com.zxx.action;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.zxx.dao.UserTypeDao;
import com.zxx.entity.UserType;

@Controller
@org.springframework.context.annotation.Scope("prototype")
public class UserTypeAction extends ActionSupport implements ModelDriven<UserType> {

	@Resource	
	private UserTypeDao utDao;
	
	private UserType  ut = new UserType();
	
	public String add(){
		utDao.add(ut);
		return "list";
	}
	
	@Override
	public UserType getModel() {
		// TODO Auto-generated method stub
		return ut;
	}

}
