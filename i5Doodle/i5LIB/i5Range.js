i5Range.prototype=i5UIObject;
i5Range.prototype.constructor=i5Range;

function i5Range(){
	
	i5UIObject.call(this);

	//PUBLIC PROPERTIES
	this.style="";//TRADITIONAL, CONTEMPORARY, IMAGE, CUSTOM
	this.cssclassname="";
	this.min="";
	this.max="";
	this.step="";
	this.label="";
	this.value="";
	
	this.i5RangePropsList={
			"rangestyle":"rangestyle",
			"min":"min",
			"max":"max",
			"step":"step",
			"label":"label",
			"showlabel":"showlabel",
			"value":"value",
	}
	
	//PRIVATE PROPERTIES
	this.showlabel=true;
	this.inputTag="";

	this.fnInitFromJson=function(paramObject){

		i5UIObject.prototype.fnInitFromJson.call(this,paramObject); 

		this.fnCreateDiv();

		
		for(key in paramObject){
			this[key]=paramObject[key];
		}
		if(this.style=="TRADITIONAL"){
			this.fnCreateTraditionalRange();
		}
	
	}
	
	this.fnInitFromDiv=function(paramObject){

		i5UIObject.prototype.fnInitFromDiv.call(this,paramObject); 

			//set proplist
			for(key in this.i5RangePropsList){
				if (this.divtag.getAttribute(key)){
					this[key]=this.divtag.getAttribute(key);
				}	
			}	
	}
	
	this.fnGetHTML5=function(){
		return(this.divtag);
	}
	
	this.fnCreateDiv=function(){
		i5UIObject.prototype.fnCreateDiv.call(this); 
	}

	this.fnCreateTraditionalRange=function(){
		 
		 //CREATE LABEL TAG
		 var labelTag=document.createElement("label");
		 labelTag.for=this.id;
		 labelTag.appendChild(document.createTextNode(this.label));
		 this.divtag.appendChild(labelTag);

		 //CREATE INPUT TAG
		 this.inputTag=document.createElement("input");
		 this.inputTag.type="range";
		 this.inputTag.id="input" + this.id;
		 this.inputTag.min=this.min;
		 this.inputTag.max=this.max;
		 this.inputTag.step=this.step;
		 if (this.inputTag.value!=""){
			 this.inputTag.value=this.value;
		 }
		 this.inputTag.onmouseup=methodize(this.fnTouchEnd,this);
		 this.divtag.appendChild(this.inputTag);
		 
	}


	this.fnRemove=function(){
		i5UIObject.prototype.fnRemove.call(this); 
		
	}
	
	this.fnSetValue=function(paramValue){
		
		if (!this.inputTag)
			this.inputTag=document.getElementById("input" + this.id);
		
		this.inputTag.value=paramValue;
		this.value=paramValue
		
	}
	this.fnTouchEnd=function(){
		
		var fnCallBack=eval(this.touchend);
		fnCallBack(this);

	}
}










