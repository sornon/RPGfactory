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
	mr:function(e){
		if(e.which == 2 || e.which == 3 || e.button == 2 || e.button == 3 ){
			return true
		}else{
			return false
		}
	},
	pageX:0,
	pageY:0,
	pageX0:null,
	pageY0:null,
	left:null,
	top:null,
	$beginContainer:null,
	$move:null,
	moveX0:null,
	moveY0:null,
	moveLeft:null,
	moveTop:null,
	droped:0,
	moveCount0:0,
	dbclk:0,
	dbclkT:null,
	e:function(e){
		
	},
	stopProp:function(e){
		console.log(9999)
		e.preventDefault();
		e.stopPropagation();
	},
	init:function(){
		
	},
	//抓起
	drag:function(obj,target){
		console.log(1001)
		var o = obj;
		var t;
		target ? t = target : t = null;
		o.bind('mousedown touchstart',ui.e.DragStart);
	
	},
	//拖动中
	uiMove:function(e){	
		console.log(1002)
		//获取鼠标坐标	
		ui.pageX = e.pageX;
		ui.pageY = e.pageY;
		$('#proto2 dd').text(ui.pageX);
		$('#proto3 dd').text(ui.pageY);
		//拖拽过程
		ui.stopProp(e);
		ui.$move.css({
			'left':parseInt(ui.pageX - ui.moveX0) + parseInt(ui.moveLeft),
			'top':parseInt(ui.pageY - ui.moveY0) + parseInt(ui.moveTop),
			'right':'auto'
		});
	},
	//放下
	drop:function(obj,source){
			console.log(1003)
			var o = ui.$move;
			var s = ui.$beginContainer;
			$('.candrop').removeAttr('style')
			if(obj) o = obj;
			if(source) s = source;
			$(document).unbind('mousemove touchmove');
			if(ui._mouseLeft == 1){
				o.appendTo(s);
				o.removeAttr('style');
				ui.mouseLeft(0);
				ui.droped = 1;
			}
	},
	//放下并更换
	dropChange:function(){
			console.log(1004)
			if(ui.$move.closest('.char-equ').size()>0){
				$('.candrop').removeAttr('style');
				ui.$move.appendTo(ui.spaceBag());
			}else{
				$('.'+ui.$move.attr('socket')).first().find('span').appendTo(ui.$beginContainer);
				ui.$move.appendTo($('.'+ui.$move.attr('socket')).first());
				$('.candrop').removeAttr('style');
			}
	},
	//检测背包空位
	spaceBag:function(){
		console.log(1005)
		var o = null;
		$('.isbag').each(function(){
            if($(this).find('span').size() == 0 ){
				o = $(this);
				return false;
			}
        });
		if(o){ return o;}
		else{alert('背包已满！请及时清理！')}
		
	},
	//匹配合适背包空位
	matchSocket:function(obj){
		console.log(1006)
		$('.isbag').each(function(){
            if($(this).find('span').size() == 0 ){
				$(this).css('box-shadow','0px 0px 10px #09F');
			}
        });
	},
	
	splitItem:function(math,target,source){
		console.log(1007)
		var a = math;
		var t = target;
		var s =source;
		var n = parseInt(t.text());
		var m = parseInt(s.text());
		var N = parseInt(m+n-1);
		var l = $('.item-split .drag-scorll-line').find('span');
		//增加移动数量
		if( a == 0 && n < N && m > 1 ){
			t.text(n+1);
			s.text(m-1);
			l.css('width',((n+1)/N)*100 + '%')
		}
		//减少移动数量
		if( a == 1 && n > 0 && m < (N+1) ){
			t.text(n-1);
			s.text(m+1);
			l.css('width',((n-1)/N)*100 + '%')
		}
		
		
	}
	

}

ui.refreshChar = function(char,obj){
	console.log('刷新显示装备1')
	var a = $('.base');
	var o = $('.char-equ').find('.candrop');
	var b,c;
	if(char){
		a = char;
	}
	if(obj){
		o = obj;
	}
	o.each(function(){
		b = $(this).find('.candrag');
        ui.socketFind(b.attr('socket'),b.attr('id'),a);
		if(b.attr('type')){
			a.addClass(b.attr('type'));
			c = a.find('.unit').attr('class');
			a.find('.unit').removeClass().addClass('unit');
			setTimeout(function(){a.find('.unit').addClass(c);},0)
		}
		if( b.size() == 0 ){
			$('[tex='+$(this).attr('socket')+']').removeAttr('class').addClass('none');
			if($(this).attr('socket') == 'ismainhand'){
				a.removeClass('sword');
				c = a.find('.unit').attr('class');
				a.find('.unit').removeClass().addClass('unit');
				setTimeout(function(){a.find('.unit').addClass(c);},0)
				
			}
		}
    });
}

ui.socketFind = function(socket,id,obj){
	console.log('刷新显示装备2')
	$('[tex='+socket+']').removeAttr('class').addClass('i'+id);
	
}

$(function(){
	ui.init();
	$('.candrag').each(function() {
        ui.drag($(this));
    });
	ui.refreshChar();

})