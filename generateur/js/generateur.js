/* 
 * generateur.js
 * 
 * Fonctions du générateur d'exercice de Dictée 
 * jDicto
 * (c) 2012 - Patrick Cardona
 * Version : 1.0
 * 
 * @source: http://code.google.com/p/dicto/
 * 
 */

/* =================================================================== */
/* LICENCE
/* =================================================================== */
/*
@licstart  The following is the entire license notice for the 
    JavaScript code in this page.

Copyright (C) 2012  Patrick CARDONA - Generateur de Reperage

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

/* =================================================================== */
/* !!!!!!!!!!!!!!!! AVERTISSEMENT  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
/* =================================================================== */
/* 
	!!! IMPORTANT !!! Ne touchez pas à ce fichier à moins de posséder de solides
	connaissances en javascript, DOM et JQuery !
*/

/* ****************** */
/* Variables globales */
/* ****************** */

function oDictee(){
	this.app_name = "jDicto";
	this.texte=""; // texte de la dictée
	this.auteur=""; // Auteur du texte de la dictée
	this.titre=""; // Titre de l'exercice : dictée n°...
	this.ouvrage=""; // titre de l'ouvrage dont le texte est extrait ou adapté
	this.audio=""; // Nom du fichier audio
	this.prof =""; // Professeur auteur de l'exercice
	this.version = obtientDate(); // Version initiale de la dictée
}

function oEcho(){
	this.app_name = "jecho";
	this.texte=""; // texte initial
	this.correction=""; // Texte transformé
	this.auteur=""; // Auteur du texte de la dictée
	this.titre=""; // Titre de l'exercice : dictée n°...
	this.ouvrage=""; // titre de l'ouvrage dont le texte est extrait ou adapté
	this.consigne=""; // Consigne de la réécriture
	this.prof =""; // Professeur auteur de l'exercice
	this.version = obtientDate(); // Version initiale de la dictée
}

function toJSON(_obj){
	return obj_json = JSON.stringify(_obj);
}


function obtientDate(){
	
	var mois=new Array();
	mois[0]="janvier";
	mois[1]="fevrier";
	mois[2]="mars";
	mois[3]="avril";
	mois[4]="mai";
	mois[5]="juin";
	mois[6]="juillet";
	mois[7]="aout";
	mois[8]="septembre";
	mois[9]="octobre";
	mois[10]="novembre";
	mois[11]="decembre";
	 
	var madate = new Date();
	var sceau = madate.getDate();
	sceau += mois[madate.getMonth()];
	sceau += madate.getFullYear() + "-";
	sceau += madate.getHours();
	sceau += "h" + madate.getMinutes();
	return sceau;
}

/*
 * Génération du code de la dictée
 */
oDictee.prototype.genereCode = function(){
	var code = toJSON(this);
	this.code = code;
	this.fic_code = "dic_"+ this.version;
	
	localStorage.setItem(this.fic_code, this.code);
	jAlert ("Données conservées sous l'index local <em>" + this.fic_code + "</em>","Sauvegarde automatique");
}

/*
 * Génération du code de la réécriture
 */
oEcho.prototype.genereCode = function(){
	var code = toJSON(this);
	this.code = code;
	this.fic_code = "echo_"+ this.version;
	
	localStorage.setItem(this.fic_code, this.code);
	jAlert ("Données conservées sous l'index local <em>" + this.fic_code + "</em>","Sauvegarde automatique");
}

/* *********************************************************
 *  Affichage des actions
 * *********************************************************
 */

// Mode éditeur
function action_Edition(){
	var monAction = "<div id='etape_Action_Edition'>";
	monAction += "<h2>Éditer une dictée ou une réécriture</h2>";	
  	monAction += "<div id='chemin_fichier'>";
  	monAction += "<form>";
  	monAction += "<fieldset><legend>Source de données :&nbsp;</legend>";
  	monAction += "<div id='liste_dictees'>&nbsp;</div>";
  	monAction += "</fieldset>";
  	monAction += "<fieldset><legend>Détail :&nbsp;</legend>";
  	monAction += "<div id='contenu_fichier'>&nbsp;</div></fieldset></form></div></div>";		
  			
  	return monAction;		
}

