i5Popup.prototype=i5UIObject;
i5Popup.prototype.constructor=i5Popup;

function i5Popup(){

	i5UIObject.call(this);
	
	/*this.popupstyle="";//CHROME & CHROMELESS
	this.closebutton=false;//TRUE OR FALSE
	this.minbutton=false;//TRUE OR FALSE
	this.draggable=false;//TRUE OR FALSE
	this.borderstyle="";
	this.borderwidth="";
	this.bordercolor="";
	this.resize="";
	this.background="";
	this.chrometitlebar="";
	this.title="";
	

	
	this.state="EXPANDED";//COLLAPSED & CLOSED

	
	this.expandedbuttonstyle="expandedbutton";
	this.expandedbuttontagname="";
	this.expandedbutton="";
	
	this.collapsedbuttonstyle="collapsedbutton";
	this.collapsedbuttontagname="";
	this.collapsedbutton="";
	
	this.closebuttonstyle="closebutton";
	this.closebuttontagname="";
	this.closebutton="";
	this.closebuttonref="";
	this.onclosepopup="";*/
	
	this.popupuimetaarray="";
	this.popupuimetareferencearray=new Array();
	this.chrometitlebartagname="chrometitlebar";

	this.i5PopupPropsList={
			"popupstyle":"popupstyle",
			"behavior":"behavior",
			"dock":"dock",
			"closebutton":"closebutton",
			"minbutton":"minbutton",
			"draggable":"draggable",
			"borderstyle":"borderstyle",
			"borderwidth":"borderwidth",
			"bordercolor":"bordercolor",
			"resize":"resize",
			"background":"background",
			"chrometitlebar":"chrometitlebar",
			"chrometitlebartagname":"chrometitlebartagname",
			"title":"title",
			"state":"state",
			"expandedbuttonstyle":"expandedbuttonstyle",
			"expandedbuttontagname":"expandedbuttonstagname",
			"expandedbutton":"expandedbutton",
			"collapsedbuttonstyle":"collapsedbuttonstyle",
			"collapsedbuttontagname":"collapsedbuttonstagname",
			"collapsedbutton":"collapsedbutton",
			"closebuttonstyle":"closebuttonstyle",
			"closebuttontagname":"closebuttonstagname",
			"closebutton":"closebutton",
			"closebuttonref":"closebuttonref",
			"onclosepopup":"onclosepopup",
			"popupuimetaarray":"popupuimetaarray",
			"popupuimetareferencearray":"popupuimetareferencearray",
	}
	

	this.fnInitFromJson=function(paramObject){
		
		i5UIObject.prototype.fnInitFromJson.call(this,paramObject); 

		for(key in paramObject){
			if (paramObject[key]!="")
				this[key]=paramObject[key];
		
		}
		
		this.fnCreateDiv();
		this.fnCreateWindow();
		this.fnCreatePopupUiObjects();
				
		this.divtag.ondragstart=methodizeevent(this.fnOnDragStart,this);
		this.divtag.ondrag=methodizeevent(this.fnOnDrag,this);
		this.divtag.ondragend=methodizeevent(this.fnOnDragEnd,this);
		
	}
	
	this.fnInitFromDiv=function(paramObject){

		i5UIObject.prototype.fnInitFromDiv.call(this,paramObject); 
		
			//set i5PopupPropsList
			for(key in this.i5PopupPropsList){
				if (this.divtag.getAttribute(key)){
					this[key]=this.divtag.getAttribute(key);
				}	
			}	
			//this.popupuimetaarray=this.childNodes
	}
	
	
	this.fnCreateDiv=function(){
		i5UIObject.prototype.fnCreateDiv.call(this);
		//set i5WindowpropList
		for(key in this.i5PopupPropsList){
			if (this.divtag.getAttribute(key)){
				this[key]=this.divtag.getAttribute(key);
			}	
		}	
	}
	
	this.fnCreateWindow=function(){
		
		if (this.popupstyle=="CHROME"){
			
			var chrometitlebarjson={
				 "id":this.id + "popuptitlebar",
				 "type":"i5Background",
				 "category":"i5UI",
				 "behavior":"SHAPE",
				 "left":"0px",
				 "top":"0px",
				 "draggable":false,
				 "cssclassname":this.chrometitlebartagname,
				 "zindex":this.zIndex,
				 "parent":this.id,
			};
			
			this.chromeTitleBar=new i5Background();
			this.chromeTitleBar.fnInitFromJson(chrometitlebarjson);
			this.chromeTitleBar.divtag.style.position="relative";
			this.chromeTitleBar.divtag.appendChild(document.createTextNode(this.title))
			
			if (this.minbutton==true){
				this.fnAddMinMaxButtons();
			}
			if (Boolean(this.closebutton)==true){
				this.fnCreateCloseButton();
			}
		}

		
		this.divtag.style.borderWidth=this.borderwidth + "px";
		this.divtag.style.borderStyle=this.borderstyle;
		this.divtag.style.borderColor=this.bordercolor;
		this.divtag.style.background=this.background;
		this.divtag.draggable=this.draggable;
		
		window.ARRAYOFWINDOWS.push(this);

	}
	this.fnCreatePopupUiObjects=function(){


		for (key in this.popupuimetaarray){
			
			var objectType=eval(this.popupuimetaarray[key].type);			
			ai5Object=new objectType();
			ai5Object.fnInitFromJson(this.popupuimetaarray[key]);
			this.popupuimetareferencearray.push(ai5Object);
		}
	}
	
	this.fnCreateCloseButton=function(){
		
		var closeButtonJson=
				{
					 "id":"2",
					 "name":"closepopup",
					 "label":"X",
					 "type":"i5Button",
					 "size":"mini",
					 "buttonstyle":"SHAPE",
					 "color":"grey",
					 "zindex":400,
					 "parent":this.chromeTitleBar.id,
				};
		
		this.closebuttonref=new i5Button();
		this.closebuttonref.fnInitFromJson(closeButtonJson);
		this.closebuttonref.divtag.style.left=(parseInt(this.divtag.style.width)-18) + "px";
		this.closebuttonref.divtag.style.top= "3px";
		this.closebuttonref.touchend=methodizeevent(this.fnClosePopup,this);
		this.popupuimetareferencearray.push(this.closebuttonref);

	}
	
	this.fnClosePopup=function(paramEvent){
		
		this.fnRemove();
		if (this.onclosepopup){
		var fnCallBack=eval(this.onclosepopup);
		fnCallBack(this);	
		}
	}
	this.fnAddMinMaxButtons=function(){
		
		this.expandedbutton=document.createElement("div");
		this.expandedbuttontagname="expandedbutton" + this.divtagName
		this.expandedbutton.className=this.expandedbuttonstyle;
		this.divtag.appendChild(this.expandedbutton);
		this.expandedbutton.onmouseup=methodize(this.fnManageMinMax,this);
		
		this.collapsedbutton=document.createElement("div");
		this.collapsedbbuttontagname="collapsedbutton" + this.divtagName;
		this.collapsedbutton.className=this.collapsedbuttonstyle;
		this.divtag.appendChild(this.collapsedbutton);
		this.collapsedbutton.onmouseup=methodize(this.fnManageMinMax,this);
		
		if(this.state=="EXPANDED"){
			this.expandedbutton.style.visibility="visible";
			this.collapsedbutton.style.visibility="hidden";
			
		}
		if(this.state=="COLLAPSED"){
			this.collapsedbutton.style.visibility="visible";
			this.expandedbutton.style.visibility="hidden";

		}
	}
	
	this.fnManageMinMax=function(){
		if (this.state=="EXPANDED"){
			document.getElementById(this.divtagName + "content").style.visibility="hidden";
			var tempHeight=this.height;
			while(tempHeight>=30){
				tempHeight=tempHeight-1;
				this.divtag.style.height=tempHeight + "px";
			}
			this.state="COLLAPSED"
			this.expandedbutton.style.visibility="hidden";
			this.collapsedbutton.style.visibility="visible";
			
		}
		else{
			document.getElementById(this.divtagName + "content").style.visibility="visible";
			this.fnManageDocking();
			this.state="EXPANDED"
			this.expandedbutton.style.visibility="visible";
			this.collapsedbutton.style.visibility="hidden";
		}
			
		
	}
	
	this.fnDoClose=function(){
		
	}

	this.fnGetHtml5=function(){

		return(this.divtag);
	}

	this.fnRemove=function(){
		
	//PENDING POPULATE CHILD NODES IN POPUPUIMETAREFERENCEARRAY
		
		for (ctr=0;ctr<=this.popupuimetareferencearray.length-1; ctr++){
			this.popupuimetareferencearray[ctr].fnRemove();
		}
		this.popupuimetareferencearray.splice(0,this.popupuimetareferencearray.length);
		
		i5UIObject.prototype.fnRemove.call(this); 		

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

}
