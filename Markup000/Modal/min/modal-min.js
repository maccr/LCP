$(function(){function o(){function o(o){o=$.extend({header:"Error !",body:"An error occured.",footer:"",modal:!1},o),a();var i="<div id='modal'>";i+="<div id='modal-frame'>",i+="<div id='modal-inner'>",i+="<header>",i+="<div class='header'>"+o.header+"</div>",i+="</header>",i+="<div>"+o.body+"</div>",""!=o.footer&&(i+="<footer>",i+=o.footer,i+="</footer>"),i+="</div>",i+="</div>",i+="</div>";var n=$(i);$("body").prepend(n),Modal.onModalInit.notify(),Modal.onModalInit.clear(),d(),e(),$(window).on("resize",Modal.centerModal),n.find(".close").click(a),n.click(function(d){!o.modal&&$(d.target).is("#modal")&&a()})}function d(){var o=-$("#modal-inner").height()/2;$("#modal-frame").css("margin-top",o+"px")}function e(){$("#modal-frame").width(9999);var o=$("#modal-inner").width();$("#modal-frame").width(o)}function a(){$("#modal").hide(),Modal.onModalHide.notify(),Modal.onModalHide.clear(),$("#modal").remove()}$.extend(this,{showModal:o,centerModal:d,adjustWidth:e,hideModal:a,onModalInit:new customEvent,onModalHide:new customEvent})}window.Modal=new o});