function action_Creation_Dictee(){
	var monAction = "<div id='etape_Action_Creation_Dictee'>";
	monAction += "<h2>Configuration</h2>";
    monAction += "<form id='editoriales_dictee'>";
    monAction += "<fieldset><legend>Données éditoriales obligatoires&nbsp;</legend>";
    monAction += "<table><tr><td>";
    monAction += "<label for='edito_dictee_0'>Titre de l'exercice :</label>";
    monAction += "</td><td><input type='text' id='edito_dictee_0' name='titre_dictee' value='Dictée n°' />";
    monAction += "</td></tr><tr><td>";
    monAction += "<label for='edito_dictee_1'>Auteur du texte de la dictée :</label>";
    monAction += "</td><td><input type='text' id='edito_dictee_1' name='auteur' />";
    monAction += "</td></tr><tr><td>";
    monAction += "<label for='edito_dictee_2'>Titre de l'ouvrage :</label>";
    monAction += "</td><td><input type='text' id='edito_dictee_2' name='titre_ouvrage' />";
    monAction += "</td></tr><tr><td>";
    monAction += "<label for='edito_dictee_3'>Professeur :</label>";
    monAction += "</td><td><input type='text' id='edito_dictee_3' name='prof' />";
    monAction += "</td></tr><tr><td>";
    monAction += "<label for='edito_dictee_4'>Nom du fichier audio (sans extension)&nbsp;:</label>";
    monAction += "</td><td><input type='text' id='edito_dictee_4' name='audio' />";
    monAction += "</td></tr></table></fieldset>";
    monAction += "<input type='submit' value='Enregistrer les paramètres de la dictée' /></form></div>";
    
    return monAction;
     
}

function action_Creation_Echo(){
	var monAction = "<div id='etape_Action_Creation_Echo'>";
	monAction += "<h2>Configuration</h2>";
    monAction += "<form id='editoriales_echo'>";
    monAction += "<fieldset><legend>Données éditoriales obligatoires&nbsp;</legend>";
    monAction += "<table><tr><td>";
    monAction += "<label for='edito_echo_0'>Titre de l'exercice :</label>";
    monAction += "</td><td><input type='text' id='edito_echo_0' name='titre_exo' value='Réécriture n°' />";
    monAction += "</td></tr><tr><td>";
    monAction += "<label for='edito_echo_1'>Auteur du texte de la réécriture :</label>";
    monAction += "</td><td><input type='text' id='edito_echo_1' name='auteur' />";
    monAction += "</td></tr><tr><td>";
    monAction += "<label for='edito_echo_2'>Titre de l'ouvrage :</label>";
    monAction += "</td><td><input type='text' id='edito_echo_2' name='titre_ouvrage' />";
    monAction += "</td></tr><tr><td>";
    monAction += "<label for='edito_echo_3'>Professeur :</label>";
    monAction += "</td><td><input type='text' id='edito_echo_3' name='prof' />";
    monAction += "</td></tr><tr><td>";
    monAction += "</td></tr></table></fieldset>";
    monAction += "<input type='submit' value='Enregistrer les paramètres de la réécriture' /></form></div>";
    
    return monAction;
     
}


function action_Texte_Dictee(){
	var monAction ="<div id='etape_Action_Texte_Dictee'><h2>Saisir le texte de la dictée</h2>";   
  	monAction += "<form><table id='table_spec_Dictee'>";
  	monAction += "<caption>Caractère spéciaux</caption>";
  	monAction += "<tr><td class='spec_Dictee'>«</td>";
  	monAction += "<td class='spec_Dictee'>—</td>";
  	monAction += "<td class='spec_Dictee'>»</td>";
  	monAction += "<td class='spec_Dictee'>&hellip;</td>";
  	monAction += "<td class='spec_Dictee'>œ</td>";
  	monAction += "<td class='spec_Dictee'>Œ</td>";
  	monAction += "<td class='spec_Dictee'>É</td>";
  	monAction += "<td class='spec_Dictee'>À</td>";
  	monAction += "<td><a href='#' class='aide'>?</a></td>";
  	monAction += "</tr></table>";
  	monAction += "<textarea cols='60' rows='10' id='zonetexte_Dictee' class='word_count'>Mon texte</textarea><br />";
  	monAction += "<div id='zonetexte_Dictee_count'>Mots ???</div><br />";
  	monAction += "<input type='submit' value='Enregistrer la dictée' />";
  	monAction += "</form>";
  	monAction += "</div>";
    
	return monAction;
}

