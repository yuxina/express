package com.zxx.action;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.util.ValueStack;
import com.zxx.entity.Product;
import com.zxx.entity.ProductType;
import com.zxx.service.ProductService;
import com.zxx.service.ProductTypeService;
import com.zxx.util.DateUtil;
import com.zxx.util.StringUtil;


/** 
*
* @author zhengxiaoxue 
* @version 创建时间：2017年2月19日 下午4:55:14   
*/
@Controller
@org.springframework.context.annotation.Scope("prototype")
public class ProductAction extends ActionSupport implements ModelDriven<Product> {
	
	@Resource
	private ProductService productService;
	@Resource
	private ProductTypeService proTypeService;
	
	private HttpServletRequest request;
	private Product product = new Product();
	
	private File proImg;
	private String proImgFileName;
	private String proImgContentType;
	private String ptId;
	
	
	public String getPtId() {
		return ptId;
	}

	public void setPtId(String ptId) {
		this.ptId = ptId;
	}

	//将会被Struts2序列化为JSON字符串的对象  
    private Map<String, Object> dataMap = new HashMap<String, Object>();
    		
	public Map<String, Object> getDataMap() {
		return dataMap;
	}

	public void setDataMap(Map<String, Object> dataMap) {
		this.dataMap = dataMap;
	}
	
	public File getProImg() {
		return proImg;
	}

	public void setProImg(File proImg) {
		this.proImg = proImg;
	}	
	
	public String getProImgFileName() {
		return proImgFileName;
	}

	public void setProImgFileName(String proImgFileName) {
		this.proImgFileName = proImgFileName;
	}

	public String getProImgContentType() {
		return proImgContentType;
	}

	public void setProImgContentType(String proImgContentType) {
		this.proImgContentType = proImgContentType;
	}

	public String list() {
		List<Product> productList = productService.getAll();
		ActionContext.getContext().put("productList", productList);
		return "list";
	}
	//根据产品类型编号查询产品信息
	//条件1：产品状态为，2：已发布 
	//条件2：产品数量大于0
	public String proList() throws Exception{
		request = ServletActionContext.getRequest();
		List<Product> productList = productService.getProListByType(ptId);
		System.out.println(productList.isEmpty());
		if (!productList.isEmpty()) {
			// dataMap中的数据将会被Struts2转换成JSON字符串，所以这里要先清空其中的数据  
	        dataMap.clear(); 
	        dataMap.put("pList", productList);  
	        // 放入一个是否操作成功的标识  
	        dataMap.put("success", true);    			
		}else{
			dataMap.clear(); 
	        // 放入一个是否操作成功的标识  
	        dataMap.put("success", false);  
		}	
		return SUCCESS;
	}
	
	public String editUI() {
		request = ServletActionContext.getRequest();
		List<ProductType> proTypeList = proTypeService.getAll();
		request.setAttribute("proTypeList", proTypeList);
		String id = product.getProId();
		Product p = productService.getById(id);
		ValueStack vs = ActionContext.getContext().getValueStack();
		vs.pop();// 删除栈顶元素
		vs.push(p);
		return "editUI";
	}
	/**
	 * 改变产品状态
	 * state 新状态
	 * -1:审核未通过        0：待审核 	1：已审核	 2：已发布      3：已下架 
	 */
	public void changeState() {
		String state = ServletActionContext.getRequest().getParameter("state");
		String id = ServletActionContext.getRequest().getParameter("proId");
		Product p = productService.getById(id);
		if(StringUtil.isNotEmpty(state)){
			p.setProState(Integer.parseInt(state));
			productService.update(p);
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
		 
	}
	
	//修改产品
	public void edit(){
		try {
			System.out.println(proImgFileName);
			Product p = productService.getById(product.getProId());
			if(proImg!=null){
				
				String imageName=DateUtil.getCurrentDateStr();
				String realPath=ServletActionContext.getServletContext().getRealPath("pages/images/product");
				String imageFile=imageName+"."+proImgFileName.split("\\.")[1];
				File saveFile=new File(realPath,imageFile);
				FileUtils.copyFile(proImg, saveFile);
				p.setProImgPath("pages/images/product/"+imageFile);
				
			}
			p.setProName(product.getProName());
			p.setProPrice(product.getProPrice());
			p.setProAmount(product.getProAmount());
			ProductType pt = new ProductType();
			pt.setProTypeId(product.getProType().getProTypeId());
			p.setProType(pt);
			p.setProDesc(product.getProDesc());
			productService.update(p);
			// 获取相应Response
			HttpServletResponse response = ServletActionContext.getResponse();
			// 设置编码方式
			response.setCharacterEncoding("UTF-8");
		
			// 将数据写到页面中
			response.getWriter().write("success");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		
	}
	
	public String addUI(){
		List<ProductType> proTypeList = proTypeService.getAll();
		ActionContext.getContext().put("proTypeList", proTypeList);
		return "addUI";
	}
	
	public void add(){
		try {
			if(proImg!=null){
				String imageName=DateUtil.getCurrentDateStr();
				String realPath=ServletActionContext.getServletContext().getRealPath("pages/images/product");
				System.out.println(realPath);
				String imageFile=imageName+"."+proImgFileName.split("\\.")[1];
				File saveFile=new File(realPath,imageFile);
				FileUtils.copyFile(proImg, saveFile);
				product.setProImgPath("pages/images/product/"+imageFile);
				
			}else{
				product.setProImgPath("");
			}
			product.setProAddTime(new Date());
			productService.add(product);
			// 获取相应Response
			HttpServletResponse response = ServletActionContext.getResponse();
			// 设置编码方式
			response.setCharacterEncoding("UTF-8");
		
			// 将数据写到页面中
			response.getWriter().write("success");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void delete() {
		// 获取相应Response
		HttpServletResponse response = ServletActionContext.getResponse();
		// 设置编码方式
		response.setCharacterEncoding("UTF-8");
		productService.delete(product.getProId());
		try {
			// 将数据写到页面中
			response.getWriter().write("success");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	//更新库存
	public void updateAmount(){
		
	}

	@Override
	public Product getModel() {
		// TODO Auto-generated method stub
		return product;
	}
	
	
	
	

}
