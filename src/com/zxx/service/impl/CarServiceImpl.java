package com.zxx.service.impl;

import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.HibernateException;
import org.springframework.stereotype.Service;

import com.zxx.dao.CarDao;
import com.zxx.entity.Car;
import com.zxx.entity.CarState;
import com.zxx.service.CarService;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年1月7日 上午10:43:01   
*/
@Service("CarService")
public class CarServiceImpl implements CarService {
	
	@Resource
	private CarDao carDao;

	@Override
	public void add(Car car) {
		// TODO Auto-generated method stub
		carDao.add(car);
	}

	@Override
	public boolean submit(Car car) {
		try{
			carDao.update(car);
			return true;
		}catch(HibernateException e){
			return false;
		}
		
	}

	@Override
	public void updateState(Car c) {
		carDao.update(c);
		
	}

	@Override
	public List<Car> getAll() {
		List<Car> list = carDao.getAll();
		return list;
	}

	@Override
	public void delete(String id) {
		carDao.delete(id);
		
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		return carDao.getCount();
	}

	@Override
	public Car getById(String id) {
		// TODO Auto-generated method stub
		return carDao.getById(id);
	}

	@Override
	public List<Car> getListAfterSubmit() {
		List<Car> list = carDao.getListAfterSubmit();
		return list;
	}

	@Override
	public Car getCarNumByUser(String id) {
		List<Object> param=new LinkedList<Object>();
		StringBuffer hql=new StringBuffer("from Car where uid=? and car_sid = 1");
		param.add(id);
		return carDao.get(hql.toString(), param);
	}

	@Override
	public List<Car> getByUid(String id) {
		List<Object> param=new LinkedList<Object>();
		StringBuffer hql=new StringBuffer("from Car where uid=? and car_sid != 1");
		param.add(id);
		return carDao.find(hql.toString(), param);

	}

}
