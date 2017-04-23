package com.zxx.test;

import static org.junit.Assert.*;

import java.util.Date;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import com.zxx.entity.User;
import com.zxx.entity.UserType;
import com.zxx.service.UserService;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年3月19日 下午3:51:20   
*/ 
@RunWith(SpringJUnit4ClassRunner.class)  
@ContextConfiguration(locations={"classpath:applicationContext.xml"})  
public class UserTest {

	@Resource
	private UserService us;

    @Test   //标明是测试方法  
	public void testAdd() {
		User user = new User();
		user.setUname("zhangsan");
		user.setUpwd("123456");
		user.setUsex(1);
		user.setUaddress("");
		user.setUphone("");
		UserType ut = new UserType();
		ut.setUtId(1);
		user.setUt(ut);
		user.setUstate(1);
		user.setAddTime(new Date());
		us.add(user);
		
	}
}


