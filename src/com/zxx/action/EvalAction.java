package com.zxx.action;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.zxx.dao.CarDao;
import com.zxx.entity.Car;
import com.zxx.entity.CarState;
import com.zxx.entity.Evaluation;
import com.zxx.entity.User;
import com.zxx.service.CarService;
import com.zxx.service.EvaluationService;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年4月8日 上午1:21:41   
*/
@Controller
@org.springframework.context.annotation.Scope("prototype")
public class EvalAction extends ActionSupport implements ModelDriven<Evaluation>{
	@Resource
	private EvaluationService evalService;
	@Resource
	private CarService carService; 
	
	private Evaluation eval = new Evaluation();
	
	//将会被Struts2序列化为JSON字符串的对象  
    private Map<String, Object> dataMap = new HashMap<String, Object>();
    		
	public Map<String, Object> getDataMap() {
		return dataMap;
	}

	public void setDataMap(Map<String, Object> dataMap) {
		this.dataMap = dataMap;
	}
	
	public String list() {
		List<Evaluation> evalList = evalService.getAll();
		ActionContext.getContext().put("evalList", evalList);
		return "list";
	}
	
	public String getlist(){
		List<Evaluation> eList = evalService.getAll();
		if(!eList.isEmpty()){
			dataMap.clear();
			dataMap.put("success", true);
			dataMap.put("cList", eList);
		}else{
			dataMap.put("success", false);
		}
		return SUCCESS;
	}
	
	
	public String add(){
		Car c = carService.getById(eval.getCar().getCarId());
		CarState cs = new CarState();
		cs.setCarSid(7);
		c.setCarState(cs);
		carService.updateState(c);
		eval.setAddTime(new Date());
		evalService.add(eval);
		dataMap.clear();
		dataMap.put("success", true);
		return SUCCESS;
	}
	
	public String delete() {
		dataMap.clear();
		evalService.delete(eval.getAssid());
		dataMap.put("success", true);
		return SUCCESS;
	}
	
	@Override
	public Evaluation getModel() {
		// TODO Auto-generated method stub
		return eval;
	}

}
