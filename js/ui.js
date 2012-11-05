var ui = {
	_mouseLeft:0,
	_mouseRight:0,
	mouseLeft:function(v){
		this._mouseLeft = v;
		v == 0 ? $('#proto8 dd').text('off') :  $('#proto8 dd').text('on');
		
	},
	mouseRight:function(v){
		this._mouseRight = v;
		v == 0 ? $('#proto9 dd').text('off') :  $('#proto9 dd').text('on');
	},
	pageX:0,
	pageY:0,
	pageX0:null,
	pageY0:null,
	left:null,
	top:null,
	$current:null,
	$move:null,
	moveX0:null,
	moveY0:null,
	moveLeft:null,
	moveTop:null,
	drag:function(obj,target){
		var o = obj;
		var t;
		target ? t = target : t = null;
		o.bind({
			mousedown:function(e){
				e.preventDefault();
				e.stopPropagation();
				ui.mouseLeft(1);
				t.appendTo('body');
				ui.$move = t;
				ui.moveX0 = e.pageX;
				ui.moveY0 = e.pageY;
				ui.moveLeft = t.position().left;
				ui.moveTop = t.position().top;
				$(document).bind('mousemove',function(e){	
					ui.uiMove(e);
				});
			},
			//拖拽结束
			mouseup:function(e){
				ui.mouseLeft(0);
				$(document).unbind('mousemove');
			},
		});
	
	}

}


$(function(){
	
})