package com.zxx.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.zxx.dao.ProductTypeDao;
import com.zxx.entity.ProductType;
import com.zxx.service.ProductTypeService;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年2月19日 下午8:16:07   
*/
@Service("ProductTypeService")
public class ProductTypeServiceImpl implements ProductTypeService {
	
	@Resource
	private ProductTypeDao productTypeDao;

	@Override
	public void add(ProductType productType) {
		productTypeDao.add(productType);

	}

	@Override
	public void update(ProductType productType) {
		productTypeDao.update(productType);

	}

	@Override
	public List<ProductType> getAll() {
		List<ProductType> list = productTypeDao.getAll();
		return list;
	}

	@Override
	public int getCount() {
		return productTypeDao.getCount();
	}

	@Override
	public void delete(String id) {
		productTypeDao.delete(id);

	}

	@Override
	public ProductType getById(String id) {
		return productTypeDao.getById(id);
	}

}
