/* 
 * interface.js
 * 
 * Gestion des événements dans le générateur de jDicto
 * (c) 2012 - Patrick Cardona
 * jDicto version : 1.4.0
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

// Initialisation  des données de la Barre de progression :

var pct=0;
var valmax=0;
var handle =0;
var navigateur = null;

/*
 *  Initialisation  des données des menus
 */

var timeout    = 500;
var closetimer = 0;
var ddmenuitem = 0;

/*
* Position du curseur de texte
*/
var position = 0;

/*
 * Gestion barre de progression
 */
function update(){
        pct = pct + 4;
        $("#barre").reportprogress(pct);
        if(pct == 100){
        	clearInterval(handle);
        	pct=0;
        	$("#enregistrement").show();
        	$("#label_barre").hide();
        	$("#bloc_barre").hide();
        }

}

/* ****************************************************************** */
/* Interface utilisateur au moyen de gestionnaires d'événements JQuery */
/* ****************************************************************** */

$(document).ready(function(){

/*
 * On crée une instance de l'objet Dictee
 */
var dictee = new oDictee();

/*
 * On crée une instance de l'objet Echo
 */
var echo = new oEcho();
/*
 * On doit actualiser la version de cette dictée ou de cet exercice en fonction de l'heure courante
 */
window.setTimeout(
    function() {
        var timbre = obtientDate();
        dictee.version = timbre;
        echo.version = timbre;
        
    },
    60000
);  // On raffraîchit toutes les minutes…

/*
 * On affiche la zone de menu :
 */
$("#menu").show();

$('#MenuDeroulant > li').bind('mouseover', MenuDeroulant_open);
$('#MenuDeroulant > li').bind('mouseout',  MenuDeroulant_timer);
$('document').click(function(){
	MenuDeroulant_close();
});
		
/*
 * On charge les zones de l'interface :
 */	
// D'abord Edition, puis création
$("#monAction").html(action_Edition());
$("#monAction").append(action_Creation_Dictee());
$("#monAction").append(action_Creation_Echo());

 
// Autres étapes emplilées
$("#FinAction").html(action_Texte_Dictee());
$("#FinAction").append(action_Texte_Echo());
$("#FinAction").append(action_Texte_BIS());
$("#FinAction").append(action_Consigne());
// Compteur de mots
$('.word_count').each(function() {
        var input = '#' + this.id;
        var count = input + '_count';
        $(count).show();
        word_count(input, count);
        $(this).keyup(function() { word_count(input, count) });
    });
$("#FinAction").append(action_Code());
$("#FinAction").append(action_Copie_Exerciseur_Dictee());
$("#FinAction").append(action_Copie_Exerciseur_Echo());
	
/*
 * Affichage de l'aide
 */
	function Aide(){
		this.titre = "";
		this.contenu = "";
	}
	
	Aide.prototype.affiche = function(){
		$("#titre_aide").text(this.titre);
		$("#contenu_aide").html(this.contenu);
		$("#contenu_aide").append(pied_bis());
		$("#zone_aide").show();
	}
	
	var aide = new Aide();
	
	/*
	 * Lien : présentation
	 */
	$("a[title='Présentation']").click(function(e){
		/*
		 * On affiche le logo majeur
		 */
		// On masque les zones non sollicitées
		$("#chemin_fichier").hide();
		$("*[id*=etape]").each(function(){
			$(this).hide();
		});
		
		//$("footer").hide();
		/*$("[id*=exerciseur]").each(function(){
			$(this).hide();	
		});*/
		
		$("#logo").animate(
					{
					width:501,
					heigth: 200,
					top:0,
					opacity:100},{
						duration: 1500,
    					easing: 'linear',
    					complete: function(){
    						
				    			
				    			$("#copy").show();
				    			/*
				    			 * On vide les champs
				    			 */
				    			$("*[id*=edito_]").each(function(){
									$(this).val("");
								});
				    		
						}
					});
		

		aide.titre = "Présentation";
		aide.contenu = contenu_Presentation();
		aide.affiche();
		e.preventDefault(); // Pour ne pas suivre le lien.
	});
	
	
	
	/*
	 * Lien : Exerciseur
	 */
	
	$("a[title='Exerciseur de dictée']").click(function(e){
		
		$("#logo").animate(
					{
					width:0,
					heigth: 0,
					top:0,
					opacity:0},{
						duration: 1500,
    					easing: 'linear',
    					complete: function(){
    						
				    			//$("#chemin_fichier").hide();
				    			$("*[id*=etape]").each(function(){
									$(this).hide();
								});
				    			$("footer").show();
				    			$("#copy").hide();
				    			$("#etape_Action_Copie_Exerciseur_Dictee").show();
				    			
				    		
						}
					});
		aide.titre = "Exerciseur de dictée";
		aide.contenu = contenu_Exerciseur_Dictee();
		aide.affiche();
		e.preventDefault(); // Pour ne pas suivre le lien.
	});
	
	$("a[title='Exerciseur de réécriture']").click(function(e){
		
		$("#logo").animate(
					{
					width:0,
					heigth: 0,
					top:0,
					opacity:0},{
						duration: 1500,
    					easing: 'linear',
    					complete: function(){
    						
				    			//$("#chemin_fichier").hide();
				    			$("*[id*=etape]").each(function(){
									$(this).hide();
								});
				    			$("footer").show();
				    			$("#copy").hide();
				    			$("#etape_Action_Copie_Exerciseur_Echo").show();
				    			
				    		
						}
					});
		aide.titre = "Exerciseur de réécriture";
		aide.contenu = contenu_Exerciseur_Echo();
		aide.affiche();
		e.preventDefault(); // Pour ne pas suivre le lien.
	});
		
	/*
	 * Lien : Principe
	 */
	
	$("a[title='Principe']").click(function(e){
		aide.titre = "Principe";		
		aide.contenu = contenu_Principe();	  
		aide.affiche();
		e.preventDefault(); // Pour ne pas suivre le lien.
	});

	/*
	 * Lien : Préparation des fichiers audio
	 */	
	$("a[title='Préparation des fichiers audio']").click(function(e){
		aide.titre = "Préparation des fichiers audio";
		aide.contenu = contenu_Audio();
		aide.affiche();
		e.preventDefault(); // Pour ne pas suivre le lien.
	});
	
	/*
	 * Lien : Pas à pas
	 */
	$("a[title='Pas à pas : dictée']").click(function(e){
		aide.titre = "Pas à pas : dictée";
		aide.contenu = contenu_Pas_A_Pas_Dictee();
		aide.affiche();
		e.preventDefault(); // Pour ne pas suivre le lien.
	});
	
	$("a[title='Pas à pas : réécriture']").click(function(e){
		aide.titre = "Pas à pas : réécriture";
		aide.contenu = contenu_Pas_A_Pas_Echo();
		aide.affiche();
		e.preventDefault(); // Pour ne pas suivre le lien.
	});
	
	/*
	 * Lien licence
	 */
	$("a[title='Licence']").click(function(e){
		jAlert(lic,"Licence");
		e.preventDefault();
	});
	
	/*
	 * Lien Contact :
	 */
	$("a[title='Contact']").click(function(e){
		jAlert("pcardona34@gmail.com","Contact");
		e.preventDefault();
	});
	
	// Gestionnaire de l'aide contextuelle
	$("a[title='Noms des fichiers audio']").click(function(e){
		aide.titre = "Noms des fichiers audio";
		aide.contenu = contenu_Aide_Audio();
		aide.affiche();
		e.preventDefault(); // empêche le suivi du lien ou le rechargement de la page
	});
	
	/*
	 * Lien Créer une dictée / une réécriture
	 */
	$("a[title='Créer une dictée']").click(function(e){
		$("#logo").animate(
					{
					width:0,
					heigth: 0,
					top:0,
					opacity:0},{
						duration: 1500,
    					easing: 'linear',
    					complete: function(){
    						
				    			$("*[id*=etape]").each(function(){
				    				$(this).hide();
				    			});
				    			$("#etape_Action_Creation_Dictee").show();	
				    			$("footer").show();
				    			$("#copy").hide();
				    			/*
				    			 * On vide les champs
				    			 */
				    			$("*[id*=edito_dictee]").each(function(){
									$(this).val("");
								});
								/*
								 * Idem pour le texte de la dictée...
								 */
								$("#zonetexte_Dictee").val("Mon texte");
				    		
						}
					});
		aide.titre = "Pas à pas : dictée";
		aide.contenu = contenu_Pas_A_Pas_Dictee();
		aide.affiche();
		// On vide le code stocké :
		dictee.code = "";
		dictee.version = obtientDate();
		e.preventDefault();
	});
	
	$("a[title='Créer une réécriture']").click(function(e){
		$("#logo").animate(
					{
					width:0,
					heigth: 0,
					top:0,
					opacity:0},{
						duration: 1500,
    					easing: 'linear',
    					complete: function(){
    						
				    			$("*[id*=etape]").each(function(){
				    				$(this).hide();
				    			});
				    			$("#etape_Action_Creation_Echo").show();	
				    			$("footer").show();
				    			$("#copy").hide();
				    			/*
				    			 * On vide les champs
				    			 */
				    			$("*[id*=edito_echo]").each(function(){
									$(this).val("");
								});
								/*
								 * Idem pour le texte de la dictée...
								 */
								$("#zonetexte_Echo").val("Mon texte");
				    		
						}
					});
		aide.titre = "Pas à pas : réécriture";
		aide.contenu = contenu_Pas_A_Pas_Echo();
		aide.affiche();
		// On vide le code stocké :
		echo.code = "";
		echo.version = obtientDate();
		e.preventDefault();
	});
	
	
	/*
	 * Modifier une dictée
	 */
	$("a[title='Modifier une dictée ou une réécriture']").click(function(e){
		$("#logo").animate(
					{
					width:0,
					heigth: 0,
					top:0,
					opacity:0},{
						duration: 1500,
    					easing: 'linear',
    					complete: function(){
    						
				    			$("*[id*=etape]").each(function(){
				    				$(this).hide();
				    			});
				    			$("#etape_Action_Edition").show();
				    			$("#chemin_fichier").show();
				    			$("footer").show();
				    			$("#copy").hide();
				    			$("#contenu_fichier").hide();
				    			$("#charger_contenu").hide();
				    			listerJSON();	
				    		
						}
					});
		aide.titre = "Modifier une dictée ou une réécriture";
		aide.contenu = contenu_Modifier();
		aide.affiche();
		// On vide le code stocké :
		dictee.code = "";
		dictee.version = obtientDate();
		echo.code = "";
		echo.version = obtientDate();
		e.preventDefault();
	});
	
	
	
	// On affiche la présentation par défaut :
	$("a[title=Présentation]").click();

/*
 * Suite de l'initialisation de l'interface
 */

// On initialise et on masque la Barre de progression
$("#barre").reportprogress(0);

// Caractères spéciaux
	$(".spec_Dictee").click(function(){	
			var carspec = $(this).text();			
			var texte = $("#zonetexte_Dictee").val();
			var texte2 = texte.substring(0,position);
			var texte3 = texte.substring(position);
			var texte = texte2 + carspec + texte3;
			$("#zonetexte_Dictee").val( texte );
			// On replace le curseur après le caractère inséré :
			$("#zonetexte_Dictee").focus();
			$("#zonetexte_Dictee").caret(position + 1)
			
		});
		
// Caractères spéciaux
	$(".spec_Echo").click(function(){			
			var carspec = $(this).text();			
			var texte = $("#zonetexte_Echo").val();
			var texte2 = texte.substring(0,position);
			var texte3 = texte.substring(position);
			var texte = texte2 + carspec + texte3;
			$("#zonetexte_Echo").val( texte );
			// On replace le curseur après le caractère inséré :
			$("#zonetexte_Echo").focus();
			$("#zonetexte_Echo").caret(position + 1)
		});
		
	// Caractères spéciaux
	$(".spec_BIS").click(function(){
			var carspec = $(this).text();			
			var texte = $("#zoneBIS").val();
			var texte2 = texte.substring(0,position);
			var texte3 = texte.substring(position);
			var texte = texte2 + carspec + texte3;
			$("#zoneBIS").val( texte );
			// On replace le curseur après le caractère inséré :
			$("#zoneBIS").focus();
			$("#zoneBIS").caret(position + 1)
		});
	
	
	// Aide contextuelle
	$(".aide").click(function(e){
			jAlert ("Cliquez sur un caractère spécial pour l'insérer dans votre texte.","Aide : insertion de caractères");
			e.preventDefault();
		});


// Gestionnaire d'événement : quand on clique sur un bouton…
$("input:submit").click(function(e){
	
	// On applique le style Bouton enfoncé...
	$(this).addClass("mousedown"),$(this).mouseout(function(){
		$(this).removeClass("mousedown");
	});
	// Quel label sur le bouton ?
	var label_bouton = $(this).val();
	switch(label_bouton){
		
		case "Charger ce contenu dans le générateur":
			propagerLesDonnees();
			// Gestionnaire de l'aide contextuelle
			aide.titre = "Pas à pas";
			aide.contenu = contenu_pas_a_pas_Dictee();
			aide.affiche();
		break;
			
		
		case "Supprimer cette version":
			supprimeFichier();
			// On raffraîchit la liste des dictées stockées
			listerJSON();
		break;
		
		
		case "Enregistrer les paramètres de la dictée":
			var bonneSaisie = true;
				// Les données saisies sont-elles valides ?
				$("*[id*=edito_dictee]").each(function(){
					if ( $(this).val().length == 0 ){ // Si une saisie est vide !
							var msg = "Le champ " + $(this).attr("name") + " est vide !";
							bonneSaisie = false;
							jAlert( msg, "Erreur de saisie" );
							return false;
					}
				}); // fin vérif saisie données édito

				if ( bonneSaisie == true ){ // La saisie est correcte
					// On stocke les données éditoriales
					dictee.titre = $("#edito_dictee_0").val();
					dictee.auteur = $("#edito_dictee_1").val();
					dictee.ouvrage = $("#edito_dictee_2").val();
					dictee.prof = $("#edito_dictee_3").val();
					dictee.audio = $("#edito_dictee_4").val();
				
					// Mise à jour du compteur de mots
					word_count("#zonetexte_Dictee","#zonetexte_Dictee_count");
					$("#zonetexte_Dictee_count").show();
					$("*[id*=etape]").each(function(){
						$(this).hide();
					});
					$("#etape_Action_Texte_Dictee").show();
				}
		break;
		
		case "Enregistrer les paramètres de la réécriture":
			var bonneSaisie = true;
				// Les données saisies sont-elles valides ?
				$("*[id*=edito_echo]").each(function(){
					if ( $(this).val().length == 0 ){ // Si une saisie est vide !
							var msg = "Le champ " + $(this).attr("name") + " est vide !";
							bonneSaisie = false;
							jAlert( msg, "Erreur de saisie" );
							return false;
					}
				}); // fin vérif saisie données édito

				if ( bonneSaisie == true ){ // La saisie est correcte
					// On stocke les données éditoriales
					echo.titre = $("#edito_echo_0").val();
					echo.auteur = $("#edito_echo_1").val();
					echo.ouvrage = $("#edito_echo_2").val();
					echo.prof = $("#edito_echo_3").val();
					
					
					// Mise à jour du compteur de mots
					word_count("#zonetexte_Echo","#zonetexte_Echo_count");
					$("#zonetexte_Echo_count").show();
					
					$("*[id*=etape]").each(function(){
						$(this).hide();
					});
					$("#etape_Action_Texte_Echo").show();
				}
		break;
		
		case "Enregistrer la dictée":
			dictee.texte = $("#zonetexte_Dictee").val();
			
			// On génère et on stocke le code JSON des données de l'exercice
			$("#bloc_barre").show();
			handle = setInterval("update()",25);
			if(dictee.code != undefined){
				delete dictee.code;
				delete dictee.fic_code;
			}
			dictee.genereCode();
			
			$("#zonecode").val(dictee.code);
			
			$("*[div*=etape]").each(function(){
				$(this).hide();
			});
			$("#etape_Action_Code").show();
			$("#etape_Action_Texte_Dictee").hide();
			/*
			 * Remarque importante :
			 * L'affichage du bloc exerciseur et du téléchargement du code sont consécutifs à la fin 
			 * de l'affichage de la barre de progression : cf. la fonction update() en début de fichier.
			 */
		break;
		
		case "Enregistrer le texte initial":
			echo.texte = $("#zonetexte_Echo").val();
			
			$("*[div*=etape]").each(function(){
				$(this).hide();
			});
			$("#etape_Action_Texte_BIS").show();
			$("#etape_Action_Texte_Echo").hide();
			
		break;
		
		case "Enregistrer le texte transformé":
			echo.correction = $("#zoneBIS").val();
			
			$("*[div*=etape]").each(function(){
				$(this).hide();
			});
			$("#etape_Action_Consigne").show();
			$("#etape_Action_Texte_BIS").hide();
			
		break;
		
		
		case "Enregistrer la consigne":
			echo.consigne = $("#zoneConsigne").val();
			
			// On génère et on stocke le code JSON des données de l'exercice
			$("#bloc_barre").show();
			handle = setInterval("update()",25);
			if(echo.code != undefined){
				delete echo.code;
				delete echo.fic_code;
			}
			echo.genereCode();
			
			$("#zonecode").val(echo.code);
			
			$("*[div*=etape]").each(function(){
				$(this).hide();
			});
			$("#etape_Action_Code").show();
			$("#etape_Action_Consigne").hide();
			/*
			 * Remarque importante :
			 * L'affichage du bloc exerciseur et du téléchargement du code sont consécutifs à la fin 
			 * de l'affichage de la barre de progression : cf. la fonction update() en début de fichier.
			 */
		break;
		
		
		case "Télécharger une dictée...":
			
    			window.location.href = "./generateur/res/dictee.zip";
			
		break;
		
		case "Télécharger une réécriture...":
			
    			window.location.href = "https://github.com/pcardona34/execho/archive/master.zip";
			
		break;
		
		case "Sélectionner le code":
			
    		$("#zonecode").select();
    		aide.titre = "Et maintenant... ?";
    		aide.contenu = contenu_Code();
    		aide.affiche();
			
		break;
		
		default:
		jAlert("Aucune action définie pour ce bouton !","Erreur dans la gestion de l'interface");
	}
	
	e.preventDefault(); // Empêche de suivre le lien ou de recharger la page
}); /* Fin gestionnaire de click sur un bouton */




	
}); // Fin de la fonction .ready
					
					
						
