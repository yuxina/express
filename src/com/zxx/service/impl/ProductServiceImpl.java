package com.zxx.service.impl;

import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.zxx.dao.ProductDao;
import com.zxx.entity.Product;
import com.zxx.service.ProductService;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年2月19日 下午8:16:07   
*/
@Service("ProductService")
public class ProductServiceImpl implements ProductService {
	
	@Resource
	private ProductDao productDao;

	@Override
	public void add(Product product) {
		productDao.add(product);

	}

	@Override
	public void update(Product product) {
		productDao.update(product);

	}

	@Override
	public List<Product> getAll() {
		List<Product> list = productDao.getAll();
		return list;
	}

	@Override
	public int getCount() {
		return productDao.getCount();
	}

	@Override
	public void delete(String id) {
		productDao.delete(id);

	}

	@Override
	public Product getById(String id) {
		return productDao.getById(id);
	}

	@Override
	public List<Product> getProListByType(String proTypeId) {
		List<Object> param=new LinkedList<Object>();
		StringBuffer hql=new StringBuffer("from Product where pro_type_id=? and pro_state = 2 and pro_amount > 0");
		param.add(proTypeId);		
		return productDao.find(hql.toString(), param);	

	}

	@Override
	public Long getCountByType(String ptId) {
		List<Object> param=new LinkedList<Object>();
		StringBuffer hql=new StringBuffer("select count(*) from Product where pro_type_id=?");
		param.add(ptId);
		return productDao.count(hql.toString(), param);
	}

	@Override
	public void merge(Product p) {
		productDao.merge(p);
		
	}

}
