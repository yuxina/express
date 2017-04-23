package com.zxx.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年2月17日 上午9:41:55   
*/
public class Product implements Serializable {
	private String proId;
	private ProductType proType;
	private String proName;
	private double proPrice;
	private int proAmount;
	private String proDesc;
	private String proImgPath;
	private int proState;
	private Date proAddTime;
	private Set<CarItem> carItems = new HashSet<CarItem>();
	public String getProId() {
		return proId;
	}
	public void setProId(String proId) {
		this.proId = proId;
	}
	public ProductType getProType() {
		return proType;
	}
	public void setProType(ProductType proType) {
		this.proType = proType;
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
	
	public String getProDesc() {
		return proDesc;
	}
	public void setProDesc(String proDesc) {
		this.proDesc = proDesc;
	}
	public int getProAmount() {
		return proAmount;
	}
	public void setProAmount(int proAmount) {
		this.proAmount = proAmount;
	}
	public String getProImgPath() {
		return proImgPath;
	}
	public void setProImgPath(String proImgPath) {
		this.proImgPath = proImgPath;
	}
	public int getProState() {
		return proState;
	}
	public void setProState(int proState) {
		this.proState = proState;
	}
	public Date getProAddTime() {
		return proAddTime;
	}
	public void setProAddTime(Date proAddTime) {
		this.proAddTime = proAddTime;
	}
	public Set<CarItem> getCarItems() {
		return carItems;
	}
	public void setCarItems(Set<CarItem> carItems) {
		this.carItems = carItems;
	}

	
}
