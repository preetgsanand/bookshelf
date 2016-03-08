$(function() {
	var src;
	var check = false;
	var colors = ["#DC143C","#008B8B","#BDB76B","#8FBC8F","#2F4F4F","#F08080","#20B2AA","#191970","#6495ED","#000000","#B8860B","#006400","#FF1493","#DAA520"];
	function checkName() {
		if($("input:eq(0)").val().length <= 5) {
			$("label:eq(0)").text("Book name is too short...");
			check = false;
		}
		else {
			$("label:eq(0)").text("");
			check=true;
		}
	}
	function checkAuthor() {
		if($("input:eq(1)").val().length <= 5) {
			$("label:eq(1)").text("Author name is too short...");
			check=false;
		}
		else {
			$("label:eq(1)").text("");
			check=true;
		}
	}
	function colorPick() {
		var num = Math.floor((Math.random() * 14));
		$("div.col-md-3:eq(-1)").css("background-color",colors[num]);
	}
	function submitValue() {
		if(check = true) {
			$newDiv = $("<div><img><label></label><img></div>")
			$("div.row:eq(-1)").append($newDiv);
			$("div:eq(-1)").attr("class","col-md-3 col-md-offset-1 col-sm-3 col-sm-offset-1 col xs-2 col-xs-offset-1");
			$("div:eq(-1)").attr("clicks",0);
			$("img:eq(-2)").attr("src","images/placeholder.jpg")
			var content = $(":input:eq(0)").val() + " by <i>" + $(":input:eq(1)").val() + "</i>";
			$("label:eq(-1)").html(content);
			$("img:eq(-2)").attr("src",src);
			$("img:eq(-2)").attr("class","cover");
			$("img:eq(-1)").attr("src","images/minus.png");
			$("img:eq(-1)").attr("class","delete");
			colorPick();
			
		}
	}
	function cleanUp() {
		$(":input:eq(0)").val("");
		$(":input:eq(1)").val("");
		src = "images/placeholder.jpg";
		check=false;
	}
	function submitImg (input) {
		var reader = new FileReader();
		reader.onload = function(e) {
			src = e.target.result;
		};
		reader.readAsDataURL(input.files[0]);
	}
	function updateClick(e) {
		if($(e.target).attr("class") == "cover") {
			var elDiv = $(e.target.parentNode);
			var classList = elDiv.attr("class").split(" ");
			if(classList[classList.length-1] != "favourite") {
				var clicks = parseInt(elDiv.attr("clicks"),10)+1;
				elDiv.attr("clicks",clicks);
				if(clicks > 5) {
					elDiv.attr("class",elDiv.attr("class")+" favourite");
					elDiv.append("<img src = images/heart.png class=heart>");

				}
			}
		}
		else if($(e.target).attr("class") == "delete") {
			var elDiv = $(e.target.parentNode);
			elDiv.remove();
		}
	}
	$(":input:eq(0)").on("blur",checkName);
	$(":input:eq(1)").on("blur",checkAuthor);
	$(":file").on("change",function(e) {
		submitImg(this);
	});
	
	$(":submit").on('mousedown',submitValue);
	$(":submit").on('mouseup',cleanUp);
	$("div.row:eq(-1)").on("click",function(e) {
		updateClick(e);
	})
});
