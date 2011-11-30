i5TableView.prototype=i5UIObject;
i5TableView.prototype.constructor=i5TableView;

function i5TableView(){
	
	i5UIObject.call(this);

	//PUBLIC PROPERTIES
	//this.tablestyle="";
	//this.items="";
	
	//this.tableviewclassname="";
	//this.tableviewitemclassname="";
	//this.tableviewitemvalueclassname="";
	
	//this.tableTag="";
	
	
	
	this.paramobject="";
	
	this.i5TableViewPropList={
			"tableviewstyle":"tableviewstyle",
			"items":"items",
			"tableviewclassname":"tableviewclassname",
			"tableviewitemclassname":"tableviewitemclassname",
			"tableviewitemvalueclassname":"tableviewitemvalueclassname",
			"tableTag":"tableTag",
			"tableitemheight":"tableitemheight",
			"numberofrows":"numberofrows",
			"numberofcols":"numberofcols",
	}
	
	this.tableitemheight=22;
	this.numberofrows=0;
	this.numberofcols=1;
	
	this.fnInitFromJson=function(paramObject){

		i5UIObject.prototype.fnInitFromJson.call(this,paramObject); 
		this.paramobject=paramObject;
		for(key in paramObject){
			this[key]=paramObject[key];
		}
		
		this.fnCreateDiv();
		this.fnCreateTable();
		
		if (this.tableviewstyle=="TEXT"){
			//this.fnCreateTextItems();
		}

		if (this.tableviewstyle=="IMAGETEXT"){
			
			this.fnCreateImageTextItems();

		}
		if (this.tableviewstyle=="TEXTIMAGE"){
			
			this.fnCreateTextImageItems();

		}

	}
	
	this.fnInitFromDiv=function(paramObject){

		i5UIObject.prototype.fnInitFromDiv.call(this,paramObject); 

			
			//set i5BackgroundPropList
			for(key in this.i5TableViewPropList){
				if (this.divtag.getAttribute(key)){
					this[key]=this.divtag.getAttribute(key);
				}	
			}	
			
			this.fnCreateTable();
			
			if (this.tableviewstyle=="TEXT"){
				//this.fnCreateTextItems();
			}

			if (this.tableviewstyle=="IMAGETEXT"){
				
				this.fnCreateImageTextItems();

			}
			if (this.tableviewstyle=="TEXTIMAGE"){
				
				this.fnCreateTextImageItems();

			}
	}
	
	this.fnCreateTable=function(){
		
		this.tableTag=document.getElementById("table" + this.id);
		if (!this.tableTag){
		this.tableTag=document.createElement("table");
		this.tableTag.id="table" + this.id;
		this.tableTag.className=this.tableviewclassname;
		this.tableTag.style.width=this.divtag.style.width;
		this.tableTag.style.height=this.divtag.style.height;
		this.tableTag.style.height=this.divtag.style.height;

		this.tableTag.style.position="absolute";
		this.divtag.appendChild(this.tableTag);
	

		}
	}
	
	this.fnCreateRow=function(paramRowId){		
		var rowCount=0;
		
		var trTag=document.createElement("tr");
		trTag.id="tablerow" + this.id + paramRowId;
		trTag.className=this.tableviewitemclassname;
		trTag.style.height=this.tableitemheight + "px";
		trTag.style.width=this.divtag.style.width;
		rowCount=this.tableTag.childNodes.length;

		trTag.style.top=(this.tableitemheight * rowCount) + "px";
		trTag.style.position="absolute";
		this.tableTag.appendChild(trTag);

		this.numberofRows=this.tableTag.childNodes.length;
		
		return(trTag);
	
	}
	
	


	
	this.fnCreateCol=function(paramRowObject, paramRowId, paramColId){			
		var tdTag=document.createElement("td");
		tdTag.id="tablecol" + this.id + paramRowId + paramColId;
		tdTag.style.height= this.tableitemheight + "px";
		var colWidth="";
		colWidth=parseInt(this.divtag.style.width)/this.numberofcols;
		tdTag.style.width=colWidth + "px";
		tdTag.className=this.tableviewitemvalueclassname;
		tdTag.style.position="absolute";
		paramRowObject.appendChild(tdTag);
		
		this.numberofcols=paramRowObject.childNodes.length;
		
		return(tdTag);
	
	}
	
	this.fnCreateTextItems=function(paramItem){
		
		
	//	for(key in this.items){
			var liTag=document.createElement("li");
			liTag.id="li" + name + key;
			
			var aTag=document.createElement("a");
			aTag.id="a" + name + key;
			
//			aTag.appendChild(document.createTextNode(this.items[key]));
			aTag.appendChild(document.createTextNode(paramItem));

			liTag.appendChild(aTag);
		
			this.ulTag.appendChild(liTag);
	//	}

	}
	
	this.fnCreateItem=function(paramItemJson){
	
	
		var rowObject="";
		var colObject="";
		var colId=1;
		
		var rowId=this.tableTag.childNodes.length+1;
		
		rowObject=this.fnCreateRow(rowId);
		this.fnCreateCol(rowObject,rowId, colId);	
		
		var objectType=eval(paramItemJson["type"]);
		paramItemJson.parent="tablecol"+ this.id + rowId + colId;
		
		ai5Object=new objectType();
		ai5Object.fnInitFromJson(paramItemJson);
	

	}
	
	
	this.fnCreateDiv=function(){
		i5UIObject.prototype.fnCreateDiv.call(this); 
		
		for(key in this.i5TableViewPropList){
			if (this[key]){
				this.divtag.setAttribute(this.i5TableViewPropList[key],this[this.i5TableViewPropList[key]] )
			}
		}
	}
	
	
	this.fnRemove=function(){
		
		i5UIObject.prototype.fnRemove.call(this); 

	}
	
	this.fnTouchEnd=function(paramCallback){
		
		//var fnCallBack=eval(paramCallback);
		//paramCallback;
	}



}







