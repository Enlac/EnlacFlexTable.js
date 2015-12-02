/*
*@Name: EnlacFlexTable.js
*@Author: Enlac
*@Goal: Generates a table with a scrollable tbody made from SCRATCH
*/

$(function(){
  generateTable();
});

$(window).resize(function(){
  generateTable();
});

function generateTable(){
  //Keep parent from shrinking page due to overflowing and other stuffs ;)
  var parentDefaultOverflow = $('#table').parent().css('overflow');
  $('#table').parent().css({overflow:'hidden'});
  
  //SET UP THE BASICS FOR CREATING THE TABLE
  var thQuantity = $('.th').length;
  var tdQuantity = $('.tr:first-child .td').length; 
  var theadWidth = $('#thead').width();
  var theadHeight = $('#thead').height();
  var tbodyWidth = $('#tbody').width();
  var tbodyHeight = $('#tbody').height();
  var tableWidth = theadWidth > tbodyWidth?theadWidth:tbodyWidth;
  var tableHeight = theadHeight > tbodyHeight?theadHeight:tbodyHeight;
  var tablePadding = Math.sqrt(parseInt($('#table').css('padding'), null));
  
  $('#thead').css({display:'inline-flex', width:'calc(100% - '+tablePadding+'px)'});
  $('#table').css({overflow:'hidden'});
  $('.tr').css({display:'inline-flex'});
  $('.tr').css({border:0});
  $('.th, .tr, .td').css({width:'100%'});
  
  //FIT TABLE ON THE SCREEN IF IT'S IN PERCENTAGE
  var viewPortH = $(window).height();
  var viewPortW = $(window).width();
  if($('#table').attr('height') !== '' && $('#table').attr('height') !== undefined){
	var tH = parseInt($('#table').attr('height'));
	var tableHS = parseInt($('#table').css('paddingTop'))+parseInt($('#table').css('paddingBottom'))+parseInt($('#table').css('borderTopWidth'))+parseInt($('#table').css('borderBottomWidth'))+parseInt($('#table').css('marginTop'))+parseInt($('#table').css('marginBottom'));
	$('#table').height(viewPortH*(tH*0.01)-tableHS);
  }
  if($('#table').attr('width') !== '' && $('#table').attr('width') !== undefined){
    var tW = parseInt($('#table').attr('width'));
	var tableWS = parseInt($('#table').css('paddingLeft'))+parseInt($('#table').css('paddingRight'))+parseInt($('#table').css('borderLeftWidth'))+parseInt($('#table').css('borderRightWidth'))+parseInt($('#table').css('marginLeft'))+parseInt($('#table').css('marginRight'));
	$('#table').width(viewPortW*(tW*0.01)-tableWS);
	console.log(viewPortW+tableWS);
  }    

  //DETECT LIMIT OF TBODY
  var theadH = $('#thead').height();
  var theadS = parseInt($('#thead').css('borderTopWidth'))+parseInt($('#thead').css('borderBottomWidth'))+parseInt($('#thead').css('paddingTop'))+parseInt($('#thead').css('paddingBottom'));
  var tbodyH = $('#tbody')[0].scrollHeight;
  var tbodyS = parseInt($('#tbody').css('borderTopWidth'))+parseInt($('#tbody').css('borderBottomWidth'))+parseInt($('#tbody').css('paddingTop'))+parseInt($('#tbody').css('paddingBottom'));
  var tableH = (($('#table').height()-theadH)-theadS)-tbodyS;
  
  var tbodyOverflow = (tableH-tbodyH);
  
  if(tbodyOverflow < 0){
    $('#tbody').height(tableH);
  }
  
  //SCROLLING SYSTEM
  $('#tbody').css({overflowY:'auto'}); 
  var scrollingBarWidth =  $('#tbody').width()-document.getElementById('tbody').clientWidth;
  var theadSpace = parseInt($('#thead').css('borderLeftWidth'))+parseInt($('#thead').css('borderRightWidth'))+parseInt($('#thead').css('padding'));
  $('#thead').css({width:'calc(100% - '+(scrollingBarWidth+theadSpace)+'px)'});
  
  //Set the default back on
  $('#table').parent().css({overflow:parentDefaultOverflow});
}
