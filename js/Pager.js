// Distributed Under MIT licence, Copyright Rana Saad Nawaz
var Pager = new Class({
	Implements: [Options, Events],
	totalPages: 1,
	elements: null,
	totalElements: 0,
	currentPage: null,	
	pages: null,
	numberPrefix: null,
	parentElem: null,
	options: {
		elemPerPage: 5,
		effectDuration: 'long',
		noEffect: false,
		className: '.pagination',
		pageNumberHighlightClass: 'active',
		pageNumberUnHighlightClass: 'deActive'
	},
	initialize: function(options){
		this.setOptions(options);
		this.elements = $$(this.options.className);
		this.parentElem = this.elements[0].getParent();
		this.totalElements = this.elements.length;
		this.totalPages = Math.ceil (this.totalElements / this.options.elemPerPage);
		this.prepareArea();
		this.createPageNumbers();
	},
	
	prepareArea: function(){
		this.pages = Array();
		for(l = 0; l < this.totalElements; l++){
			if(l % this.options.elemPerPage == 0){
				divObj = new Element('div', {styles: {height: this.elements[l].offsetHeight, position: 'absolute', opacity: 0, visibility: 'visible'}});
				if(!this.options.noEffect)
					divObj.set('morph', {duration: this.options.effectDuration});
				this.pages.push(divObj);
				divObj.inject(this.parentElem);
				this.elements[l].inject(divObj);
			}else{
				this.elements[l].inject(divObj);
			}
		}
		
		this.pages[0].setStyle('opacity', '1');
		this.parentElem.setStyle('height', parseInt(this.pages[0].getStyle('height').replace("px",""))+40);
	},
	
	createPageNumbers: function(){
		var pageNumbersDiv = new Element('div',{
			styles: {paddingBottom: 20, textAlign: 'left'}
		});
		this.numberPrefix = this.options.className + Math.floor(Math.random()*100);
		for(i = 0; i < this.totalPages; i++){
			var pageAnchor = new Element('a', {
				id: this.numberPrefix+i,
				html: (i+1),
				'class': this.options.pageNumberUnHighlightClass,
				styles: {
					marginRight: 5,
					cursor: 'pointer'
				},
				events: {
					click: function(pageNum){this.loadPage(pageNum);}.bind(this, i)
				}
			});				
			pageAnchor.inject(pageNumbersDiv);
		}
		this.currentPage = 0;
		pageNumbersDiv.inject(this.parentElem, 'top');
		this.highlightPageNumber(0);
	},

	loadPage: function(pageNumber){
		this.unHighlightPageNumber(this.currentPage);
		this.highlightPageNumber(pageNumber);
		this.pages[pageNumber].getParent().setStyle('height', parseInt(this.pages[0].getStyle('height').replace("px",""))+40);
		if(!this.options.noEffect){
			this.pages[this.currentPage].morph({ opacity: 0 });
			this.pages[pageNumber].morph({ opacity: 1 });
		}else{
			this.pages[this.currentPage].setStyle('opacity', 0);
			this.pages[pageNumber].setStyle('opacity', 1);
		}
		this.currentPage = pageNumber;
	},
	
	highlightPageNumber: function(pageNumberMarker){
		$(this.numberPrefix+pageNumberMarker).set('class', this.options.pageNumberHighlightClass);
	},
	
	unHighlightPageNumber: function(pageNumberMarker){
		$(this.numberPrefix+pageNumberMarker).set('class', this.options.pageNumberUnHighlightClass);
	}
});	