$(document).ready(function() {
	var dynamic = new DynamicList();
	
	
	var id = 0;
	var action = "add";
	
	
	
});


function DynamicList() {
	var self = this;
	
	var items = {
		total: 0,

		addItem: function() {
			this.total++;
		},
		discountItem: function() {
			this.total--;
		},
		
		set items(val) {
			this.total = val;
		},
		
		get items () {
			return this.total;
		}
	};
	
	
	var actions = {
		idSelected: 0,
		
		/**
		 * @param String action 
		 */
		set actions(action) {
			this.action = action;
		},
		get actions() {
			return this.action;
		}
	
	}
	
	/**
	 * selectors
	 */
	var btn_delete = '<button class="delete">Delete</button>';
	var btn_edit = '<button class="edit">Edit</button>';
	var edit = $( "#dynamicList #editList" );
	
	var idSelected = 0;
	
	this.deleteListener = $(document);
	this.editListener = $(document);

	var li = "<li>"+btn_delete+btn_edit+"<span></span></li>";
	
	/**
	 * vars
	 */
	
	this.edit = edit;
	
	actions = "add";
	
	this.add = function() {
		//this.addItem();
		items.addItem()
		
		$("#dynamicList ul")
			.append(li)
			.find("li:last")
			.attr("data-id", items.items)
			.find("span")
			.append( this.getEditTxt() );

		this.clear();
	};
	
	this.editAtItem = function() {
		console.log( "idSelected -- " );
		console.log( idSelected );
		$("#dynamicList ul li[data-id='"+ idSelected +"'] span").html( this.getEditTxt() );
		
		actions = "add";
		this.clear();
	};
	
	/**
	 * @return String
	 */
	this.getEditTxt = function() {
		return this.edit.val();
	}
	
	this.clear = function() {
		this.edit.val("");
	}
	
	
	this.edit.keypress( function( event ) {
		if ( event.which == 13 ) {
			
			event.preventDefault();
			console.log(actions);
			if(actions == "add") self.add(); else self.editAtItem();
		}
	});
	
	this.deleteListener.on('click', "#dynamicList ul li button.delete" , function() {
		
		id = $(this).parent().data("id");
		
		actions = "add";
		console.log("ID : "+ id);
		console.log('position : '+ $("#dynamicList ul").find($(this).parent()).index());
		
		$(this).parent().remove();
		
		return false;
	});
	
	this.editListener.on('click', "#dynamicList ul li button.edit" , function() {
		idSelected = $(this).parent().data("id");
		
		console.log("----------------------");
		console.log(idSelected);
		console.log("----------------------");
		$("#dynamicList #editList").val( $(this).parent().find("span").text() );
		actions="edit";
		
		return false;
	});
	
	
}
