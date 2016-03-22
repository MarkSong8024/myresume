//金额验证
function checkMoney(v){
	var a=/^[0-9]*(\.[0-9]{1,2})?$/;
	if(!a.test(v)){
		alert("格式不正确");
		return false;
	}else{
		alert("格式正确");
	}
}

//trim字符串左右空格
function LTrim(str)  
{  
    var i;  
    for(i=0;i<str.length;i++)  
    {  
        if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;  
    }  
    str=str.substring(i,str.length);  
    return str;  
}  
function RTrim(str)  
{  
    var i;  
    for(i=str.length-1;i>=0;i--)  
    {  
        if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;  
    }  
    str=str.substring(0,i+1);  
    return str;  
}  
function Trim(str)  
{  
    return LTrim(RTrim(str));  
}

/* 
用途：校验ip地址的格式 
输入：strIP：ip地址 
返回：如果通过验证返回true,否则返回false； 
 
*/
function isIP(strIP) {
    if (isNull(strIP)) return false;
    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式 
    if (re.test(strIP)) {
        if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) return true;
    }
    return false;
}

/* 
用途：检查输入字符串是否为空或者全部都是空格 
输入：str 
返回： 
如果全是空返回true,否则返回false 
*/
function isNull(str) {
    if (str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}
/* 
用途：检查输入字符串是否不为空或者不全部都是空格 
输入：str 
返回： 
如果全是空返回false,否则返回true 
*/
function isNotNull(str) {

    return !isNull(str);
}

/* 
用途：检查输入对象的值是否符合整数格式 
输入：str 输入的字符串 
返回：如果通过验证返回true,否则返回false 
 
*/
function isInteger(str) {
    var regu = /^[-]{0,1}[0-9]{1,}$/;
    return regu.test(str);
}
/*
用途：验证大于0的整数
*/
function isIntegerMore(str) {
    var regu = /^[-]{0,1}[0-9]{1,}$/;
    if (regu.test(str)) {
        if (parseInt(str) > 0) {
            return true;
        }
    }
    return false;
}



/* 
用途：检查输入字符串是否符合正整数格式 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 
 
*/
function isNumber(s) {
    var regu = "^[0-9]+$";
    var re = new RegExp(regu);
    if (s.search(re) != -1) {
        return true;
    } else {
        return false;
    }
}

/* 
用途：检查输入字符串是否是带小数的数字格式,可以是负数 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 
 
*/
function isDecimal(str) {
    if (isInteger(str)) return true;
    var re = /^[-]{0,1}(\d+)[\.]+(\d+)$/;
    if (re.test(str)) {
        if (RegExp.$1 == 0 && RegExp.$2 == 0) return false;
        return true;
    } else {
        return false;
    }
}

//验证价格
function isPrice(str) {
    if (!isNaN(str) && parseFloat(str) >= 0) {
        return true;
    }
    return false;
}

/* 
用途：检查输入对象的值是否符合端口号格式 
输入：str 输入的字符串 
返回：如果通过验证返回true,否则返回false 
 
*/
function isPort(str) {
    return (isNumber(str) && str < 65536);
}

/* 
用途：检查输入对象的值是否符合E-Mail格式 
输入：str 输入的字符串 
返回：如果通过验证返回true,否则返回false 
 
*/
function isEmail(str) {
    var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
    if (myReg.test(str)) return true;
    return false;
}

//是手机

function isMobile(str) {
    //debugger;
    //var length = str.length;
    //var myReg = length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(str);
    //if (myReg.test(str)) return true;
    //return false;
    var myReg =/^((\(\d{2,3}\))|(\d{3}\-))?1[3,8,5]{1}\d{9}?$/;
    if (myReg.test(str)) return true;
    return false;
}
//是手机或Email
function isMobileOrEmail(str) {
    return isMobile(str) && isEmail(str);
}
/* 
用途：检查输入字符串是否符合金额格式 
格式定义为带小数的正数，小数点后最多三位 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 
 
*/
function isMoney(s) {
	if(s.indexOf(".")<0 ){
		return true;
	}
    var regu = "^[0-9]+[\.][0-9]{0,2}$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
}
/* 
用途：检查输入字符串是否只由英文字母和数字和下划线组成 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 
 
*/
function isNumberOr_Letter(s) {//判断是否是数字或字母 

    var regu = "^[0-9a-zA-Z\_]+$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
}
/* 
用途：检查输入字符串是否只由英文字母和数字组成 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 
 
*/
function isNumberOrLetter(s) {//判断是否是数字或字母 

    var regu = "^[0-9a-zA-Z]+$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
}
/* 
用途：检查输入字符串是否只由汉字、字母、数字组成 
输入： 
value：字符串 
返回： 
如果通过验证返回true,否则返回false 
 
*/
function isChinaOrNumbOrLett(s) {//判断是否是汉字、字母、数字组成 

    var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
}

/* 
用途：判断是否是日期 
输入：date：日期；fmt：日期格式 
返回：如果通过验证返回true,否则返回false 
*/
function isDate(date, fmt) {
    if (fmt == null) fmt = "yyyyMMdd";
    var yIndex = fmt.indexOf("yyyy");
    if (yIndex == -1) return false;
    var year = date.substring(yIndex, yIndex + 4);
    var mIndex = fmt.indexOf("MM");
    if (mIndex == -1) return false;
    var month = date.substring(mIndex, mIndex + 2);
    var dIndex = fmt.indexOf("dd");
    if (dIndex == -1) return false;
    var day = date.substring(dIndex, dIndex + 2);
    if (!isNumber(year) || year > "2100" || year < "1900") return false;
    if (!isNumber(month) || month > "12" || month < "01") return false;
    if (day > getMaxDay(year, month) || day < "01") return false;
    return true;
}

function getMaxDay(year, month) {
    if (month == 4 || month == 6 || month == 9 || month == 11)
        return "30";
    if (month == 2)
        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
        return "29";
    else
        return "28";
    return "31";
}

/* 
用途：字符1是否以字符串2结束 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false 
 
*/
function isLastMatch(str1, str2) {
    var index = str1.lastIndexOf(str2);
    if (str1.length == index + str2.length) return true;
    return false;
}


/* 
用途：字符1是否以字符串2开始 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false 
 
*/
function isFirstMatch(str1, str2) {
    var index = str1.indexOf(str2);
    if (index == 0) return true;
    return false;
}

/* 
用途：字符1是包含字符串2 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false 
 
*/
function isMatch(str1, str2) {
    var index = str1.indexOf(str2);
    if (index == -1) return false;
    return true;
}


/* 
用途：检查输入的起止日期是否正确，规则为两个日期的格式正确， 
且结束如期>=起始日期 
输入： 
startDate：起始日期，字符串 
endDate：结束如期，字符串 
返回： 
如果通过验证返回true,否则返回false 
 
*/
function checkTwoDate(startDate, endDate) {
    if (!isDate(startDate)) {
        alert("起始日期不正确!");
        return false;
    } else if (!isDate(endDate)) {
        alert("终止日期不正确!");
        return false;
    } else if (startDate > endDate) {
        alert("起始日期不能大于终止日期!");
        return false;
    }
    return true;
}

/* 
用途：检查输入的Email信箱格式是否正确 
输入： 
strEmail：字符串 
返回： 
如果通过验证返回true,否则返回false 
 
*/

function isMobileOrEmail(isMobileOrEmail) {
    var emailReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
    var mobileReg = /^((\(\d{2,3}\))|(\d{3}\-))?1[3,8,5]{1}\d{9}?$/;
    var emailormobile = emailReg || mobileReg;
    if (emailormobile.test(isMobileOrEmail)) {
        return true;
    } else {
        alert("您输入的Email或手机格式不正确！");
        return false;
    }
}

function showDialogCover(){
	 $$("cover_id").style.display="block"; 
}

function hiddenDialogCover(){
	 $$("cover_id").style.display="none"; 
}

