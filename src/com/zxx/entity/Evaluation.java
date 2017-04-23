package com.zxx.entity;

import java.util.Date;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年3月20日 下午3:14:10   
*/
public class Evaluation {
	private String assid;
	private Car car;
	private String content;
	private Date addTime;

	public String getAssid() {
		return this.assid;
	}

	public void setAssid(String assid) {
		this.assid = assid;
	}

	public Car getCar() {
		return this.car;
	}

	public void setCar(Car car) {
		this.car = car;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getAddTime() {
		return this.addTime;
	}

	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}

}
