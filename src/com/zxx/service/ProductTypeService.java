package com.zxx.service;

import java.util.List;

import com.zxx.entity.ProductType;



/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年2月19日 下午4:56:25   
*/
public interface ProductTypeService {
	//添加产品类型
	public void add(ProductType productType);
	
	//编辑产品类型
	public void update(ProductType productType); 

	//获取全部产品类型
	public List<ProductType> getAll();
	
	public int getCount();
	
	public void delete(String id);
	
	public ProductType getById(String id);

}
