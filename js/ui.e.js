// JavaScript Document
ui.e.EquipItem = function(e){
					console.log(1)
		if(ui.$move){
			if(ui.mr(e)){
				//右键换装备
				if(ui.$move){
					console.log(1.1)
					ui.dropChange();
					ui.$move = null;
				}
			}else{
				//左键穿、脱装备
				ui.drop();
			}
		}
		//识别松开鼠标后的当前对象，完成拖放
		$('.candrop').bind('mouseover',ui.e.EquipItemEnd);
		$(document).bind('mouseover',ui.e.Droped);
		$(document).unbind('mouseup',ui.e.EquipItem);
	}
		
		
ui.e.Droped = function(e){
					console.log(2)
		//是否丢弃
		ui.droped = 0;
		$(document).unbind('mouseover',ui.e.Droped);
		$('.candrop').unbind('mouseover',ui.e.EquipItemEnd);
	}
		
		
ui.e.EquipItemEnd = function(e){
					console.log(3)
		//e.preventDefault();
		//e.stopPropagation();
		//拖放状态
		if(ui.droped == 1){
			ui.droped = 0;
			var m0 = parseInt(ui.$move.text());
			var t = $(this).find('.candrag');
			var tc = parseInt(t.text());
			var mc = parseInt(ui.$move.text());
			var tmc = parseInt(tc+mc);
			var mx = 0;
			if(t.attr('max')){
				mx = parseInt(t.attr('max'));
			}
			//当前槽位是否有装备
			if(t.size()>0){
				//当前槽位是否匹配
				if($(this).hasClass(ui.$move.attr('socket'))){
					//槽位已有装备放入背包
					t.appendTo(ui.$beginContainer);
					//拖拽物放入装备槽位
					ui.$move.appendTo($(this));
				}else if(ui.$move.attr('class') == t.attr('class') && mx > mc){
					if(tmc>mx){
						t.text(mx);
						ui.$beginContainer.find('.candrag').text(m0+tc-mx);
					}else{
						t.text(tmc);
					}
				}else{
					
				}
			
			}else{
				//当前槽位是否匹配
				if($(this).hasClass(ui.$move.attr('socket')) || $(this).hasClass('isbag')){
					ui.$move.appendTo($(this));
				}
			}
			//清空当前对象
			$(document).unbind('mousemove',ui.e.DragFollow);
			$('.candrop').unbind('mouseover',ui.e.EquipItemEnd);
			//ui.$move = null;
		}
	}


//鼠标按下状态跟随
ui.e.DragFollow = function(e){
					console.log(4)
		ui.uiMove(e);
	}	
		
		
ui.e.DragStart = function(e){
					console.log(5)
		ui.stopProp(e);
		ui.droped = 0;
		$('.blurCls').blur();
		ui.$beginContainer = $(this).parent();
		ui.$move = $(this);
		ui.moveX0 = e.pageX;
		ui.moveY0 = e.pageY;
		ui.moveLeft = $(this).offset().left;
		ui.moveTop = $(this).offset().top;
		$('.'+$(this).attr('socket')).css('box-shadow','0px 0px 10px #09F');
		if(ui.mr(e)){
			//鼠标松开左右键换装备
			$(document).bind('mouseup',ui.e.EquipItem);
			//装备右键功能
			ui.mouseRight(1);
		}else{
			//装备左键功能
			ui.mouseLeft(1);
			if(e.shiftKey&&ui.$move.text()>1){
				ui.moveCount0 = parseInt(ui.$move.text());
				$html = $('<div class="control-panel item-split blurCls" tabindex="0" style="left:'+(parseInt(ui.moveLeft)-140)+'px; top:'+ui.moveTop+'px;"><h5 class="mb-10">要移动的数量</h5><dl class="mb-10"><dt>'+ui.$beginContainer.html()+'</dt><dd><a class="btn-up mb-10"></a><a class="btn-down"></a></dd></dl><div class="drag-scorll"><b>0</b><p class="drag-scorll-line"><span style="width:100%"><i tabindex="0"></i></span></p><b>MAX</b></div><span class="btn-done" tabindex="0">确定</span></div>');
				$html.appendTo('body');
				$html.focus();
				$('.item-split .item').text(parseInt(ui.$move.text())-1);
				ui.$move.text('1');
				//框外点击关闭
				$html.bind('blur',function(){
					$(this).remove();
					ui.$move.text(ui.moveCount0);
					$html.unbind('blur');
				});
				$('.item-split .btn-up').bind('mousedown',function(e){
					ui.stopProp(e);
					ui.splitItem(0,$('.item-split .item'),ui.$beginContainer.find('.item'));
				});
				$('.item-split .btn-down').bind('mousedown',function(e){
					ui.stopProp(e);
					ui.splitItem(1,$('.item-split .item'),ui.$beginContainer.find('.item'));
				});
				$('.item-split .btn-done').bind('mousedown',ui.e.SplitDone)
			}else{
				ui.$move.css({
					'position':'absolute',
					'left':ui.moveLeft,
					'top':ui.moveTop,
					'right':'auto',
					'z-index':'10000'
				});
				$(this).appendTo('body');
				//鼠标松开左右键换装备
				$(document).bind('mouseup',ui.e.EquipItem);
				$(document).bind('mousemove',ui.e.DragFollow);
			}
		}
	}
	

