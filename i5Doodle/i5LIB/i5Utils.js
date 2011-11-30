//GLOBAL VARIABLES
window.onresize=fnOni5WindowResize;


//CONVERTS OBJECT TO EVENT RECEIVER SO JAVASCRIPT CAN RECOGNIZE i5 OBJECTS
function methodize(methodize_func,methodize_scope,methodize_paramarray){
    
	  return (function(){methodize_func.call(methodize_scope,methodize_paramarray);});
}
function methodizeevent(methodize_func,methodize_scope,methodize_paramarray){
    
	  return (function(evt){methodize_func.call(methodize_scope,evt,methodize_paramarray);});
}

function fnOni5PresentAELoad(){
	if(i5DEBUG==true){
		//alert("fnOni5PresentAELoad");
	}
	
	window.scrollTo(0, 1);
	window.ai5PresentAE=new i5PresentAE("i5DEFAULT");
	ai5PresentAE.fnInit();
}

function base64Encode(data){
	if (typeof(btoa) == 'function') return btoa(data);//use internal base64 functions if available (gecko only)
	var b64_map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var byte1, byte2, byte3;
	var ch1, ch2, ch3, ch4;
	var result = new Array(); //array is used instead of string because in most of browsers working with large arrays is faster than working with large strings
	var j=0;
	for (var i=0; i<data.length; i+=3) {
		byte1 = data.charCodeAt(i);
		byte2 = data.charCodeAt(i+1);
		byte3 = data.charCodeAt(i+2);
		ch1 = byte1 >> 2;
		ch2 = ((byte1 & 3) << 4) | (byte2 >> 4);
		ch3 = ((byte2 & 15) << 2) | (byte3 >> 6);
		ch4 = byte3 & 63;
		
		if (isNaN(byte2)) {
			ch3 = ch4 = 64;
		} else if (isNaN(byte3)) {
			ch4 = 64;
		}

		result[j++] = b64_map.charAt(ch1)+b64_map.charAt(ch2)+b64_map.charAt(ch3)+b64_map.charAt(ch4);
	}

	return result.join('');
}

function fnOni5WindowResize()
{
	
	for (key in window.ARRAYOFWINDOWS){
		var tempObject=window.ARRAYOFWINDOWS[key];
		//tempObject.fnResize();
	}

}

function fnGetMaxFromArray(paramArray)
{
	var max=-100;
	for(key in paramArray){
		max=Math.max(max, parseInt(paramArray[key]));
	}
	
	return(max);
}

function fnGetMinFromArray(paramArray)
{
	var min=100000;
	for(key in paramArray){
		min=Math.min(min, parseInt(paramArray[key]));
	}
	
	return(min);
}

function fnGetObject(paramObjectName){
	
/*	for(key in window.THISi5APPUIOBJECTS.metaobjectreferencearray){
		if (window.THISi5APPUIOBJECTS.metaobjectreferencearray[key].id==paramObjectName){
			return (window.THISi5APPUIOBJECTS.metaobjectreferencearray[key]);
		}
	}*/
	
	var returnObjectDiv=document.getElementById(paramObjectName);
	
	if (returnObjectDiv){
		var objectType=eval(returnObjectDiv.getAttribute("type"));
		if (objectType){
		var ai5Object=new objectType();
		ai5Object.fnInitFromDiv(returnObjectDiv);
		}
	}
	
	return ai5Object;
	
}

function fnGetScript(paramLocation){
	
	for(key in window.ARRAYOFSCRIPTS){
		if (window.ARRAYOFSCRIPTS[key]==paramLocation){
			return (true);
		}
	}

	return (null);
}

function fnGetQuerystring(paramKey, paramDefaultValue)
{
  if (paramDefaultValue==null) paramDefaultValue=""; 
  paramKey = paramKey.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+paramKey+"=([^&#]*)");
  var querystringvalue = regex.exec(document.location.href);
  if(querystringvalue == null)
    return paramDefaultValue;
  else
    return querystringvalue[1];
}


function fnGetSupportedProperty(paramPropertyArray){
	
	var root=document.documentElement //reference root element of document
    for (var ctr=0; ctr<paramPropertyArray.length; ctr++){ //loop through possible properties
        if (typeof root.style[paramPropertyArray[ctr]]=="string"){ //if the property value is a string (versus undefined)
            return paramPropertyArray[ctr] //return that string
        }
    }
}

function fnLoadJSFiles(paramObject, paramJsFiles){

	var jsFileRef="";
	for(key in paramJsFiles){
		
		jsFileRef=document.createElement("script");
		jsFileRef.setAttribute("type","text/javascript");
		jsFileRef.setAttribute("src", paramJsFiles[key]);
		document.getElementsByTagName("head")[0].insertBefore(jsFileRef,document.head.lastChild);
		
		jsFileRef.addEventListener('load', methodize(paramObject.fnOni5JSFileLoaded,paramObject),false);
	}
	
}

function fnLoadCSSFile(paramObject, paramCssFile){

	var cssRef=document.createElement("link");
	cssRef.setAttribute("rel","stylesheet");
	cssRef.setAttribute("type","text/css");
	cssRef.setAttribute("href", paramCssFile);
	//cssRef.setAttribute("media","only screen and (max-device-width: 320px)");
	//document.getElementsByTagName("head")[0].insertBefore(cssRef,document.head.firstChild);
	document.getElementsByTagName("head")[0].appendChild(cssRef);
	
}

function fnRGBToHex(paramRed, paramGreen, paramBlue){
	objColorArray=new Array();
	objColorArray=[paramRed,paramGreen,paramBlue];	
	
	var hexCode;
	
	for (key in objColorArray){
	
		N=objColorArray[key];
		
		if (N==null){
			if (!hexCode)
				hexCode="00";
			else
				hexCode+= "00";
		}
		else{
			N=parseInt(N); 
			if (N==0 || isNaN(N)) 
				
				if (!hexCode)
					hexCode="00";
				else
					hexCode+= "00";
			else{
				N=Math.max(0,N); N=Math.min(N,255); N=Math.round(N);
				if (!hexCode)
				 hexCode= "0123456789ABCDEF".charAt((N-N%16)/16)
			      + "0123456789ABCDEF".charAt(N%16);
				else
				   hexCode+= "0123456789ABCDEF".charAt((N-N%16)/16)
				      + "0123456789ABCDEF".charAt(N%16);
			}
		
	}
	 
	 
	}
	return(hexCode);
}

function fnHexToRGB(paramHexCode){
	
	objColorArray=new Array();
	paramHexCode=(paramHexCode.charAt(0)=="#") ? paramHexCode.substring(1,7):paramHexCode
			
	var red=parseInt(paramHexCode.substring(0,2),16);
	var green=parseInt(paramHexCode.substring(2,4),16);
	var blue=parseInt(paramHexCode.substring(4,6),16);
	
	objColorArray.push(red);
	objColorArray.push(green);
	objColorArray.push(blue);
	
	return(objColorArray);
	
}