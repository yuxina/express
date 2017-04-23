package com.zxx.dao.impl;

import java.lang.reflect.ParameterizedType;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.transaction.annotation.Transactional;

import com.zxx.dao.BaseDao;

@Transactional
public class BaseDaoImpl<T> implements BaseDao<T> {

	@Resource
	private SessionFactory sessionFactory;
	private Class<T> clazz;
	
	/**
	 * 获得Session，此方法在子类中可用
	 * @return
	 */
	protected Session getSession(){
		return sessionFactory.getCurrentSession();
	}
	
	/**
	 * 构造函数，初始化T的真实类型
	 */
	public BaseDaoImpl(){
		ParameterizedType type = (ParameterizedType) this.getClass().getGenericSuperclass();
		clazz = (Class<T>) type.getActualTypeArguments()[0];
		System.out.println(clazz.getName());
	}
	
	@Override
	public void add(T t) {		
		getSession().save(t);
	}

	@Override
	public void update(T t) {
		// TODO Auto-generated method stub
		try{
			getSession().update(t);
		}catch(HibernateException e){
		}
		
	}

	
	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		Object obj = this.getById(id);
		getSession().delete(obj);
	}


	@Override
	public List<T> getByIds(String[] ids) {
		// TODO Auto-generated method stub
		List<Object> list = new ArrayList<Object>();
		for (String id : ids) {
			Object obj = getById(id);
			list.add(obj);
		}
		return (List<T>) list;
	}


	@Override
	public List<T> getAll() {
		// TODO Auto-generated method stub
		return getSession().createQuery("FROM "+clazz.getSimpleName()).list();
	}

	@Override
	public T getById(String id) {
		return (T) getSession().get(clazz, id);
	}

	@Override
	public List<T> queryForPage(int offset, int length) {
		// TODO Auto-generated method stub
		 Query q = getSession().createQuery("FROM "+clazz.getSimpleName());
		 q.setFirstResult(offset);
		 q.setMaxResults(length);
		 return q.list();
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		Query q = getSession().createQuery("select count(*) from "+clazz.getSimpleName());
		return Integer.parseInt(q.list().get(0).toString());
	}

	@Override
	public void delete(int id) {
		Object obj = this.getById(id);
		getSession().delete(obj);
		
	}

	@Override
	public T getById(int id) {
		// TODO Auto-generated method stub
		return (T) getSession().get(clazz, id);
	}

	@Override
	public T get(String hql, List<Object> param) {
		List<T> l = this.find(hql,param);
		if (l != null && l.size() > 0) {
			return l.get(0);
		} else {
			return null;
		}
	}

	@Override
	public List<T> find(String hql, List<Object> param) {
		Query q = this.getSession().createQuery(hql);
		if (param != null && param.size() > 0) {
			for (int i = 0; i < param.size(); i++) {
				q.setParameter(i, param.get(i));
			}
		}
		return q.list();
	}

	@Override
	public boolean merge(T t) {
		try{
			this.getSession().merge(t);
			return true;
		}catch(HibernateException e){
			return false;
		}
	}

	@Override
	public Long count(String hql, Object[] param) {
		Query q = this.getSession().createQuery(hql);
		if (param != null && param.length > 0) {
			for (int i = 0; i < param.length; i++) {
				q.setParameter(i, param[i]);
			}
		}
		return (Long) q.uniqueResult();
	}
	
	@Override
	public Long count(String hql, List<Object> param) {
		Query q = this.getSession().createQuery(hql);
		if (param != null && param.size() > 0) {
			for (int i = 0; i < param.size(); i++) {
				q.setParameter(i, param.get(i));
			}
		}
		return (Long) q.uniqueResult();
	}


}
