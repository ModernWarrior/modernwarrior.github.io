$(document).ready(function(){
	//Level 1 is to indicate if was complete or not
	// var level1 = false;
	// var level2 = false;
	//sets level

	// get the local storage user
	var currentUser = getUser();
	var cycle = 0;
	var currentExercise = 0;
	var delaySwitch = false;
	var hideComplete = false;
	// var isPaused = true;
	
	// if the current user has a saved level, restore it
	if (currentUser.cycle){
		cycle = currentUser.cycle;
	}else(updateUser("cycle",'0'))
	// if the current user has a saved mood, update the icon
	if (currentUser.mood){
		$('.exercise-icon').html('<img src="img/'+currentUser.mood+'.png">');
	}else (updateUser("mood",'dot') ) //DEFAULT MODE
	if(currentUser.pushUp1){
		pushUp1 = currentUser.pushUp1;
	}
	// }else(updateUser("pushUp1",'0'));

	//DEFAULT SETTINGS
	$('.btn-row').hide();


	var clock = setInterval(workoutProgram, 1000);
	var delayWorkout = setTimeout(delay,5050);

	//Time Calculator
	function getTimeRemaining(endtime){
		//Date.parse is converting to milliseconds. Essentially I'm trying to build a calculator with the var time
		var time = timer;
		var seconds = Math.floor( (timer/1000) % 60 );
		var minutes = Math.floor( (timer / 1000 / 60 ) % 60 );
		return {
			'total': timer,
			'minutes': minutes,
			'seconds': seconds
		};
	}

			//LEVEL SELECTOR
//These levels are updating but not being recognized by the if level == statements
	// var challenge = $('level').val();

		if( cycle == 1 ){
			cycle = 1;
			updateUser("cycle",cycle);
			console.log("level 1"); //console log just level to test
			 // imageEnter(sendUp);
			var timer = 5000;
			$('.exercise-title').hide();
			$('.exercise-icon').hide();
			$('.btn-row').hide();
			delaySwitch = true;
			hideComplete = true;
			
				function delay(){
					if (delaySwitch === true){
					clock = clearInterval(clock);
					cycle = 2;
					$('.exercise-title').html('Pushups');
					$('.exercise-icon').show();
					timer = 6000;
					clock = setInterval(workoutProgram, 1000);
					console.log("I am the timed cycle 2 :)");
					hideComplete = false;
					// $('.next-form').html('<form id="exercise-count"> <input id="pushupcount1" type="number" name="pushupcount"></form>')
					// $('.next').html('<a class="exercise3 next-btn" href="timer.html">Level Up</a>');
					cycle = 3;
					updateUser("cycle",cycle);
					// $('input[id="pushupcount1"]').each(function(){
					// 	var id = $(this).attr('id');
					// 	var value = $(this).val();
					// 	localStorage.setItem("pushupcount1",pushUp1.value)
					// });
					document.getElementById('exercise3').addEventListener("click", function(){
						var pushUp1 = getElementById('pushupcount1').value;
						updateUser("pushupcount1", pushUp1);
					});
						// console.log('this var is: ' + pushUp1);
				 	// updateUser("pushupcount1", pushUp1.value);

					// $('.levelup').html('<a class="challenge3 next-btn" href="timer.html">Level Up</a>');
				}else{
					console.log('No delay');
				}
			};
				
		}else if ( cycle == 2 ){
			console.log("level 2");
			timer = 6000;
			$('.exercise-title').show();
			$('.exercise-title').html('Punch Cycle')
			$('.exercise-icon').show();
			$('.next').html('<a class="exercise3 next-btn" href="timer.html">Level Up</a>');

		}else if ( cycle == 3 ){
			console.log("level 3");
			timer = 9000;
			$('.exercise-title').html('Punch Cycle');
			$('.next').html('<a class="exercise3 next-btn">Level Up</a>');
		}else{
			console.log("none");
		}

		$('.exercise1').click(function(){
			cycle = 1;
			updateUser("cycle",cycle);
			
		});

		$('.exercise2').click(function(){
			cycle = 2;
			updateUser("cycle",cycle);
			timer = 6000;
			$('.exercise-title').html('Pushups');
			clock = setInterval(workoutProgram, 1000);
			console.log('I am running from the button');
			$('.next').html('<a class="exercise3 next-btn" href="timer.html">Level Up</a>');
		});

		$('.exercise3').click(function(){
			cycle = 3;
			updateUser("cycle",cycle);
			console.log(cycle);
			console.log('I am exercise three');
			timer = 9000;
			clock = setInterval(workoutProgram, 1000);
			console.log(timer);

		});

		$('.exercise4').click(function(){
			cycle = 4;
			updateUser("cycle",cycle);
		});

		$('.exercise5').click(function(){
			cycle = 5;
			updateUser("cycle",cycle);
		});

		$('.stop-btn').click(function(){
			cycle = 0;
			updateUser("cycle",cycle);
			clearTimeout(delayWorkout);
		});
		
		function workoutProgram(){
			if ( cycle !== 0  ){
				var time = timer;
				// setInterval(test);
				var time = getTimeRemaining(timer); 
				// console.log(time);
				$('#timer').text(time.minutes + ":" + time.seconds );
				$('#timer').show();
				$('.exercise-title').show();
				$('.exercise-icon').show();
				$('.btn-row').hide();
				$('.stop').show();
				$('.complete-display').hide();
				timer -= 1000;
				console.log(timer);

				if (timer === 0 && hideComplete === false){
					$('.exercise-icon').hide();
					$('.complete-display').show();
					$('.stop').hide();
					$('.btn-row').show();
					clearInterval(clock);
					console.log(cycle);
				}else{
					// to use "time.seconds" we need to first get a time object back from getTimeRemaining()
					$('.preworkout').css('display', 'none');
					$('.motivation').css( 'visibility', 'hidden' );
					// $('.complete-display').css( ' visibility', 'hidden' );
				};

				if (timer === 0 && cycle === 0){
					clearInterval(clock);

				}
			}else{
				$('#timer').html('Stopped');
				console.log('Stopped');
				$('.stop').hide();
				$('.btn-row').show();
				// isPaused = false;
				cycle=0;
				clearInterval(clock);
				// $('#timer').hide;
			}
		}

	//IMAGE//
	
		$('.dot').click(function(){
			$('.exercise-icon').html('<img src="img/dot.png">');
			updateUser("mood",'dot');
		});

		$('.heart').click(function(){
			$('.exercise-icon').html('<img src="img/heart.png">');
			updateUser("mood",'heart');
		});
	});
	
	/**USER SET UP**/
	function updateUser(setting,value){
		var user = JSON.parse(localStorage.getItem('user'));
		if (!user){
			user = {};
		}
		user[setting] = value; // user.mood
		localStorage.setItem('user', JSON.stringify(user));
	}

	function getUser(){
		var user = JSON.parse(localStorage.getItem('user'));
		if (!user){
			return {};
		}
		return user;
	}

	/**AUDIO PLAYER**/
	// $('.audio1').click(function(){
	// 		$('.music').append('<source src="audio/song.mp3" type="audio/mp3">');
	// 		updateUser("music",'song1');
	// 	});
	
