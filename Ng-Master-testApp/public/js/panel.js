//Panel class -- show a panel in the browser
function panel(width, height, $parent){
	if (arguments.length < 2) {
		return false;
	}

	var _open = "false";
	//var _self = this;
	var $_element = $(document.createElement('div'));

	$_element.attr({
		"class" : "panel"
	});

	$_element.css({
		"width":width,
		"height":height,
		"position":"absolute",
		"top":"50%",
		"left":"50%",
		"margin-left": -width/2,
		"margin-top": -height/2,
		"z-index":"100"
	});

	if (typeof $parent == 'undefined') {
		$parent = $(document.documentElement);
	}
	else if(!$parent){
		return false;
	}
	
	$parent.append($_element);
	
	this.isOpened = function(){
		return _open;
	}

	this.open = function(callback){
		if (_open) {
			return false;
		}
		_open = true;
		$_element.stop(true).fadeIn(500, callback);
	}

	this.close = function(callback){
		if (!_open) {
			return false;
		}
		$_element.stop(true).fadeOut(500, function(){
			_open = false;
			if(callback && callback.call){
				callback.apply(this, arguments);
			}
		});
	}

	this.add = function(content){
		if(typeof content == 'string'){
			$_element.html($_element.html()+content);
		}else{
			$_element.append(content);
		}
	}

	this.clear = function(){
		$_element.children().remove();
	}

	$_element.on('click', this.close);
	$_element.on('mousedown', handle_mousedown);
}

function handle_mousedown(e){
    window.my_dragging = {};
    my_dragging.pageX0 = e.pageX;
    my_dragging.pageY0 = e.pageY;
    my_dragging.elem = this;
    my_dragging.offset0 = $(this).offset();
    function handle_dragging(e){
        var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
        var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
        $(my_dragging.elem)
        .offset({top: top, left: left});
    }
    function handle_mouseup(e){
        $('body')
        .off('mousemove', handle_dragging)
        .off('mouseup', handle_mouseup);
    }
    $('body')
    .on('mouseup', handle_mouseup)
    .on('mousemove', handle_dragging);
}