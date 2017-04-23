package com.zxx.dao.impl;

import org.springframework.stereotype.Repository;

import com.zxx.dao.UserTypeDao;
import com.zxx.entity.UserType;

@Repository("userTypeDao")
public class UserTypeDaoImpl extends BaseDaoImpl<UserType> implements UserTypeDao {

}
