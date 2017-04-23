package com.zxx.service;

import java.util.List;

import com.zxx.entity.Car;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年2月24日 下午2:37:59   
*/
public interface CarService {
	/**
	 * 添加订单（ 生成购物车）
	 * 根据添加产品到购物车时，创建订单（购物车）对象，以这个时间点做为订单编号
	 * @param car
	 */
	public void add(Car car);
	
	//提交订单
	public boolean submit(Car car);
	
	//修改订单状态
	public void updateState(Car c);
	
	//获取全部订单
	public List<Car> getAll();
	
	//获取已提交订单
	public List<Car> getListAfterSubmit();
	
	//删除订单
	public void delete(String id);
	
	//获取全部订单数
	public int getCount();
	
	//根据编号获取订单
	public Car getById(String id);
	
	//获取用户订单状态为1（未提交）
	public Car getCarNumByUser(String id);
	//获取用户订单状态为不是1的
	public List<Car> getByUid(String id);

}
