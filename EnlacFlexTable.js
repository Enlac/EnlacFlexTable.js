/*
*@Name: EnlacFlexTable.js
*@Author: Enlac
*@Goal: Generates a table with a scrollable tbody made from SCRATCH
*@Default Format: <div id="table"><div id="thead"><div class="th">Header1</div><div class="th">Header2</div></div><br/><div id="tbody"><div class="tr"><div class="td">Content1</div><div class="td">Content2</div></div><br/><div class="tr"><div class="td">Content1</div><div class="td">Content2</div></div><div class="tr"><div class="td">Content1</div><div class="td">Content2</div></div><div class="tr"><div class="td">Content1</div><div class="td">Content2</div></div><div class="tr"><div class="td">Content1</div><div class="td">Content2</div></div></div></div>
*/

$(function(){
  generateTable();
});

function generateTable(){
  var thQuantity = $('.th').length;
  var tdQuantity = $('.tr:first-child .td').length; 
  var theadWidth = $('#thead').width();
  var theadHeight = $('#thead').height();
  var tbodyWidth = $('#tbody').width();
  var tbodyHeight = $('#tbody').height();
  var tableWidth = theadWidth > tbodyWidth?theadWidth:tbodyWidth;
  var tableHeight = theadHeight > tbodyHeight?theadHeight:tbodyHeight;
  var tablePadding = Math.sqrt(parseInt($('#table').css('padding'), null));
  
  //$('#table').css({overflow:'hidden'});
  $('#thead').css({display:'inline-flex', width:'calc(100% - '+tablePadding+'px)'});
  $('.tr').css({display:'inline-flex'});
  $('.tr').css({border:0});
  $('.th, .tr, .td').css({width:'100%'});
  
  
  //DETECT LIMIT OF TBODY
  var theadH = $('#thead').height();
  var theadS = parseInt($('#thead').css('borderTopWidth'))+parseInt($('#thead').css('borderBottomWidth'))+parseInt($('#thead').css('paddingTop'))+parseInt($('#thead').css('paddingBottom'));
  console.log(theadS);
  var tbodyH = $('#tbody').height();
  var tbodyS = parseInt($('#tbody').css('borderTopWidth'))+parseInt($('#tbody').css('borderBottomWidth'))+parseInt($('#tbody').css('paddingTop'))+parseInt($('#tbody').css('paddingBottom'));
  console.log(tbodyS);
  var tableH = (($('#table').height()-theadH)-theadS)-tbodyS;
  var tbodyOverflow = (($('#table').height()-theadH)-tbodyHeight);
  if(tbodyOverflow < 0){
    $('#tbody').height(tableH);
  }
  
  
  //SCROLLING SYSTEM
  $('#tbody').css({overflowY:'auto'}); 
  var scrollingBarWidth =  $('#tbody').width()-document.getElementById('tbody').clientWidth;
  var theadSpace = parseInt($('#thead').css('borderLeftWidth'))+parseInt($('#thead').css('borderRightWidth'))+parseInt($('#thead').css('padding'));
  $('#thead').css({width:'calc(100% - '+(scrollingBarWidth+theadSpace)+'px)'});
}
