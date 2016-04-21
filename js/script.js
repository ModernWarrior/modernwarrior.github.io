
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
	var prepare = false;
	var runWorkout = 0;
	var delay;
	var prepareDelay1;


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
		if ( cycle !== 0 && paused === false && runWorkout === 1 && timer >= 0){
			var time = timer;
			// setInterval(test);
			var time = getTimeRemaining(timer); 

			// console.log(time);
			$('#timer').text(time.minutes + ":" + time.seconds );
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
			$('.motivation').css('visibility','hidden' );
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

	//EXERCISE SAVED DATA
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

	//LAST SAVED DATA
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

	//DEFAULT SETTINGS
	$('.btn-row').hide();
	$('.done').css('display','none');


	//SETTING TIMERS

	// if ( cycle === 1 || cycle === 2 ){
	// 	var delayWorkout = setTimeout(delay,9000);
	// 	var prepareDelay = setTimeout(prepareDelay1,6000);

	// }else if ( cycle === 3 || cycle === 4){
	// 	var delayWorkout2 = setTimeout(delay2,9000);
	// 	var prepareDelay2 = setTimeout(prepareDelay2,8000);
	// }else if ( cycle === 5 || cycle === 6){
	// 	var delayWorkout3 = setTimeout(delay3,6950);
	// 	var prepareDelay3 = setTimeout(prepareDelay3,6950);
	// }else if (cycle === 7 || cycle === 8){
	// 	var delayWorkout4 = setTimeout(delay4,6050);
	// 	var prepareDelay4 = setTimeout(prepareDelay4,6050);
	// }
	//  else if (cycle === 9 || cycle === 10){
	// 	var delayWorkout5 = setTimeout(delay5,11500);
	// }else if (cycle === 11 || cycle === 12){
	// 	var delayWorkout6 = setTimeout(delay6,6000);
	// }else if (cycle === 13 || cycle === 14){
	// 	var delayWorkout7 = setTimeout(delay7,6000);
	// }else if (cycle === 15 || cycle === 16){
	// 	var delayWorkout8 = setTimeout(delay8,6000);
	// }


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

	//STAT DISPLAY
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


	//EXERCISE ROUTINE CYCLE
	if (runWorkout == 1){
		if( cycle == 1 ){
			cycle = 1;
			// updateUser("cycle",cycle);
			var clock = setInterval(workoutProgram,999);
			var delayWorkout = setTimeout(delay,9000);
			var prepareDelay = setTimeout(prepareDelay1,6000);
			console.log("level 1"); //console log just level to test
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
					}else{
						console.log('No delay');
					}
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
			hideComplete = true;
			$('.exercise-title').html('Jab/Cross');
			$('.exercise-icon').html('<img class="workout-img" src="img/JabCross.gif">');
			$('.exercise-icon').css('visibility','visible');
			

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
				}else{
					console.log('No delay part two');
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
				}else{
					console.log('No delay part three');
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
				}else{
					console.log('No delay');
					}
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
			/**WORK FROM HERE 4.20 4:17 AM**/
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
				}else{
					console.log('No delay part two');
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
					}else{
						console.log('No delay part two');
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
				}else{
					console.log('No delay');
					}
			};
			}else if (cycle == 99){
				$('#timer').css('visibility','invisible');
				$('.btn-row').show();
				$('.done').css('display','block');
				hideComplete = true;
				$('.exercise-icon').hide();
				$('.done').prepend('<p class="done-text">You Completed The Upper Body Routine!</p>');
				$('.donearea').appendTo($('.done')).html('<a class="next-btn" href="index.html">DONE</a>');
				$(".next-btn").click(function(){
						runWorkout = 0;
						updateUser("runWorkout",runWorkout)
						clearTimeout();
						clearInterval();
					});
			}else{
				console.log("none");
			}

		// $('.exercise1').click(function(){
			
			
		// });

		// $('.exercise2').click(function(){
		// 	cycle = 2;
		// 	updateUser("cycle",cycle);
		// 	timer = 6000;
		// 	$('.exercise-title').html('Pushups');
		// 	clock = setInterval(workoutProgram, 1000);
		// 	console.log('I am running from the button');
		// 	$('.next').html('<a class="exercise3 next-btn" href="timer.html">Level Up</a>');
		// });

		// $('.exercise3').click(function(){
		// 	cycle = 3;
		// 	updateUser("cycle",cycle);
		// 	$('.exercise-title').html('Punch Cycle');
		// 	$('.next').html('<a class="exercise3 next-btn">Level Up</a>');
		// 	console.log(cycle);
		// 	console.log('I am exercise three');
		// 	timer = 9000;
		// 	clock = setInterval(workoutProgram, 1000);
		// 	console.log(timer);

		// });

		// $('.exercise4').click(function(){
		// 	cycle = 4;
		// 	updateUser("cycle",cycle);
		// });

		// $('.exercise5').click(function(){
		// 	cycle = 5;
		// 	updateUser("cycle",cycle);
		// });

	
};
});

	//IMAGE//
	
		// $('.dot').click(function(){
		// 	$('.exercise-icon').html('<img src="img/dot.png">');
		// 	updateUser("exImg",'dot');
		// };

		// $('.heart').click(function(){
		// 	$('.exercise-icon').html('<img src="img/heart.png">');
		// 	updateUser("mood",'heart');
		// };
	
	


	/**AUDIO PLAYER**/
	// $('.audio1').click(function(){
	// 		$('.music').append('<source src="audio/song.mp3" type="audio/mp3">');
	// 		updateUser("music",'song1');
	// 	});
	
