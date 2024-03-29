/*

Copyright (c) YEAR - YOUR NAME - URL TO ORIGINAL

Permission is hereby granted, free of charge, to any person 
obtaining a copy of this software and associated documentation 
files (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of 
the Software, and to permit persons to whom the Software is 
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall 
be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.

*/


/*
	Modal Box
*/

function showBox($id, $content){
	$($id).stackbox({
		closeButton: true,
		position: 'bottom',
		animOpen: 'tada slow',
		closeButton: false,
		//backdrop: true,
		//width: 500,
		content: '<div style="font-size:18px;" class="stackbox-body">' + row.hint+'</div>',
	});
}



/*
	Onload
*/

window.onload = function() {

	var selectedCategories = [];
	var Selectedlevel = $('#levels').val();

	var chosenCategory; // Selected catagory
	var getHint; // Word getHint
	var word; // Selected word
	var guess; // Geuss
	var geusses = []; // Stored geusses
	var lives; // Lives
	var counter; // Count correct geusses
	var space; // Number of spaces in word '-'
	var block;
	var ChosenCategoryIndex;
	var chosenLevel;

	// Get elements
	var showLives = document.getElementById("mylives");
	var showCatagory = document.getElementById("scatagory");
	var getHint = document.getElementById("hint");
	var showClue = document.getElementById("clue");

/*
	Loading Data
*/
	$.each(categoriesInfo, function(val, text) {
		$('#categories').append( $('<option '+text.status+'></option>').val(val).html(text.title+" ("+categories[val].length+")") );
		if(text.status==="selected")
			selectedCategories.push(val);
	});


	$.each(levels, function(val, text) {
		if(val == 0)
			$('#levels').append( $('<option></option>').val(val).html(text) );
		else
			   $('#levels').append( $('<option disabled></option>').val(val).html(text) );
	});

	$('#levels').SumoSelect();

	$('#categories').SumoSelect(
	{
		okCancelInMulti:true,
		placeholder: 'Select Here',
		selectAll : true,
		selectAlltext : 'Select All'
	});

	$( "#levels" ).change(function() {
		Selectedlevel = $('#levels').val();
		reset();
	});

	$( "#categories" ).change(function() {
		selectedCategories = [];
		$('#categories :selected').each(function(i, selected){
			selectedCategories[i] = $(selected).val();
			reset();
			console.log(selectedCategories);
		});
	});

	// create alphabet ul
	var buttons = function() {
	myButtons = document.getElementById('buttons');
	letters = document.createElement('ul');

	for (var i = 0; i < alphabet.length; i++) {
		letters.id = 'alphabet';
		list = document.createElement('li');
		list.id = 'letter';
		list.className = "letter";
		list.innerHTML = alphabet[i];
		check();
		myButtons.appendChild(letters);
		letters.appendChild(list);
	}
	}
	

  // Select Catagory
  var selectCat = function() {
	catagoryName.innerHTML = ' <span class="ctg">الفئة المختارة هي ' + categoriesInfo[ChosenCategoryIndex].title + "</span>";
  }

  // Create geusses ul
  result = function() {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === " ") {
        guess.innerHTML = "&nbsp;&nbsp;";
        space = space + 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Show lives
  comments = function() {
    showLives.innerHTML = "تملك  " + lives + " محاولات ";
    var link;

    if(categoriesInfo[ChosenCategoryIndex].doc == "")	link = word;
    else link = '<a target="_blank" href="'+decodeURIComponent(categoriesInfo[ChosenCategoryIndex].doc)+word+'">' + word + "</a>";
	 

    if (lives < 1) {
      showLives.innerHTML = 'حظ أوفر٬ الاجابة الصحيحة هي  : <span class="ctg">'+link+'</span>';
      block = true;
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = 'لقد فزت! إجابتك صحيحة  : <span class="ctg">'+link+'</span>';
        block = true;
      }
    }
  }

  // Animate man
  var animate = function() {
    var drawMe = lives;
    drawArray[drawMe]();
  }

  // Hangman
  canvas = function() {

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;
  };

  head = function() {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  }

  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {

    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  }

  frame1 = function() {
    draw(0, 150, 150, 150);
  };

  frame2 = function() {
    draw(10, 0, 10, 600);
  };

  frame3 = function() {
    draw(0, 5, 70, 5);
  };

  frame4 = function() {
    draw(60, 5, 60, 15);
  };

  torso = function() {
    draw(60, 36, 60, 70);
  };

  rightArm = function() {
    draw(60, 46, 100, 50);
  };

  leftArm = function() {
    draw(60, 46, 20, 50);
  };

  rightLeg = function() {
    draw(60, 70, 100, 100);
  };

  leftLeg = function() {
    draw(60, 70, 20, 100);
  };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];




/*
	Two input ways : Click/Keypress
*/


	// On keypress 
	$(document).on("keypress", function (e) {
		var codek = e.which;
		if(!block){
			if(codek>1568 && codek<1611){
				geuss = unicodeTable[codek-1569];
				console.log("Keyboard input : "+ codek+" - "+geuss);
				var guessedLetter = $("#alphabet .letter:contains('"+geuss+"')");
				if(guessedLetter.length > 0){
					guessedLetter.attr({"class": "active"});
					guessedLetter.off('click');
					checkLetter();
				}
			}
		}
	});

	// OnClick Function
	check = function() {
		list.onclick = function() {
			if(!block){
				/*var*/ geuss = (this.innerHTML);
				this.setAttribute("class", "active");
				this.onclick = null;
				checkLetter();
			}
		}
	}

	checkLetter = function() {

		//$('#play').play();
		//document.getElementById('play').play();
		for (var i = 0; i < word.length; i++) {
			if (word[i] === geuss) {
				geusses[i].innerHTML = geuss;
				counter += 1;
			}
		}
			var j = (word.indexOf(geuss));
		if (j === -1) {
			lives -= 1;
			comments();
			animate();
		} else {
			comments();
		}
	}



/*
	Play - reset - hint Functions
*/

	  // Play
	  play = function() {
		ChosenCategoryIndex = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
		chosenCategory = categories[ChosenCategoryIndex];
		console.log(ChosenCategoryIndex);
		console.log(chosenCategory);
		row = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
		word = row.word;

		//word = word.replace(/\s/g, "-");
		console.log(word);
		buttons();

		geusses = [];
		lives = 10;
		counter = 0;
		space = 0;
		block = false;
		result();
		comments();
		selectCat();
		canvas();


	  }

	  reset = function() {
		correct.parentNode.removeChild(correct);
		letters.parentNode.removeChild(letters);
		showClue.innerHTML = "";
		context.clearRect(0, 0, 400, 400);
		play();
	  }

	  play();

	  // Hint
	  hint.onclick = function() {
		//if(!block){
			console.log(row.hint);
			//showClue.innerHTML = "Clue: - " + row.hint;
			showBox("#hint", "Clue: - " + row.hint);
		//}
	  };


	  // Reset
	  document.getElementById('reset').onclick = function() {
		reset();
	  }
}
