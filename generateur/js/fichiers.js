/* 
 * fichier.js
 * 
 * Fonctions de lecture de fichier JSON : on récupère un objet 'data'
 * ( c ) 2012 Patrick Cardona
 * jDicto version 1.0.0
 * 
 * @source: http://code.google.com/p/jdicto/
 * 
 * IMPORTANT : ce fichier doit se trouver dans le dossier 'js' du générateur !
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


function lireFichier(key) {
    
    // On charge les données de cet exercice
    
    // On récupère le nom du fichier...
    var code = window.localStorage.getItem(key);
    var data = $.parseJSON(code);
	
        var sortie = "Exerciseur : <em>" + data.app_name + "</em><br />"; // Application 
        sortie += "Professeur : <em>" + data.prof + "</em><br />"; // Auteur de l'exercice
        sortie += "Titre de l'exercice : <em>" + data.titre + "</em><br />"; // Titre de l'exercice
        sortie += "Version : <em>" + data.version + "</em></p>";
        $('#contenu_fichier').html(sortie);
        $('#contenu_fichier').show();
  }
  
  /*
   * Supprimer une version
   */
  function supprimeFichier(key) {

    // On supprime les données de cet exercice ?
    jConfirm("Supprimer cet exercice ?","Suppression d'un contenu stocké", function(r){
    	if (r){
    		
	    	// On supprime l'enregistrement de la base locale...
	    	window.localStorage.removeItem(key);
    		$("#contenu_fichier").html("");
    		jAlert("Le contenu référencé par la clé "+ key +" a été supprimé.","Suppession d'un contenu");
    		$("a[title='Modifier une dictée ou une réécriture']").click(); // Appel récursif pour forcer l'actualisation avec FF

    	}else{
    		$("#contenu_fichier").html("");
    	}
    });
    
    

  }
  
  /*
   * Propager les données à partir du fichier lu :
   */
  function propagerLesDonnees(key) {
	
    var code = window.localStorage.getItem(key);
    var data = $.parseJSON(code);
    /*
     * On affiche un formulaire de création à remplir avec les données récupérées
     */
    
    /*
     * Récupération des données :
     */
      switch(data.app_name){
      	
      	case "jDicto":
      		// Données éditoriales :
	      	$("#edito_dictee_0").val(data.titre);
	        $("#edito_dictee_1").val(data.auteur);
	        $("#edito_dictee_2").val(data.ouvrage);
	        $("#edito_dictee_3").val(data.prof);
	        $("#edito_dictee_4").val(data.audio);
	        
	        // On remplit la zone de texte :
        
	        $("#zonetexte_Dictee").val(data.texte);
	        // On affiche la zone des données éditoriales et on masque la zone courante
	        $("*[div*=etape]").each(function(){
	        	$(this).hide();
	        });
	        $("#etape_Action_Creation_Dictee").show();
	        $("#etape_Action_Edition").hide();
	        
	        $("#titre_aide").text("Pas à pas : dictée");
			$("#contenu_aide").html(contenu_Pas_A_Pas_Dictee());
			$("#zone_aide").show();
      	break;
      	
      	case "jecho":
      		// Données éditoriales :
	      	$("#edito_echo_0").val(data.titre);
	        $("#edito_echo_1").val(data.auteur);
	        $("#edito_echo_2").val(data.ouvrage);
	        $("#edito_echo_3").val(data.prof);
	        
	        
	        // On remplit les zones de texte :
        
	        $("#zonetexte_Echo").val(data.texte);
	        $("#zoneBIS").val(data.correction);
	        $("#zoneConsigne").val(data.consigne);
	        // On affiche la zone des données éditoriales et on masque la zone courante
	        $("*[div*=etape]").each(function(){
	        	$(this).hide();
	        });
	        $("#etape_Action_Creation_Echo").show();
	        $("#etape_Action_Edition").hide();
	        
	        $("#titre_aide").text("Pas à pas : réécriture");
			$("#contenu_aide").html(contenu_Pas_A_Pas_Echo());
			$("#zone_aide").show();
      	break;
      	
      	default:
      	
      	break;
      }
      
        
        
  }
  
  function listerJSON(){
  	var sortie = "<p>";
  	if(window.localStorage.length > 0){
  		sortie += "Exercices enregistrés :</p><table id='dictees'>";
  		for(key in localStorage){
  			var data = $.parseJSON(window.localStorage.getItem(key));
  			
  				sortie += "<tr id='"+ key +"'><td>" + data.titre + " (" + data.version + ")</td>";
  				sortie += "<td><img alt='Détail' src='generateur/img/loupe.png' /></td><td><img alt='Ouvrir' src='generateur/img/editer.png' />";
  				sortie += "</td><td><img src='generateur/img/poubelle.png' alt='Supprimer' /></td>";
  				sortie += "</tr>";
  			
  			}
  			
  		sortie += "</table>";
  		
  	}else{
  		sortie += "Aucun exercice enregistré.</p>";
  		
  	}
  	$("#liste_dictees").html(sortie);
  	
  	$("#dictees tr td:nth-child(2)").bind({
  		"click": function(){
  			// Détail...
  			$(".clique").removeClass("clique");
  			$(this).addClass("clique");
  			var cle = $(this).parent().attr("id");
  			
  			lireFichier(cle);
  			
  		},
  		
  		"mouseover": function(){
  			$(this).css("cursor","pointer");
  		},
  		
  		"mouseout": function(){
  			$(this).css("cursor","default");
  		}
  	});
  	
  	$("#dictees tr td:nth-child(3)").bind({
  		"click": function(){
  			// Ouvrir...
  			var cle = $(this).parent().attr("id");
  			propagerLesDonnees(cle);
  		},
  		
  		"mouseover": function(){
  			$(this).css("cursor","pointer");
  		},
  		
  		"mouseout": function(){
  			$(this).css("cursor","default");
  		}
  	});
  	
  	$("#dictees tr td:nth-child(4)").bind({
  		
  		"mouseover": function(){
  			$(this).addClass("rouge");
  		},
  		"mouseout": function(){
  			$(this).removeClass("rouge");
  		},
  		"click": function(){
  			// Suppression...
  			var cle = $(this).parent().attr("id");
  			$(".clique").removeClass("clique");
  			$("#contenu_fichier").html("Suppression...")
  			$(this).addClass("rouge");
  			supprimeFichier(cle);
  			
  		}
  		
  		});
  	
  }
  
  /* Importation : données collées dans la zone de texte */
  /*
   * Propager les données à partir du code :
   */
  function propagerCode(code) {

   try{
		var data = $.parseJSON(code);
    /*
     * On affiche un formulaire de création à remplir avec les données récupérées
     */
    
    /*
     * Récupération des données :
     */
      if(data.app_name != "undefined"){
		switch(data.app_name){
      	
      	case "jDicto":
      	case "jdicto":
      		// Données éditoriales :
	      	$("#edito_dictee_0").val(data.titre);
	        $("#edito_dictee_1").val(data.auteur);
	        $("#edito_dictee_2").val(data.ouvrage);
	        $("#edito_dictee_3").val(data.prof);
	        $("#edito_dictee_4").val(data.audio);
	        
	        // On remplit la zone de texte :
        
	        $("#zonetexte_Dictee").val(data.texte);
	        // On affiche la zone des données éditoriales et on masque la zone courante
	        $("*[div*=etape]").each(function(){
	        	$(this).hide();
	        });
	        $("#etape_Action_Creation_Dictee").show();
	        $("#etape_Action_Importer").hide();
	        
	        $("#titre_aide").text("Pas à pas : dictée");
			$("#contenu_aide").html(contenu_Pas_A_Pas_Dictee());
			$("#zone_aide").show();
      	break;
      	
      	case "jecho":
      	case "execho":
      		// Données éditoriales :
	      	$("#edito_echo_0").val(data.titre);
	        $("#edito_echo_1").val(data.auteur);
	        $("#edito_echo_2").val(data.ouvrage);
	        $("#edito_echo_3").val(data.prof);
	        
	        
	        // On remplit les zones de texte :
        
	        $("#zonetexte_Echo").val(data.texte);
	        $("#zoneBIS").val(data.correction);
	        $("#zoneConsigne").val(data.consigne);
	        // On affiche la zone des données éditoriales et on masque la zone courante
	        $("*[div*=etape]").each(function(){
	        	$(this).hide();
	        });
	        $("#etape_Action_Creation_Echo").show();
	        $("#etape_Action_Importer").hide();
	        
	        $("#titre_aide").text("Pas à pas : réécriture");
			$("#contenu_aide").html(contenu_Pas_A_Pas_Echo());
			$("#zone_aide").show();
      	break;
      	
      	default:
			jAlert("Le code n'est pas conforme. Veuillez importer une dictée (format JDicto) ou une réécriture (format Execho).");
      	
      } // fin switch
	} // fin if
} // fin try
catch(e){
 jAlert('Erreur. Le code soumis ne peut être importé : '+e.message);
}
   
            
} // fin fonction propagerCode
  
  