ui.e.SplitDone = function(e){
					console.log(6)
		ui.stopProp(e);
		$html.unbind('blur');
		$(document).bind('mouseup',ui.e.SplitMove);
		$(document).unbind('mouseup',ui.e.EquipItem);
		$('.item-split .btn-done').unbind('mousedown',ui.e.SplitDone);
	}
	

ui.e.SplitMove = function(e){
					console.log(7)
		ui.$move = $('.item-split .item');
		ui.matchSocket();
		ui.$move.css({
			'position':'absolute',
			'left':ui.moveLeft,
			'top':ui.moveTop,
			'right':'auto',
			'z-index':'10000'
		});
		ui.$move.appendTo('body');
		$html.remove();
		$(document).bind('mousemove',ui.e.SplitFollow);
		$(document).unbind('mouseup',ui.e.SplitMove);
		$(document).bind('click',ui.e.SplitHide);
	}
	
	
ui.e.SplitFollow = function(e){
					console.log(8)
		//获取鼠标坐标	
		ui.pageX = e.pageX;
		ui.pageY = e.pageY;
		$('#proto2 dd').text(ui.pageX);
		$('#proto3 dd').text(ui.pageY);
		//拖拽过程
		ui.$move.css({
			'left':parseInt(ui.pageX-30),
			'top':parseInt(ui.pageY-30),
			'right':'auto'
		});
	}

ui.e.SplitHide = function(e){
		ui.droped = 1;
		ui.$move.hide();
		$(document).bind('mouseover',ui.e.SplitToBack);
		$('.isbag').bind('mouseover',ui.e.SplitToBag);
		$(document).unbind('click',ui.e.SplitHide);
	}


ui.e.SplitToBack = function(e){
		ui.droped = 0;
		ui.$beginContainer.find('.candrag').text(ui.moveCount0);
		ui.$move.remove();
		$('.isbag').removeAttr('style');
		$('.isbag').unbind('mouseover',ui.e.SplitToBag);
		$(document).unbind('mouseover',ui.e.SplitToBack);
	}
	
	
ui.e.SplitToBag = function(e){
		ui.stopProp(e);
		if(ui.droped = 1){
			ui.droped = 0;
			var m0 = parseInt(ui.moveCount0);
			var t = $(this).find('.candrag');
			var tc = parseInt(t.text());
			var mc = parseInt(ui.$move.text());
			var tmc = parseInt(tc+mc);
			var mx = parseInt(t.attr('max'));
			if($(this).find('.candrag').size() == 0){
				ui.$move.appendTo($(this));
				ui.$move.removeAttr('style');
				ui.drag(ui.$move);
			}else{
				if(ui.$move.attr('class') == t.attr('class')){
					if(tmc>mx){
						t.text(mx);
						ui.$beginContainer.find('.candrag').text(m0+tc-mx);
					}else{
						t.text(tmc);
					}
				}else{
					ui.$beginContainer.find('.candrag').text(m0);
				}
				ui.$move.remove();
			}
			$('.isbag').removeAttr('style');
			$(document).unbind('mouseover',ui.e.SplitToBack);
			$('.isbag').unbind('mouseover',ui.e.SplitToBag);
		}
	}