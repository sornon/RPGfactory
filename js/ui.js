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
	shiftkey:0,
	init:function(){
		//shift状态判断 用来切分物品
		$(document).bind({
			'keydown':function(e){
				if(e.shiftKey) ui.shiftkey = 1;
			},
			'keyup':function(e){
				if(!e.shiftKey) ui.shiftkey = 0;
			}
		})
		
		//右键装备
		$(document).bind('mouseup',function(e){
			if(ui.$move){
				if(ui.mr(e)){
					//换装备
					if(ui.$move){
						ui.dropChange();
						ui.$move = null;
					}
				}else{
					//穿、脱装备
					ui.drop();
				}
			}
		});
		$(document).bind('mouseover',function(e){
			//是否丢弃
			ui.droped = 0;
		});
		//识别松开鼠标后的当前对象，完成拖放
		$('.candrop').bind('mouseover',function(e){
			e.preventDefault();
			e.stopPropagation();
			//拖放状态
			if(ui.droped == 1){
				ui.droped = 0;
				//当前槽位是否有装备
				if($(this).find('.candrag').size()>0){
					//当前槽位是否匹配
					if($(this).hasClass(ui.$move.attr('socket'))){
						//槽位已有装备放入背包
						$(this).find('.candrag').appendTo(ui.$beginContainer);
						//拖拽物放入装备槽位
						ui.$move.appendTo($(this));
					}
				}else{
					//当前槽位是否匹配
					if($(this).hasClass(ui.$move.attr('socket')) || $(this).hasClass('isbag')){
						ui.$move.appendTo($(this));
					}
				}
				//清空当前对象
				ui.$move = null;
			}
		})
	},
	//抓起
	drag:function(obj,target){
		var o = obj;
		var t;
		target ? t = target : t = null;
		o.bind({
			mousedown:function(e){
				e.preventDefault();
				e.stopPropagation();
				ui.$beginContainer = $(this).parent();
				ui.$move = o;
				ui.moveX0 = e.pageX;
				ui.moveY0 = e.pageY;
				ui.moveLeft = o.offset().left;
				ui.moveTop = o.offset().top;
				$('.'+o.attr('socket')).css('box-shadow','0px 0px 10px #09F')
				if(ui.mr(e)){
					ui.mouseRight(1);
				}else{
					if(ui.shiftkey){
						
					}else{
						ui.mouseLeft(1);
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
				}
			}
		});
	
	},
	//拖动中
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
	//放下
	drop:function(obj,source){
			var o = ui.$move;
			var s = ui.$beginContainer;
			$('.candrop').removeAttr('style')
			if(obj) o = obj;
			if(source) s = source;
			$(document).unbind('mousemove');
			if(ui._mouseLeft == 1){
				o.appendTo(s);
				o.removeAttr('style');
				ui.mouseLeft(0);
				ui.droped = 1;
			}
	},
	//放下并更换
	dropChange:function(){
			if(ui.$move.closest('.char-equ').size()>0){
				$('.candrop').removeAttr('style');
				ui.$move.appendTo(ui.spaceBag())
			}else{
				$('.'+ui.$move.attr('socket')).first().find('span').appendTo(ui.$beginContainer);
				ui.$move.appendTo($('.'+ui.$move.attr('socket')).first());
				$('.candrop').removeAttr('style');
			}
	},
	//检测背包空位
	spaceBag:function(){
		var o = null;
		$('.isbag').each(function(){
            if($(this).find('span').size() == 0 ){
				o = $(this);
				return false;
			}
        });
		if(o){ return o;}
		else{alert('背包已满！请及时清理！')}
		
	}
	

}


$(function(){
	ui.init();
	$('.candrag').each(function() {
        ui.drag($(this));
    });
})