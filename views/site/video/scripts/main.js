/* --- Begin Document Ready --- */
$(document).ready(function(){
	$('body').jpreLoader({ loaderVPos: '50%' }, function(){ 
		booting();
	});
});
/* --- End Document Ready --- */


/* --- Begin Window Load --- */
$(window).load(function(){
	
	$.cnt1 = 0;
	$.cnt2 = 0;
	$.cnt3 = 0;

	/* --- Calling runRes function --- */
	runRes(small, medium);

	/* --- Social icons mouse hover event listener --- */
	$('.social-container a').mouseenter(function(){
		$(this).stop().animate({ 'background-position-y': '-21px' }, 'slow', function(){
			$(this).find('span.desc').fadeIn();
		});
	});

	/* --- Social icons mouse leave event listener --- */
	$('.social-container a').mouseleave(function(){
		$(this).stop().animate({ 'background-position-y': '0' }, 'slow');
		$(this).find('span.desc').fadeOut('slow');
	});

	/* --- Logo's mouse over event show intro --- */
	$('.logo-container img').mouseenter(function(){
		showMSG($('.intro').html(),'info');
	});

	/* --- Logo's mouse leave event --- */
	$('.logo-container img').mouseleave(function(){
		showMSG_close();
	});

	/* --- Polygon's close button event --- */
	$('a.close-b').click(function(){
		var elem = $(this).parents('.polygon');
		var board = $(elem).find('.p-board'),
			speed = 2000,
			b_w = '200px',
			b_h = '100px';

		pos = getPos($(elem).attr('class'));
		board.find('*').fadeOut();

		board.animate({
			left: 0,
			top: '50px',
			width: b_w,
			height: b_h
		},speed, function(){ board.fadeOut() });
	});

	/* --- Polygon's open board event --- */
	$('a.open-b').click(function(){
		var elem = $(this).parents('.polygon');
		var pos = 4;
		var board = $(elem).find('.p-board');
		var speed = 2000,
			b_w = $('.content').innerWidth(),
			b_h = ($('.content').innerHeight()-100);

		pos = getPos($(elem).attr('class'));
		zIndexFix('.polygon.p',pos);
		
		board.fadeIn();

		if(b_w < 400){
			switch(pos){
				case small[0]: openBoard(board, '0', '50px', b_w, b_h, speed); break;
				case small[1]: openBoard(board, '-100px', '-100px', b_w, b_h, speed); break;
				case small[2]: openBoard(board, '0', '-250px', b_w, b_h, speed); break;
				case small[3]: openBoard(board, '-100px', '-400px', b_w, b_h, speed); break;
				case small[4]: openBoard(board, '0', '-550px', b_w, b_h, speed); break;
				case small[5]: openBoard(board, '-100px', '-700px', b_w, b_h, speed); break;
				case small[6]: openBoard(board, '0', '-850px', b_w, b_h, speed); break;

			}
		} else if(b_w < 600){
			switch(pos){
				case medium[0]: openBoard(board, '-100px', '50px', b_w, b_h, speed); break;
				case medium[1]: openBoard(board, '0', '-100px', b_w, b_h, speed); break;
				case medium[2]: openBoard(board, '-200px', '-100px', b_w, b_h, speed); break;
				case medium[3]: openBoard(board, '-100px', '-250px', b_w, b_h, speed); break;
				case medium[4]: openBoard(board, '0', '-400px', b_w, b_h, speed); break;
				case medium[5]: openBoard(board, '-200px', '-400px', b_w, b_h, speed); break;
				case medium[6]: openBoard(board, '-100px', '-550px', b_w, b_h, speed); break;
			}
		} else {
			switch(pos){
				case 1: openBoard(board, '-100px', '50px', b_w, b_h, speed); break;
				case 2: openBoard(board, '-300px', '50px', b_w, b_h, speed); break;
				case 3:	openBoard(board, '0', '-100px', b_w, b_h, speed); break;
				case 4: openBoard(board, '-200px', '-100px', b_w, b_h, speed); break;
				case 5: openBoard(board, '-400px', '-100px', b_w, b_h, speed); break;
				case 6: openBoard(board, '-100px', '-250px', b_w, b_h, speed); break;
				case 7: openBoard(board, '-300px', '-250px', b_w, b_h, speed); break;
			}
		}
	});
	
	/* --- Subscribe form's a link button click event --- */
	$('a.btn.subscribe').click(function(){
		var email = $('input[name=email]').val();
		if( IsEmail(email) ){
			ajax('php/subscribe.php?email='+email);
			$('input[name=email]').val('');
		} else {
			showMSG('<i class="fa fa-angle-right"></i>Enter your email address','error');
		}
	});

	/* --- Compose message form's a link button click event --- */
	$('a.btn.submit').click(function(){
		var username = $('input[name=username]').val(),
			useremail = $('input[name=useremail]').val(),
			usermessage = $('textarea[name=usermessage]').val(),
			errors = 3,
			msg = '';
		
		if( username != '' && username.length > 2 ){ errors-=1; } else { msg += '<li><i class="fa fa-angle-right"></i>Name is too short or empty!</li>'; }
		if( IsEmail(useremail) ){ errors-=1; } else { msg += '<li><i class="fa fa-angle-right"></i>Invalid email address.</li>'; }
		if( usermessage != '' && usermessage.length > 4 ){ errors-=1; } else { msg += '<li><i class="fa fa-angle-right"></i>Message is too short or empty!</li>'; }
		if( errors > 0 ) { showMSG('<ul>'+msg+'</ul>', 'error'); } 
		else {
			ajax('php/contact.php?name='+username+'&email='+useremail+'&message='+usermessage);
		}
	});

	/* --- Compose message show event --- */
	$('.col.compose').click(function(){
		var pp = $(this).parents('.b-content');
		pp.find('*').hide();
		var ff = pp.find('form.compose-message');
		ff.fadeIn();
		ff.find('*').fadeIn();
	});

	/* --- Compose message hide event --- */
	$('a.close-message').click(function(){
		var pp = $(this).parents('.b-content');
		pp.find('*').fadeIn();
		$('form.compose-message').hide();
	});

	/* --- Alert message content click event --- */
	$('#alertMSG').click(function(){
		showMSG_close();
	});

	/* --- Begin Demo Config Listener --- */
	$('span.config-polygon').click(function(){
		$('span.config-polygon').each(function(){
			$(this).html('');
		});
		var rgb = $(this).css('background-color'), hexColor = null;
		if(rgb.substr(0,1)=='#'){
			hexColor = rgb.slice(1)
		} else {
			hexColor = rgb2hex(rgb);
		}
		$(this).append('<i class="fa fa-check"></i>');
		$('.polygon').css('background', 'url(img/_'+hexColor+'.png) no-repeat 0 0');
	});

	$('span.show-config').mouseenter(function(){
		$(this).children().addClass('fa-spin');
	});
	$('span.show-config').mouseleave(function(){
		$(this).children().removeClass('fa-spin');
	});
	$('span.show-config').click(function(){
		var xx = parseInt($('#demo').css('left'));
		if(xx==0) xx = -180;
		else xx = 0;
		$('#demo').animate({
			left: xx
		});
	});
	/* --- End Demo Config Listener --- */

});
/* --- End Window Load --- */


