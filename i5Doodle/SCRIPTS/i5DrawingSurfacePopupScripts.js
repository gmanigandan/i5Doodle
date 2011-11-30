var drawingtoolspopup;
var selecteddrawingtool;
var bgcolorvalue;
var red=0,green=0,blue=0;
function fnAddLayers(){
	
	var drawingsurfacejson={
			 "id":"drawingsurface" + (window.ARRAYOFDRAWINGSURFACES.length+1),
			 "title":"",
			 "category":"i5CONTENT",
			 "type":"i5DrawingSurface",
			 "background":"#ffffff",
			// "zindex":400,
			 "persist":true,
			 "parent":"doodlewindow",
		};
	var drawingsurface=new i5DrawingSurface();
	drawingsurface.fnInitFromJson(drawingsurfacejson);
	
	
	paramtypejson={
			"id":"layerreference" + drawingsurface.id,
			"group":"drawingsurfaces",
			"type": "i5RadioButton",
			"category":"i5UI",
			"label":drawingsurface.id,
			"radiobuttonstyle":"TRADITIONAL",
			//"zindex":1000,
			"value":drawingsurface.id,
			"touchend":"fnSelectDrawingSurface"
	};
	
	window.layertableview=fnGetObject("layernames");
	window.layertableview.fnCreateItem(paramtypejson);	
}

function fnSelectDrawingSurface(paramObject){
	
	window.SELECTEDOBJECT=fnGetObject(paramObject.value);
	//fnDisplayToolsPopup();
	
}

function fnAlert(){
	alert("clicked");
}
function fnPencilButton_Clicked(paramValue){

	if ((window.SELECTEDOBJECT) && (window.SELECTEDOBJECT.type=="i5DrawingSurface")){		
	selecteddrawingtool="i5PENCIL";
	var drawingsurfaceObject=window.SELECTEDOBJECT;
	window.SELECTEDOBJECT.fnSetPropValue("drawingtool",selecteddrawingtool);
//	window.SELECTEDOBJECT.drawingtool=selecteddrawingtool;

	//	window.SELECTEDOBJECT.fnPrepareToDraw();
	
	}
}

function fnRectangleButton_Clicked(paramValue){

	if ((window.SELECTEDOBJECT) && (window.SELECTEDOBJECT.type=="i5DrawingSurface")){		
		
	selecteddrawingtool="i5RECTANGLE";
	var drawingsurfaceObject=window.SELECTEDOBJECT;
//	window.SELECTEDOBJECT.drawingtool=selecteddrawingtool;
	window.SELECTEDOBJECT.fnSetPropValue("drawingtool",selecteddrawingtool);

	//window.SELECTEDOBJECT.fnPrepareToDraw();

	}
}
function fnLineButton_Clicked(paramValue){
	
	if ((window.SELECTEDOBJECT) && (window.SELECTEDOBJECT.type=="i5DrawingSurface")){		

	selecteddrawingtool="i5LINE";
	var drawingsurfaceObject=window.SELECTEDOBJECT;
//	window.SELECTEDOBJECT.drawingtool=selecteddrawingtool;
	//window.SELECTEDOBJECT.fnPrepareToDraw();
	window.SELECTEDOBJECT.fnSetPropValue("drawingtool",selecteddrawingtool);

	}
}

function fnEraserButton_Clicked(paramValue){
	
	if ((window.SELECTEDOBJECT) && (window.SELECTEDOBJECT.type=="i5DrawingSurface")){		

	selecteddrawingtool="i5PENCIL";
	window.SELECTEDOBJECT.drawingtoolcolor="#FFFFFF";
	window.SELECTEDOBJECT.drawingtoolwidth=5;
	var drawingsurfaceObject=window.SELECTEDOBJECT;
	window.SELECTEDOBJECT.fnSetPropValue("drawingtool",selecteddrawingtool);

//	window.SELECTEDOBJECT.drawingtool=selecteddrawingtool;
	//window.SELECTEDOBJECT.fnPrepareToDraw();
	}
}



function fnRedRange_Click(paramObject){
	red=paramObject.inputTag.value;
	var tempRGB="RGB(" + red +"," + green + "," + blue + ")";
	var tempNSObject=window.fnGetObject("rednsjson");
	tempNSObject.fnSetValue(red);
	
	bgcolorvalue=fnGetObject("bgcolorvalue");
	bgcolorvalue.fnSetBackgroundColor(tempRGB);
	
	fnSetDrawingToolColor();

}

function fnGreenRange_Click(paramObject){
	green=paramObject.inputTag.value;
	var tempRGB="RGB(" + red +"," + green + "," + blue + ")";
	
	var tempNSObject=window.fnGetObject("greennsjson");
	tempNSObject.fnSetValue(green);

	bgcolorvalue=fnGetObject("bgcolorvalue");
	bgcolorvalue.fnSetBackgroundColor(tempRGB);
	
	fnSetDrawingToolColor();

}
function fnBlueRange_Click(paramObject){
	blue=paramObject.inputTag.value;
	
	var tempRGB="RGB(" + red +"," + green + "," + blue + ")";
	
	var tempNSObject=window.fnGetObject("bluensjson");
	tempNSObject.fnSetValue(blue);

	
	bgcolorvalue=fnGetObject("bgcolorvalue");
	bgcolorvalue.fnSetBackgroundColor(tempRGB);
		
	
	fnSetDrawingToolColor();

}

function fnBlueNS_Click(paramObject){
	
	blue=paramObject.inputTag.value;
	
	var tempRGB="RGB(" + red +"," + green + "," + blue + ")";
	
	var tempNSObject=window.fnGetObject("bluerange");
	tempNSObject.fnSetValue(blue);

	
	bgcolorvalue=fnGetObject("bgcolorvalue");
	bgcolorvalue.fnSetBackgroundColor(tempRGB);
		
	
	
	fnSetDrawingToolColor();


}

function fnRedNS_Click(paramObject){
	red=paramObject.inputTag.value;
	
	var tempRGB="RGB(" + red +"," + green + "," + blue + ")";
	
	var tempNSObject=window.fnGetObject("redrange");
	tempNSObject.fnSetValue(red);

	
	bgcolorvalue=fnGetObject("bgcolorvalue");
	bgcolorvalue.fnSetBackgroundColor(tempRGB);
		
	
	
	fnSetDrawingToolColor();


}

function fnGreenNS_Click(paramObject){
	

	green=paramObject.inputTag.value;
	
	var tempRGB="RGB(" + red +"," + green + "," + blue + ")";
	
	var tempNSObject=window.fnGetObject("greenrange");
	tempNSObject.fnSetValue(green);

	
	bgcolorvalue=fnGetObject("bgcolorvalue");
	bgcolorvalue.fnSetBackgroundColor(tempRGB);
	fnSetDrawingToolColor();
	
	

}

function fnSetDrawingToolColor(){

	if ((window.SELECTEDOBJECT) && (window.SELECTEDOBJECT.type=="i5DrawingSurface")){	
		
		window.SELECTEDOBJECT.fnSetPropValue("drawingtoolcolor",fnRGBToHex(red,green,blue));

		//window.SELECTEDOBJECT.drawingtoolcolor=fnRGBToHex(red,green,blue);
		
	}

}



