package com.zxx.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.zxx.dao.EvaluationDao;
import com.zxx.entity.Evaluation;
import com.zxx.service.EvaluationService;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年4月8日 上午1:15:22   
*/
@Service("EvaluationService")
public class EvaluationServiceImpl implements EvaluationService {

	@Resource
	public EvaluationDao evalDao;
	
	@Override
	public void add(Evaluation e) {
		evalDao.add(e);
	}

	@Override
	public List<Evaluation> getAll() {
		return evalDao.getAll();
	}

	@Override
	public void delete(String id) {
		evalDao.delete(id);
		
	}

}
