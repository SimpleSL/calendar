// JavaScript Document
$(document).ready(function(e) {
	var days = new Array("日","一","二","三","四","五","六");//星期
	var month_big = new Array("1","3","5","7","8","10","12"); //包含所有大月的数组
	var month_small = new Array("4","6","9","11"); //包含所有小月的数组
	var separator = "-";//自定义间隔符 
	var title_bg_color = "#fafbfc"; //定制年月选择器背景色
	var title_font_color = "#fabe00";//定制年月选择器字体颜色
	var date_bg_color = "#fff"; //定制星期栏的背景颜色
	var pane_active_color = "#fabe00";//定制被选中日期的背景色
	
	var today = new Date();
	
	var firstday = new Date(today.getFullYear(),today.getMonth(),today.getDate()-1);
	var lastday = new Date(today.getFullYear(),today.getMonth(),today.getDate()+ 60);
	var firstmonth = new Date(today.getFullYear(),today.getMonth() - 1);
	var lastmonth = new Date(today.getFullYear(),today.getMonth()+ 2);
		
    $(".calendar").attr("readOnly","readOnly");
	$(".calendar").css("cursor","pointer");
	$(".calendar").bind("click",showCalendar);
	$(".calendar").bind("focusout",hideCalendar);
	
	function hideCalendar(){
		$(".cal_body").empty();
		$(".cal_body").css("display","none");
	}
	
	function showCalendar(){
		var cal_width = ($(this).width() < 150)?150:($(this).width());
		var cal_height = $(this).height();
		var pane_height = cal_width/7;
		
		var calendar = $(this);
		var clicked_index = $(this).index(".calendar");
		console.log("clicked_index:" + clicked_index);
		var cal_body = $(".cal_body").eq(clicked_index);
		cal_body.empty();
		cal_body.width(cal_width + 1);
		cal_body.height("auto");
		cal_body.css("display","block");
		cal_body.mouseenter(function(e) {
            calendar.unbind("focusout");;
        });
		
		cal_body.mouseleave(function(e) {
			calendar.focus();
            calendar.bind("focusout",hideCalendar);
        });
		
		var line1 = $("<div></div>");
		line1.width("100%");
		line1.height(pane_height);
		line1.css("background-color",title_bg_color);
		
		
		var btn1 = $("<div></div>");
		btn1.width(cal_width/6);
		btn1.height(pane_height);
		btn1.css("line-height",pane_height + "px");
		btn1.css("-webkit-user-select","none"); //设置文本不能选中，使其表现得更像一个按钮
		btn1.css("-moz-user-select","none"); //设置文本不能选中
		btn1.css(" -ms-user-select","none"); //设置文本不能选中
		btn1.css("user-select","none"); //设置文本不能选中
		btn1.css("text-align","center");
		btn1.text("<");
		btn1.css("float","left");
		btn1.css("cursor","pointer");
		btn1.click(function(e) {
			var old_year = parseInt($("#span_year").text().year());
			var old_month = parseInt($("#span_year").text().month2());
			if(old_month > 1){
				var month = old_month - 1;
				var year = old_year;
				var val = year + separator + month + separator + 1;
				if(dateValidate(firstmonth,lastmonth,new Date(year,month - 1))){
					init(val, calendar, cal_body, pane_height);
				}else{console.log("低于指定月份")};
			}else {
				var month = 12;
				var year = old_year - 1;
				var val = year + separator + month + separator + 1;
				if(dateValidate(firstmonth,lastmonth,new Date(year,month - 1))){
				init(val, calendar, cal_body, pane_height);
				}else{console.log("低于指定月份")};
			}
		});
		line1.append(btn1);
		
		var span_year = $("<span></span>");
		span_year.attr("id","span_year");
		span_year.width(cal_width/3 * 2);
		span_year.height("100%");
		span_year.css("line-height",pane_height + "px");
		span_year.css("float","left");
		span_year.css("text-align","center");
		span_year.css("color",title_font_color);
		line1.append(span_year);
		
		var btn2 = $("<div></div>");
		btn2.width(cal_width/6);
		btn2.height(pane_height);
		btn2.css("line-height",pane_height + "px");
		btn2.css("text-align","center");
		btn2.css("-webkit-user-select","none"); //设置文本不能选中，使其表现得更像一个按钮
		btn2.css("-moz-user-select","none"); //设置文本不能选中
		btn2.css(" -ms-user-select","none"); //设置文本不能选中
		btn2.css("user-select","none"); //设置文本不能选中
		btn2.text(">");
		btn2.css("float","left");
		btn2.css("cursor","pointer");
		btn2.click(function(e) {
			var old_year = parseInt($("#span_year").text().year());
			var old_month = parseInt($("#span_year").text().month2());
			if(old_month < 12){
				var month = old_month + 1;
				var year = old_year;
				var val = year + separator + month + separator + 1;
				if(dateValidate(firstday,lastday,new Date(year,month - 1))){
					init(val, calendar, cal_body, pane_height);	
				}else{console.log("高于指定月份")};				
			}else {
				var month = 1;
				var year = old_year + 1;
				var val = year + separator + month + separator + 1;
				if(dateValidate(firstday,lastday,new Date(year,month - 1))){
				init(val, calendar, cal_body, pane_height);
				}else{console.log("高于指定月份")};
			}
		});
		line1.append(btn2);
					
		cal_body.append(line1);
		
		for(var i=0;i<7;i++){
			var pane = $("<div></div>");
			pane.addClass("pane");
			pane.width(pane_height);
			pane.height(pane_height);
			pane.css("line-height",pane_height + "px");
			pane.css("float","left");
			pane.css("text-align","center");
			pane.css("border-top","1px solid #eff0f2");
			pane.css("border-bottom","1px solid #eff0f2");
			pane.css("background",date_bg_color);
			pane.text(days[i]);
			cal_body.append(pane);
		}
		
		init(calendar.val(), calendar, cal_body, pane_height);
	}
	
	function init(val, calendar, cal_body, pane_height){
		clearPane();
		
		var temp_date;
		var year;
		var month;
		var date;
		
		if(val == ""){
			temp_date = new Date();
			calendar.val(temp_date.toFormatString(separator));
		}
		else{
			year = val.year();
			month = val.month(separator);
			date = val.date(separator);
			temp_date = new Date(year,month,date);	
		}
		
		year = temp_date.getFullYear();
		month = temp_date.getMonth() + 1;
		date = temp_date.getDate();
		temp_date.setDate(1);
		
		var start = temp_date.getDay() + 7;
		var end;
		
		if(array_contain(month_big, month)){
			end = start + 31;
		}
		else if(array_contain(month_small, month)){
			end = start + 30;
		}
		else{
			if(isLeapYear(year)){
				end = start + 29;
			}
			else{
				end = start + 28;
			}
		}
		
		for(var i = 7; i < start; i++){
			var pane = $("<div></div>");
			pane.addClass("pane");
			pane.width(pane_height);
			pane.height(pane_height);
			pane.css("line-height",pane_height + "px");
			pane.css("float","left");
			pane.css("text-align","center");
			cal_body.append(pane);
		}
		
		for(var i = start; i < end; i++){
			var pane = $("<div></div>");
			pane.addClass("pane");
			pane.width(pane_height);
			pane.height(pane_height);
			pane.css("line-height",pane_height + "px");
			pane.css("float","left");
			pane.css("text-align","center");
			pane.text(i - start + 1);
			if(dateValidate(firstday,lastday, new Date(year,month - 1,i - start + 1))){
				pane.css("cursor","pointer");
				pane.click(function(){
					calendar.val(year + separator + month + separator + $(this).text());
					hideCalendar();
				});
				pane.mouseover(function(e) {
					$(this).css("background-color",pane_active_color);
				});
				if(date == (i - start + 1))
					pane.css("background-color",pane_active_color);
				else{
					pane.mouseleave(function(e) {
						$(this).css("background-color","");
					});
				}
			}else {
				pane.css("color","#CCC");
			}
			cal_body.append(pane);
			
			$("#span_year").text(year + "年" + month + "月");
		}
	}
	
	function dateValidate(beginday, endday, thisday){
		if(thisday > beginday && thisday < endday){
			return true;
		}else{
			return false;
		}
	}
	
	//格式化输出
	Date.prototype.toFormatString  = function(separator){
		var result = this.getFullYear() + separator + (this.getMonth() + 1) + separator + this.getDate();
		return result;
	};
	
	//从格式化字符串中获取年份
	String.prototype.year = function(){
		var str = this.substring(0,4);
		return str;
	};
	
	//从格式化字符串中获取月份
	String.prototype.month = function(separator){
		var start = this.indexOf(separator) + 1;
		var end = this.lastIndexOf(separator);
		return parseInt(this.substring(start, end)) - 1;
	};
	
	//从span_year字符串中获取月份
	String.prototype.month2 = function(){
		var start = this.indexOf("年") + 1;
		var end = this.lastIndexOf("月");
		return parseInt(this.substring(start, end));
	};
	
	//从格式化字符串中获取日期
	String.prototype.date = function(separator){
		var start = this.lastIndexOf(separator) + 1;
		return this.substring(start);
	};
	
	//判断数组array中是否包含元素obj的函数，包含则返回true，不包含则返回false
	function array_contain(array, obj){
		for (var i = 0; i < array.length; i++){
			if (array[i] == obj)
				return true;
		}
		return false;
	}
	
	//判断年份year是否为闰年，是闰年则返回true，否则返回false
	function isLeapYear(year){
		var a = year % 4;
		var b = year % 100;
		var c = year % 400;
		if( ( (a == 0) && (b != 0) ) || (c == 0) ){
			return true;
		}
		return false;
	}
	
	//清除方格
	function clearPane(){
		var limit = $(".pane").length;
		for(var i=7; i < limit; i++){
			$(".pane").eq(7).remove();
		}
	}
});