function getQueryVariable(variable)
{
	var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
    	var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
function findItemFromID(id) {
	var val = id.toString();
	var node = $('.items-container').find("[data-sid='" + val + "']");
	var nodes = $('.afterbirthitems-container').find("[data-sid='" + val + "']");
	if (node.html() === undefined && nodes.html() === undefined) {
		return "<p>Invalid item ID!</p>";
	}
	if (val == '278') {
		return node.html() + '<a id="DankBumLink" href="dark-bum"></a>';
	} else if (val == '331') {
		return node.html() + '<a id="IlluminatiLink" href="109"></a>';
	} else if (val == '429') {
		return node.html() + '<a id="ButtLink" href="ultra-butt"></a>';
	} else {
		if (node.html() === undefined) {
			return nodes.html();
		} else {
			return node.html();
		}

	}
}
function closepp() {
	var k = document.getElementById("popup");
	document.getElementById("darkback").style.display = 'none';
	k.style.display = 'none';
	k.innerHTML = "";
}

function initpp() {
	var chk = getQueryVariable("id");
	if (chk !== false) {
		var markup = findItemFromID(chk);
		markup += '<a class="pp-close" onclick="closepp()">x</a>';
		var node = document.getElementById("popup");
		node.innerHTML = markup;

		node.style.display = 'block';
		document.getElementById("darkback").style.display = 'block';
	}
}

// returns link for search query on http://bindingofisaacrebirth.gamepedia.com/
function gamepediaLink(query){
    var queryFormatted = query.replace(/\s/g, '+');
    return '<a href="http://bindingofisaacrebirth.gamepedia.com/index.php?search=' + queryFormatted + '" target="_blank">' + query + '</a>';
}


initpp();

$(document).ready(function(e) {
	// disable caching of all ajax responses
	$.ajaxSetup ({
    	cache: false
	});
	// filter/search input box
	jQuery.expr[':'].Contains = function(a,i,m){
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
  	};
	function filterList(list) {
		var form = $(".search-form");
			input = $(".search-input");

		$(form).on('submit', function(event){
			event.preventDefault();
		});

		$(input).change(function() {
			var filter = $(this).val();
			if (filter) {
				$matches = $(list).find('a:Contains(' + filter + ')').parent();
                $('li', list).not($matches).hide();
				$matches.show();
				$matches.removeClass('fade');
			} else {
				$(list).find("li").show();
				$(list).find("li").removeClass('fade');
			}
			return false;
		})
		.keyup( function () {
			$(this).change();
		});
  	}
	$(function () {
    	filterList($(".main"));
  	});

	// input 'x' to clear text
	function tog(v){return v?'addClass':'removeClass';}

	$(document).on('input', '.search-input', function(){
		$(this)[tog(this.value)]('x');
	}).on('mousemove', '.x', function( e ){
		$(this)[tog(this.offsetWidth-30 < e.clientX-this.getBoundingClientRect().left)]('onX');
	}).on('click', '.onX', function(){
		$(this).removeClass('x onX').val('');
		$(".main").find("li").fadeIn('fast');
		$(".main").find("li").removeClass('fade');
	});

	// hide/show settings menu
    $(".option-expander").click(function() {
        $(".option-container").toggle();
    });
	// toggle rebirth content
    $(".button-wrap").on("click", function() {
        $(this).toggleClass("button-active");
		$('input').removeClass('x onX').val('');

	});
	// options
	$("input[name=size]").click(function() {
    	if($('#small').is(':checked')) {
            setView('small');
		} else if($('#medium').is(':checked')) {
            setView('large');
		}
	});

	// item sort
	$("input[name=sort]").click(function(){
    	if($('#itemid').is(':checked')){
			$('.textbox').tsort({attr:'data-sid'});
		} else if($('#colour').is(':checked')){
			$('.textbox').tsort({attr:'data-cid'});
		}
		else if($('#alphabet').is(':checked')){
			$('.textbox').tsort({attr:'data-tid'});
		}
	});
	// icon spacing
	$("input[name=spacing]").click(function(){
    	if($('#closer').is(':checked')){
			$(".item").addClass("closer");
			$(".rebirth-item").addClass("closer");
			$(".rebirth-trinket").addClass("closer");
			$(".rebirth-card").addClass("closer");
			$(".a-item").addClass("closer");
		}
		else if($('#spaced').is(':checked')){
			$(".item").removeClass("closer");
			$(".rebirth-item").removeClass("closer");
			$(".rebirth-trinket").removeClass("closer");
			$(".rebirth-card").removeClass("closer");
			$(".a-item").removeClass("closer");
		}
	});
	$("input[name=night]").click(function()
	{
		if($('#night-on').is(':checked'))
		{
			$("html").addClass("dark");
		}
		else
		if($('#night-off').is(':checked'))
		{
			$("html").removeClass("dark");
		}
	});
	$('.nav-dd').hover(function(e){
		$(this).next('ul').addClass('shown');
	},function(e){
		$(this).next('ul').removeClass('shown');
	});
	$('.close-btn').click(function(e){
		$('.cookie-pp').slideUp();
		sC('nocookie','y',365);
	});
	$('.countdown-x').click(function(e){
		$('#countdown').slideUp();
		sC('nowarn','y',365);
	});

	$('.textbox').click(function(e){
		var markup = '';
		var val = $(this).data('sid');
		var $node = $("#popup");
        var $markup;
        var $item;
        var query;
        var link;

		if (val == 278) {
			markup = $(this).children().html() + '<a id="DankBumLink" href="dark-bum"></a>';
		} else if (val == 331) {
			markup = $(this).children().html() + '<a id="IlluminatiLink" href="109"></a>';
		} else if (val == 429) {
			markup = $(this).children().html() + '<a id="ButtLink" href="ultra-butt"></a>';
		} else {
			markup = $(this).children().html()
		}

		markup += '<a class="pp-close" onclick="closepp()">x</a>';

        $markup = $(markup);
        $item = $markup.find('.item-title');
        query = $item[0].innerHTML;
        link = gamepediaLink(query);

        $item.html(link);
		$node.html($markup);

		$('.itm-popup').slideDown();
		$('.overlay').fadeIn();
	});



	$('.spoiler-cover').click(function(e){
		$(this).fadeOut(3000);
		sC('ai-spoiler','y',365);
	});

	var tempitm = $('.items-container .textbox').size();
	$('.r-item-ttl').html('('+tempitm+')');
	var temptrink = $('.trinkets-container .textbox').size();
	$('.r-trink-ttl').html('('+temptrink+')');
	var tempcard = $('.tarot-container .textbox').size();
	$('.r-card-ttl').html('('+tempcard+')');
	var tempseed = $('.seeds table tr').size();
	$('.seeds .seed-ttl').html('('+tempseed+')');

	$('.seeds-hide-img').click(function(e){
		$('.seeds table img').toggle();
	});
	$('.pool-btn').click(function(e){
		$('.option-pools').toggle();
	});

}); // end document .ready

$(document).mouseup(function(e) {
	var container = $('.option-container');
	var mobile_nav = $('.mobile-nav-container');
	var popit = $('.itm-popup');
	if (!popit.is(e.target) && popit.has(e.target).length === 0 ) {
		popit.fadeOut();
		$('.overlay').fadeOut();
	}
}); // end document .mouseup

$('#item-check').change(function() {
    $('.items-container').toggle();
});
$('#trinket-check').change(function() {
    $('.trinkets-container').toggle();
});
$('#card-check').change(function() {
    $('.tarot-container').toggle();
});
function rndSound() {
	var sounds = [ 'sounds/1up.mp3',
				   'sounds/battery.mp3',
				   'sounds/chest.mp3',
				   'sounds/death.mp3',
				   'sounds/derp.mp3',
				   'sounds/devildeal.mp3',
				   'sounds/dime.mp3',
				   'sounds/eternal.mp3',
				   'sounds/fart.mp3',
					   'sounds/goldkey.mp3',
				   'sounds/holy.mp3',
				   'sounds/miniboss.mp3',
				   'sounds/mom.mp3',
				   'sounds/powerup.mp3',
				   'sounds/slot.mp3',
				   'sounds/stan.mp3' ];

	var images = [ 'images/elucidate.png',
                   'images/elucidate2.png',
				   'images/elucidate3.png',
				   'images/elucidate4.png',
				   'images/elucidate5.png',
				   'images/elucidate6.png',
				   'images/elucidate7.png',
				   'images/elucidate8.png',
				   'images/elucidate9.png',
				   'images/elucidate10.png', ];

	var randomSound = Math.floor(Math.random()*sounds.length);
	var randomImage = Math.floor(Math.random()*images.length);

	var audioElement = document.getElementById('footersound');
	var imageElement = document.getElementById('pg-img');

	audioElement.setAttribute('src', sounds[randomSound]);
	audioElement.play();

	imageElement.setAttribute('src', images[randomImage]);

}

// xhoskin functions

// items view
var setView = function(newView) {
    var oldView;
    var $items;

    if (newView === 'small') {
        oldView = 'large';
    } else if ( newView === 'large' ) {
        newView = small;
    } else return;

    $items = $(".item, .rebirth-item, .rebirth-trinket, .rebirth-card, .a-item");

    $items
        .removeClass(oldView)
        .addClass(newView);
}

// items sorting
var setSort = function() {
    if($('#itemid').is(':checked')){
        $('.textbox').tsort({attr:'data-sid'});
    } else if($('#colour').is(':checked')){
        $('.textbox').tsort({attr:'data-cid'});
    }
    else if($('#alphabet').is(':checked')){
        $('.textbox').tsort({attr:'data-tid'});
    }
}

// quick filters
var Filter = +function() {
    var $filter = $('.search input');
    var $tags = $('.option-pools__item');

    var result = {
        find: function(query) {
            $filter.val(query);
            $filter.trigger('keyup');
        }
    }

    // events binding
    $tags.click(function(e) {
        e.preventDefault();
        var query = $(this).data('query');
        result.find(query);
    })

    return result;
}();

var setSettings = function(settings){
    setSort();
    setView();
}

setSettings();
