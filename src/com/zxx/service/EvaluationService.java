package com.zxx.service;

import java.util.List;

import com.zxx.entity.CarItem;
import com.zxx.entity.Evaluation;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年3月17日 下午5:24:36   
*/
public interface EvaluationService {
	public void add(Evaluation e);
	public List<Evaluation> getAll();
	public void delete(String id);
}
