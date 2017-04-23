package com.zxx.action;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.util.ValueStack;
import com.zxx.entity.Car;
import com.zxx.entity.CarItem;
import com.zxx.entity.CarState;
import com.zxx.entity.Product;
import com.zxx.entity.ProductType;
import com.zxx.entity.User;
import com.zxx.service.CarItemService;
import com.zxx.service.CarService;
import com.zxx.service.ProductService;
import com.zxx.util.DateUtil;
import com.zxx.util.StringUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年2月24日 下午2:35:52   
*/
@Controller
@org.springframework.context.annotation.Scope("prototype")
public class CarAction extends ActionSupport implements ModelDriven<Car> {

	@Resource
	private CarService carService;
	@Resource
	private ProductService productService;
	
	private HttpServletRequest request;
	
	
	private String cItems;
	
	public String getCItems() {
		return cItems;
	}

	public void setCItems(String cItems) {
		this.cItems = cItems;
	}
	
	public String state;
	

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	//将会被Struts2序列化为JSON字符串的对象  
    private Map<String, Object> dataMap = new HashMap<String, Object>();
    		
	public Map<String, Object> getDataMap() {
		return dataMap;
	}

	public void setDataMap(Map<String, Object> dataMap) {
		this.dataMap = dataMap;
	}	

	private Car car = new Car();
	
	public String list() {
		List<Car> carList = carService.getAll();
		ActionContext.getContext().put("carList", carList);
		return "list";
	}
	//获取已提交订单列表
	public String submittedList() {
		List<Car> carList = carService.getListAfterSubmit();
		ActionContext.getContext().put("carList", carList);
		return "submittedList";
	}
	//提交订单
	public String submit(){
		CarItem ci = null;
		int num = 0;
		int num1 = 0;
		Product pro = null;
		Product pro1 = null;
		request = ServletActionContext.getRequest();	
		JSONArray jan=JSONArray.fromObject(getCItems());
		boolean flag = false;
		boolean checkNum = false;
		car.setSubmitTime(new Date());
		CarState cs = new CarState();
		cs.setCarSid(2);
		car.setCarState(cs);
		if(jan!=null||jan.size()!=0){
			Set<CarItem> cis = new HashSet<CarItem>();
		    Collection collection = JSONArray.toCollection(jan, CarItem.class);
		    Iterator it = collection.iterator();
		    while (it.hasNext()) {
		        ci = (CarItem) it.next();
		        num = ci.getQuantity();//产品下单数量
		        pro = ci.getProduct();
		        pro1 = productService.getById(pro.getProId());//查询出来的产品对象
		        num1 = pro1.getProAmount();//库存量
		        //库存充足
		        if(num1>num){
		        	pro1.setProAmount(num1-num);
		        	productService.update(pro);
		        	cis.add(ci);
		        	checkNum = true;
		        }else{
		        	checkNum = false;
		        	break; 
		        }
		       
		    }
		    if(checkNum){
				car.setCarItems(cis);				
				flag = carService.submit(car);
		    }

		}		
		dataMap.clear(); 
		if(checkNum){
			if(flag){
				dataMap.put("success", true);
			}else{
				dataMap.put("success", false);
			}
		}else{
			dataMap.put("success", false);
			dataMap.put("msg", "库存不足");
		}

		return SUCCESS;
	}
	
	//查询用户是否有购物车
	//CarState 为 1
	public String checkCarByUser() throws Exception{		
		Car c  = carService.getCarNumByUser(car.getUser().getUid());
		dataMap.clear(); 
		if(c == null){
			CarState cs = new CarState();
			cs.setCarSid(1);
			String carId = DateUtil.getCurrentDateStr();
			car.setCarId(carId);
			User u = new User();
			u.setUid(car.getUser().getUid());
			car.setUser(u);
			car.setCarState(cs);
			carService.add(car);
			c  = carService.getCarNumByUser(car.getUser().getUid());
			dataMap.put("carInfo", c);
		}else if(c != null){			
			dataMap.put("carInfo", c);
		} 
         
		return SUCCESS;
	}
	//根据订单编号，显示其所有订单项
	public String showDetail(){
		request = ServletActionContext.getRequest();
		Car c = carService.getById(car.getCarId());
		List<CarItem> ciList = new ArrayList<CarItem>(c.getCarItems());
		request.setAttribute("ciList", ciList);
		ValueStack vs = ActionContext.getContext().getValueStack();
		vs.pop();// 删除栈顶元素
		vs.push(c);
		return "detail";
	}
	//根据用户编号，返回其所有订单列表
	public String getOrderByUid(){
		List<Car> cList = carService.getByUid(car.getUser().getUid());
		if(!cList.isEmpty()){
			dataMap.clear();
			dataMap.put("success", true);
			dataMap.put("cList", cList);
		}else{
			dataMap.put("success", false);
		}
		return SUCCESS;
	}
	//触屏端调用的订单状态修改方法
	public String changeS() {
		Car c = carService.getById(car.getCarId());
		
		if(StringUtil.isNotEmpty(state) && c != null){
			CarState cs = new CarState();
			cs.setCarSid(Integer.parseInt(state));
			c.setCarState(cs);
			carService.updateState(c);
			dataMap.clear();
			dataMap.put("success", true);
		}else{
			dataMap.clear();
			dataMap.put("success", false);
		}
		return SUCCESS;
		 
	}
	
	public void changeState() {
		Car c = carService.getById(car.getCarId());
		
		if(StringUtil.isNotEmpty(state) && c != null){
			CarState cs = new CarState();
			cs.setCarSid(Integer.parseInt(state));
			c.setCarState(cs);
			carService.updateState(c);
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
		 
	}
	
	public String delete() {
		dataMap.clear();
		Car c = carService.getById(car.getCarId());
		if(c!=null){
			int carSid = c.getCarState().getCarSid();
			if(carSid == 6 && carSid == 7 && carSid == 8){
				carService.delete(car.getCarId());
				dataMap.put("success", true);
			}else{
				dataMap.put("success", false);
			}
		}else{
			dataMap.put("fail", false);
		}

	
		return SUCCESS;
	}
	
	
	@Override
	public Car getModel() {
		// TODO Auto-generated method stub
		return car;
	}

}
