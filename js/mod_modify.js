var mod_modify = {
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
	rotate:null,
	$current:null,
	$curTop:null,
	$move:null,
	moveX0:null,
	moveY0:null,
	moveLeft:null,
	moveTop:null,
	
	
	init:function(){
		document.oncontextmenu=function(e){return false;} 
		
		$(document).bind('mousedown',function(e){
			mod_modify.mr(e) ? mod_modify.mouseRight(1) : mod_modify.mouseLeft(1);
		})
		
		//拖拽结束
		$(document).bind('mouseup',function(e){
			mod_modify.mr(e) ? mod_modify.mouseRight(0) : mod_modify.mouseLeft(0);
			$(document).unbind('mousemove');
			mod_modify.mousePos();
			mod_modify.getModInfo(mod_modify.$current);
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
		
		//拖拽开始
		$('.base div').bind({
			mousedown:function(e){
				e.preventDefault();
				e.stopPropagation();
				if(mod_modify.mr(e)){
					mod_modify.mouseRight(1);
				}else{
					mod_modify.mouseLeft(1);
					$('.current').removeClass('current');
					if($(this).hasClass('link')){
						//$(this).css('z-index','103');
						mod_modify.$current = $(this).parent();
					}else{
						mod_modify.$current = $(this);
					}
					mod_modify.$current.addClass('current');
					mod_modify.getModInfo(mod_modify.$current);
					//mod_modify.$current.css('z-index','102');
					mod_modify.pageX0 = e.pageX;
					mod_modify.pageY0 = e.pageY;
					//拖拽过程
					$(document).bind('mousemove',function(e){	
						mod_modify.modMove(e);
					});
				}
			}
		});
		
		//鼠标控制移动
		$(document).bind('keydown',function(e){
			if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40){
				e.preventDefault();
				e.stopPropagation();
				if(e.altKey){
					//角度
					switch(e.keyCode){
						case 37://左
							mod_modify.rotate -= 1;
							break;
						case 38://上
							mod_modify.rotate -= 1;
							break;
						case 39://右
							mod_modify.rotate += 1;
							break;
						case 40://下
							mod_modify.rotate += 1;
							break;
						default:
							break;
					}
					mod_modify.$current.css({'-webkit-transform':'rotate('+mod_modify.rotate+'deg)','-moz-transform':'rotate('+mod_modify.rotate+'deg)'});
					mod_modify.getModInfo(mod_modify.$current);
					
				}else{
					//位置
					if(mod_modify.$current.closest('.base').hasClass('rev')){
						switch(e.keyCode){
							case 37://左
								e.shiftKey ? mod_modify.left -= 10 : mod_modify.left -= 1;
								break;
							case 38://上
								e.shiftKey ? mod_modify.top -= 10 : mod_modify.top -= 1;
								break;
							case 39://右
								e.shiftKey ? mod_modify.left += 10 : mod_modify.left += 1;
								break;
							case 40://下
								e.shiftKey ? mod_modify.top += 10 : mod_modify.top += 1;
								break;
							default:
								break;
						}
						mod_modify.$current.css({'top':mod_modify.top,'left':-mod_modify.left,'right':'auto'});
					}else{
						switch(e.keyCode){
							case 37://左
								e.shiftKey ? mod_modify.left -= 10 : mod_modify.left -= 1;
								break;
							case 38://上
								e.shiftKey ? mod_modify.top -= 10 : mod_modify.top -= 1;
								break;
							case 39://右
								e.shiftKey ? mod_modify.left += 10 : mod_modify.left += 1;
								break;
							case 40://下
								e.shiftKey ? mod_modify.top += 10 : mod_modify.top += 1;
								break;
							default:
								break;
						}
						mod_modify.$current.css({'top':mod_modify.top,'left':mod_modify.left,'right':'auto'});
					
					}
					mod_modify.getModInfo(mod_modify.$current);
				}
			}
		})
		
		
		
		$('#mod_see').click(function(){
			if($(this).hasClass('switch-on')){
				$(this).removeClass('switch-on').addClass('switch-off');
				$('.base').removeClass('modsee');
				cookie('mod_see','0');
			}else{
				$(this).removeClass('switch-off').addClass('switch-on');
				$('.base').addClass('modsee');
				cookie('mod_see','1');
			}
		});
		
		$('#base_see').click(function(){
			if($(this).hasClass('switch-on')){
				$(this).removeClass('switch-on').addClass('switch-off');
				$('.link,#basetxt_see').hide();
				cookie('base_see','0');
			}else{
				$(this).removeClass('switch-off').addClass('switch-on');
				$('.link,#basetxt_see').show();
				cookie('base_see','1');
			}
		});
		
		$('#basetxt_see dd span').click(function(){
			if($(this).hasClass('switch-on')){
				$(this).removeClass('switch-on').addClass('switch-off');
				$('.link').text('');
				cookie('basetxt_see dd span','0');
			}else{
				$(this).removeClass('switch-off').addClass('switch-on');
				$('.link').each(function() {
					$(this).text($(this).parent().attr('class').split(' ')[0])
				});
				cookie('basetxt_see dd span','1');
			}
		});
		
		$('#rev dd span').click(function(){
			if($(this).hasClass('switch-on')){
				$(this).removeClass('switch-on').addClass('switch-off');
				$('.base').removeClass('rev');
				cookie('rev dd span','0');
			}else{
				$(this).removeClass('switch-off').addClass('switch-on');
				$('.base').addClass('rev');
				cookie('rev dd span','1');
			}
		});
		
        $('.base').find('div').each(function() {
            if($(this).attr('class').indexOf('bone') > -1){
				$(this).append('<div class="link"></div>')
			}
        });
		
		//为单位增加表情
		$('.unit').each(function() {
            mod_modify.eye($(this))
        });
		
		$('#animate_list select').change(function(){
			var a = $(this).val();
			if(mod_modify.$current && mod_modify.$current.closest('.unit').size()>0){
				mod_modify.$current.closest('.unit').removeClass().addClass('unit '+a);
			}else{
				alert('You must select an unit!')
			}
		})
		
		
		//生成nodelist
		mod_modify.boneList($('.base'));
		//节点选择事件
		$('#bone_list').delegate($('select'),'change',function(){
			var a = $('#bone_list select').val();
			if(a!=''&&a!='document'){
				$('.'+a).mousedown().mouseup();
				mod_modify.texList(a);
			}
		})
		$('#tex_list').delegate($('select'),'change',function(){
			var a = $('#tex_list select').val();
			if(a!=''&&a!='document'){
				$('.'+a).mousedown().mouseup();
			}
		})
	},
	
	eye:function($obj){
		var a = $obj.find('.face01-1');
		if($obj.attr('class').indexOf('attack1') == -1){
			a.removeClass('face01-1').addClass('face01-2');
			setTimeout(function(){
				a.removeClass('face01-2').addClass('face01-1');
			},200);
		}
		setTimeout(function(){
			return mod_modify.eye($obj);
		},Math.floor(Math.random()*5000+250))
	},
	
	see:function(obj){
		if(cookie(obj) == 1 ){
			$('#'+obj).click();
		}
	},
	
	//控制面板模型信息
	getModInfo:function($obj){
		var a = $obj.attr('class').split(' ')[0];
		var b = $obj.parent().attr('class').split(' ')[0];
		var l = $obj.position().left;
		var t = $obj.position().top;
		if($obj.closest('.base').hasClass('rev')){
			l = $obj.position().left + $obj.outerWidth();
		}
		var _l = $obj.offset().left;
		var _t = $obj.offset().top;
		var r = String($obj.attr('style'));
		if(r.indexOf('deg') == -1){
			$obj.css({'-webkit-transform':'rotate(0deg)','-moz-transform':'rotate(0deg)'});
			r = String($obj.attr('style'));
		}
		r = String(/rotate\([0-9,\-]+deg\)\B/.exec(r));
		r = r.replace('deg)','').replace('rotate(','');
		mod_modify.rotate = parseInt(r);
		mod_modify.left = l;
		mod_modify.top = t;
		$('#proto1 dd').text(a);
		$('#proto10 dd').text(b);
		$('#proto4 dd').text(_l+'px');
		$('#proto5 dd').text(_t+'px');
		$('#proto6 dd').text(l+'px');
		$('#proto7 dd').text(t+'px');
		$('#proto11 dd').text(r+'°');
	},
	
	boneList:function(obj,sel){
		var list = '<option value="">Select a node</option>';
		var val = '';
		obj.find('div').each(function() {
            if(!$(this).hasClass('link')&&$(this).attr('class').indexOf('bone')>-1){
				val = $(this).attr('class').split(' ')[0];
				list += '<option value="'+val+'">'+val+'</option>';
			}
        });
		list = '<select>'+list+'</select>';
		$('#bone_list dd').html(list);
	},
	
	texList:function(c,sel){
		var list = '<option value="">Select a node</option>';
		var val = '';
		$('.'+c).find('div').each(function() {
            if(!$(this).hasClass('link')&&$(this).attr('class').indexOf('bone') == -1){
				val = $(this).attr('class').split(' ')[0];
				list += '<option value="'+val+'">'+val+'</option>';
			}
        });
		list = '<select>'+list+'</select>';
		$('#tex_list dd').html(list);
	},
	mousePos:function(){
		$(document).bind('mousemove',function(e){
			mod_modify.pageX = e.pageX;
			mod_modify.pageY = e.pageY;
			$('#proto2 dd').text(mod_modify.pageX);
			$('#proto3 dd').text(mod_modify.pageY);
		});
	},
	modMove:function(e){	
		//获取鼠标坐标	
		mod_modify.pageX = e.pageX;
		mod_modify.pageY = e.pageY;
		$('#proto2 dd').text(mod_modify.pageX);
		$('#proto3 dd').text(mod_modify.pageY);
		//拖拽过程
		if(mod_modify._mouseLeft == 1){
			e.preventDefault();
			e.stopPropagation();
			if(mod_modify.$current.closest('.base').hasClass('rev')){
				mod_modify.$current.css({
					'left':-parseInt(mod_modify.pageX - mod_modify.pageX0) - parseInt(mod_modify.left),
					'top':parseInt(mod_modify.pageY - mod_modify.pageY0) + parseInt(mod_modify.top),
					'right':'auto'
				});
			}else{
				mod_modify.$current.css({
					'left':parseInt(mod_modify.pageX - mod_modify.pageX0) + parseInt(mod_modify.left),
					'top':parseInt(mod_modify.pageY - mod_modify.pageY0) + parseInt(mod_modify.top),
					'right':'auto'
				});
			}
			$('#proto4 dd').text(mod_modify.$current.offset().left+'px');
			$('#proto5 dd').text(mod_modify.$current.offset().top+'px');
			$('#proto6 dd').text(mod_modify.$current.position().left+'px');
			$('#proto7 dd').text(mod_modify.$current.position().top+'px');
		}
	},
	
	uiMove:function(e){	
		//获取鼠标坐标	
		mod_modify.pageX = e.pageX;
		mod_modify.pageY = e.pageY;
		$('#proto2 dd').text(mod_modify.pageX);
		$('#proto3 dd').text(mod_modify.pageY);
		//拖拽过程
		if(mod_modify._mouseLeft == 1){
			e.preventDefault();
			e.stopPropagation();
			mod_modify.$move.css({
				'left':parseInt(mod_modify.pageX - mod_modify.moveX0) + parseInt(mod_modify.moveLeft),
				'top':parseInt(mod_modify.pageY - mod_modify.moveY0) + parseInt(mod_modify.moveTop),
				'right':'auto'
			});
		}
	},
	
	canMove:function(obj,target){
		var o = obj;
		var t;
		target ? t = target : t = o;
		o.bind({
			mousedown:function(e){
				e.preventDefault();
				e.stopPropagation();
				mod_modify.mouseLeft(1);
				t.appendTo('body');
				mod_modify.$move = t;
				//mod_modify.$current.css('z-index','102');
				mod_modify.moveX0 = e.pageX;
				mod_modify.moveY0 = e.pageY;
				mod_modify.moveLeft = t.position().left;
				mod_modify.moveTop = t.position().top;
				$(document).bind('mousemove',function(e){	
					mod_modify.uiMove(e);
				});
			}
		});
	}
}

mod_modify.eye.time = 1000;

$(function(){
	mod_modify.init();
	mod_modify.see('mod_see');
	mod_modify.see('base_see');
	mod_modify.see('basetxt_see dd span');
	mod_modify.see('rev dd span');
	$('.box-handle').each(function() {
        mod_modify.canMove($(this),$(this).parent());
    });
	$('.unit').mousedown().mouseup();
	
})