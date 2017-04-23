package com.zxx.action;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.zxx.entity.CarState;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年3月7日 上午10:36:24   
*/
@Controller
@org.springframework.context.annotation.Scope("prototype")
public class CarStateAction extends ActionSupport implements ModelDriven<CarState> {

	
	@Override
	public CarState getModel() {
		// TODO Auto-generated method stub
		return null;
	}
}
