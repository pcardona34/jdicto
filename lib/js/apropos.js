/* 
 * apropos.js
 * 
 * A propos : affichage des informations relatives aux auteurs et aux sources
 * ( c ) 2012 Patrick Cardona - 
 * Version 1.0.0
 * 
 * @source: http://code.google.com/p/jdicto/
 * 
 */

/* =================================================================== */
/* LICENCE
/* =================================================================== */
/*
@licstart  The following is the entire license notice for the 
    JavaScript code in this page.

Copyright (C) 2012  Patrick CARDONA - A propos

    The JavaScript code in this page is free software: you can
    redistribute it and/or modify it under the terms of the GNU
    General Public License (GNU GPL) as published by the Free Software
    Foundation, either version 3 of the License, or (at your option)
    any later version.  The code is distributed WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

    As additional permission under GNU GPL version 3 section 7, you
    may distribute non-source (e.g., minimized or compacted) forms of
    that code without the copy of the GNU GPL normally required by
    section 4, provided you include this license notice and a URL
    through which recipients can access the Corresponding Source.
    
@licend  The above is the entire license notice
    for the JavaScript code in this page.    
*/

function oApropos( _auteur, _annee, _nom_appli, _version) {
	this.merci = new Array();
	this.auteur = _auteur;
	this.nom_appli = _nom_appli;
	this.annee = _annee;
	this.version = _version;	
}

oApropos.prototype.ajoute = function(_app, _url_site, _lic, _url_source) {
	var ref = new Array(_app, _url_site, _lic, _url_source);
	this.merci.push( ref );	
}

oApropos.prototype.licence = function(_type){
	switch (_type){
		case "GPL":
			var lic = "<a href='http://www.gnu.org/licenses/gpl-3.0.html'>Licence GPL</a>";
			return lic;
		break;
		
		case "MIT":
			var lic = "<a href='http://www.opensource.org/licenses/mit-license.php'>Licence MIT</a>";
			return lic;
		break;
		
		case "BOTH":
			var lic = "<a href='http://www.gnu.org/licenses/gpl-3.0.html'>Licence GPL</a> et ";
			lic += "<a href='http://www.opensource.org/licenses/mit-license.php'>Licence MIT</a>";
			return lic;
		break;
		
		case "CC":
			var lic = "<a href='http://creativecommons.org/licenses/by-nc/2.0/fr/'>Licence CC-By-NC</a>";
			return lic;
		break;
		
		case "BSD":
			var lic = "<a href='http://code.accursoft.com/caret/raw/tip/license.txt'>Licence BSD pour Caret</a>";
			return lic;
		break;
		
		default:
			var lic = "Licence inconnue !";
			return lic;
	}
}

oApropos.prototype.affiche = function() {
	var msg = "<h1 class=\"apropos\">À propos de "+ this.nom_appli +" "+ this.version +"</h1>";
	msg += "<h2 class=\"apropos\">©"+ this.annee +" "+ this.auteur +"</h2>";
	msg += "<p class=\"apropos\">Cette application est un logiciel libre, réalisé grâce à :</p><ul>";
	for (var i = 0; i < this.merci.length ; i++){
		msg	+= "<li class=\"apropos\"><a href=\""+ this.merci[i][1] +"\">"+ this.merci[i][0] +"</a>";
		msg += " ("+ this.licence(this.merci[i][2]) +" - <a href='"+ this.merci[i][3] +"'>code source</a>)</li>";
	}
	msg += "</ul>";
	jAlert ( msg, "À propos..." );	
}

var apropos = new oApropos("Patrick Cardona", "2012-2013", "jDicto", "1.3.4");

// App ou API courantes :
apropos.ajoute ("jQuery", "http://jquery.com/", "BOTH", "http://docs.jquery.com/Source_Code");
apropos.ajoute ("jQuery Alert Dialogs de Cory S.N. LaViska", "http://www.abeautifulsite.net/blog/2008/12/jquery-alert-dialogs/", "BOTH", "http://labs.abeautifulsite.net/archived/jquery-alerts/jquery.alerts-1.1.zip");


// App ou API spécifiques du projet
apropos.ajoute("Plugin jQuery ProgressBar de Josh Bush","http://digitalbush.com/projects/progress-bar-plugin/","MIT","http://digitalbush.com/wp-content/uploads/2007/02/jqueryprogressbar.js");
apropos.ajoute ("JsDiff de John Resig", "http://ejohn.org/","MIT","https://github.com/kpdecker/jsdiff");
apropos.ajoute("jDicto de Patrick Cardona", "http://patrick.cardona.free.fr/", "GPL", "http://code.google.com/p/jdicto/");

/*
 * Gestion du lien 'à propos' dans l'interface
 */
$("document").ready(function(){
	$("a[title=apropos]").click(function(e){
		apropos.affiche();
		e.preventDefault(); // Pour ne pas suivre le lien.
	});
});
