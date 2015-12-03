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
  //var thQuantity = $('.th').length;
  //var tdQuantity = $('.tr:first-child .td').length; 
  var theadWidth = $('#thead').width();
  var theadHeight = $('#thead').height();
  var tbodyWidth = $('#tbody').width();
  var tbodyHeight = $('#tbody').height();
  //var tableWidth = theadWidth > tbodyWidth?theadWidth:tbodyWidth;
  //var tableHeight = theadHeight > tbodyHeight?theadHeight:tbodyHeight;
  var tablePadding = Math.sqrt(parseInt($('#table').css('padding'), 10));
  
  $('#thead').css({display:'inline-flex', width:'calc(100% - '+tablePadding+'px)'});
  $('#table').css({overflow:'hidden'});
  $('.tr').css({display:'inline-flex'});
  $('.tr').css({border:0});
  $('.th, .tr, .td').css({width:'100%'});
  $('.th, .td').css({'word-break':'break-word'});
  
  //FIT TABLE ON THE SCREEN IF IT'S IN PERCENTAGE
  var viewPortH = $(window).height();
  var viewPortW = $(window).width();
  if($('#table').attr('height') !== '' && $('#table').attr('height') !== undefined){
	var tH = parseInt($('#table').attr('height'),10);
	var tableHS = parseInt($('#table').css('paddingTop'),10)+parseInt($('#table').css('paddingBottom'),10)+parseInt($('#table').css('borderTopWidth'),10)+parseInt($('#table').css('borderBottomWidth'),10)+parseInt($('#table').css('marginTop'),10)+parseInt($('#table').css('marginBottom'),10);
	$('#table').height(viewPortH*(tH*0.01)-tableHS);
  }
  if($('#table').attr('width') !== '' && $('#table').attr('width') !== undefined){
    var tW = parseInt($('#table').attr('width'),10);
	var tableWS = parseInt($('#table').css('paddingLeft'),10)+parseInt($('#table').css('paddingRight'),10)+parseInt($('#table').css('borderLeftWidth'),10)+parseInt($('#table').css('borderRightWidth'),10)+parseInt($('#table').css('marginLeft'),10)+parseInt($('#table').css('marginRight'),10);
	$('#table').width(viewPortW*(tW*0.01)-tableWS);
  }  

  //DETECT LIMIT OF TBODY
  var theadH = $('#thead').height();
  var theadS = parseInt($('#thead').css('borderTopWidth'),10)+parseInt($('#thead').css('borderBottomWidth'),10)+parseInt($('#thead').css('paddingTop'),10)+parseInt($('#thead').css('paddingBottom'),10);
  var tbodyH = $('#tbody')[0].scrollHeight;
  var tbodyS = parseInt($('#tbody').css('borderTopWidth'),10)+parseInt($('#tbody').css('borderBottomWidth'),10)+parseInt($('#tbody').css('paddingTop'),10)+parseInt($('#tbody').css('paddingBottom'),10);
  var tableH = (($('#table').height()-theadH)-theadS)-tbodyS;
  
  var tbodyOverflow = (tableH-tbodyH);
  
  if(tbodyOverflow < 0){
    $('#tbody').height(tableH);
  }
  
  //SCROLLING SYSTEM |MEN AT WORK|
  $('#tbody').css({overflowY:'auto'}); 
  var scrollingBarWidth =  $('#tbody').width()-document.getElementById('tbody').clientWidth;
  var theadSpace = Number(parseInt($('#thead').css('borderLeftWidth'),10)+parseInt($('#thead').css('borderRightWidth'),10)+parseInt($('#thead').css('padding'),10));
  theadSpace = isNaN(theadSpace) === true ? 0 : theadSpace;
  
  var theadWidthInPx = $('#thead').width();
  console.log(theadWidthInPx+'\n'+scrollingBarWidth+'\n'+theadSpace);
  
  $('#thead').css({width:'calc(100% - '+(scrollingBarWidth+theadSpace)+'px)'});
  
  //Set the default back on
  $('#table').parent().css({overflow:parentDefaultOverflow});
}
