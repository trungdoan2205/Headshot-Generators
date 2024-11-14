import '/static/libs/emoji-picker/index.js'
$(".textarea-emoji-picker emoji-picker").dataSource = '/static/libs/emoji-picker/data.json';

$(document).on('emoji-click', '.textarea-emoji-picker emoji-picker', function(e){
    let formInput = $(this).parents('.textarea-emoji-picker').find("textarea");
    let submitButton = $(this).data('button');
    insertTextAtCursor(formInput, e.detail.unicode);
    if(typeof submitButton !== 'undefined') {
    	$('.btnSavePost').removeAttr('disabled');
    }
});

$(document).on('click', '.emoji-picker-button', function(e) {
    var _this = $(this).parents('.textarea-emoji-picker').find(".emoji-picker");
    $(".emoji-picker").not(_this).hide();
    _this.toggle();
});

$(document).on('click', 'emoji-picker, .emoji-picker, .emoji-picker-button', function(e) {
    e.stopPropagation();
});

$(document).click(function(){
    $(".emoji-picker").hide();
});