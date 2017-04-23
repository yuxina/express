package com.zxx.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.zxx.dao.CarDao;
import com.zxx.entity.Car;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年2月24日 下午2:21:38   
*/
@Repository("carDao")
public class CarDaoImpl extends BaseDaoImpl<Car> implements CarDao {

	@Override
	public List<Car> getListAfterSubmit() {
		// TODO Auto-generated method stub
		return getSession().createQuery("FROM Car where car_sid != 1").list();
	}

}
