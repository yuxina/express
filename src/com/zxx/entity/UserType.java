package com.zxx.entity;

import java.util.HashSet;
import java.util.Set;

public class UserType{

	private int utId;
	private String utName;
	private Set<User> users = new HashSet<User>();
	public int getUtId() {
		return utId;
	}
	public void setUtId(int utId) {
		this.utId = utId;
	}
	public String getUtName() {
		return utName;
	}
	public void setUtName(String utName) {
		this.utName = utName;
	}
	public Set<User> getUsers() {
		return users;
	}
	public void setUsers(Set<User> users) {
		this.users = users;
	}
	

	
}
