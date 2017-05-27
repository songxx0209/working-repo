
var funHigt = $('.function-introduction').offset().top - 80;
var applyHigt = $('.apply-scene').offset().top - 80;
var faqHigt = $('.faq').offset().top - 80;
var subLiEle = document.getElementsByClassName('c-m-b-li');

subLiEle[0].onclick = function () {
	pageScrollHeight(funHigt);
} 
subLiEle[1].onclick = function () {
	pageScrollHeight(applyHigt);
} 
subLiEle[2].onclick = function () {
	pageScrollHeight(faqHigt);
}

function pageScrollHeight(high) {
    var scrollH = document.body.scrollTop;
    var dValue = Math.abs(parseInt(high) - parseInt(scrollH));
    if (scrollH < high && scrollH !== high){
        window.scrollBy(0,100);
        if(dValue < 100) {
            scrollH = high;
        }
        setTimeout('pageScrollHeight('+ high +')',20);
    } else if (scrollH > high && scrollH !== high) {
        window.scrollBy(0,-100);
        if(dValue < 100) {
            document.body.scrollTop = high;
        } else {
            setTimeout('pageScrollHeight('+ high +')',20);
        }
    }
}


$(function() {
	// 检测滚动条位置
	window.onscroll = function () {
        var scrollTop = document.body.scrollTop;
        if (scrollTop >= funHigt) {
            $('.cloud-head').attr('class', 'cloud-head c-fixed');
            $('.cloud-product-menu').css('display', 'block');
            $('.cloud-btn').css('display', 'block');
            $('.cloud-menu-box li:eq(0)').attr('class', 'c-m-b-li c-m-b-active').siblings().attr('class', 'c-m-b-li');
        } else {
            $('.cloud-product-menu').css('display', 'none');
            $('.cloud-btn').css('display', 'none');
            $('.cloud-head').attr('class', 'cloud-head');
            $('.cloud-menu-box li:eq(0)').attr('class', 'c-m-b-li').siblings().attr('class', 'c-m-b-li');
        }
        if (scrollTop >= applyHigt) {
        	$('.cloud-menu-box li:eq(1)').attr('class', 'c-m-b-li c-m-b-active').siblings().attr('class', 'c-m-b-li');
        } 
        if(scrollTop >= faqHigt) {
        	$('.cloud-menu-box li:eq(2)').attr('class', 'c-m-b-li c-m-b-active').siblings().attr('class', 'c-m-b-li');
        } 
    }
    
    // 应用场景 交互效果
	$('.apply-tab li').click(function() {
		var _index=$(this).index();
		if(_index === 0) {
			$(this).attr('class', 'apply-tab-li a-tab-active-0').siblings().attr('class', 'apply-tab-li');
		} else if(_index ===1||_index===2) {
			$(this).attr('class', 'apply-tab-li a-tab-active-1').siblings().attr('class', 'apply-tab-li');
		} else {
			$(this).attr('class', 'apply-tab-li a-tab-active-2').siblings().attr('class', 'apply-tab-li');
		}
		$('.apply-tab-content > div').eq(_index).css('display', 'block').siblings().css('display', 'none');
	});

	$('.cloud-menu-box li').click(function () {
		var _index=$(this).index();
		$(this).attr('class', 'c-m-b-li c-m-b-active').siblings().attr('class', 'c-m-b-li');
	});

	// 控制导航栏显示
	$(".cloud-product-menu").mouseover(function(){
		$('.cloud-nav-menu').css('display', 'block');
	})

	$(".cloud-product-menu").mouseout(function() {
		$('.cloud-nav-menu').css('display', 'none');
	})
	// 一级导航
	$(".cloud-menu-one ul li").mouseover(function(){
			var _index=$(this).index();
			setTimeout(function () {
				$(".cloud-menu-one ul li").eq(_index).attr('class', 'cloud-menu-one-active').siblings().attr('class', '');
		        $('.cloud-menu-tow > div').eq(_index).css('display','block').siblings().css('display','none');
		    }, 200);
			
		}
	)

	var subTimer = null;
	// 二级导航
	$(".cloud-menu-three ul li").mouseover(function(){
			var _index=$(this).index();
			subTimer = setTimeout(function () {
				$(".cloud-menu-three ul li").eq(_index).attr('class', 'cloud-menu-three-active').siblings().attr('class', '');
				$('.cloud-menu-four > div').eq(_index).css('display','block').siblings().css('display','none');
			}, 200);
		}
	)

	$(".cloud-menu-three ul li").mouseout(function(){
		clearTimeout(subTimer);
	})


})