function action_Texte_Echo(){
	var monAction ="<div id='etape_Action_Texte_Echo'><h2>Saisir le texte initial de la réécriture</h2>";   
  	monAction += "<form><table id='table_spec_Echo'>";
  	monAction += "<caption>Caractère spéciaux</caption>";
  	monAction += "<tr><td class='spec_Echo'>«</td>";
  	monAction += "<td class='spec_Echo'>—</td>";
  	monAction += "<td class='spec_Echo'>»</td>";
  	monAction += "<td class='spec_Echo'>&hellip;</td>";
  	monAction += "<td class='spec_Echo'>œ</td>";
  	monAction += "<td class='spec_Echo'>Œ</td>";
  	monAction += "<td class='spec_Echo'>É</td>";
  	monAction += "<td class='spec_Echo'>À</td>";
  	monAction += "<td><a href='#' class='aide'>?</a></td>";
  	monAction += "</tr></table>";
  	monAction += "<textarea cols='60' rows='10' id='zonetexte_Echo' class='word_count'>Mon texte</textarea><br />";
  	monAction += "<div id='zonetexte_Echo_count'>Mots ???</div><br />";
  	monAction += "<input type='submit' value='Enregistrer le texte initial' />";
  	monAction += "</form>";
  	monAction += "</div>";
    
	return monAction;
}

function action_Texte_BIS(){
	var monAction ="<div id='etape_Action_Texte_BIS'><h2>Saisir le texte transformé</h2>";   
  	monAction += "<form><table id='table_spec_BIS'>";
  	monAction += "<caption>Caractère spéciaux</caption>";
  	monAction += "<tr><td class='spec_BIS'>«</td>";
  	monAction += "<td class='spec_BIS'>—</td>";
  	monAction += "<td class='spec_BIS'>»</td>";
  	monAction += "<td class='spec_BIS'>&hellip;</td>";
  	monAction += "<td class='spec_BIS'>œ</td>";
  	monAction += "<td class='spec_BIS'>Œ</td>";
  	monAction += "<td class='spec_BIS'>É</td>";
  	monAction += "<td class='spec_BIS'>À</td>";
  	monAction += "<td><a href='#' class='aide'>?</a></td>";
  	monAction += "</tr></table>";
  	monAction += "<textarea cols='60' rows='10' id='zoneBIS'>Mon texte transformé</textarea><br />";
  	monAction += "<input type='submit' value='Enregistrer le texte transformé' />";
  	monAction += "</form>";
  	monAction += "</div>";
    
	return monAction;
}

function action_Consigne(){
	var monAction ="<div id='etape_Action_Consigne'><h2>Saisir la consigne de réécriture</h2>";   
  	monAction += "<form>";
  	monAction += "<textarea cols='60' rows='4' id='zoneConsigne'>Ma consigne</textarea><br />";
  	monAction += "<input type='submit' value='Enregistrer la consigne' />";
  	monAction += "</form>"
  	monAction += "</div>";
    
	return monAction;
}

function action_Code(){
	var monAction = "<div id='etape_Action_Code'><h2 id='titre10'>Données de l'exercice</h2>";
    monAction += "<p id='label_barre'>Génération du code :</p>";
    monAction += "<div id='bloc_barre'><div id='barre'></div></div>";
	monAction += "<div id='enregistrement'><img src='generateur/img/json.png' width='100px' align='left' alt='Données JSON' />";
	monAction += "<input type='submit' id='action_selection' value='Sélectionner le code' /><br />"
	monAction += "<textarea id='zonecode' cols='60' rows='10'></textarea></div></div>";
		
	return monAction;	
}

