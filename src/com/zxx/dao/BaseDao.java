package com.zxx.dao;

import java.io.Serializable;
import java.util.List;

public interface BaseDao<T> {

	/**
	 * 保存实体
	 * @param t
	 */
	public void add(T t);
	
	/**
	 * 根据实体的ID删除实体
	 * @param id
	 */
	public void delete(String id);
	
	/**
	 * 根据实体的ID删除实体
	 * @param id
	 */
	public void delete(int id);
	
	/**
	 * 更新实体
	 * @param t
	 */
	public void update(T t);
	
	/**
	 * 更新实体
	 * @param t
	 */
	public boolean merge(T t);	
	
	/**
	 * 根据实体的ID来获得实体
	 * @param id
	 * @return 实体对象
	 */
	public T getById(String id);
	
	/**
	 * 根据实体的ID来获得实体
	 * @param id
	 * @return 实体对象
	 */
	public T getById(int id);
	
	/**
	 * 获得多个实体
	 * @param ids
	 * @return
	 */
	public List<T> getByIds(String []ids);
	
	
	/**
	 * 获得数据库的总记录数
	 * @return
	 */
	public List<T> getAll();
	

	/**
	 * 查询集合(带分页)
	 * 
	 * @param hql
	 * @param param
	 * @param page
	 * @param rows
	 * @return
	 */
	public List<T> queryForPage(int offset,int length);

	/**
	 * select count(*) from 获取总记录条数
	 * 
	 * @param hql
	 * @return
	 */
	public int getCount();
	
	
	/**
	 * 获得一个对象
	 * 
	 * @param hql
	 * @param t
	 * @return
	 */
	public T get(String hql, List<Object> param);
	
	/**
	 * 查询集合
	 * 
	 * @param hql
	 * @return
	 */
	public List<T> find(String hql, List<Object> param);
	
	
	/**
	 * select count(*) from 类
	 * 
	 * @param hql
	 * @param param
	 * @return
	 */
	public Long count(String hql, Object[] param);
	
	
	/**
	 * select count(*) from 类
	 * 
	 * @param hql
	 * @param param
	 * @return
	 */
	public Long count(String hql, List<Object> param);
	


}
