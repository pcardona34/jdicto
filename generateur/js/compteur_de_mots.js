/*
 * compteur_de_mots.js
 * 
 * jDicto version 1.0
 * ( c ) 2012 Patrick Cardona
 */

/*
 * Inspiré de : http://www.electrictoolbox.com/jquery-count-words-textarea-input/
 */

/*$(document).ready(function() {

    

});*/

function word_count(field, count) {

    var number = 0;
    var matches = $(field).val().match(/\b/g);
    if(matches) {
        number = matches.length/2;
    }
    $(count).text( number + ' mot' + (number != 1 ? 's' : '') + ' environ');

}
