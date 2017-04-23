package com.zxx.service;

import java.util.List;

import com.zxx.entity.CarItem;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年3月17日 下午5:24:36   
*/
public interface CarItemService {
	public void add(CarItem ci);
	public List<CarItem> getListByCarId(String id);
}
