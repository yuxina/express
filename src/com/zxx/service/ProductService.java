package com.zxx.service;

import java.util.List;

import com.zxx.entity.Product;


/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年2月19日 下午4:56:25   
*/
public interface ProductService {
	//添加产品
	public void add(Product product);
	
	//编辑产品
	public void update(Product product); 
	
	//获取全部产品
	public List<Product> getAll();
	
	//根据typeId获取全部产品
	public List<Product> getProListByType(String proTypeId);
	
	public int getCount();
	
	public void delete(String id);
	
	public Product getById(String id);
	
	public Long getCountByType(String ptId);
	
	public void merge(Product p);
	

}
