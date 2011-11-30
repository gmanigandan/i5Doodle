i5Text.prototype=i5UIObject;
i5Text.prototype.constructor=i5Text;

function i5Text(){
	i5UIObject.call(this);


	//PUBLIC PROPERTIES
	//this.style="";
//	this.cssclassname="";
//	this.htmldivtext="";
//	this.canvastext="";
//	this.texttag="";
	
	//PRIVATE PROPERTIES
//	this.canvasTag="";
//	this.canvascontext="";
	
	this.i5TextPropsList={
			"textstyle":"textstyle",
			"touchend":"touchend",
			"canvasTag":"canvasTag",
			"canvascontext":"canvascontext",
			"canvastext":"canvastext",
			"htmldivtext":"htmldivtext",
			"cssclassname":"className",
			"texttag":"texttag",
	};
	

	//this.galleries={
		//	"Shadow": "i5SHADOWGALLERY",
		//	"Border": "i5BORDERGALLERY",
//	}
	
	
	this.fnInitFromJson=function(paramObject){
		
		i5UIObject.prototype.fnInitFromJson.call(this,paramObject); 	
		
		for(key in paramObject){
			if (paramObject[key]!="")
				this[key]=paramObject[key];
		
		}
		
		this.fnCreateDiv();
		this.fnIniti5Text();
	}

	this.fnInitFromDiv=function(paramObject){

		i5UIObject.prototype.fnInitFromDiv.call(this,paramObject); 
		
			//set i5TextPropsList
			for(key in this.i5TextPropsList){
				if (this.divtag.getAttribute(key)){
					this[key]=this.divtag.getAttribute(key);
				}	
			}	
			//this.popupuimetaarray=this.childNodes
	}
	
	this.fnInitFromDefault=function(paramName,paramParent){
		
		this.id=paramName;
		this.parent=paramParent;
		if (this.parent)
			this.parentObject=fnGetObject(paramParent);
		
		this.type="i5Text";
		this.style="HTMLDIV";
		this.left=50;
		this.top=50;
		this.htmldivtext="Click and type to change text";
		this.width=100;
		this.height=100;
		this.zindex=100;
		this.draggable=true;
		this.allowresize=true;
		this.fnCreateDiv();
		this.fnIniti5Text();
		
		this.divtag.onmouseup=methodizeevent(this.fnTouchEnd,this);
		
		this.divtag.ondragstart=methodizeevent(this.fnOnDragStart,this);
		this.divtag.ondrag=methodizeevent(this.fnOnDrag,this);
		this.divtag.ondragend=methodizeevent(this.fnOnDragEnd,this);
		
	}

	this.fnIniti5Text=function(){
	
		if (this.textstyle=="HTMLDIV"){
			this.fnCreateHtmlText();
		}
		if (this.textstyle=="HTMLCANVAS"){
			this.fnCreateCanvasText();
		}
	}
	

	this.fnCreateHtmlText=function(){
		
		if (this.cssclassname)
			this.divtag.className=this.cssclassname;
		
		this.texttag=this.divtag.appendChild(document.createTextNode(this.htmldivtext));

	}

	this.fnCreateCanvasText=function(){
		 
		 this.divtag.className=this.cssclassname;
		 
		 //ADD DIV TAG EVENT HANDLERS
//		 this.divtag.onmouseup=methodize(this.fnTouchEnd,this);

		 
		 //CREATE CANVAS
		 this.canvas = document.createElement("canvas");
		 this.canvasTagName="canvas" + this.id;
		 this.canvas.id=this.canvasTagName;
		 this.canvas.width=this.defaultimageobject.width;
		 this.canvas.height=this.defaultimageobject.height;

		this.divtag.appendChild(this.canvas);

	}
	

	this.fnTouchEnd=function(paramEvent){

		this.fnSelect();
		if (this.touchend!==""){
		var fnCallBack=eval(this.touchend);
		fnCallBack(this);
		}
	}

	this.fnCreateCanvas=function(){
		
		//DRAW IMAGE
		this.canvas=document.getElementById(this.canvasTagName);
		this.canvas.width=this.defaultimageobject.width;
		this.canvas.height=this.defaultimageobject.height;
		if (this.canvas.getContext) {
	        this.canvascontext = this.canvas.getContext("2d");
			this.canvascontext.drawImage(this.defaultimageobject,0,0);
		}
	}

	this.fnCreateDiv=function(){
		i5UIObject.prototype.fnCreateDiv.call(this); 
	}
	
	this.fnGetHTML5=function(){
		return(this.divtag);
	}
	
	this.fnRemove=function(){
		
		i5UIObject.prototype.fnRemove.call(this); 		
		
	}

	this.fnSelect=function(){
		
		i5UIObject.prototype.fnSelect.call(this); 
	}
	
	this.fnOnDrag=function(paramEvent){
		i5UIObject.prototype.fnOnDrag.call(this,paramEvent); 
	}
	
	this.fnOnDragStart=function(paramEvent){
		i5UIObject.prototype.fnOnDragStart.call(this,paramEvent); 
	}
	
	
	this.fnOnDragEnd=function(paramEvent){
		i5UIObject.prototype.fnOnDragEnd.call(this,paramEvent); 
	}
	
	this.fnApplyShadowEffect=function(){
		i5UIObject.prototype.fnApplyShadowEffect.call(); 
		this.shadow.fnApplyTextShadow(this);
	}
	
	this.fnApplyBorderEffect=function(){
		i5UIObject.prototype.fnApplyBorderEffect.call(); 
	}
	
}