/* --- Begin Window resize --- */
$(window).resize(function() {
	runRes(small, medium);
});
/* --- End Window resize --- */


/* ----------------------------------------------- */
/* --- Begin Functions --------------------------- */
/* ----------------------------------------------- */

/* --- Ajax function --- */
function ajax(page){
	var xmlhttp;
	if (window.XMLHttpRequest){	xmlhttp=new XMLHttpRequest() }
	else { xmlhttp=new ActiveXObject("Microsoft.XMLHTTP") }
	
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			showMSG('<i class="fa fa-check-square-o"></i>'+xmlhttp.responseText,'success');
		}	
	};
	xmlhttp.open("POST", page, true);
	xmlhttp.send();
}

/* --- Email validation function --- */
function IsEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

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

/* --- Polygon's popup board close function --- */
function pub_close(){
	$('.p-board').each(function(){
		if($(this).css('display')=='block'){
			$(this).hide();
			$(this).find('*').hide();
			$(this).css('left',0);
			$(this).css('top','50px');
			$(this).css('width','200px');
			$(this).css('height','100px');
		}
	});	
}

/* --- Content change resize function working on $(window).resize listener --- */
function runRes(order1,order2){
	var wWidth = $(window).innerWidth(),
		wHeight = $(window).innerHeight(),
		speed = 1500;

	if(wWidth < 400){
		$.cnt2=0;
		$.cnt3=0;
		if($.cnt1==0){
			pub_close();
			$('.content').animate({ width: '300px', height: '1100px' },speed,function(){
				$('.container').animate({
					'margin-top': '40px'
				});
			});
			$('.polygon.p'+order1[0]).animate({ left: 0, top: 0 }, speed);
			$('.polygon.p'+order1[1]).animate({ left: '100px', top: '150px' }, speed);
			$('.polygon.p'+order1[2]).animate({ left: 0, top: '300px' }, speed);
			$('.polygon.p'+order1[3]).animate({ left: '100px', top: '450px' }, speed);
			$('.polygon.p'+order1[4]).animate({ left: 0, top: '600px' }, speed);
			$('.polygon.p'+order1[5]).animate({ left: '100px', top: '750px' }, speed);
			$('.polygon.p'+order1[6]).animate({ left: 0, top: '900px' }, speed);
			info_res(1);
		}
		$.cnt1++;
	} else if(wWidth < 600){
		$.cnt1=0;
		$.cnt3=0;
		if($.cnt2==0){
			pub_close();
			$('.content').animate({ width: '400px', height: '800px' },speed, function(){
				$('.container').animate({
					'margin-top': '40px'
				});
			});
			$('.polygon.p'+order2[0]).animate({ left: '100px', top: 0 }, speed);
			$('.polygon.p'+order2[1]).animate({ left: 0, top: '150px' }, speed);
			$('.polygon.p'+order2[2]).animate({ left: '200px', top: '150px' }, speed);
			$('.polygon.p'+order2[3]).animate({ left: '100px', top: '300px' }, speed);
			$('.polygon.p'+order2[4]).animate({ left: 0, top: '450px' }, speed);
			$('.polygon.p'+order2[5]).animate({ left: '200px', top: '450px' }, speed);
			$('.polygon.p'+order2[6]).animate({ left: '100px', top: '600px' }, speed);
			info_res(2);
		}
		$.cnt2++;
	} else {
		$.cnt1=0;
		$.cnt2=0;
		if($.cnt3==0){
			pub_close();
			$('.content').animate({ width: '600px', height: '500px' },speed,function(){
				var mTop = (wHeight - $('.container').innerHeight())/2;
				if(mTop<0) mTop = 40;
				$('#contact').css('top',mTop);
				$('.container').animate({
					'margin-top': mTop
				});
			});
			$('.polygon.p1').animate({ left: '100px', top: 0 }, speed);
			$('.polygon.p2').animate({ left: '300px', top: 0 }, speed);
			$('.polygon.p3').animate({ left: 0, top: '150px' }, speed);
			$('.polygon.p4').animate({ left: '200px', top: '150px' }, speed);
			$('.polygon.p5').animate({ left: '400px', top: '150px' }, speed);
			$('.polygon.p6').animate({ left: '100px', top: '300px' }, speed);
			$('.polygon.p7').animate({ left: '300px', top: '300px' }, speed);
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

/* --- Loading google maps function --- */
function loadMaps(){
	var la = 47.922679,
		lo = 106.904505,
		point = new google.maps.LatLng(la, lo);
	map = new google.maps.Map(document.getElementById("googleMap"), {
		center: new google.maps.LatLng(la+0.006, lo),
		zoom: 14,
		mapTypeId: 'roadmap',
		mapTypeControl: false,
		navigationControl: false,
		streetViewControl: false,
		zoomControl: false,
		panControl: false,
		scrollwheel: false
	});

	var marker = new google.maps.Marker({
      	position: point,
      	map: map
  	});
}

/* --- First loading function working on document.ready --- */
function booting(){
	/* --- Begin countdown --- */
	var austDay;
	var _year = 2015, _month = 1, _day = 1, _hour = 0, _minute = 0;
	austDay = new Date(_year, _month-1, _day, _hour, _minute);

	$('.polygon.p3').countdown({ until: austDay, layout: '<div class="p-content"><div class="counter-content"><span class="number">{dn}</span><span class="letter">{dl}</span></div></div>' });
	$('.polygon.p1').countdown({ until: austDay, layout: '<div class="p-content"><div class="counter-content"><span class="number">{hn}</span><span class="letter">{hl}</span></div></div>' });
	$('.polygon.p2').countdown({ until: austDay, layout: '<div class="p-content"><div class="counter-content"><span class="number">{mn}</span><span class="letter">{ml}</span></div></div>' });
	$('.polygon.p5').countdown({ until: austDay, layout: '<div class="p-content"><div class="counter-content"><span class="number">{sn}</span><span class="letter">{sl}</span></div></div>' });
	/* --- End countdown --- */
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