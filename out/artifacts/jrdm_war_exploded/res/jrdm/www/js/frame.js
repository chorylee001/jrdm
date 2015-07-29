
$(".sidebar-nav").find("a").click(function(evt){
	var url = $(this).attr('href');
	if (!url) return;
	if("javascript:void(0);" == url) return;
	$(".sidebar-nav").find(".active").removeClass("active");;
	$(evt.currentTarget).addClass("active");
	window.loadContentPage(url,"page-wrapper");
	evt.preventDefault();
});

(function() {
	window.loadContentPage = function(url,obj){
		xmlHttpRequest = $.ajax({
			url:url,
			type:"POST",
			dataType:"html",
			timeout:5000,
			success:function(data, textStatus){
				$("#"+obj).html(data);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$("#"+obj).html(textStatus.statusText+":"+XMLHttpRequest.responseText);
			},
			complete:function(XMLHttpRequest, textStatus){}

		});
	}
	// Splitter
	$('.frame-body .frame-split').mousedown(function (evt) {

		var $me = $(this),
			$nav = $('.frame-body .frame-nav'),
			$splitter = $('.frame-body .frame-split'),
			$cntBody = $('.frame-body .frame-content-body');

		var dragData = {
			x: evt.clientX,
			left:$splitter.offset().left - $splitter.parent().offset().left
		}; // 记录鼠标的起始点坐标

		function disableSelection() { return false; }
		function mouseMove(evt) {

			var minNavW = parseFloat($nav.css('min-width')),
				minCntBodyW = parseFloat($cntBody.css('min-width'));

			if (minNavW == 0)
				minNavW = 200;
			if (minCntBodyW == 0)
				minCntBodyW = 200;

			var nLeft = dragData.left + evt.clientX - dragData.x;

			if (nLeft > $me.parent().width() - minCntBodyW)
				nLeft = $me.parent().width() - minCntBodyW;

			if (nLeft < minNavW)
				nLeft = minNavW;

			$me.css({ 'left':nLeft });
			$nav.css({ 'width':nLeft });
			$cntBody.css({ 'left':nLeft + $splitter.width(), 'width':'auto' });
		}
		function mouseUp(evt) {

			$(window).unbind('mousemove', mouseMove)
				.unbind('mouseup', mouseUp);
			$(document.body).unbind('selectstart', disableSelection);
		}

		$(document.body).bind('selectstart', {}, disableSelection);
		$(window).bind('mousemove', {}, mouseMove)
			.bind('mouseup', {}, mouseUp);
	});

	// Join showMessageDialog.
	window.showMessageDialog = function (title, content, buttons, fnClosed) {

		if (!buttons)
			buttons = ColoredMessageBox.Buttons.OK;

		showMessageBox({
			title: title,
			content: content,
			buttons: buttons,
			theme: ColoredMessageBox.Themes.Random(),
			isDlgBox: true, // Indicate this is a dialog box, that means disable other operations
			//defZIndex: 10000000, // default is 10000000
			dragZIndex: 10000, // The z-index in draging, default is 10000000.
			glared: false,
			closed: function (result) {

				if (typeof (fnClosed) === 'function')
					fnClosed(result);
			}
		});
	}

	var xmlHttpRequest = null;
	var $contentBody = $('.frame-frame .frame-body .frame-content-body');
	window.updateWorkPanel = function (htmlCode) {
		$contentBody.html(htmlCode).ajaxifyHandle().ajaxifyFormSubmit();
	};

	window.ajaxLoad = function (url, options) {
		options = options || {};
		xmlHttpRequest = $.ajax({
			url: url,
			data: options.data,
			cache: false,
			complete: function (jqXHR, textStatus) {
				if (jqXHR != xmlHttpRequest)
					return;
				setTimeout(function () {
				}, 1000);
			},
			error: function(jqXHR, error, textStatus) {
				setTimeout(function () {
				}, 1000);

				if (typeof (options.error) === 'function')
					options.error(jqXHR, error, textStatus);
			},
			success: function (result, textStatus, jqXHR) {
				if (jqXHR != xmlHttpRequest)
					return;

				if (typeof (options.success) === 'function')
					options.success(result, textStatus, jqXHR);
			}
		});
	};
	window.ajaxLoadPageContent = function (url, options) {
		options = options || {};

		ajaxLoad(url, {
			data: options.data,
			error: function(jqXHR, error, textStatus) {
				updateWorkPanel(jqXHR.responseText);
			},
			success: function(result, textStatus, jqXHR) {
				updateWorkPanel(result);
			}
		});
	};

	jQuery.fn.extend({
		ajaxifyHandle: function() {
			this.find('a.ajaxify').click(function(evt) {
				var url = $(this).attr('href');
				if (!url) return;

				window.ajaxLoadPageContent(url);
				evt.preventDefault();
			});
			return this;
		},
		ajaxifyFormSubmit: function() {
			this.find('form.ajaxify').submit(function(evt) {

				var url = $(this).attr('data-form-url');
				var data = $(this).serialize();

				if (!url) return false;

				window.ajaxLoadPageContent(url, { data: data });
				return false;
			});
			return this;
		}
	});
}) ();