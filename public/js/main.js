/* --- Begin Document Ready --- */
$(document).ready(function(){
    booting();

    var context = {
        socketio: io.connect()
    };
    addMainPageTransition(context, $('.content'));
});
/* --- End Document Ready --- */

/* --- Begin Window resize --- */
$(window).resize(function() {
	runRes(small, medium, false);
});
/* --- End Window resize --- */


/* ----------------------------------------------- */
/* --- Begin Functions --------------------------- */
/* ----------------------------------------------- */

/* --- Alert message show function --- */
function showMSG(txt,cls){
	var box = $('#alertMSG');
	box.html(txt);
	box.removeClass();
	box.addClass(cls);
	box.css('margin-left', -(box.innerWidth()/2) );
	box.css('top', 0);
	box.css('margin-top', -box.innerHeight());
	box.show();
	box.stop().animate({
		top: ($(window).innerHeight()/2 - box.innerHeight()/2)
	}, 1000);
}

/* --- Alert message close function --- */
function showMSG_close(){
	$('#alertMSG').hide();
}

/* --- Content change resize function working on $(window).resize listener --- */
function runRes(order1,order2, initial, div){
	var wWidth = $(window).innerWidth(),
		wHeight = $(window).innerHeight(),
		speed = 500;
	if(wWidth < 400){
		$.cnt2=0;
		$.cnt3=0;
		if($.cnt1==0){
			div.animate({ width: '300px', height: '1100px' },speed,function(){
				$('.container').animate({
					'margin-top': '40px'
				});
			});
			div.find('.polygon.p'+order1[0]).animate({ left: 0, top: 0 }, speed);
			div.find('.polygon.p'+order1[1]).animate({ left: '100px', top: '150px' }, speed);
			div.find('.polygon.p'+order1[2]).animate({ left: 0, top: '300px' }, speed);
			div.find('.polygon.p'+order1[3]).animate({ left: '100px', top: '450px' }, speed);
			div.find('.polygon.p'+order1[4]).animate({ left: 0, top: '600px' }, speed);
			div.find('.polygon.p'+order1[5]).animate({ left: '100px', top: '750px' }, speed);
			div.find('.polygon.p'+order1[6]).animate({ left: 0, top: '900px' }, speed);
			info_res(1);
		}
		$.cnt1++;
	} else if(wWidth < 600){
		$.cnt1=0;
		$.cnt3=0;
		if($.cnt2==0){
			div.animate({ width: '400px', height: '800px' },speed, function(){
				$('.container').animate({
					'margin-top': '40px'
				});
			});
			div.find('.polygon.p'+order2[0]).animate({ left: '100px', top: 0 }, speed);
			div.find('.polygon.p'+order2[1]).animate({ left: 0, top: '150px' }, speed);
			div.find('.polygon.p'+order2[2]).animate({ left: '200px', top: '150px' }, speed);
			div.find('.polygon.p'+order2[3]).animate({ left: '100px', top: '300px' }, speed);
			div.find('.polygon.p'+order2[4]).animate({ left: 0, top: '450px' }, speed);
			div.find('.polygon.p'+order2[5]).animate({ left: '200px', top: '450px' }, speed);
			div.find('.polygon.p'+order2[6]).animate({ left: '100px', top: '600px' }, speed);
			info_res(2);
		}
		$.cnt2++;
	} else {
		$.cnt1=0;
		$.cnt2=0;
		if($.cnt3==0){
            var timeunit = 50;
            var spaceunit = 200;
            
            var polygons = div.find('.polygons .polygon');
            var maxCircle = Math.ceil( (polygons.length-1) / 6);
            var width = spaceunit + spaceunit * maxCircle * 2;
            polygons.each(function(index, element){
                var polygon = $(this);

                if(index == 0){
                    polygon.animate({ left: (spaceunit*(maxCircle))+'px', top: spaceunit*0.75+'px' }, speed);
                    return
                }

                var pos = (index-1) % 6;
                var circle = Math.floor((index-1) / 6);
                var left = 0;
                var top = 0;

                switch(pos){
                    case 0:
                    case 1:
                        left = spaceunit/2;
                        break;
                    case 2:
                    case 3:
                        left = spaceunit;
                        top = spaceunit*0.75;
                        break;
                    case 4:
                    case 5:
                        left = spaceunit/2;
                        top = spaceunit*1.5;
                        break;
                }

                if(pos % 2 == 1){
                    left = left + circle * spaceunit * 1.2;
                }else{
                    left = (left*-1) - circle * spaceunit * 1.2;
                }
                left += spaceunit * (maxCircle);
                setTimeout(function(){
                    polygon.animate({ left: left+'px', top: top+'px' }, speed);
                }, timeunit * index);
            });
            div.find('.polygons').css('height', spaceunit * 2.5 + 'px');
            div.find('.polygons').css('width', (width) +'px');
            info_res(3);
		}
		$.cnt3++;
	}
}

