package com.zxx.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年2月16日 下午6:06:07   
*/
public class ProductType implements Serializable{
	private String proTypeId;
	private String proTypeName;
	private String proTypeDesc;
	private Set<Product> products = new HashSet<Product>();
	public String getProTypeId() {
		return proTypeId;
	}
	public void setProTypeId(String proTypeId) {
		this.proTypeId = proTypeId;
	}
	public String getProTypeName() {
		return proTypeName;
	}
	public void setProTypeName(String proTypeName) {
		this.proTypeName = proTypeName;
	}
	public String getProTypeDesc() {
		return proTypeDesc;
	}
	public void setProTypeDesc(String proTypeDesc) {
		this.proTypeDesc = proTypeDesc;
	}
	public Set<Product> getProducts() {
		return products;
	}
	public void setProducts(Set<Product> products) {
		this.products = products;
	}
	

}
