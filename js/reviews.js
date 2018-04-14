"use strict";


function saveData(id, value) {
    window.localStorage.setItem(id, JSON.stringify(value));
}

function clearStorage() {
    window.localStorage.clear();
}

function clearInput() {
    $('#name').val('');
    $('#text').val('');
}

function getData(id) {
    var storage = window.localStorage;
    var value = storage.getItem(id);
    return value && JSON.parse(value);
}



function loadReviews() {
    //checks to see if there is any data stored locally as 'storedReviews'. 
    //If there is it gets it, otherwise it enters the past reviews as an empty string
    if (getData('storedReviews') === null) {
        var pastReviews = '';
    }
    else {
        var pastReviews = getData('storedReviews');
    }
    $('#pastReviews').empty();
    $('#pastReviews').append(pastReviews);
}

function saveReview() {
    var reviewName = $('#name').val();
    var reviewBody = $('textarea').val();
	if(reviewName == '')
		reviewName = 'Anon';
    //if the keyword 'clear' is entered as a name or review the local storage is wiped
    if (reviewName === 'clear' || reviewBody === 'clear') {
        clearStorage();
        clearInput();
        loadReviews();
    }
   
    else {
        //if this is not the case the review is wrapped in HTML, added to the beginning of the past reviews (if they exist) and added to the page
		var d = new Date();
		var dateStr = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
		//records date with review
        var reviewAll = '<section><p class="reviewBody">"' + reviewBody + '"</p> <p class="reviewName"> - ' + reviewName + ' ' + dateStr +  '</p></section>';
        if (getData('storedReviews') === null) {
            var pastReviews = '';
        }
        else {
            var pastReviews = getData('storedReviews');
        }
        pastReviews = reviewAll + pastReviews;
        saveData('storedReviews', pastReviews);
        loadReviews();
        clearInput();
    }
}