/* --- Forms[compose_message, subscribe] responsive function working in runRes() function --- */
function info_res(mode){
	switch(mode){
		case 1: {
			$('.contact-info .col').css('width','100%');
			$('form.compose-message input').css('width','180px');
			$('form.compose-message textarea').css('max-width','180px');
			$('form.compose-message textarea').css('min-width','180px');
			$('form.compose-message textarea').css('width','180px');
			$('form.subscribe input[type=text]').css('width','140px');
		} break;
		case 2: {
			$('.contact-info .col').css('width','100%');
			$('form.compose-message input').css('width','280px');
			$('form.compose-message textarea').css('max-width','280px');
			$('form.compose-message textarea').css('min-width','280px');
			$('form.compose-message textarea').css('width','280px');
			$('form.subscribe input[type=text]').css('width','200px');
		} break;
		case 3: {
			$('.contact-info .col').css('width','33.33%');
			$('form.compose-message input').css('width','220px');
			$('form.compose-message textarea').css('max-width','480px');
			$('form.compose-message textarea').css('min-width','480px');
			$('form.compose-message textarea').css('width','480px');
			$('form.subscribe input[type=text]').css('width','250px');
		} break;
	}
}

/* --- Get current polygon's position function --- */
function getPos(str){
	var pos;
	switch(str){
		case 'polygon p1': { pos=1; } break;
		case 'polygon p2': { pos=2; } break;
		case 'polygon p3': { pos=3; } break;
		case 'polygon p4': { pos=4; } break;
		case 'polygon p5': { pos=5; } break;
		case 'polygon p6': { pos=6; } break;
		case 'polygon p7': { pos=7; } break;
		default: pos=1;
	}
	return pos;
}

/* --- Get current polygon's z-Index fix function --- */
function zIndexFix(cname, cnum){
	$(cname+cnum).css('zIndex','999');
	for(var i=1; i<8; i++){
		if(cnum!=i)
			$(cname+i).css('zIndex','5');
	}
}

/* --- Open popup board function --- */
function openBoard(elem, eL, eT, eW, eH, eS){
	elem.animate({
		left: eL,
		top: eT,
		width: eW,
		height: eH
	}, eS, 
	function(){ 
		elem.find('*').fadeIn(eS);
		elem.find('form.compose-message').hide();
		if($(elem).find('#googleMap').size()>0){
			loadMaps();
		}
		$("html, body").animate({ scrollTop: 0 });
	});

}

/* --- First loading function working on document.ready --- */
function booting(){
	/* --- Begin superslides --- */
	$('#slides').superslides({
		animation: 'fade',
		play: 8000
	});
	/* --- End superslides --- */
}

/* --------------------------------------------- */
/* --- End Functions --------------------------- */
/* --------------------------------------------- */

/* --- Begin Global Vars --- */

var small = [ 4, 2, 3, 1, 5, 6, 7],
	medium = [ 4, 3, 1, 6, 2, 5, 7],
	map = null;

/* --- End Global Vars --- */


/* --- RGB Color to HEX --- */
function rgb2hex(rgb){
 	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return (rgb && rgb.length === 4) ? 
		("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}
