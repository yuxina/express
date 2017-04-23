package com.zxx.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/** 
* Car.java 购物车类/订单类
* @author zhengxiaoxue 
* @version 创建时间：2017年2月23日 下午6:13:47   
*/
public class Car implements java.io.Serializable {

	private String carId;//订单编号
	private CarState carState;//订单状态编号
	private User user;//用户编号
	private double total;//总价
	private String contacts;//联系人
	private String phone;//联系电话
	private String address;//收件地址
	private String proof;//取件凭证(例如取件编号)
	private Date submitTime;//提交订单时间
	private String expressFirm;//快递公司
	private String deliveryDate;//配送日期 当天，明天
	private String deliveryTime;//配送时间点 几点钟
	private String carDesc;//订单备注
	private Set<CarItem> carItems = new HashSet<CarItem>();//购物车项
	public String getCarId() {
		return carId;
	}
	public void setCarId(String carId) {
		this.carId = carId;
	}
	public CarState getCarState() {
		return carState;
	}
	public void setCarState(CarState carState) {
		this.carState = carState;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public double getTotal() {
		return total;
	}
	public void setTotal(double total) {
		this.total = total;
	}
	public String getContacts() {
		return contacts;
	}
	public void setContacts(String contacts) {
		this.contacts = contacts;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getProof() {
		return proof;
	}
	public void setProof(String proof) {
		this.proof = proof;
	}
	public Date getSubmitTime() {
		return submitTime;
	}
	public void setSubmitTime(Date submitTime) {
		this.submitTime = submitTime;
	}
	public String getExpressFirm() {
		return expressFirm;
	}
	public void setExpressFirm(String expressFirm) {
		this.expressFirm = expressFirm;
	}
	public String getDeliveryDate() {
		return deliveryDate;
	}
	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	public String getDeliveryTime() {
		return deliveryTime;
	}
	public void setDeliveryTime(String deliveryTime) {
		this.deliveryTime = deliveryTime;
	}
	
	public String getCarDesc() {
		return carDesc;
	}
	public void setCarDesc(String carDesc) {
		this.carDesc = carDesc;
	}
	public Set<CarItem> getCarItems() {
		return carItems;
	}
	public void setCarItems(Set<CarItem> carItems) {
		this.carItems = carItems;
	}

	
	

}
