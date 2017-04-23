package com.zxx.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Controller;

import com.zxx.entity.User;
import com.zxx.entity.UserType;
import com.zxx.service.UserService;
import com.zxx.util.StringDateParseUtil;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.util.ValueStack;

@Controller
@org.springframework.context.annotation.Scope("prototype")
public class UserAction extends ActionSupport implements ModelDriven<User> {

	private static final long serialVersionUID = 1L;

	@Resource
	private UserService userService;

	private HttpServletRequest request;

	private User user = new User();
	
	private String msg;//保存提示信息
	
	private String imageCode;
	
	//将会被Struts2序列化为JSON字符串的对象  
    private Map<String, Object> dataMap = new HashMap<String, Object>();
    		
	public Map<String, Object> getDataMap() {
		return dataMap;
	}

	public void setDataMap(Map<String, Object> dataMap) {
		this.dataMap = dataMap;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getImageCode() {
		return imageCode;
	}

	public void setImageCode(String imageCode) {
		this.imageCode = imageCode;
	}

/*	// 通过action是以传统方式返回JSON数据 
	public void login() throws Exception{
		request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		HttpServletResponse response = ServletActionContext.getResponse();
		User currentUser=userService.login(user);
		if (currentUser!=null&&currentUser.getUt().getUtId()==2) {
			//session.setAttribute("currentUser", currentUser);
			response.setContentType("text/html;charset=UTF-8");
			PrintWriter out = response.getWriter();	
			JSONObject json=new JSONObject();  
		    json.accumulate("success", true);  
		    json.accumulate("user", user);  
			out.flush();
			out.print(json.toString());
			out.close();
			
		}else {
			PrintWriter out = response.getWriter();	
			JSONObject json=new JSONObject();  
		    json.accumulate("success", false);   
		    json.accumulate("msg", "用户名或密码错误！");
			out.flush();
			out.print(json.toString());
			out.close();
		}
	}*/
	
	public String login() throws Exception{
		request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		User currentUser=userService.login(user);
		if(currentUser.getUstate() == 1){
	        dataMap.clear();  
	        dataMap.put("msg", "您的账号被管理员禁用，暂时无法登陆！");  
	        // 放入一个是否操作成功的标识  
	        dataMap.put("success", false);  
		}else{
			if (currentUser!=null&&currentUser.getUt().getUtId()==2) {
				session.setAttribute("currentUser", currentUser);
				// dataMap中的数据将会被Struts2转换成JSON字符串，所以这里要先清空其中的数据  
		        dataMap.clear(); 
		        dataMap.put("user", currentUser);  
		        // 放入一个是否操作成功的标识  
		        dataMap.put("success", true);    			
			}else {			
		        dataMap.clear();  
		        dataMap.put("msg", "用户名或密码错误！");  
		        // 放入一个是否操作成功的标识  
		        dataMap.put("success", false);  
			}
		}
		
		return SUCCESS;
	}

	public String register() {
		request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		UserType ut = new UserType();
		ut.setUtId(2);
		user.setUt(ut);
		user.setUstate(0);//默认状态0,1 为锁住
		user.setAddTime(new Date());
		userService.add(user);
		User currentUser = userService.getByName(user.getUname()); 
		if(currentUser!=null){
			session.setAttribute("currentUser", currentUser);
			// dataMap中的数据将会被Struts2转换成JSON字符串，所以这里要先清空其中的数据  
	        dataMap.clear(); 
	        dataMap.put("user", currentUser);  
	        // 放入一个是否操作成功的标识  
	        dataMap.put("success", true);   
		}else {			
	        dataMap.clear();  
	        // 放入一个是否操作成功的标识  
	        dataMap.put("success", false);  
		}

		return SUCCESS;
	}
	
	public String existUserWithUserName()throws Exception{
		boolean exist=userService.existUserWithName(user.getUname());
		System.out.println(exist);
		if (exist) {
			dataMap.clear(); 
	        dataMap.put("exist", true); 
		} else {
			dataMap.clear(); 
	        dataMap.put("exist", false); 
		}
		return SUCCESS;
	}

	//管理员登录
	public String adminLogin() throws Exception{
		request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		User currentUser = userService.login(user);
		System.out.println(currentUser.getUt().getUtId());
		if(!imageCode.equals(session.getAttribute("sRand"))){
			msg ="验证码错误！";
			session.setAttribute("msg", msg);
			return "errorAdmin";
		}else if(currentUser == null) {
			msg = "用户名或密码错误！";
			session.setAttribute("msg", msg);
			return "errorAdmin";
		}else if(currentUser != null && currentUser.getUt().getUtId() == 1) {
			session.setAttribute("currentUser", currentUser);
			msg = "";
			session.removeAttribute("msg");
		}
		return "loginAdmin";
	}
	
	//管理员注销
	public String adminLogout() throws Exception{
		request = ServletActionContext.getRequest();
		request.getSession().invalidate();
		return "logoutAdmin";
	}
	
	//用户注销
	public String logout() throws Exception{
		request = ServletActionContext.getRequest();
		request.getSession().invalidate();
		return "logout";
	}
	
	public String list() {
		List<User> userList = userService.getAll();
		ActionContext.getContext().put("userList", userList);
		return "list";
	}

	public String adminList() {
		List<User> userList = userService.getAdminList();
		ActionContext.getContext().put("userList", userList);
		return "adminList";
	}

	public String memberList() {
		List<User> userList = userService.getMemberList();
		ActionContext.getContext().put("userList", userList);
		return "list";
	}

	public String editUI() {
		String id = user.getUid();
		User u = userService.getById(id);
		ValueStack vs = ActionContext.getContext().getValueStack();
		vs.pop();// 删除栈顶元素
		vs.push(u);
		return "editUI";
	}

	public void add() {
		user.setAddTime(new Date());
		userService.add(user);
		// String uid = result.toString();
		// JSONObject json =JSONObject.fromObject(userService.getById(uid));
		// System.out.println(json.toString());
		// 获取相应Response
		HttpServletResponse response = ServletActionContext.getResponse();
		// 设置编码方式
		response.setCharacterEncoding("UTF-8");
		/*
		 * try { //将数据写到页面中 response.getWriter().flush();
		 * response.getWriter().print(json); response.getWriter().close();
		 * 
		 * } catch (IOException e) { e.printStackTrace(); }
		 */
		try {
			// 将数据写到页面中
			response.getWriter().write("success");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void edit() {
		String method = ServletActionContext.getRequest().getParameter("method");
		User u = userService.getById(user.getUid());
		if ("enable".equals(method)) {
			u.setUstate(0);
		} else if ("unenable".equals(method)) {
			u.setUstate(1);
		} else {
			u.setUname(user.getUname());
			u.setUsex(user.getUsex());
			u.setUphone(user.getUphone());
			u.setUemail(user.getUemail());
			u.setUaddress(user.getUaddress());
		}
		userService.update(u);
		// 获取相应Response
		HttpServletResponse response = ServletActionContext.getResponse();
		// 设置编码方式
		response.setCharacterEncoding("UTF-8");
		try {
			// 将数据写到页面中
			response.getWriter().write("success");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void delete() {
		// 获取相应Response
		HttpServletResponse response = ServletActionContext.getResponse();
		// 设置编码方式
		response.setCharacterEncoding("UTF-8");
		userService.delete(user.getUid());
		try {
			// 将数据写到页面中
			response.getWriter().write("success");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	

	

	@Override
	public User getModel() {
		// TODO Auto-generated method stub
		return user;
	}

}
