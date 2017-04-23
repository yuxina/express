package com.zxx.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.util.ValueStack;
import com.zxx.entity.ProductType;
import com.zxx.service.ProductService;
import com.zxx.service.ProductTypeService;

/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年2月19日 下午4:55:14   
*/
@Controller
@org.springframework.context.annotation.Scope("prototype")
public class ProductTypeAction extends ActionSupport implements ModelDriven<ProductType> {
	
	@Resource
	private ProductTypeService proTypeService;
	@Resource
	private ProductService proService;
	private HttpServletRequest request;
	private ProductType productType = new ProductType();
	
	
	//将会被Struts2序列化为JSON字符串的对象  
    private Map<String, Object> dataMap = new HashMap<String, Object>();
    		
	public Map<String, Object> getDataMap() {
		return dataMap;
	}

	public void setDataMap(Map<String, Object> dataMap) {
		this.dataMap = dataMap;
	}
	
	/**
	 * 获取产品类型列表	
	 * @return
	 */
	public String list() {
		List<ProductType> proTypeList = proTypeService.getAll();
		ActionContext.getContext().put("proTypeList", proTypeList);
		return "list";
	}
	
	public String typeList() throws Exception{
		request = ServletActionContext.getRequest();
		List<ProductType> proTypeList = proTypeService.getAll();
		if (!proTypeList.isEmpty()) {
			for(ProductType pt : proTypeList){
				pt.setProducts(null);
			}
			// dataMap中的数据将会被Struts2转换成JSON字符串，所以这里要先清空其中的数据  
	        dataMap.clear(); 
	        dataMap.put("ptList", proTypeList);  
	        // 放入一个是否操作成功的标识  
	        dataMap.put("success", true);
		}else{
	        dataMap.clear();   
	        // 放入一个是否操作成功的标识  
	        dataMap.put("success", false); 
	        dataMap.put("msg", "Sorry,暂停营业!"); 
		}	
		return SUCCESS;
	}
	
	/**
	 * 获取编辑页的类型数据
	 * @return
	 */
	public String editUI() {
		String id = productType.getProTypeId();
		ProductType p = proTypeService.getById(id);
		ValueStack vs = ActionContext.getContext().getValueStack();
		vs.pop();// 删除栈顶元素
		vs.push(p);
		return "editUI";
	}
	/**
	 * 添加产品类型
	 */
	public void add() {
		proTypeService.add(productType);
		// 获取相应Response
		HttpServletResponse response = ServletActionContext.getResponse();
		// 设置编码方式
		response.setCharacterEncoding("UTF-8");
		try {
			// 将数据写到页面中
			response.getWriter().write("success");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 编辑
	 */
	public void edit() {
		ProductType pt = proTypeService.getById(productType.getProTypeId());
		pt.setProTypeName(productType.getProTypeName());
		pt.setProTypeDesc(productType.getProTypeDesc());
		proTypeService.update(pt);
		// 获取相应Response
		HttpServletResponse response = ServletActionContext.getResponse();
		// 设置编码方式
		response.setCharacterEncoding("UTF-8");
		try {
			// 将数据写到页面中
			response.getWriter().write("success");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 删除
	 */
	public void delete() {
		// 获取相应Response
		HttpServletResponse response = ServletActionContext.getResponse();
		// 设置编码方式
		response.setCharacterEncoding("UTF-8");
		proTypeService.delete(productType.getProTypeId());
		try {
			// 将数据写到页面中
			response.getWriter().write("success");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public String check() {
		Long count = proService.getCountByType(productType.getProTypeId());		
        dataMap.clear();   
        // 放入一个是否操作成功的标识  
        dataMap.put("count", count); 
		return SUCCESS;
	}
	
	

	@Override
	public ProductType getModel() {
		// TODO Auto-generated method stub
		return productType;
	}
	
	
	
	

}
