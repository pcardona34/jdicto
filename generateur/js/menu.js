/*
 * menu.js
 * Librement inspiré du tutoriel :
 * http://www.computure.net/fr/jquery/32-tutorial-jquery-menu-deroulant-simple
 * et javascript-array.com
 */

function MenuDeroulant_open(){
	
	MenuDeroulant_canceltimer();
	MenuDeroulant_close();
	ddmenuitem = $(this).find('ul').css('visibility', 'visible');
}


function MenuDeroulant_close(){
	
	if(ddmenuitem) ddmenuitem.css('visibility', 'hidden');
}


function MenuDeroulant_timer(){
	closetimer = window.setTimeout(MenuDeroulant_close, timeout);
}


function MenuDeroulant_canceltimer(){
	
	if(closetimer){
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}


 