package com.zxx.entity;
// Generated 2017-3-7 10:08:49 by Hibernate Tools 3.4.0.CR1

import java.util.HashSet;
import java.util.Set;

/**
 * CarState generated by hbm2java
 */
public class CarState implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int carSid;
	private String carStateInfo;
	private Set<Car> cars = new HashSet<Car>();

	public int getCarSid() {
		return this.carSid;
	}

	public void setCarSid(int carSid) {
		this.carSid = carSid;
	}

	public String getCarStateInfo() {
		return this.carStateInfo;
	}

	public void setCarStateInfo(String carStateInfo) {
		this.carStateInfo = carStateInfo;
	}

	public Set<Car> getCars() {
		return cars;
	}

	public void setCars(Set<Car> cars) {
		this.cars = cars;
	}

	

}
