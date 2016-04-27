
$(document).ready(function(){

	/**GLOBAL VARIABLES**/
	var currentUser = getUser();
	var paused = false;
	var stopped = false;
	var cycle = 0;
	var currentExercise = 0;
	var delaySwitch = false;
	var hideComplete = false;
	var pushupcount1 = '0';
	var pushupcount1Last = '0'; //or leave undefined if something goes wrong
	var militarycount1 = '0';
	var militarycount1Last = '0';
	var widecount1 = '0';
	var widecount1Last = '0';
	var dipcount1 = '0';
	var dipcount1Last = '0'
	var pushupcount2 = '0';
	var pushupcount2Last = '0';
	var militarycount2 = '0';
	var militarycount2Last = '0';
	var widecount2 = '0';
	var widecount2Last = '0';
	var dipcount2 = '0';
	var dipcount2Last = '0';
	/**LOWER BODY VARIABLES**/
	var lungecount1 = '0';
	var lungecount1Last = '0';
	var squatcount1 = '0';
	var squatcount1Last = '0';
	var calfraisecount1 = '0';
	var calfraisecount1Last = '0';
	var lungecount2 = '0';
	var lungecount2Last = '0';
	var squatcount2 = '0';
	var squatcount2Last = '0';
	var calfraisecount2 = '0';
	var calfraisecount2Last = '0';
	/**CORE VARIABLES**/
	var situpcount1 = '0';
	var situpcount1Last = '0';
	var crunchcount1 = '0';
	var crunchcount1Last = '0';
	var legraisecount1 = '0';
	var legraisecount1Last = '0';
	var situpcount2 = '0';
	var situpcount2Last = '0';
	var crunchcount2 = '0';
	var crunchcount2Last = '0';
	var legraisecount2 = '0';
	var legraisecount2Last = '0';
	// var prepare = false;
	var runWorkout = 0;
	var delay;
	var prepareDelay1;
	var clock;


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

	//Time Calculator 
	function getTimeRemaining(endtime){
		//Date.parse is converting to milliseconds. Essentially I'm trying to build a calculator with the var time
		var time = timer;
		var seconds = Math.floor( (timer/1000) % 60 );
		var minutes = Math.floor( (timer / 1000 / 60 ) % 60 );
		// var elapsed = '0.0';
		// timer += 100;
		// elapsed = Math.floor(time/100) / 10;
		// if(Math.round(elapsed) == elapsed){ elapsed +='.0';}
		// var diff = (time - elapsed) - timer;
		// if (timer <= 500 ){
		// 	timer = 0;
		// }
		return {
			'total': timer,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function workoutProgram(){
		if ( cycle !== 0 && paused === false && runWorkout !== 0 && timer >= 0){
			var time = timer;
			// setInterval(test);
			var time = getTimeRemaining(timer); 

			// console.log(time);
			if (time.seconds <= 9){
				$('#timer').text(time.minutes + ":0" + time.seconds);
			}else{
				$('#timer').text(time.minutes + ":" + time.seconds );
			}
			
			// $('#timer').css('visibility','visible');
			$('.exercise-title').show();
			$('.exercise-icon').css('display','block');
			$('.exercise-icon').css('visibility','visible');
			$('.btn-row').hide();
			$('.stop').show();
			$('.complete-display').hide();
			timer -= 999;
			console.log(timer);
		}else if (cycle !== 0 && stopped == true){
			// $('#timer').css('visibility','hidden');
			console.log('Stopped');
			console.log(cycle);
			console.log(timer);
			$('.stop').hide();
			$('.btn-row').show();
			runWorkout = 0;
			updateUser("runWorkout",0);
			$('.exercise-icon').hide();
			// isPaused = false;
			// cycle=0;
			// clearInterval(clock);
			// $('#timer').hide;
		}else if (cycle == 99){
				$('.btn-row').show();
				$('#timer').css('visibility','invisible');
				$('.exercise-icon').hide();
				hideComplete = true;
				$('.done').prepend('<p class="done-text">You Completed The Upper Body Routine!</p>');
				$('.donearea').appendTo($('.done')).html('<a class="next-btn" href="index.html">DONE</a>');
				$('.done').css('display','block');
				$(".next-btn").click(function(){
						runWorkout = 0;
						updateUser("runWorkout",runWorkout)
						clearTimeout();
						clearInterval();
					});
		}else if (stopped === true){
			console.log('Stopped');
			clearInterval();
			clearTimeout();
			cycle = 0;
			updateUser("cycle",cycle);

		}else{
		console.log("Something broke.");
		console.log(time);
		// runWorkout = 0;
		// updateUser("runWorkout",0); //May delete
		};	

		if (timer <= 0 && hideComplete === false){
			$('.exercise-icon').css('visibility','hidden');
			$('.complete-display').show();
			$('.home-btn').css('display','none');
			// $('#timer').css('visibility','hidden');
			$('.stop').hide();
			$('.pause').hide();
			$('.btn-row').show();
			clearInterval(clock);
			console.log(cycle);
		}else{
			$('.preworkout').css('visibility','hidden');
			$('.motivation').css('visibility','hidden');
		};
	};//END RUN WORKOUT

	//USER SETTINGS - ROUTINES
	if(currentUser.runWorkout){
		runWorkout = currentUser.runWorkout;
	}else(updateUser("runWorkout",'0'))

	if (currentUser.cycle){
		cycle = currentUser.cycle;
	}else(updateUser("cycle",'0'))

	if (currentUser.exImg){
		$('.exercise-icon').html('<img src="img/dot.png">');
	}else (updateUser("exImg",'dot') )

	//EXERCISE SAVED DATA UPPER BODY
	if(currentUser.pushupcount1){
		pushupcount1 = currentUser.pushupcount1;
	}else(updateUser("pushupcount1",pushupcount1))
	if(currentUser.militarycount1){
		militarycount1 = currentUser.militarycount1;
	}else updateUser("militarycount1",militarycount1)
	if(currentUser.widecount1){
		widecount1 = currentUser.widecount1
	}else updateUser("widecount1",widecount1)
	if(currentUser.dipcount1){
		dipcount1 = currentUser.dipcount1;
	}else(updateUser("dipcount1",dipcount1))
	if(currentUser.pushupcount2){
		pushupcount2 = currentUser.pushupcount2;
	}else(updateUser("pushupcount2",pushupcount2))
	if(currentUser.militarycount2){
		militarycount2 = currentUser.militarycount2;
	}else(updateUser("militarycount2",militarycount2))
	if(currentUser.widecount2){
		widecount2 = currentUser.widecount2;
	}else(updateUser("widecount2",widecount2))
	if(currentUser.dipcount2){
		dipcount2 = currentUser.dipcount2;
	}else(updateUser("dipcount2",dipcount2));

	//LAST SAVED DATA UPPER BODY
	if(currentUser.pushupcount1Last){
		pushupcount1Last = currentUser.pushupcount1Last;
	}else(updateUser("pushupcount1Last",pushupcount1Last));
	if(currentUser.militarycount1Last){
		militarycount1Last = currentUser.militarycount1Last;
	}else updateUser("militarycount1Last",militarycount1Last)
	if(currentUser.widecount1Last){
		widecount1Last = currentUser.widecount1Last
	}else updateUser("widecount1Last",widecount1Last)
	if(currentUser.dipcount1Last){
	 	dipcount1Last = currentUser.dipcount1Last;
	}else(updateUser("dipcount1Last",dipcount1Last))
	if(currentUser.pushupcount2Last){
	 	pushupcount2Last = currentUser.pushupcount2Last;
	}else(updateUser("pushupcount2Last",pushupcount2Last))
	if(currentUser.militarycount2Last){
	 	militarycount2Last = currentUser.militarycount2Last;
	}else(updateUser("militarycount2Last",militarycount2Last))
	if(currentUser.widecount2Last){
	 	widecount2Last = currentUser.widecount2Last;
	}else(updateUser("widecount2Last",widecount2Last))
	if(currentUser.dipcount2Last){
	 	dipcount2Last = currentUser.dipcount2Last;
	}else(updateUser("dipcount2Last",dipcount2Last));

	//EXERCISE SAVED DATA LOWER BODY
	if(currentUser.lungecount1){
		lungecount1 = currentUser.lungecount1;
	}else(updateUser("lungecount1",lungecount1))
	if(currentUser.squatcount1){
		squatcount1 = currentUser.squatcount1;
	}else updateUser("squatcount1",squatcount1)
	if(currentUser.calfraisecount1){
		calfraisecount1 = currentUser.calfraisecount1
	}else updateUser("calfraisecount1",calfraisecount1)
	
	if(currentUser.lungecount2){
		lungecount2 = currentUser.lungecount2;
	}else(updateUser("lungecount2",lungecount2))
	if(currentUser.squatcount2){
		squatcount2 = currentUser.squatcount2;
	}else updateUser("squatcount2",squatcount2)
	if(currentUser.calfraisecount2){
		calfraisecount2 = currentUser.calfraisecount2
	}else updateUser("calfraisecount2",calfraisecount2)

	//EXERCISE SAVED DATA CORE
	if(currentUser.situpcount1){
		situpcount1 = currentUser.situpcount1;
	}else(updateUser("situpcount1",situpcount1))
	if(currentUser.crunchcount1){
		crunchcount1 = currentUser.crunchcount1;
	}else updateUser("crunchcount1",crunchcount1)
	if(currentUser.legraisecount1){
		legraisecount1 = currentUser.legraisecount1
	}else updateUser("legraisecount1",legraisecount1)
	
	if(currentUser.situpcount2){
		situpcount2 = currentUser.situpcount2;
	}else(updateUser("situpcount2",situpcount2))
	if(currentUser.squatcount2){
		crunchcount2 = currentUser.crunchcount2;
	}else updateUser("crunchcount2",crunchcount2)
	if(currentUser.legraisecount2){
		legraisecount2 = currentUser.legraisecount2
	}else updateUser("legraisecount2",legraisecount2)

	//DEFAULT SETTINGS
	$('.btn-row').hide();
	$('.done').css('display','none');

	//Button Controls
	$('.stop-btn').click(function(){
		cycle = 0;
		updateUser("cycle",cycle)
		$('#timer').html('Stopped');
		updateUser("cycle",cycle);
		clearTimeout();
		clearInterval();
		runWorkout = 0;
		updateUser("runWorkout",runWorkout);
		$('.btn-row').show();
		// $('.exercise-icon').show();	
		$('.exercise-icon').css('visibility','hidden');
		$('.next-form').css('display','none');
		stopped = true;		
	});

	$('.upperbody').click(function(){
		runWorkout = 1;
		updateUser("runWorkout",runWorkout);
		cycle = 1;
		updateUser("cycle",cycle);
		stopped = false;
		hideComplete = true;
		$('.exercise-icon').css('visibility','hidden');
	});

	$('.lowerbody').click(function(){
		runWorkout = 2;
		updateUser("runWorkout",runWorkout);
		cycle = 1;
		updateUser("cycle",cycle);
		stopped = false;
		hideComplete = true;
		$('.exercise-icon').css('visibility','hidden');
	});

	$('.core').click(function(){
		runWorkout = 3;
		updateUser("runWorkout",runWorkout);
		cycle = 1;
		updateUser("cycle",cycle);
		stopped = false;
		hideComplete = true;
		$('.exercise-icon').css('visibility','hidden');
	})


	$('.home-btn').click(function(){
		runWorkout = 0;
		updateUser("runWorkout",0);
	})

	$('.pause-btn').click(function(){
		paused = true;
		// cycle = currentUser.cycle;
		clearInterval(clock);
		clearTimeout(prepareDelay1);
		// clearTimeout(delayWorkout);
		// clearTimeout(prepareDelay1);
		// clearTimeout(prepareDelay2);

	});

	$('.play-btn').click(function(){
		paused = false;
		setInterval(workoutProgram,1000)
		
		// setTimeout(delay,9000);
		// setTimeout(prepareDelay1,6000);
		// return;
	});

	//STAT DISPLAY UPPER BODY
	$('.pushupround1').append(pushupcount1);
	$('.pushupround2').append(pushupcount2);
	$('.militaryround1').append(militarycount1);
	$('.militaryround2').append(militarycount2);
	$('.wideround1').append(widecount1);
	$('.wideround2').append(widecount2);
	$('.dipsround1').append(dipcount1);
	$('.dipsround2').append(dipcount2);
	$('.pushupround1last').append(pushupcount1Last);
	$('.pushupround2last').append(pushupcount2Last);
	$('.militaryround1last').append(militarycount1Last);
	$('.militaryround2last').append(militarycount2Last);
	$('.wideround1last').append(widecount1Last);
	$('.wideround2last').append(widecount2Last);
	$('.dipsround1last').append(dipcount1Last);
	$('.dipsround2last').append(dipcount2Last);

	//STAT DISPLAY LOWER BODY
	$('.lungeround1').append(lungecount1);
	$('.lungeround2').append(lungecount2);
	$('.squatround1').append(squatcount1);
	$('.squatround2').append(squatcount2);
	$('.calfraiseround1').append(calfraisecount1);
	$('.calfraiseround2').append(calfraisecount2);
	$('.lungeround1last').append(lungecount1Last);
	$('.lungeround2last').append(lungecount2Last);
	$('.squatround1last').append(squatcount1Last);
	$('.squatround2last').append(squatcount2Last);
	$('.calfraiseround1last').append(calfraisecount1Last);
	$('.calfraiseround2last').append(calfraisecount2Last);


	//EXERCISE ROUTINE CYCLE
	if (runWorkout == 1){
		if( cycle == 1 ){
			cycle = 1;
			// updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram,999);
			var delayWorkout = setTimeout(delay,9000);
			var prepareDelay = setTimeout(prepareDelay1,6000);
			console.log("level 1"); //console log just level to test
			$('.exercise-title').html('Jumping Jacks');
			$('.exercise-icon').html('<img class="workout-img" src="img/JumpingJacks.gif">');
			timer = 5000;
			$('.btn-row').hide();
			delaySwitch = true;
			hideComplete = true;

			function prepareDelay1(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/Pushups.gif">');
				timer = 1999;
				console.log("I work the prepare delay");
			};
			function delay(){
				if (delaySwitch === true && cycle === 1){
					clock = clearInterval(clock);
					cycle = 2;
					updateUser("cycle",cycle);
					$('.exercise-title').html('Pushups');
					$('.exercise-icon').show();
					$('.exercise-text').text('Tighten your core throughout exercise.');
					timer = 0;
					timer = 12000;
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');
					console.log("pushy pushy");
					hideComplete = false;
					// delaySwitch = false;
					$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
					$('.next-form').append('<form id="exercise-count"> <input id="pushupcount1" type="number" name="pushupcount"></form>')
					$('.next').appendTo($('.next-form')).html('<a class="exercise3 next-btn" href="timer.html">SAVE</a>');
					// var delayWorkout = setTimeout(delay,5950);
					cycle = 3;
					updateUser("cycle",cycle);

					$(".exercise3.next-btn").click(function(){
						// delaySwitch = false;
						pushupcount1Last = pushupcount1;
						pushupcount1 = document.getElementById("pushupcount1").value;
						console.log("I work");
						updateUser("pushupcount1",pushupcount1);
						updateUser("pushupcount1Last",pushupcount1Last);
						// updateUser("pushupcount1Last",pushUp1);
					});
				};
			};
			
		}else if ( cycle == 3 ){
			$('#timer').css('visibility','visible');
			timer = 7000;
			cycle = 3
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram, 999);
			var delayWorkout = setTimeout(delay2,11000);
			prepareDelay2 = setTimeout(prepareDelay2,8000);
			delaySwitch = true;
			$('.exercise-title').html('Jab/Cross');
			$('.exercise-icon').html('<img class="workout-img" src="img/JabCross.gif">');
			$('.exercise-icon').css('visibility','visible');
			hideComplete = true;

			function prepareDelay2(){
				$('.exercise-title').html('Prepare');
				 $('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/MilitaryPushups.gif">');
				timer = 1999;
			};

			function delay2(){
				if (delaySwitch === true && cycle === 3){
					clock = clearInterval(clock);
					cycle = 4;
					updateUser("cycle",cycle);
					$('.exercise-title').html('Military Pushups');
					$('.exercise-icon').show();
					$('.exercise-text').text('Arms should be just under your shoulders.');
					timer = 0;
					timer = 9000;
					console.log("Delay 2");
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');

					hideComplete = false;
					$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
					$('.next-form').append('<form id="exercise-count"> <input id="militarycount1" type="number" name="militarycount1"></form>')
					$('.next').appendTo ($('.next-form')).html('<a class="exercise5 next-btn" href="timer.html">Save</a>');
					cycle = 5;
					updateUser("cycle",cycle);
					$(".exercise5.next-btn").click(function(){
						militarycount1Last = militarycount1;
						militarycount1 = document.getElementById("militarycount1").value;
						updateUser("militarycount1", militarycount1);
						updateUser("militarycount1Last",militarycount1Last);
					});
				}
			};
		}else if ( cycle == 5 ){
				$('#timer').css('visibility','visible');
				timer = 7000;
				cycle = 5;
				updateUser("cycle",cycle);
				var clock = setInterval(workoutProgram, 999);
				var delayWorkout = setTimeout(delay3,11000);
			 	prepareDelay3 = setTimeout(prepareDelay3,8000);
				delaySwitch = true;
				$('.exercise-title').html('Hook/Uppercut');
				$('.exercise-icon').html('<img class="workout-img" src="img/HookUppercut.gif">');
				$('.exercise-icon').css('visibility','visible');
				hideComplete = true;

			function prepareDelay3(){
					$('.exercise-title').html('Prepare');
					$('#timer').css('visibility','hidden');
					$('.exercise-icon').html('<img class="workout-img" src="img/WidePushups.gif">');
					timer = 1999;
			};

			function delay3(){
				if(delaySwitch === true && cycle === 5){
					clock = clearInterval(clock);
					cycle = 6;
					updateUser("cycle",cycle);
					$('.exercise-title').html('Wide Pushups');
					$('.exercise-icon').show();
					$('.exercise-text').text('Keep arms more than shoulder width apart.');

					$('#timer').css('visibility','visible');
					timer = 0;
					timer = 7000;
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');
					hideComplete = false;

					$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
					$('.next-form').append('<form id="exercise-count"> <input id="widecount1" type="number" name="widecount1"></form>')
					$('.next').appendTo ($('.next-form')).html('<a class="exercise7 next-btn" href="timer.html">Save</a>');
					cycle = 7;
					updateUser("cycle",cycle);
					$(".exercise7.next-btn").click(function(){
						widecount1Last = widecount1;
						widecount1 = document.getElementById("widecount1").value;
						updateUser("widecount1", widecount1);
						updateUser("widecount1Last",widecount1Last);
					});
				}
			};

		}else if ( cycle == 7 ){
			$('#timer').css('visibility','visible');
			timer = 7000;
			cycle = 7;
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram,999);
			var delayWorkout = setTimeout(delay4,11000);
		 	prepareDelay4 = setTimeout(prepareDelay4,8050);
			delaySwitch = true;
			$('.exercise-title').html('Knee Strikes');
			$('.exercise-icon').html('<img class="workout-img" src="img/Knees.gif">');
			$('.exercise-icon').css('visibility','visible');
			hideComplete=true;

			function prepareDelay4(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/Dips.gif">');
				timer = 1999;
			};

			function delay4(){
				if(delaySwitch === true && cycle === 7){
					clock = clearInterval(clock);
					cycle = 8;
					updateUser("cycle",cycle);
					$('.exercise-title').html('Dips');
					$('.exercise-icon').show();
					$('.exercise-text').text('Use the edge of a bench of chair.');
					$('#timer').css('visibility','visible');
					timer = 0;
					timer = 7000;
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');
					hideComplete = false;

					$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
					$('.next-form').append('<form id="exercise-count"> <input id="dipcount1" type="number" name="dipcount"></form>')
					$('.next').appendTo($('.next-form')).html('<a class="exercise9 next-btn" href="timer.html">Save</a>');
					cycle = 9;
					updateUser("cycle",cycle);
					$(".exercise9.next-btn").click(function(){
						dipcount1Last = dipcount1;
						dipcount1 = document.getElementById("dipcount1").value;
						updateUser("dipcount1",dipcount1);
						updateUser("dipcount1Last",dipcount1Last);
					});
				};
			};
		}else if ( cycle == 9 ){
			$('#timer').css('visibility','visible');
			timer = 0;
			timer = 12000;
			cycle = 9
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram, 999);
			var delayWorkout = setTimeout(delay5,16000);
			prepareDelay5 = setTimeout(prepareDelay5,13000);
			delaySwitch = true;
			$('.exercise-title').html('Break!');
			$('.exercise-title').css('visibility','visible');
			$('.exercise-icon').css('visibility','visible');
			hideComplete = true;

			function prepareDelay5(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/Pushups.gif">');
				timer = 1999;
				console.log("I work the prepare delay");
			};		
			
			function delay5(){
				if(delaySwitch === true && cycle === 9){
				clock = clearInterval(clock);
				cycle = 10;
				$('.exercise-title').html('Pushups');
				$('.exercise-icon').show();
				$('.exercise-text').text('Tighten core throughout exercise.');
				$('#timer').css('visibility','visible');
				timer = 0;
				timer = 12000;
				clock = setInterval(workoutProgram, 999);
				hideComplete = false;
				$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
				$('.next-form').append('<form id="exercise-count"> <input id="pushupcount2" type="number" name="pushupcount2"></form>')
				$('.next').appendTo($('.next-form')).html('<a class="exercise11 next-btn" href="timer.html">SAVE</a>');
				cycle = 11;
				updateUser("cycle",cycle);
				$(".exercise11.next-btn").click(function(){
					pushupcount2Last = pushupcount2;
					pushupcount2 = document.getElementById("pushupcount2").value;
					updateUser("pushupcount2", pushupcount2);
					updateUser("pushupcount2Last", pushupcount2Last);
				});
			}
		};
			
		}else if ( cycle == 11 ){
			$('#timer').css('visibility','visible');
			timer = 7000;
			cycle = 11
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram, 999);
			var delayWorkout = setTimeout(delay6,11000);
			prepareDelay6 = setTimeout(prepareDelay6,8000);
			delaySwitch = true;
			$('.exercise-title').html('Jab/Cross');
			$('.exercise-icon').html('<img class="workout-img" src="img/JabCross.gif">');
			$('.exercise-icon').css('visibility','visible');
			hideComplete = true;

			function prepareDelay6(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/MilitaryPushups.gif">');
				timer = 1999;
			};

			function delay6(){
				if (delaySwitch === true && cycle === 11){
					clock = clearInterval(clock);
					cycle = 12;
					updateUser("cycle",cycle);
					$('.exercise-title').html('Military Pushups');
					$('.exercise-icon').show();
					$('.exercise-text').text('Arms should be just under your shoulders.');
					timer = 0;
					timer = 9000;
					console.log("Delay 2");
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');

					hideComplete = false;
					$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
					$('.next-form').append('<form id="exercise-count"> <input id="militarycount2" type="number" name="militarycount2"></form>')
					$('.next').appendTo ($('.next-form')).html('<a class="exercise13 next-btn" href="timer.html">Save</a>');
					cycle = 13;
					updateUser("cycle",cycle);
					$(".exercise13.next-btn").click(function(){
						militarycount2Last = militarycount2;
						militarycount2 = document.getElementById("militarycount2").value;
						updateUser("militarycount2",militarycount2);
						updateUser("militarycount2Last",militarycount2Last);
					});
				}
			};
		}else if ( cycle == 13 ){
			$('#timer').css('visibility','visible');
			timer = 9000;
			cycle = 13;
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram,999);
			var delayWorkout = setTimeout(delay7,13000);
			prepareDelay7 = setTimeout(prepareDelay7,8000)
			delaySwitch = true;
			hideComplete = true;
			$('.exercise-title').html('Hook/Uppercut');
			$('.exercise-icon').html('<img class="workout-img" src="img/HookUppercut.gif">');
			$('.exercise-icon').css('visibility','visible');

			function prepareDelay7(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/WidePushups.gif">');
				timer = 1999;
			};

			function delay7(){
				if (delaySwitch === true && cycle === 13){
					clock = clearInterval(clock);
					cycle = 14;
					updateUser("cycle",cycle);
					$('.exercise-title').html('Wide Pushups');
					$('.exercise-icon').show();
					$('.exercise-text').text('Keep arms more than shoulder width apart.');

					timer = 0;
					timer = 7000;
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');
					hideComplete = false;
					$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
				    $('.next-form').append('<form id="exercise-count"> <input id="widecount2" type="number" name="widecount2"></form>');
				    $('.next').appendTo ($('.next-form')).html('<a class="exercise15 next-btn" href="timer.html">Save</a>');
					cycle = 15;
					updateUser("cycle",cycle);
					$(".exercise15.next-btn").click(function(){
						widecount2Last = widecount2;
						widecount2 = document.getElementById("widecount2").value;
						updateUser("widecount2",widecount2);
						updateUser("widecount2Last",widecount2Last);

						});
				}
			};
		}else if ( cycle == 15 ){
			$('#timer').css('visibility','visible');
			timer = 7000;
			cycle = 15;
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram,999);
			var delayWorkout = setTimeout(delay8,13000);
			prepareDelay8 = setTimeout(prepareDelay8,8000);
			delaySwitch = true;
			hideComplete = true;
			$('.exercise-title').html('Knee Strikes');
			$('.exercise-icon').html('<img class="workout-img" src="img/Knees.gif">');
			$('.exercise-icon').css('visibility','visible');

			function prepareDelay8(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/Dips.gif">');
				timer = 1999;
			};

			function delay8(){
				if(delaySwitch === true && cycle === 15){
				clock = clearInterval(clock);
				cycle = 16;
				updateUser("cycle",cycle);
				$('.exercise-title').html('Dips');
				$('.exercise-icon').show();
				$('#timer').css('visibility','visible');
				$('.exercise-text').text('Use the edge of a bench of chair.');
				timer = 0;
				timer = 7000;
				clock = setInterval(workoutProgram, 999);
				hideComplete = false;

				$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
				$('.next-form').append('<form id="exercise-count"> <input id="dipcount2" type="number" name="dipcount2"></form>')
				$('.next').appendTo($('.next-form')).html('<a class="exercise17 next-btn" href="timer.html">SAVE</a>');
				cycle = 99;
				updateUser("cycle",cycle);
				$(".exercise17.next-btn").click(function(){
					dipcount2Last = dipcount2;
					dipcount2 = document.getElementById("dipcount2").value;
					updateUser("dipcount2",dipcount2);
					updateUser("dipcount2Last",dipcount2Last);
					cycle = 99; //Gotta make this 99 and have a finished script
					updateUser("cycle",cycle);
					// hideComplete = false;
				});
			}
		};
		}else if (cycle == 99){
			$('#timer').css('visibility','invisible');
			$('.btn-row').show();
			$('.done').css('display','block');
			hideComplete = true;
			$('.exercise-icon').hide();
			$('.done').prepend('<p class="done-text">You Completed the Upper Body Routine!</p>');
			$('.donearea').appendTo($('.done')).html('<a class="next-btn" href="index.html">DONE</a>');
			$(".next-btn").click(function(){
				runWorkout = 0;
				updateUser("runWorkout",runWorkout)
				clearTimeout();
				clearInterval();
			});
		}
	}
	if (runWorkout == 2){
		if( cycle == 1 ){
			cycle = 1;
			// updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram,999);
			var delayWorkout = setTimeout(delay,9000);
			var prepareDelay = setTimeout(prepareDelay1,6000);
			console.log("level 1"); //console log just level to test
			$('.exercise-title').html('Jumping Jacks');
			$('.exercise-icon').html('<img class="workout-img" src="img/Jog.gif">');
			timer = 5000;
			$('.btn-row').hide();
			delaySwitch = true;
			hideComplete = true;

			function prepareDelay1(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/Lunge1.gif">');
				timer = 1999;
				console.log("I work the prepare delay");
			};
			function delay(){
				if (delaySwitch === true && cycle === 1){
					clock = clearInterval(clock);
					cycle = 2;
					updateUser("cycle",cycle);
					$('.exercise-title').html('Lunges');
					$('.exercise-icon').show();
					$('.exercise-text').text('Back knee should not touch the floor.');
					timer = 0;
					timer = 12000;
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');
					hideComplete = false;
					// delaySwitch = false;
					$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
					$('.next-form').append('<form id="exercise-count"> <input id="lungecount1" type="number" name="lungecount1"></form>')
					$('.next').appendTo($('.next-form')).html('<a class="exercise3 next-btn" href="timer.html">SAVE</a>');
					// var delayWorkout = setTimeout(delay,5950);
					cycle = 3;
					updateUser("cycle",cycle);

					$(".exercise3.next-btn").click(function(){
						lunge1Last = lungecount1;
						lungecount1 = document.getElementById("lungecount1").value;
						console.log("I work");
						updateUser("lungecount1",lungecount1);
						updateUser("lungecount1Last",lungecount1Last);
						// updateUser("pushupcount1Last",pushUp1);
					});
				};;
			}
		}else if ( cycle == 3 ){
			$('#timer').css('visibility','visible');
			timer = 0;
			timer = 7000;
			cycle = 3;
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram, 999);
			delayWorkout = setTimeout(delay2,11000);
			prepareDelay2 = setTimeout(prepareDelay2,9000);
			delaySwitch = true;

			$('.exercise-title').html('Front Kick');
			$('.exercise-icon').html('<img class="workout-img" src="img/Kick.gif">');
			$('.exercise-icon').css('visibility','visible');
			hideComplete = true;
			
			function prepareDelay2(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/Squats.gif">');
				timer = 1999;
			};

			function delay2(){
				if (delaySwitch === true && cycle === 3){
					clock = clearInterval(clock);
					cycle = 4;
					updateUser("cycle",cycle);
					$('.exercise-title').html('Squats');
					$('.exercise-icon').show();
					$('.exercise-text').text('Do not point knees inward.');
					timer = 0;
					timer = 9000;
					console.log("Delay 2");
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');

					hideComplete = false;
					$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
					$('.next-form').append('<form id="exercise-count"> <input id="squatcount1" type="number" name="squatcount1"></form>')
					$('.next').appendTo ($('.next-form')).html('<a class="exercise5 next-btn" href="timer.html">Save</a>');
					cycle = 5;
					updateUser("cycle",cycle);
					$(".exercise5.next-btn").click(function(){
						squatcount1Last = squatcount1;
						squatcount1 = document.getElementById("squatcount1").value;
						updateUser("squatcount1", squatcount1);
						updateUser("squatcount1Last",squatcount1Last);
					});
				}
			};
		}else if ( cycle == 5 ){
				$('#timer').css('visibility','visible');
				timer = 7000;
				cycle = 5;
				updateUser("cycle",cycle);
				var clock = setInterval(workoutProgram, 999);
				var delayWorkout = setTimeout(delay3,11000);
			 	prepareDelay3 = setTimeout(prepareDelay3,8000);
				delaySwitch = true;
				$('.exercise-title').html('Knee Strikes');
				$('.exercise-icon').html('<img class="workout-img" src="img/Knees.gif">');
				$('.exercise-icon').css('visibility','visible');
				hideComplete = true;

			function prepareDelay3(){
					$('.exercise-title').html('Prepare');
					$('#timer').css('visibility','hidden');
					$('.exercise-icon').html('<img class="workout-img" src="img/CalfRaises.gif">');
					timer = 1999;
			};

			function delay3(){
				if(delaySwitch === true && cycle === 5){
					clock = clearInterval(clock);
					cycle = 6;
					updateUser("cycle",cycle);
					$('.exercise-title').html('Calf Raises');
					$('.exercise-icon').show();
					$('.exercise-text').text('Raise heels and flex calves.');
					$('#timer').css('visibility','visible');
					timer = 0;
					timer = 7000;
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');
					hideComplete = false;

					$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
					$('.next-form').append('<form id="exercise-count"> <input id="calfraisecount1" type="number" name="calfraisecount1"></form>')
					$('.next').appendTo ($('.next-form')).html('<a class="exercise7 next-btn" href="timer.html">Save</a>');
					cycle = 7;
					updateUser("cycle",cycle);
					$(".exercise7.next-btn").click(function(){
						calfraisecount1Last = calfraisecount1;
						calfraisecount1 = document.getElementById("calfraisecount1").value;
						updateUser("calfraisecount1",calfraisecount1);
						updateUser("calfraisecount1",calfraisecount1);
					});
				}
			};

		}else if ( cycle == 7 ){
			$('#timer').css('visibility','visible');
			timer = 7000;
			cycle = 7;
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram,999);
			var delayWorkout = setTimeout(delay4,11000);
		 	prepareDelay4 = setTimeout(prepareDelay4,8050);
			delaySwitch = true;
			$('.exercise-title').html('Jumping Jacks');
			$('.exercise-icon').html('<img class="workout-img" src="img/JumpingJacks.gif">');
			$('.exercise-icon').css('visibility','visible');
			hideComplete=true;

			function prepareDelay4(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/HorseStance.gif">');
				timer = 1999;
			};

			function delay4(){
				if(delaySwitch === true && cycle === 7){
					clock = clearInterval(clock);
					cycle = 8;
					updateUser("cycle",cycle);
					$('.exercise-title').html('Horse Stance');
					$('.exercise-icon').show();
					$('.exercise-text').text('Avoid bending knees over your toes.');
					$('#timer').css('visibility','visible');
					timer = 0;
					timer = 7000;
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');
					hideComplete = false;

					$('.next-form').prepend('<p class="good-job">Good Job! Continue on to your break.</p>');
					$('.next').appendTo($('.next-form')).html('<a class="next-btn" href="timer.html">Continue</a>');
					cycle = 9;
					updateUser("cycle",cycle);
					$(".exercise9.next-btn").click(function(){
						cycle = 9;
						updateUser("cycle",cycle);
					});
				};
			};
		}else if ( cycle == 9 ){
			$('#timer').css('visibility','visible');
			timer = 0;
			timer = 12000;
			cycle = 9
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram, 999);
			var delayWorkout = setTimeout(delay5,16000);
			prepareDelay5 = setTimeout(prepareDelay5,13000);
			delaySwitch = true;
			$('.exercise-title').html('Break!');
			$('.exercise-title').css('visibility','visible');
			$('.exercise-icon').css('visibility','visible');
			hideComplete = true;

			function prepareDelay5(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/Lunge2.gif">');
				timer = 1999;
				console.log("I work the prepare delay");
			};		
			
			function delay5(){
				if(delaySwitch === true && cycle === 9){
				clock = clearInterval(clock);
				cycle = 10;
				$('.exercise-title').html('Lunges');
				$('.exercise-icon').show();
				$('#timer').css('visibility','visible');
				$('.exercise-text').text('Back knee should not touch the floor.');
				timer = 0;
				timer = 12000;
				clock = setInterval(workoutProgram, 999);
				hideComplete = false;
				$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
				$('.next-form').append('<form id="exercise-count"> <input id="lungecount2" type="number" name="lungecount2"></form>')
				$('.next').appendTo($('.next-form')).html('<a class="exercise11 next-btn" href="timer.html">SAVE</a>');
				cycle = 11;
				updateUser("cycle",cycle);
				$(".exercise11.next-btn").click(function(){
					lungecount2Last = lungecount2;
					lungecount2 = document.getElementById("lungecount2").value;
					updateUser("lungecount2", lungecount2);
					updateUser("lungecount2Last", lungecount2Last);
				});
			}
		};
			
		}else if ( cycle == 11 ){
			$('#timer').css('visibility','visible');
			timer = 7000;
			cycle = 11
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram, 999);
			var delayWorkout = setTimeout(delay6,11000);
			prepareDelay6 = setTimeout(prepareDelay6,8000);
			delaySwitch = true;
			$('.exercise-title').html('Front Kick');
			$('.exercise-icon').html('<img class="workout-img" src="img/Kick.gif">');
			$('.exercise-icon').css('visibility','visible');
			hideComplete = true;

			function prepareDelay6(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/Squats.gif">');
				timer = 1999;
			};

			function delay6(){
				if (delaySwitch === true && cycle === 11){
					clock = clearInterval(clock);
					cycle = 12;
					updateUser("cycle",cycle);
					$('.exercise-title').html('Squats');
					$('.exercise-icon').show();
					$('.exercise-text').text('Do not point knees inward.');
					timer = 0;
					timer = 9000;
					console.log("Delay 2");
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');

					hideComplete = false;
					$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
					$('.next-form').append('<form id="exercise-count"> <input id="squatcount2" type="number" name="squatcount2"></form>')
					$('.next').appendTo ($('.next-form')).html('<a class="exercise13 next-btn" href="timer.html">Save</a>');
					cycle = 13;
					updateUser("cycle",cycle);
					$(".exercise13.next-btn").click(function(){
						squat2Last = squatcount2;
						squatcount2 = document.getElementById("squatcount2").value;
						updateUser("squatcount2",squatcount2);
						updateUser("squatcount2Last",squatcount2Last);
					});
				}
			};
		}else if ( cycle == 13 ){
			$('#timer').css('visibility','visible');
			timer = 9000;
			cycle = 13;
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram,999);
			var delayWorkout = setTimeout(delay7,13000);
			prepareDelay7 = setTimeout(prepareDelay7,8000)
			delaySwitch = true;
			hideComplete = true;
			$('.exercise-title').html('Knee Strikes');
			$('.exercise-icon').html('<img class="workout-img" src="img/Knees.gif">');
			$('.exercise-icon').css('visibility','visible');

			function prepareDelay7(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/CalfRaises.gif">');
				timer = 1999;
			};

			function delay7(){
				if (delaySwitch === true && cycle === 13){
					clock = clearInterval(clock);
					cycle = 14;
					updateUser("cycle",cycle);
					$('.exercise-title').html('Calf Raises');
					$('.exercise-icon').show();
					$('.exercise-text').text('Raise heels and flex calves.');
					timer = 0;
					timer = 7000;
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');
					hideComplete = false;
					$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
				    $('.next-form').append('<form id="exercise-count"> <input id="calfraisecount2" type="number" name="calfraisecount2"></form>');
				    $('.next').appendTo ($('.next-form')).html('<a class="exercise15 next-btn" href="timer.html">Save</a>');
					cycle = 15;
					updateUser("cycle",cycle);
					$(".exercise15.next-btn").click(function(){
						calfraisecount2Last = calfraisecount2;
						calfraisecount2 = document.getElementById("calfraisecount2").value;
						updateUser("calfraisecount2",calfraisecount2);
						updateUser("calfraise2Last",calfraisecount2Last);

						});
				}
			};
		}else if ( cycle == 15 ){
			$('#timer').css('visibility','visible');
			timer = 7000;
			cycle = 15;
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram,999);
			var delayWorkout = setTimeout(delay8,13000);
			prepareDelay8 = setTimeout(prepareDelay8,8000);
			delaySwitch = true;
			hideComplete = true;
			$('.exercise-title').html('Jumping Jacks');
			$('.exercise-icon').html('<img class="workout-img" src="img/JumpingJacks.gif">');
			$('.exercise-icon').css('visibility','visible');

			function prepareDelay8(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/HorseStance.gif">');
				timer = 1999;
			};

			function delay8(){
				if(delaySwitch === true && cycle === 15){
				clock = clearInterval(clock);
				cycle = 16;
				updateUser("cycle",cycle);
				$('.exercise-title').html('Horse Stance');
				$('.exercise-icon').show();
				$('.exercise-text').text('Avoid bending knees over your toes.');
				$('#timer').css('visibility','visible');
				timer = 0;
				timer = 7000;
				clock = setInterval(workoutProgram, 999);
				hideComplete = false;

				$('.next-form').prepend('<p class="good-job">Good Job! You can continue to hold the horse stance as long as you can for an added challenge.</p>');
				$('.next').appendTo($('.next-form')).html('<a class="exercise17 next-btn" href="timer.html">Finish</a>');
				cycle = 99;
				updateUser("cycle",cycle);
				$(".exercise17.next-btn").click(function(){
					cycle = 99; //Gotta make this 99 and have a finished script
					updateUser("cycle",cycle);
					// hideComplete = false;
				});
			}
		};
		}else if (cycle == 99){
			$('#timer').css('visibility','invisible');
			$('.btn-row').show();
			$('.done').css('display','block');
			hideComplete = true;
			$('.exercise-icon').hide();
			$('.done').prepend('<p class="done-text">You Completed The Lower Body Routine!</p>');
			$('.donearea').appendTo($('.done')).html('<a class="next-btn" href="index.html">DONE</a>');
			$(".next-btn").click(function(){
				runWorkout = 0;
				updateUser("runWorkout",runWorkout)
				clearTimeout();
				clearInterval();
			});
		}
	}
	else if (runWorkout == 3){
		if( cycle == 1 ){
			cycle = 1;
			// updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram,999);
			var delayWorkout = setTimeout(delay,9000);
			var prepareDelay = setTimeout(prepareDelay1,6000);
			console.log("level 1"); //console log just level to test
			$('.exercise-title').html('Jumping Jacks');
			$('.exercise-icon').html('<img class="workout-img" src="img/JumpingJacks.gif">');
			timer = 5000;
			$('.btn-row').hide();
			delaySwitch = true;
			hideComplete = true;

			function prepareDelay1(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/SitUp.gif">');
				timer = 1999;
				console.log("I work the prepare delay");
			};
			function delay(){
				if (delaySwitch === true && cycle === 1){
					clock = clearInterval(clock);
					cycle = 2;
					updateUser("cycle",cycle);
					$('.exercise-title').html('Sit Ups');
					$('.exercise-icon').show();
					$('.exercise-text').text('Do not lower chin to chest.');
					timer = 0;
					timer = 12000;
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');
					hideComplete = false;
					$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
					$('.next-form').append('<form id="exercise-count"> <input id="situpcount1" type="number" name="situpcount1"></form>')
					$('.next').appendTo($('.next-form')).html('<a class="exercise3 next-btn" href="timer.html">SAVE</a>');
					cycle = 3;
					updateUser("cycle",cycle);

					$(".exercise3.next-btn").click(function(){
						// delaySwitch = false;
						situpcount1Last = situpcount1;
						situpcount1 = document.getElementById("situpcount1").value;
						console.log("I work");
						updateUser("situpcount1",situpcount1);
						updateUser("situp1Last",situpcount1Last);
						// updateUser("pushupcount1Last",pushUp1);
					});
				};
			};
			
		}else if ( cycle == 3 ){
			$('#timer').css('visibility','visible');
			$('.exercise-icon').css('visibility','visible');
			$('.exercise-title').html('Crunches');
			$('#timer').css('visibility','hidden');
			$('.exercise-icon').html('<img class="workout-img" src="img/Crunch.gif">');
			$('.exercise-text').text('Tighten ab muscles throughout.');
			timer = 9000;
			cycle = 3;
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram, 999);
			delaySwitch = true;
			hideComplete = true;
			hideComplete = false;
			$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
			$('.next-form').append('<form id="exercise-count"> <input id="crunchcount1" type="number" name="crunchcount1"></form>')
			$('.next').appendTo ($('.next-form')).html('<a class="exercise5 next-btn" href="timer.html">Save</a>');
			cycle = 4;
			updateUser("cycle",cycle);
			$(".exercise5.next-btn").click(function(){
				crunchcount1Last = crunchcount1;
				crunchcount1 = document.getElementById("crunchcount1").value;
				updateUser("crunchcount1", crunchcount1);
				updateUser("crunchcount1Last",crunchcount1Last);
			});
		}else if( cycle == 4 ){
			cycle = 4;
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram,999);
			var delayWorkout = setTimeout(delay2,9000);
			var prepareDelay = setTimeout(prepareDelay2,6000);
			console.log("level 1"); //console log just level to test
			$('.exercise-title').html('Knees');
			$('.exercise-icon').html('<img class="workout-img" src="img/Knees.gif">');
			timer = 5000;
			$('.btn-row').hide();
			delaySwitch = true;
			hideComplete = true;

			function prepareDelay2(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/LegRaise.gif">');
				timer = 1999;
			};
			function delay2(){
				if (delaySwitch === true && cycle === 4){
					clock = clearInterval(clock);
					cycle = 5;
					updateUser("cycle",cycle);
					$('.exercise-title').html('Leg Raises');
					$('.exercise-icon').show();
					timer = 0;
					timer = 11000;
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');
					hideComplete = false;
					$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
					$('.next-form').append('<form id="exercise-count"> <input id="legraisecount1" type="number" name="legraisecount1"></form>')
					$('.next').appendTo($('.next-form')).html('<a class="exercise3 next-btn" href="timer.html">SAVE</a>');
					cycle = 6;
					updateUser("cycle",cycle);

					$(".exercise3.next-btn").click(function(){
						legraisecount1Last = legraisecount1;
						legraisecount1 = document.getElementById("legraisecount1").value;
						console.log("I work");
						updateUser("legraisecount1",legraisecount1);
						updateUser("legraiseLast",legraise1Last);
					});
				};
			};
		}else if ( cycle == 6 ){
			$('#timer').css('visibility','visible');
			$('.exercise-icon').css('visibility','visible');
			$('.exercise-title').html('Sit Ups');
			$('#timer').css('visibility','hidden');
			$('.exercise-icon').html('<img class="workout-img" src="img/SitUp.gif">');
			$('.exercise-text').text('Do not lower chin to chest.');
			timer = 9000;
			cycle = 6;
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram, 999);
			delaySwitch = true;
			hideComplete = true;
			hideComplete = false;
			$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
			$('.next-form').append('<form id="exercise-count"> <input id="situpcount2" type="number" name="situpcount2"></form>')
			$('.next').appendTo ($('.next-form')).html('<a class="exercise5 next-btn" href="timer.html">Save</a>');
			cycle = 7;
			updateUser("cycle",cycle);
			$(".exercise5.next-btn").click(function(){
				militarycount2Last = situpcount2;
				situpcount2 = document.getElementById("situpcount2").value;
				updateUser("situpcount2",situpcount2);
				updateUser("situpcount2Last",situpcount2Last);
			});
		}else if( cycle == 7 ){
			cycle = 7;
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram,999);
			var delayWorkout = setTimeout(delay3,9000);
			var prepareDelay = setTimeout(prepareDelay3,6000);
			$('.exercise-title').html('Knees');
			$('.exercise-icon').html('<img class="workout-img" src="img/Knees.gif">');
			timer = 5000;
			$('.btn-row').hide();
			delaySwitch = true;
			hideComplete = true;

			function prepareDelay3(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/Crunch.gif">');
				timer = 1999;
			};
			function delay3(){
				if (delaySwitch === true && cycle === 7){
					clock = clearInterval(clock);
					cycle = 8;
					updateUser("cycle",cycle);
					$('.exercise-title').html('Crunches');
					$('.exercise-icon').show();
					$('.exercise-text').text('Tighten ab muscles throughout.');
					timer = 0;
					timer = 11000;
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');
					hideComplete = false;
					$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
					$('.next-form').append('<form id="exercise-count"> <input id="crunchcount2" type="number" name="crunchcount2"></form>')
					$('.next').appendTo($('.next-form')).html('<a class="exercise3 next-btn" href="timer.html">SAVE</a>');
					cycle = 9;
					updateUser("cycle",cycle);

					$(".exercise3.next-btn").click(function(){
						crunchcount2Last = crunchcount2;
						crunchcount2 = document.getElementById("crunchcount2").value;						
						updateUser("crunchcount2",crunchcount2);
						updateUser("crunchcount2",crunchcount2);
					});
				};
			};
		}else if ( cycle == 9 ){
			$('#timer').css('visibility','visible');
			$('.exercise-icon').css('visibility','visible');
			$('.exercise-title').html('Leg Raises');
			 $('#timer').css('visibility','hidden');
			$('.exercise-icon').html('<img class="workout-img" src="img/LegRaise.gif">');
			timer = 9000;
			cycle = 5;
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram, 999);
			delaySwitch = true;
			hideComplete = true;
			hideComplete = false;
			$('.next-form').prepend('<p class="good-job">Good Job! Record how many you did.</p>');
			$('.next-form').append('<form id="exercise-count"> <input id="legraisecount2" type="number" name="legraisecount2"></form>')
			$('.next').appendTo ($('.next-form')).html('<a class="exercise5 next-btn" href="timer.html">Save</a>');
			cycle = 10;
			updateUser("cycle",cycle);
			$(".exercise5.next-btn").click(function(){
				legraisecount2Last = legraisecount2;
				legraisecount2 = document.getElementById("legraisecount2").value;
				updateUser("legraisecount2",legraisecount2);
				updateUser("legraisecount2Last",legraisecount2Last);
			});
		}else if ( cycle == 10 ){
			$('#timer').css('visibility','visible');
			$('.exercise-icon').css('visibility','visible');
			$('.exercise-title').html('Plank');
			$('#timer').css('visibility','hidden');
			$('.exercise-icon').html('<img class="workout-img" src="img/Plank.gif">');
			$('.exercise-text').text('Keep weight on forearms and toes.');
			timer = 9000;
			cycle = 10;
			updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram, 999);
			delaySwitch = true;
			hideComplete = true;
			hideComplete = false;
			$('.next-form').prepend('<p class="good-job">Good Job! Improve your core strenght by holding the plank position until you feel you are finished.</p>');
			$('.next').appendTo ($('.next-form')).html('<a class="exercise5 next-btn" href="timer.html">Finish</a>');
			cycle = 99;
			updateUser("cycle",cycle);
			$(".exercise5.next-btn").click(function(){
				cycle = 99;
				updateUser("cycle",cycle);
			});
		}else if (cycle == 99){
			$('#timer').css('visibility','invisible');
			$('.btn-row').show();
			$('.done').css('display','block');
			hideComplete = true;
			$('.exercise-icon').hide();
			$('.done').prepend('<p class="done-text">You Completed the Core Routine!</p>');
			$('.donearea').appendTo($('.done')).html('<a class="next-btn" href="index.html">DONE</a>');
			$(".next-btn").click(function(){
				runWorkout = 0;
				updateUser("runWorkout",runWorkout)
				clearTimeout();
				clearInterval();
			});
		}
	};
});