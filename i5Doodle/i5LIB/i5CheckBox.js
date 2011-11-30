i5CheckBox.prototype=i5UIObject;
i5CheckBox.prototype.constructor=i5CheckBox;

function i5CheckBox(){
	
	i5UIObject.call(this);

	//PUBLIC PROPERTIES
	this.style="";//TRADITIONAL, CONTEMPORARY, IMAGE, CUSTOM
	this.cssclassname="";
	this.group="";
	this.label="";
	this.checked="";//TRUE, FALSE
	this.value="";
	
	this.defaultimagesrc="";
	this.checkedimagesrc="";
	
	//PRIVATE PROPERTIES
	this.defaultimageobject="";
	this.checkedimageobject="";

	this.inputTag="";
	
	this.loadedImageCount=0;
	this.maxImageCount=2;

	
	this.fnInitFromJson=function(paramObject){

	i5UIObject.prototype.fnInitFromJson.call(this,paramObject); 
		
		for(key in paramObject){
			this[key]=paramObject[key];
		}
		
		this.fnCreateDiv();

		
		if(this.style=="TRADITIONAL"){
			this.fnCreateTraditionalCheckbox();
		}
		if(this.style=="CONTEMPORARY"){
			this.fnCreateContemporaryCheckbox();
		}
		if(this.style=="IMAGE"){
			this.fnCreateImageCheckbox();
		}
		if(this.behavior=="CUSTOM"){
			this.fnCreateCustomCheckbox();
		}
		
		
	}
	

	
	this.fnCreateDiv=function(){
		i5UIObject.prototype.fnCreateDiv.call(this); 
	}
	
	this.fnCreateTraditionalCheckbox=function(){
		
		 
		 //CREATE INPUT & LABEL TAG
		 this.inputTag=document.createElement("input");
		 this.inputTag.type="radio";
		 this.inputTag.id=this.divtagName;
		 this.inputTag.name=this.group;
		 this.inputTag.value=this.value;
		 this.inputTag.checked=this.checked;
		 this.inputTag.onmouseup=methodize(this.fnTouchEnd,this);
		 this.divtag.appendChild(this.inputTag);
		 
		 var labelTag=document.createElement("label");
		 labelTag.for=this.id;
		 labelTag.appendChild(document.createTextNode(this.label));
		 this.divtag.appendChild(labelTag);

	}
	

	this.fnCreateContemporaryCheckbox=function(){
		
		 //CREATE DIV TAG
		 this.divtag=document.createElement("div");
		 this.divtag.id="div" + this.id
		 this.divtag.style.left=this.left + "px";
		 this.divtag.style.top=this.top + "px";
		 this.divtag.style.position="absolute";
		 
		 //CREATE UL TAG
		 var ulTag=document.createElement("ul");
		 ulTag.id="checked";
		 this.divtag.appendChild(ulTag);
		 
		 //CREATE LI TAG
		 var liTag=document.createElement("li");
		 ulTag.appendChild(liTag);
		 
		 //CREATE P TAG
		 var pTag=document.createElement("p");
		 liTag.appendChild(pTag);
		 
		 
		 //CREATE INPUT & LABEL TAG
		 this.inputTag=document.createElement("input");
		 this.inputTag.type="radio";
		// this.inputTag.id=this.divtagName;
		 this.inputTag.value=this.value;
		 this.inputTag.id=this.id;
		 this.inputTag.name=this.id;
		 this.inputTag.checked=this.checked;
		// this.inputTag.onmouseup=methodize(this.fnTouchEnd,this);
		 //document.getElementById(this.id).onmouseup=methodize(this.fnTouchEnd,this);	
		 pTag.appendChild(this.inputTag);
		 
		 //CREATE LABEL TAG WITH CHECK CLASS
		 var labelTag=document.createElement("label");
		 labelTag.for=this.id;
		 labelTag.className="check";
		// labelTag.appendChild(document.createTextNode(this.label));
		 pTag.appendChild(labelTag);
		 
		 //CREATE LABEL TAG WITH INFO CLASS
		 labelTag=document.createElement("label");
		 labelTag.for=this.id;
		 labelTag.className="info";
		 labelTag.appendChild(document.createTextNode(this.label));
		 pTag.appendChild(labelTag);

		 alert(this.divtag.innerHTML);
		 document.body.appendChild(this.divtag);
	}


	this.fnCreateImageButton=function(){

		if (this.defaultimagesrc!=""){
		 this.defaultimageobject=new Image();
		 this.defaultimageobject.onload=i5Button.prototype.fnOnLoad;
		 this.defaultimageobject.onerror=i5Button.prototype.fnOnError;
		 this.defaultimageobject.onabort=i5Button.prototype.fnOnAbort;		
		 this.maxImageCount++;
		 this.defaultimageobject.imagepreloader=this;
		 
		 }


		 if (this.rolloverimagesrc!=""){
		 this.maxImageCount++;
		 this.rolloverimageobject=new Image();
		 this.rolloverimageobject.onload=i5Button.prototype.fnOnLoad;
		 this.rolloverimageobject.onerror=i5Button.prototype.fnOnError;
		 this.rolloverimageobject.onabort=i5Button.prototype.fnOnAbort;
		 this.rolloverimageobject.imagepreloader=this;
		 
		 
		 }
		 
		 if (this.downimagesrc!=""){
		 this.maxImageCount++;
		 this.downimageobject=new Image();
		 this.downimageobject.onload=i5Button.prototype.fnOnLoad;
		 this.downimageobject.onerror=i5Button.prototype.fnOnError;
		 this.downimageobject.onabort=i5Button.prototype.fnOnAbort;
		 
		 this.downimageobject.imagepreloader=this;
		 }

		 if (this.upimagesrc!=""){
		 this.maxImageCount++;
		 this.upimageobject=new Image();
		 this.upimageobject.onload=i5Button.prototype.fnOnLoad;
		 this.upimageobject.onerror=i5Button.prototype.fnOnError;
		 this.upimageobject.onabort=i5Button.prototype.fnOnAbort;
		 this.upimageobject.imagepreloader=this;
		 
		 }

		 //CREATE DIV TAG
		 this.divtag=document.createElement("div");
		 this.divtagName="div" + this.type+this.name+this.id;
		 this.divtag.id=this.divtagName
		 this.divtag.className=this.divtag.id;
		 this.divtag.style.left=this.left;
		 this.divtag.style.top=this.top;
		 this.divtag.style.position="absolute";
		 
		 document.body.appendChild(this.divtag);
		 
		 
		 //CREATE CANVAS
		 this.canvas = document.createElement("canvas");
		 this.canvasTagName="canvas" + this.type + this.name + this.id;
		 this.canvas.id=this.canvasTagName;
		 this.canvas.width=this.defaultimageobject.width;
		 this.canvas.height=this.defaultimageobject.height;
		 this.canvas.style.left=this.left;
		 this.canvas.style.top=this.top;
		 
		 
		 document.getElementById(this.divtagName).appendChild(this.canvas);

		 
		 //SETUP IMAGE PRELOADER
		 
		 this.defaultimageobject.src=this.defaultimagesrc;
		 this.rolloverimageobject.src=this.rolloverimagesrc;
		 this.downimageobject.src=this.downimagesrc;
		 this.upimageobject.src=this.upimagesrc;
		 
	}
	

	this.fnCreateShapeButton=function(){
		

		this.divtag=document.createElement("div");
		var divtagname="div" + this.type+this.id;
		this.divtag.id=divtagname;
		this.divtag.style.left=this.left;
		this.divtag.style.top=this.top;
		this.divtag.zIndex="200";
		//this.divtag.className=this.cssclassname;
		this.divtag.className=this.buttonsize + " ksmbutton " + this.buttoncolor;
		document.body.appendChild(this.divtag);
		document.getElementById(divtagname).appendChild(document.createTextNode(this.buttontitle));
		
		document.getElementById(divtagname).onmouseup=methodize(this.fnTouchEnd,this);
		document.getElementById(divtagname).onmousedown=methodize(this.fnTouchStart,this);

		
		//var anchorTag=document.createElement("a");
		//var anchorTagName="anchor" + this.type+this.name+this.id;
		//anchorTag.id=anchorTagName;
		//anchorTag.style.left=this.left;
		//anchorTag.style.top=this.top;
		//anchorTag.className=this.buttonsize + " ksmbutton " + this.buttoncolor;
		//document.getElementById(this.divtagName).appendChild(anchorTag);
		
		
		//document.getElementById(anchorTagName).onmouseup=methodize(this.fnTouchEnd,this);
		//document.getElementById(anchorTagName).onmousedown=methodize(this.fnTouchStart,this);

	}

	

	this.fnOnLoad=function(){

		this.imagepreloader.fnOnComplete("LOADED");
		
	}
	this.fnOnError=function(){

		this.imagepreloader.fnOnComplete("ERROR");

		
	}
	this.fnOnAbort=function(){

		this.imagepreloader.fnOnComplete("ABORT");

		
	}
	this.fnOnComplete=function(paramStatus){
		
		this.loadedImageCount++;

		//if (paramStatus=="LOADED"){
		if(this.loadedImageCount==this.maxImageCount){
		this.fnCreateCanvas();
		}
		//}
	}

	this.fnCreateCanvas=function(paramState){
		

		//DRAW IMAGE
		if (paramState==undefined)
			paramState="DEFAULT";
		
		if (paramState=="DEFAULT"){
		this.canvas=document.getElementById(this.canvasTagName);
		this.canvas.width=this.defaultimageobject.width;
		this.canvas.height=this.defaultimageobject.height;
		if (this.canvas.getContext) {
	        this.canvascontext = this.canvas.getContext("2d");
			this.canvascontext.drawImage(this.defaultimageobject,0,0);
		}
		}
		if (paramState=="ROLLOVER"){
			this.canvas=document.getElementById(this.canvasTagName);
			this.canvas.width=this.rolloverimageobject.width;
			this.canvas.height=this.rolloverimageobject.height;
			if (this.canvas.getContext) {
				this.canvascontext = this.canvas.getContext("2d");
				this.canvascontext.drawImage(this.rolloverimageobject,0,0);
			}
		}
		
	}

	this.fnRemove=function(){
		
		
	}

	this.fnTouchEnd=function(){
		
		if (this.inputTag.checked==true){
			this.inputTag.value="";
		}
		if (this.inputTag.checked==false){

			this.inputTag.value=this.value;
		}
		var fnCallBack=eval(this.touchend);
		fnCallBack(this);

	}


}





