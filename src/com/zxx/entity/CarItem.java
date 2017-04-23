package com.zxx.entity;

import java.io.Serializable;


/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年2月24日 上午9:48:59   
*/
public class CarItem implements Serializable {

	private String carItemId;
	private Product product;
	private Car car;
	private int quantity;
	private String proName;
	private double proPrice;

	public String getCarItemId() {
		return this.carItemId;
	}

	public void setCarItemId(String carItemId) {
		this.carItemId = carItemId;
	}

	public Product getProduct() {
		return this.product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Car getCar() {
		return this.car;
	}

	public void setCar(Car car) {
		this.car = car;
	}

	public int getQuantity() {
		return this.quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getProName() {
		return proName;
	}

	public void setProName(String proName) {
		this.proName = proName;
	}

	public double getProPrice() {
		return proPrice;
	}

	public void setProPrice(double proPrice) {
		this.proPrice = proPrice;
	}
	
	

}