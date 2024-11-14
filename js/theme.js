function message(title, message) {
	$("#messageModal .messageTitle").html(title);
	$("#messageModal .messageBody").html(message);
	$('#messageModal').modal('show');
}
function toastMessage(type, message) {
	let background = "";
	if(type == 'success') {
		background = 'linear-gradient(to right, #00b09b, #96c93d)';
	}else if (type == 'error') {
		background = 'linear-gradient(to right, #ff5f6d, #ffc371)';
	}

	let options = {
	    text: message,
	    duration: 5000,
	    close: true,
	    style: {
	        background: background,
	    },
	    offset: {x:0, y: 70},
	};
	Toastify(options).showToast();
}
function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}
function setFormErrors(formElement, errors) {
	$.each(errors, function( key, value ) {
		let helpBlockElement = formElement.find('#' + key).parent().addClass('has-error').find('.help-block');
		if(helpBlockElement.length === 0) {
			helpBlockElement = formElement.find('#' + key).parent().parent().addClass('has-error').find('.help-block');
		}
		helpBlockElement.html(value[0]);
	});
}

function unsetFormErrors(formElement) {
	formElement.find('.has-error').removeClass('has-error');
	formElement.find('.help-block').html('');
	formElement.find('.form-message').hide();
}

function isValidUrl(urlString) {
	var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	'((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	'(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	'(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	return !!urlPattern.test(urlString);
}

function scrollToElement(elementString, focus=false) {
	var element = document.querySelector(elementString);
    element.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
    if(focus) element.focus({preventScroll: true});
}

function copyToClipboard(value){
    var inp=document.createElement("input");
    inp.style="position:absolute; left:-9999px; top:-9999px";
    inp.value=value;document.body.appendChild(inp);inp.select();
    document.execCommand("copy");
    document.body.removeChild(inp);
}

async function detectAdBlock() {
	let adBlockEnabled = false
	const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4639759901640537'
	try {
		await fetch(new Request(googleAdUrl)).catch(_ => adBlockEnabled = true)
	} catch (e) {
		adBlockEnabled = true
	} finally {
		if(adBlockEnabled) $("#detectAdblockModal").modal('show');
	}
}

function dateDiff(date1, date2) {
	const diffMilliseconds = Math.abs(date2 - date1);
	
	const seconds = Math.floor(diffMilliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	return {
		days: formatNumberWithLeadingZero(days),
		hours: formatNumberWithLeadingZero(hours % 24),
		minutes: formatNumberWithLeadingZero(minutes % 60),
		seconds: formatNumberWithLeadingZero(seconds % 60),
	};
}

function formatNumberWithLeadingZero(number) {
	return number < 10 ? '0' + number : number;
}

$(document).ready(function(){
	const windowHeight = () => {
	    const doc = document.documentElement
	    doc.style.setProperty('--window-height', `${window.innerHeight}px`)
	}
	window.addEventListener('resize', windowHeight);
	windowHeight();
	new VenoBox({
	    selector: '.media-views',
	    numeration: true,
	    infinigall: true,
	    share: false,
	    spinner: 'circle'
	});
	$("input[type=text].not-allow-zoom, textarea.not-allow-zoom").on({ 'touchstart' : function() {
		zoomDisable();
	}});
	$("input[type=text].not-allow-zoom, textarea.not-allow-zoom").on({ 'touchend' : function() {
		setTimeout(zoomEnable, 500);
	}});
	
	function zoomDisable(){
		$('head meta[name=viewport]').remove();
		$('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />');
	}
	function zoomEnable(){
		$('head meta[name=viewport]').remove();
		$('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=1" />');
	}
	
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl,{trigger:'hover'})
    });
    
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
	  return new bootstrap.Popover(popoverTriggerEl)
	});
	
	var toastElList = [].slice.call(document.querySelectorAll('.toast'))
	var toastList = toastElList.map(function (toastEl) {
		return new bootstrap.Toast(toastEl)
	});

	lazyload();
    $('.topics-slider-container').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		autoplay: true,
		autoplaySpeed: 5000,
		responsive: [
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 350,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
	}).on('setPosition', function(event, slick, direction){
	  $('.topics-slider-container').removeClass('invisible');
	  $('.topics-slider-container').css('height', 'auto');
	});
	
	$('.article-slider-container').slick({
		slidesToShow: 5,
		slidesToScroll: 5,
		autoplay: true,
		autoplaySpeed: 5000,
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				}
			},
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 450,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
	}).on('setPosition', function(event, slick, direction){
	  $('.article-slider-container').removeClass('invisible');
	  $('.article-slider-container').css('height', 'auto');
	  if($(this).width() > 450) {
		fixHeightForArticleSlider();	
	  }
	});
	
	var fixHeightForArticleSlider = function() {
		var maxHeight = 0;
	    $('.article-slider-container .slick-slide  h4').each(function(){
	       if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
	    });
	    $('.article-slider-container .slick-slide  h4').height(maxHeight);
	}

	$(document).on("change", ".date-custom input[type='date']", function() {
		this.setAttribute("data-date",moment(this.value, "YYYY-MM-DD").format( this.getAttribute("data-date-format")));
	}).trigger("change");
	if(document.getElementById("typed1")){
		var typed1 = new Typed('#typed1', $('#typed1').data('typed'));	
	}
	$('.form-select2').select2();
	var modalStillShow = false;
	var offcanvasStillShow = false;
	$(document).on('show.bs.modal', '.modal', function(e){
		modalStillShow = true;
		$('.offcanvas').offcanvas('hide');
		var scrollbarSize = window.innerWidth - $('html')[0].clientWidth;
		if(scrollbarSize){
			$('html').css('overflow', 'hidden');
			$('nav,html').css('padding-right', scrollbarSize + 'px');	
		}
	});
	$(document).on('hidden.bs.modal', '.modal', function(e){
		let numberModalShowing = $('.modal.show').length;
		if(!offcanvasStillShow && numberModalShowing <=0){
			$('html').css('overflow', 'auto');
			$('nav,html').css('padding-right', '0');
		}
		if(numberModalShowing <=0) {
			modalStillShow = false;
		}
	});
	$(document).on('show.bs.offcanvas', '.offcanvas', function(e){
		offcanvasStillShow = true;
		$('.modal').modal('hide');
		var scrollbarSize = window.innerWidth - $('html')[0].clientWidth;
		if(scrollbarSize){
			$('html').css('overflow', 'hidden');
			$('nav,html').css('padding-right', scrollbarSize + 'px');	
		}
	});
	$(document).on('hidden.bs.offcanvas', '.offcanvas', function(e){
		if(!modalStillShow){
			$('html').css('overflow', 'auto');
			$('nav,html').css('padding-right', '0');	
		}
		offcanvasStillShow = false;
	});
	
	$(document).on('click', '.btn-show-timeline-modal', function(){
		$('#biiTimelineModal').modal('show');
	});

	$(document).on('change', '.form-post-filter select', function(event) {
		$(this).parents('form').submit();
	});
	
	$(document).on('click', '.btn-delete-post', function(event) {
		var _this = $(this);
		$.cxDialog({
			title: biicore.message.confirmDeletePost,
			background: '#000',
			info: biicore.message.confirmDeletePostInfo,
			ok: function(){
				$.ajax({
					type: 'POST',
					url: _this.data('posturl'),
					cache: false,
					contentType: false,
					processData: false,
					success: function(res){
						if(res.error && res.redirect) {
							window.location.href = res.redirect; return false;
						}else if(res.error){
							toastMessage('error', res.message); return false;
						}
						toastMessage('success', res.message);
						if(_this.parents('.post-item').length) {
							_this.parents('.post-item').slideUp(function() {
							    $(this).remove();
							});	
						}else{
							$(".loading").show();
							setTimeout(function(){
								window.location.href = biicore.baseURL;
							}, 1500);
						}
						
					},
					error: function(err){
						toastMessage('error', biicore.commonErrorMessage); return false;
					},
					complete: function(){
						
					},
				});
			},
			okText: biicore.message.confirmText,
			no: function(){
				
			},
			noText: biicore.message.cancelText,
			baseClass: 'ios'
		});
		
	});
	
	$(document).on('click', '.btn-report-post', function(event) {
		var _this = $(this);
		$.cxDialog({
			title: biicore.message.confirmReportPost,
			background: '#000',
			info: biicore.message.confirmReportPostInfo,
			ok: function(){
				$.ajax({
					type: 'POST',
					url: _this.data('posturl'),
					cache: false,
					contentType: false,
					processData: false,
					success: function(res){
						if(res.error && res.redirect) {
							window.location.href = res.redirect; return false;
						}else if(res.error){
							toastMessage('error', res.message); return false;
						}
						toastMessage('success', res.message);
					},
					error: function(err){
						toastMessage('error', biicore.commonErrorMessage); return false;
					},
					complete: function(){
						
					},
				});
			},
			okText: biicore.message.confirmText,
			no: function(){
				
			},
			noText: biicore.message.cancelText,
			baseClass: 'ios'
		});
		
	});
	
	if($('.blog-bar .blog-list').length > 0) {
		$.ajax({
			type: 'POST',
			url: $('.blog-bar .blog-list').data('url'),
			cache: false,
			contentType: false,
			processData: false,
			success: function(res){
				$('.blog-bar .blog-list').html(res);
			}
		});	
	}
	
	if($('.love-story-bar').length > 0) {
		$.ajax({
            type: "GET",
            url: $('.love-story-bar').data('url'),
            success: function(res){
                if (!res.error && res.stories.length) {
                	let story_items = $('.love-story-bar-list .love-story-bar-item');
					res.stories.forEach((element, index) => {
						$(story_items[index]).find('img').attr('src', element.featured_image);
						$(story_items[index]).attr('href',  element.url_detail);
						$(story_items[index]).attr('data-bs-original-title',  'Chuyện tình của cặp đôi<br>' + element.your_name + ' và ' + element.lover_name);
						$(story_items[index]).find('img').attr('alt', 'Chuyện tình của cặp đôi ' + element.your_name + ' và ' + element.lover_name);
					});
				}
            },
        });
	}

	$(document).on('input','.commentContent', function(){
		$(this).css('height', 0);
		$(this).css('height', $(this).prop('scrollHeight') + 'px');
	});

	$(document).on('click', '.commentBox .btn-delete-comments', function(event) {
		var _this = $(this);
		$.cxDialog({
			title: biicore.message.confirmDeleteComment,
			background: '#000',
			info: biicore.message.confirmDeleteCommentInfo,
			ok: function(){
				var id = _this.attr('id');
				$.ajax({
					type: 'POST',
					url: _this.data('posturl'),
					cache: false,
					contentType: false,
					processData: false,
					success: function(res){
						if(res.error && res.redirect) {
							window.location.href = res.redirect; return false;
						}else if(res.error){
							toastMessage('error', res.message); return false;
						}
						toastMessage('success', res.message);
						
						if (typeof id == "undefined") {
							_this.parents('.comment-item').slideUp(function() {
						    	$(this).remove();
							});
						}else{
							_this.parents('.comment-'+id).slideUp(function() {
						    	$(this).remove();
							});
						}
						$( ".comment-count" ).text(res.commentCount);
					},
					error: function(err){
						toastMessage('error', biicore.commonErrorMessage); return false;
					},
					complete: function(){
						
					},
				});
			},
			okText: biicore.message.confirmText,
			no: function(){
				
			},
			noText: biicore.message.cancelText,
			baseClass: 'ios'
		});
		
	});

	$(document).on('keypress', '.commentBox .commentContent', function(event) {
        if(event.key === "Enter" && !event.shiftKey){
        	let _this = $(this);
        	let commentBox = $(this).parents('.commentBox');
			var commentID = commentBox.data('comment-id');
			if(commentID){
				var cardBody = _this.parents('.card-body');
				cardBody.find('.commentDefault').removeClass('d-none');
				cardBody.find('.editComment').addClass('d-none');
				cardBody.find('.showCommentContent').removeClass('w-100');
				var parentID = commentBox.data('parent-id');
			}else{
				var parentID = _this.data('parent-id');
			}
        	if(commentBox.length <= 0) {
        		toastMessage('error', biicore.commonErrorMessage); return false;
        	}
        	let objectID = commentBox.data('object-id');
        	let objectType = commentBox.data('object-type');
        	let postURL = commentBox.data('posturl');
        	
        	let commentContent = _this.val();
        	
        	if(commentContent.trim() == '') return false;
        	
        	let formData = new FormData();
			formData.append('content', commentContent);
			formData.append('object_id', objectID);
			formData.append('object_type', objectType);
			formData.append('parent_id', parentID);
			
			_this.attr('disabled','disabled');
        	$.ajax({
				type: 'POST',
				url: postURL,
				cache: false,
				contentType: false,
				processData: false,
				data : formData,
				success: function(res){
					if(!res.error){
						if(commentID){
							cardBody.find('.commentContentDefault').html(res.content);
						}else{
							if(parentID == ''){
								$(".comment").prepend(res.content);
							}else{
								$('.sub-comment-'+parentID).append(res.content);
							}
							_this.val('').trigger('input');
							$( ".comment-count" ).text(res.commentCount);	
						}
					}else if(res.error){
						if(res.redirect){
							window.location.href = res.redirect; return false;
						}else{
							toastMessage('error', res.message.replace(/\n/g, "<br />"));
						}
					}
				},
				error: function(err){
					toastMessage('error', biicore.commonErrorMessage);
				},
				complete: function(){
					_this.removeAttr('disabled');
				},
			});	
        }
	});
	
	$(document).on('click', '.commentBox .see-more', function(event) {
		$(this).parents('.comment').removeClass('comment-a-part');
		$(this).remove();
	});
	
	$(document).on('click', '.reply-comment', function(event) {
		id = $(this).data('parent-id');
		if($("#reply-comment-"+id).parents('.reply-comment').hasClass( 'd-none' )){
			$("#reply-comment-"+id).parents('.reply-comment').removeClass('d-none');
		}
		scrollToElement("#reply-comment-"+id, true);
	});

	$(document).on('click', '.btn-edit-comment', function() {
		var _this = $(this);
		let postURL = _this.data('posturl');
		let commentID = _this.data('comment-id');
		var commentContent = $(".commentContent-"+commentID).text();
		let parentID = _this.data('parent-id');
		let cardBody = _this.parents('.card-body');
		cardBody.find('.commentDefault').addClass('d-none');
		cardBody.find('.editComment').removeClass('d-none');
		let html = `<div data-parent-id="${parentID}" data-comment-id="${commentID}" class="commentBox position-relative textarea-emoji-picker d-flex" data-posturl="${postURL}">
						<textarea id="reply-comment-1" class="w-100 bg-gray-200 rounded-4 p-2 px-4 pe-6 text-dark ms-3 border-0 text-start form-control commentContent" placeholder="Viết bình luận...">${commentContent}</textarea>
						<span title="" data-bs-toggle="tooltip" class="position-absolute emoji-picker-button" style="bottom: 4px;right: 10px;color: #5f636f;cursor:pointer;" data-bs-original-title="Chèn biểu tượng">
							<i class="bi bi-emoji-smile fs-3"></i>
						</span>
						<div class="emoji-picker">
							<emoji-picker style="max-width: 100%;" class="light"></emoji-picker>
						</div>
					</div>`;
		_this.parents('.card-body').find('.showCommentContent').addClass('w-100');
		_this.parents('.card-body').find('.editContent').html(html);
		let editTextareaObject = _this.parents('.card-body').find('.editContent .commentContent');
		editTextareaObject.css('height', editTextareaObject.prop('scrollHeight') + 'px').focus();
		editTextareaObject[0].setSelectionRange(editTextareaObject.val().length, editTextareaObject.val().length);
	});

	$(document).on('click', '.cancel-update', function() {
		var _this = $(this).parents('.card-body');
		_this.find('.commentDefault').removeClass('d-none');
		_this.find('.editComment').addClass('d-none');
		_this.find('.showCommentContent').removeClass('w-100');
	});
	
	$(document).on('click', '.favourite-post', function(event) {
		let _this = $(this);
		if(_this.length <= 0) {
    		toastMessage('error', biicore.commonErrorMessage); return false;
    	}
    	let objectID = _this.data('object-id');
        let objectType = _this.data('object-type');
        if($(this).children( ".like" ).hasClass( 'd-none' )){
        	 var postURL = _this.data('posturl-dislike');
        }else{
        	 var postURL = _this.data('posturl-like');
        }
        let formData = new FormData();
		formData.append('object_id', objectID);
		formData.append('object_type', objectType);
		_this.attr('disabled','disabled');
		$.ajax({
			type: 'POST',
			url: postURL,
			cache: false,
			contentType: false,
			processData: false,
			data : formData,
			success: function(res){
				if(!res.error){
					if(_this.children( ".like" ).hasClass( 'd-none' )){
			        	_this.children( ".like" ).removeClass('d-none');
			        	_this.children( ".dislike" ).addClass('d-none');
			        }else{
			        	_this.children( ".dislike" ).removeClass('d-none');
			        	_this.children( ".like" ).addClass('d-none');
			        }
			        _this.parents( ".card-post" ).find(".like-count").text(res.likeCount);
				}else{
					toastMessage('error', res.message);
				}
			
			},
			error: function(err){
				toastMessage('error', biicore.commonErrorMessage);
			},
			complete: function(){
				_this.removeAttr('disabled');
			},
		});

	});
	
	$(document).on('click', '.favourite-commnent', function(event) {
		let _this = $(this);
		let commentBox = $(this).parents('.favourite');
		let objectID = commentBox.data('object-id');
		let parentID = commentBox.data('parent-id');
    	let objectType = commentBox.data('object-type');
    	if(_this.hasClass( 'like' )){
        	 var postURL = commentBox.data('posturl-like');
        }else{
        	 var postURL = commentBox.data('posturl-dislike');
        }
        let formData = new FormData();
		formData.append('object_id', objectID);
		formData.append('object_type', objectType);
		if(parentID !== ''){
			formData.append('object_parent_id', parentID);
		}
	
		_this.attr('disabled','disabled');
        $.ajax({
			type: 'POST',
			url: postURL,
			cache: false,
			contentType: false,
			processData: false,
			data : formData,
			success: function(res){
				if(!res.error){
					if(_this.hasClass( 'like' )){
			        	_this.removeClass('like');
			        	_this.addClass('dislike text-info');
			        	_this.children( ".favourite-text" ).text('Hủy thích');
			        }else{
			        	_this.removeClass('dislike text-info');
			        	_this.addClass('like');
			        	_this.children( ".favourite-text" ).text('Yêu thích');
			        }
			        _this.children( ".like-count-comment" ).text(res.likeCount);
				}else{
					toastMessage('error', res.message);
				}
			
			},
			error: function(err){
				toastMessage('error', biicore.commonErrorMessage);
			},
			complete: function(){
				_this.removeAttr('disabled');
			},
		});

	});
	
	$(document).on('click', '.post-pager', function(event) {
		let _this = $(this);
		let pageToken   = $(this).data('page-token');
		$(this).addClass("pe-none");
		$(this).prepend(`<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>`);
		$.ajax({
			type: "GET",
			url: biicore.currentURL,
			data: { pageToken:pageToken },
			success: function(res){
				if(res == '') _this.parent().remove();
				$(".post-list-items").append(res);
				var nextPageToken = $(".post-list-items .post-item").last().data('id');
				_this.data('page-token',nextPageToken);
				lazyload();
			},
			complete: function(){
				_this.removeClass('pe-none').find('.spinner-grow').remove();
			}
		});
	});
	
	/* Process for wedding wish form modal*/
	$(document).on('show.bs.modal', '#wishesModal', function(e) {
		let clickButton = $(e.relatedTarget);
		unsetFormErrors($("#wishesForm"));
		let website_id = clickButton.data('website-id');
		let groomName = clickButton.data('groom-name');
		let brideName = clickButton.data('bride-name');
		$('#wishesModal #wishesForm').find('.website_id').val(website_id);
		$('#wishesModal #wishesForm').find('#wishesModalGroomName').html(groomName);
		$('#wishesModal #wishesForm').find('#wishesModalBrideName').html(brideName);
		$('#wishesModal #wishesForm').find('#wishesform-content').val('');
	});
	
	$(document).on('submit', '#wishesModal #wishesForm', function(e) {
		e.preventDefault();
		let form = $(this);
		let formData = form.serialize();
		$.ajax({
			url: form.attr("action"),
			type: form.attr("method"),
			data: formData,
			beforeSend: function( xhr ) {
				form.find('button[type=submit]').attr('disabled', true);
			},
			success: function (res) {
				unsetFormErrors(form);
				if (res.error && res.errors) {
					setFormErrors(form, res.errors);
					return false;
				} else if (res.error) {
					toastMessage('error', res.message); 
					return false;
				}
				toastMessage('success', res.message);
				$('#wishesModal').modal('hide');
			},
			error: function () {
				toastMessage('error', biicore.commonErrorMessage); return false;
				window.location.reload();
			},
			complete: function() {
				form.find('button[type=submit]').removeAttr('disabled');
			},
		});
	});

	$(document).on('click', '.timeline-pager', function(event) {
		let _this = $(this);
		let pageToken   = $(this).data('page-token');
		$(this).addClass("pe-none").attr('disabled', 'disabled');
		$(this).prepend(`<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>`);
		var currentURL = _this.data('page-url');
		$("#timelineLoading").removeClass('d-none');
		$.ajax({
			type: "GET",
			url: currentURL,
			data: { pageToken:pageToken },
			success: function(res){
				if(res == '') _this.parent().remove();
				$(".timeline-list-items").append(res);
				new VenoBox({
					selector: '.timeline-media-views',
				    numeration: true,
				    infinigall: true,
				    share: false,
				    spinner: 'circle'
				});
				var nextPageToken = $(".timeline-list-items .timeline-item").last().data('id');
				_this.data('page-token',nextPageToken);
				
			},
			complete: function(){
				$("#timelineLoading").addClass('d-none');
				_this.removeClass('pe-none').removeAttr('disabled').find('.spinner-grow').remove();
			}
		});
	});

	/* End process for wedding wish form modal*/

	/* Process for story form*/

	$(document).on('click', '.btn-delete-story', function(event) {
		var _this = $(this);
		$.cxDialog({
			title: biicore.message.confirmDeleteStory,
			background: '#000',
			info: biicore.message.confirmDeleteStoryInfo,
			ok: function(){
				$.ajax({
					type: 'POST',
					url: _this.data('posturl'),
					cache: false,
					contentType: false,
					processData: false,
					success: function(res){
						if(res.error && res.redirect) {
							window.location.href = res.redirect; return false;
						}else if(res.error){
							toastMessage('error', res.message); return false;
						}
						toastMessage('success', res.message);
						_this.parents('.story-item').slideUp(function() {
						    $(this).remove();
						  });
					},
					error: function(err){
						toastMessage('error', biicore.commonErrorMessage); return false;
					},
					complete: function(){

					},
				});
			},
			okText: biicore.message.confirmText,
			no: function(){
				
			},
			noText: biicore.message.cancelText,
			baseClass: 'ios'
		});
		
	});
	
	$(document).on('click', '.btn-report-story', function(event) {
		var _this = $(this);
		$.cxDialog({
			title: biicore.message.confirmReportStory,
			background: '#000',
			info: biicore.message.confirmReportStoryInfo,
			ok: function(){
				$.ajax({
					type: 'POST',
					url: _this.data('posturl'),
					cache: false,
					contentType: false,
					processData: false,
					success: function(res){
						if(res.error && res.redirect) {
							window.location.href = res.redirect; return false;
						}else if(res.error){
							toastMessage('error', res.message); return false;
						}
						toastMessage('success', res.message);
					},
					error: function(err){
						toastMessage('error', biicore.commonErrorMessage); return false;
					},
					complete: function(){
						
					},
				});
			},
			okText: biicore.message.confirmText,
			no: function(){
				
			},
			noText: biicore.message.cancelText,
			baseClass: 'ios'
		});
		
	});

	$(document).on('click', '.story-pager', function(event) {
		let _this = $(this);
		let pageToken   = $(this).data('page-token');
		$(this).addClass("pe-none");
		$(this).prepend(`<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>`);
		$.ajax({
			type: "GET",
			url: biicore.currentURL,
			data: { pageToken:pageToken },
			success: function(res){
				if(res == '') _this.parent().remove();
				$(".story-list-items").append(res);
				var nextPageToken = $(".story-list-items .story-item").last().data('id');
				_this.data('page-token',nextPageToken);
				lazyload();
			},
			complete: function(){
				_this.removeClass('pe-none').find('.spinner-grow').remove();
			}
		});
	});

	/* End process for story form*/
});