function action_Copie_Exerciseur_Dictee(){
	
	var monAction = "<div id='etape_Action_Copie_Exerciseur_Dictee'><div id='exerciseur_Dictee'>";
	monAction += "<h2>Exerciseur de dictée</h2>";
    monAction += "<form><img src='generateur/img/zip.png' width='100px' align='left' alt='Paquet Zip' />";
	monAction += "<input type='submit' value='Télécharger une dictée...' />"; 	
	monAction +=  "</form></div></div>"; 	
	
	return monAction;
}

function action_Copie_Exerciseur_Echo(){
	
	var monAction = "<div id='etape_Action_Copie_Exerciseur_Echo'><div id='exerciseur_Echo'>";
	monAction += "<h2>Exerciseur de réécriture</h2>";
    monAction += "<form><img src='generateur/img/zip.png' width='100px' align='left' alt='Paquet Zip' />";
	monAction += "<input type='submit' value='Télécharger une réécriture...' />"; 	
	monAction +=  "</form></div></div>"; 	
	
	return monAction;
}

/* ******************************************************
 *    Contenus de l'aide
 * ******************************************************
 */

function contenu_Exerciseur_Dictee(){
		
		var contenu = "<ol><li>Obtenez une copie de l'exerciseur jDicto <code>dictee.zip</code><br />";	
    	contenu += "en cliquant sur le bouton ci-contre&nbsp;;</li>";
    	contenu += "<li>Décompressez-la. Vous obtenez un dossier&nbsp;: <code>dictee</code>&nbsp;;</li>";
    	contenu += "<li>Déplacez-y le fichier <code>data.json</code>.</li>";
    	contenu += "<li>Placez une copie de chaque fichier fichier audio <span id='fic_audio'>...</span> dans le sous-dossier";
    	contenu += " <code>dictee/media</code>.</li></ol>";
    	contenu += "<p>Pour publier cette dictée sur un serveur, renommez, puis compressez à nouveau ce dossier ";
    	contenu += "<code>dictee</code> mis à jour.</p>";
  		
		return contenu;
}
 
function contenu_Exerciseur_Echo(){
		
		var contenu = "<ol><li>Obtenez une copie de l'exerciseur exEcho <code>execho.zip</code><br />";	
    	contenu += "en cliquant sur le bouton ci-contre&nbsp;;</li>";
    	contenu += "<li>Décompressez-la. Vous obtenez un dossier&nbsp;: <code>execho</code>&nbsp;;</li>";
    	contenu += "<li>Déplacez-y le fichier <code>data.json</code>.</li>";
    	contenu += "<p>Pour publier cet exercice de réécriture sur un serveur, renommez, puis compressez à nouveau ce dossier ";
    	contenu += "<code>execho</code> mis à jour.</p>";
  		
		return contenu;
}

function contenu_Pas_A_Pas_Dictee(){
	var contenu = "<ol><li>Créez les fichiers audio : formats <em>mp3</em> et <em>ogg</em>.</li>";
		contenu += "<li>Créez le fichier de données <em>data.json</em> grâce au Générateur.</li>";
		contenu += "<li>Récupérez une copie de l'exerciseur jDicto <code>dictee.zip</code> et décompressez-la.</li>";
		contenu += "<li>Copiez votre fichier <code>data.json</code> dans le dossier <code>dictee</code>.</li>";
		contenu += "<li>Copiez vos fichiers audio, par exemple <code>audio.mp3</code> et <code>audio.ogg</code> ";
		contenu += "dans le sous-dossier <code>dictee/media</code>.</li>";
		contenu += "<li>Renommez le dossier <code>dictee</code> sous un nom plus explicite.</li>";
		contenu += "<li>Créez une nouvelle archive <em>.zip</em> du dossier de dictée renommé.</li>";
		contenu += "<li>Déposez cette archive <code>votre_dictee.zip</code> à l'endroit désiré sur le serveur de cours.</li>";
		contenu += "<li>Décompressez l'archive <code>votre_dictee.zip</code> sur ce serveur. ";
		contenu += "<br />Voyez à ce propos la documentation de votre plate-forme de cours ENT.</li>";
		contenu += "<li>Faites enfin un lien vers le fichier <code>dictee.html</code>. ";
		contenu += "<br />Voyez encore la documentation de votre plate-forme de cours ENT.</li>";
		contenu += "</ol>";
		
		return contenu;
} 

