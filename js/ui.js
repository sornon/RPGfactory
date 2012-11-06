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
	$beginContainer:null,
	$current:null,
	$move:null,
	moveX0:null,
	moveY0:null,
	moveLeft:null,
	moveTop:null,
	droped:0,
	init:function(){
		$(document).bind('mouseup',function(e){
			ui.drop();
		});
		
		$('.candrop').bind('mouseover',function(e){
			e.preventDefault();
			e.stopPropagation();
			if(ui.droped == 1){
				ui.droped = 0;
				ui.$move.appendTo($(this));
			}
		})
		$(document).bind('mouseover',function(e){
			if(ui.droped == 1){
				ui.droped = 0;
				if(confirm('是否扔掉物品？')){
					ui.$move.remove();
				}else{
					return false;
				}
			}
		})
	},
	drag:function(obj,target){
		var o = obj;
		var t;
		target ? t = target : t = null;
		ui.$beginContainer = o.parent();
		o.bind({
			mousedown:function(e){
				e.preventDefault();
				e.stopPropagation();
				ui.mouseLeft(1);
				ui.$move = o;
				ui.moveX0 = e.pageX;
				ui.moveY0 = e.pageY;
				ui.moveLeft = o.offset().left;
				ui.moveTop = o.offset().top;
				ui.$move.css({
					'position':'absolute',
					'left':ui.moveLeft,
					'top':ui.moveTop,
					'right':'auto',
					'z-index':'10000'
				});
				o.appendTo('body');
				$(document).bind('mousemove',function(e){	
					ui.uiMove(e);
				});
			}
		});
	
	},
	
	uiMove:function(e){	
		//获取鼠标坐标	
		ui.pageX = e.pageX;
		ui.pageY = e.pageY;
		$('#proto2 dd').text(ui.pageX);
		$('#proto3 dd').text(ui.pageY);
		//拖拽过程
		if(ui._mouseLeft == 1){
			e.preventDefault();
			e.stopPropagation();
			ui.$move.css({
				'left':parseInt(ui.pageX - ui.moveX0) + parseInt(ui.moveLeft),
				'top':parseInt(ui.pageY - ui.moveY0) + parseInt(ui.moveTop),
				'right':'auto'
			});
		}
	},
	drop:function(obj,source){
			var o = ui.$move;
			var s = ui.$beginContainer;
			if(obj) o = obj;
			if(source) s = source;
			$(document).unbind('mousemove');
			if(ui._mouseLeft == 1){
				o.appendTo(s);
				o.removeAttr('style');
				ui.mouseLeft(0);
				ui.droped = 1;
			}
	}
	

}


$(function(){
	ui.init();
	$('.candrop > span').each(function() {
        ui.drag($(this));
    });
})