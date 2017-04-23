package com.zxx.dao;

import java.util.List;

import com.zxx.entity.Car;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年12月24日 下午2:18:17   
*/
public interface CarDao extends BaseDao<Car> {
	public List<Car> getListAfterSubmit();

}
