// var menuArray = [
//     {"id":1,"name":"Home","parents":0,"href":"#","position":1,"subMenu":0},
//     {"id":2,"name":"Product","parents":0,"href":"#","position":2,"subMenu":0},
//     {"id":3,"name":"Contact","parents":0,"href":"#","position":3,"subMenu":0},
//     {"id":4,"name":"Home-1","parents":1,"href":"#","position":1,"subMenu":1},
//     {"id":5,"name":"Home-2","parents":1,"href":"#","position":2,"subMenu":1},
//     {"id":6,"name":"Home-3","parents":1,"href":"#","position":3,"subMenu":1},
//     {"id":7,"name":"Product-1","parents":2,"href":"#","position":1,"subMenu":1},
//     {"id":8,"name":"Product-2","parents":2,"href":"#","position":2,"subMenu":1},
//     {"id":9,"name":"Product-2-1","parents":8,"href":"#","position":1,"subMenu":2},
//     {"id":10,"name":"Product-2-2","parents":8,"href":"#","position":2,"subMenu":2},
//     {"id":11,"name":"Product-1-1","parents":7,"href":"#","position":1,"subMenu":2},
//     {"id":12,"name":"Product-1-2","parents":7,"href":"#","position":2,"subMenu":2},
//     {"id":13,"name":"Product-3","parents":2,"href":"#","position":3 ,"subMenu":3},
//     {"id":14,"name":"Home-2-1","parents":5,"href":"#","position":1,"subMenu":1},
//     {"id":15,"name":"Home-2-2","parents":5,"href":"#","position":3,"subMenu":1},
//     {"id":16,"name":"Home-2-3","parents":5,"href":"#","position":3,"subMenu":1},
//    ] ;
var newString ='';

function recursive(source, parent){     
    
    if(source.length > 0) {
        newString += `<ul>`;
        source.forEach((value) => {    
                         
            if(value['parents'] == parent){                
                value['name'] = `<a href="${value['href']}">${value['name']}</a>`;  
                newString += `<li>` + value['name'];   
                newParent = value['id'];                                                    
                recursive(source, newParent,newString);
                newString += '</li>';                
            }         
        });        
        newString += '</ul>';        
    }
}

function menu(menuArray){
    newString ='';
    recursive(menuArray, 0, newString);
    return newString.replace(/<ul><\/ul>/g,'');
}

function addCssMenu(menuArray) {    
    let menuStr = menu(menuArray);    
    const cheerio = require('cheerio');
    const $ = cheerio.load(menuStr);
    let liMenu = $('ul').html();    
    let item ='';
    var menuOk = '';
    $(liMenu).each(function(i, elem) {        
   
        if($(this).find('ul').first().text()){
            let ulFirst = $(this).find('ul').first();
            ulFirst.addClass('dropdown');   
            if($(ulFirst).find('ul').text()) {                     
                $(ulFirst).find('ul').addClass('lavel-dropdown');  
                let nameSub = $(ulFirst).find('.lavel-dropdown').prev();              
                nameSub.append('<span><i class="zmdi zmdi-chevron-right"></i></span> ');
            }         
            item = `<li class="drop">` +$(this).html()+ `</li>`;
        }else{
            
            item = `<li>` +$(this).html()+ `</li>`;
        }
        menuOk = menuOk + item;        
      });
    return `<nav class='mainmenu__nav d-none d-lg-block'><ul class='main__menu'>`+ menuOk + `</ul></nav>`;
}

module.exports = {
    addCssMenu
}