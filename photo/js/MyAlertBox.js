var loadingBox,ab,ab_btn2,ab_btn3,pasRemindBox;
var lock;
(function(){
 ab = new AlertBox("idBox"), lock = false;
loadingBox =  new AlertBox("loadingBox");
ab_btn2 = new AlertBox("idBox_btn2");
ab_btn3 = new AlertBox("idBox_btn3");
pasRemindBox = new AlertBox("pasRemindBox");
//锁定键盘
function lockup(e){ e.preventDefault(); }
//高亮层不锁定
function lockout(e){ e.stopPropagation(); }

ab.onShow = function(){
	if ( lock ) {
	    
		$$E.addEvent( document, "keydown", lockup );
		$$E.addEvent( this.box, "keydown", lockout );
		OverLay.show();
	}
}
ab.onClose = function(){
	$$E.removeEvent( document, "keydown", lockup );
	$$E.removeEvent( this.box, "keydown", lockout );
	OverLay.close();
}

pasRemindBox.onShow = function(){
	if ( lock ) {
		$$E.addEvent( document, "keydown", lockup );
		$$E.addEvent( this.box, "keydown", lockout );
		OverLay.show();
	}
}
pasRemindBox.onClose = function(){
	$$E.removeEvent( document, "keydown", lockup );
	$$E.removeEvent( this.box, "keydown", lockout );
	OverLay.close();
}

ab_btn2.onShow = function(){
	if ( lock ) {
	    
		$$E.addEvent( document, "keydown", lockup );
		$$E.addEvent( this.box, "keydown", lockout );
		OverLay.show();
	}
}
ab_btn2.onClose = function(){
	$$E.removeEvent( document, "keydown", lockup );
	$$E.removeEvent( this.box, "keydown", lockout );
	OverLay.close();
}
ab_btn3.onShow = function(){
	if ( lock ) {
	    
		$$E.addEvent( document, "keydown", lockup );
		$$E.addEvent( this.box, "keydown", lockout );
		OverLay.show();
	}
}
ab_btn3.onClose = function(){
	$$E.removeEvent( document, "keydown", lockup );
	$$E.removeEvent( this.box, "keydown", lockout );
	OverLay.close();
}
loadingBox.onShow = function(){
	if ( lock ) {
		$$E.addEvent( document, "keydown", lockup );
		$$E.addEvent( this.box, "keydown", lockout );
		OverLay.show();
	}
}
loadingBox.onClose = function(){
	$$E.removeEvent( document, "keydown", lockup );
	$$E.removeEvent( this.box, "keydown", lockout );
	OverLay.close();
}

})()

function hiddenDialogCover(){
	document.all.cover_id.style.display="none"; 
}

function showDialogCover(){
	document.all.cover_id.style.width=document.body.clientWidth+"px";   
    document.all.cover_id.style.height=document.body.clientHeight+"px"; 
	document.all.cover_id.style.display="block";   
}

function showLoading(){
    loadingBox.show();
	var imageSrc = "/mess/phonePage/images/loading.png";
	document.getElementById("imageZone").innerHTML="<img src='"+imageSrc+"'style='width:12%;height:5%' />";
}
function hiddenLoading(){
    loadingBox.close();
    document.getElementById("imageZone").innerHTML="";
}
