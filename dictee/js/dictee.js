/* Dicto : dictee.js
 ( c ) 2012 - Patrick Cardona
 Version 1.0
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

// Objet Dictee :

function oDictee(){ 
	this.prof = "M. Untel"; // Nom de l'enseignant qui enregistré et saisi cette dictée
	this.titre = "Titre de l'exercice de dictée"; // Par exemple, 'Dictée n°4 en 6e'
	this.texte = "Texte de la dictée..."; // Texte de référence
	this.auteur = "Anonyme"; // Auteur du texte de la dictée
	this.ouvrage = "Titre de l'ouvrage";
	this.audio = "audio"; // Fichier audio sans son extension : par ex. 'ma_dictee'
	this.saisie;
		
}

oDictee.prototype.corrige = function() {
	if ( this.saisie.length > 0 ){
		// On compare le texte saisi au texte de référence :
		var sortie = diffString(this.saisie, this.texte);
		// On remplace les retours à la ligne par le code HTML :
		var reg = new RegExp ( /\n/g );
		return sortie.replace(reg,"<br />");
	}
	else {
		apprise ("Veuillez d'abord saisir le texte de la dictée !");
		return -1;
	}
}

oDictee.prototype.affiche = function() {
		// On remplace les retours à la ligne par le code HTML :
		var reg = new RegExp ( /\n/g );
		return this.texte.replace(reg,"<br />");
}

	