package com.zxx.service.impl;

import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.zxx.dao.CarItemDao;
import com.zxx.entity.CarItem;
import com.zxx.service.CarItemService;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年3月26日 下午7:32:20   
*/
@Service("CarItemService")
public class CarItemServiceImpl implements CarItemService {

	@Resource
	private CarItemDao ciDao;
	
	@Override
	public void add(CarItem ci) {
		ciDao.add(ci);

	}

	@Override
	public List<CarItem> getListByCarId(String id) {
		List<Object> param=new LinkedList<Object>();
		StringBuffer hql=new StringBuffer("from CarItem where car_id=?");
		param.add(id);		
		return ciDao.find(hql.toString(), param);
	}

}
