package com.zxx.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class StringDateParseUtil {
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	private static SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");

	
	public static String getString(Date date) {
		String dateStr = sdf.format(date);
		return dateStr;
	}
	
	
	public static Date getDateTime(String str) {
		Date date = null;
		if (str == null || "".equals(str)) {
			date = new Date();
		} else {
			try {
				date = sdf.parse(str);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return date;
	}
	
	public static String getStringDate(Date date) {
		String dateStr = sdfDate.format(date);
		return dateStr;
	}

	public static Date getDate(String str) {
		Date date = null;
		if (str == null || "".equals(str)) {
			date = new Date();
		} else {
			try {
				date = sdfDate.parse(str);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return date;
	}

}