function contenu_Pas_A_Pas_Echo(){
	var contenu = "<ol>";
		contenu += "<li>Créez le fichier de données <em>data.json</em> grâce au Générateur.</li>";
		contenu += "<li>Récupérez une copie de l'exerciseur exEcho <code>execho.zip</code> et décompressez-la.</li>";
		contenu += "<li>Copiez votre fichier <code>data.json</code> dans le dossier <code>execho</code>.</li>";
		contenu += "<li>Renommez le dossier <code>execho</code> sous un nom plus explicite.</li>";
		contenu += "<li>Créez une nouvelle archive <em>.zip</em> du dossier renommé.</li>";
		contenu += "<li>Déposez cette archive <code>votre_exercice.zip</code> à l'endroit désiré sur le serveur de cours.</li>";
		contenu += "<li>Décompressez l'archive <code>votre_exercice.zip</code> sur ce serveur. ";
		contenu += "<br />Voyez à ce propos la documentation de votre plate-forme de cours ENT.</li>";
		contenu += "<li>Faites enfin un lien vers le fichier <code>execho.html</code>. ";
		contenu += "<br />Voyez encore la documentation de votre plate-forme de cours ENT.</li>";
		contenu += "</ol>";
		
		return contenu;
} 

function contenu_Audio(){
	var contenu = "<p>La qualité des fichiers audio est importante. Pour obtenir un enregistrement de qualité, utilisez un ";
		contenu += " micro USB qui atténuera les bruits de fond et garantira un volume initial suffisant.</p>";
		contenu += "<p>Je vous recommande l'utilisation du logiciel <em>Audacity</em> pour réaliser cet enregistrement ";
		contenu += "ainsi que les exportations dans les formats nécessaires.</p>";
		contenu += "<p>Les caractéristiques du fichier audio sont les suivantes :";
		contenu += "<table>";
		contenu += "<tr><td>Mono</td><td>16 000 Hz, 32 bit</td></tr>";
		contenu += "</table>";
		contenu += "</p>";
		contenu += "<p>";
		contenu += "Pour exporter votre enregistrement vers un format compressé dans <em>Audacity</em> :";
		contenu += "<ol>";
		contenu += "<li><em>mp3</em> : menu Fichier / exporter comme mp3&hellip;</li>";
		contenu += "<li><em>ogg</em> : menu Fichier / exporter comme Ogg Vorbis&hellip;</li>";
		contenu += "</ol></p>";
		
		return contenu;
}

function contenu_Principe(){
	var contenu = "<p>L'exercice s'exécute au moyen d'un fichier de données <code>data.json</code> et d'un exerciseur :";
		contenu += " le fichier d'interface <code>dictee.html</code> ou <code>execho.html</code>.</p>";
		contenu += "<p>Pour créer le fichier de données <code>data.json</code>, vous devez utiliser le Générateur.</p>";
		contenu += "<p>Vous téléchargerez ensuite une copie de l'exerciseur approprié, <code>dictee.zip</code> ou <code>execho.zip</code>.</p>";
		contenu += "<p>Pour publier votre exercice, vous décompresserez d'abord <code>dictee.zip</code> ou <code>execho.zip</code>,";
		contenu += " vous copierez le fichier <code>data.json</code> dans le dossier décompressé <code>dictee</code> ou <code>execho</code>.</p>";
		contenu += "<p>Ainsi que les fichiers audio <code>votre_audio.mp3</code> et <code>votre_audio.ogg</code> ";
		contenu += "dans le dossier <code>dictee/media</code> pour un exercice de dictée.</p>";
		contenu += "<p>Le dossier de l'exercice, ainsi complété, sera finalement publié sur un serveur de ";
		contenu += "cours et vous ferez finalement un lien vers le fichier <code>dictee.html</code> ou <code>execho.html</code>.</p>";
		contenu += "<p>N.B.: Pour déplacer facilement le dossier complété, utilisez un logiciel";
		contenu += " d'archivage comme <em>7zip</em>. Vous penserez enfin à décompresser cette archive une fois qu'elle ";
		contenu += "sera déposée sur le serveur.</p>";
		
		return contenu;
}

function contenu_Presentation(){
	var contenu = "<p>JDicto permet de créer des dictées interactives ou des exercices de Réécriture. ";
		contenu += "Son objectif est d'assurer un fonctionnement ";
		contenu += "de cet exercice sur toutes les plateformes : PC, Mac, tablettes ou Smartphones sous iOS, Androïd, etc.</p>";
		contenu += "<p>Pour voir un exemple :</p>";
		contenu += "<ul><li>De dictée : menu <em>Actions / exemple de dictée</em>&nbsp;;</li>";
		contenu += "<li>De réécriture : menu <em>Actions / exemple de réécriture</em></li></ul>";
		contenu += "<p>Le présent générateur, qui permet de créer les données textuelles de chaque type d'exercice, ";
		contenu += "est une application Chrome.</p>";
		contenu += "<p>Pour créer :</p>";
		contenu += "<ul><li>Une dictée : menu <em>Actions / nouvelle dictée&hellip;</em></li>";
		contenu += "<li>Une réécriture : menu <em>Actions / nouvelle réécriture&hellip;</em></li></ul>";
		contenu += "<p>Les données des exercices sont automatiquement enregistrées dans l'espace privé de l'application. ";
		contenu += "Pour modifier une dictée ou une réécriture précédente&nbsp;:</p>";
		contenu += "<ul><li>Menu <em>Actions / éditer&hellip;</em></li>";
		contenu += "<p>Il n'est pas encore possible d'enregistrer de fichier audio dans JDicto, mais cette fonctionnalité sera ";
		contenu += "ajoutée dès que la capture audio sera complètement supportée par les navigateurs.</p>";
		contenu += "<p>Pour créer les enregistrements nécessaires, consultez la section ";
		contenu += "<em>Aide / Fichiers audio</em>.</p>";
		
		return contenu;
}

function contenu_Modifier(){
	var contenu = "<ul><li>Pour afficher le détail, cliquez sur la loupe... <img src='generateur/img/loupe.png' align='bottom' /></li>";
		contenu += "<li>Pour éditer un contenu, cliquez sur le crayon... <img src='generateur/img/editer.png' align='bottom' /></li>";
		contenu += "<li>Pour supprimer un contenu, cliquez sur la corbeille... ";
		contenu += "<img src='generateur/img/poubelle.png' align='bottom' /></li></ul>";
		
		return contenu;
}

function contenu_Code(){
	var info = "<ol><li>Copiez ce code dans le presse-papier : <em>édition / copier</em>.</li>";
	info += "<li>Ouvrez un fichier vierge dans un éditeur de texte : Bloc-Notes, TextEdit, etc.</li>";
	info += "<li>Collez le contenu du presse-papier dans ce fichier : <em>édition / coller</em>.</li>";
	info += "<li>Enregistrez ce fichier sous le nom : <em>data.json</em>.</li>";
	info += "<li>Revenez dans le générateur JDicto.</li>";
	info += "<li>Procurez-vous une copie de l'exerciseur, JDicto ou ExEcho : menu <em>Actions / Exerciseur&hellip;</em>.</li></ol>";
	
	return info;
}


function contenu_Aide_Audio(){
			var msg_aide = "Afin de garantir la compatibilité avec les tablettes qui n'utilisent pas de Flash, ";
			msg_aide += "il convient de placer deux formats audio du même enregistrement :</p>";
			msg_aide += "<ol><li>format mp3</li><li>format ogg</li></ol>";
			msg_aide += "<p>Indiquez seulement le nom commun du fichier dans le champ audio,<br />";
			msg_aide += "<em>sans son extension : ni .mp3 ni .ogg.</em></p>";
			msg_aide += "<p>Par exemple, si vous avez deux fichiers : <em>dictee62.mp3</em> et <em>dictee62.ogg</em>, ";
			msg_aide += "indiquez seulement dans le champ 'Nom du fichier audio'&nbsp;: <em>dictee62</em>.";
			
			return msg_aide;
}

function pied_bis(){
	// Pied de page BIS 
  var pied = "<footer><img src='generateur/img/icon_128.png' alt='logo' width='10%' /> ";
  pied += "JDicto - © 2012 Patrick Cardona</footer>";

	return pied;
}
