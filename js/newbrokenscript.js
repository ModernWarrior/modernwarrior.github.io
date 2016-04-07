<<<<<<< HEAD
$(document).ready(function(){
	//Level 1 is to indicate if was complete or not
	// var level1 = false;
	// var level2 = false;
	//sets level

	// get the local storage user
	var currentUser = getUser();
	// var workoutProgram = workoutProgram();
	var paused = false;
	var cycle = 0;
	var currentExercise = 0;
	var delaySwitch = false;
	var hideComplete = false;
	var pushUp1 = 0;
	var military1 = 0;
	var wide1 = 0;
	var dip1 = 0;
	var pushUp2 = 0;
	var military2 = 0;
	var wide2 = 0;
	var dip2 = 0;
	var prepare = false;
	var runWorkout = 1;

	// var isPaused = true;
	
	// if the current user has a saved level, restore it
	if(currentUser.runWorkout){
		runWorkout = currentUser.runWorkout;
	}else(updateUser("runWorkout",'0'))

	if (currentUser.cycle){
		cycle = currentUser.cycle;
	}else(updateUser("cycle",'0'))
	// if the current user has a saved mood, update the icon
	// if (currentUser.mood){
	// 	$('.exercise-icon').html('<img src="img/'+currentUser.mood+'.png">');
	// }else (updateUser("mood",'dot') ) //DEFAULT MODE

	if (currentUser.exImg){
		$('.exercise-icon').html('<img src="img/dot.png">');
	}else (updateUser("exImg",'dot') )

	if(currentUser.pushupcount1){
		pushupcount1 = currentUser.pushupcount1;
	}else(updateUser("pushupcount1",pushUp1))
	if(currentUser.militarycount1){
		militarycount1 = currentUser.militarycount1;
	}else updateUser("militarycount1",military1)
	if(currentUser.widecount1){
		widecount1 = currentUser.widecount1
	}else updateUser("widecount1",wide1)
	if(currentUser.dipcount1){
		dipcount1 = currentUser.dipcount1;
	}else(updateUser("dipcount1",dip1))
	if(currentUser.pushupcount2){
		pushupcount2 = currentUser.pushupcount2;
	}else(updateUser("pushupcount2",pushUp2))
	if(currentUser.militarycount2){
		militarycount2 = currentUser.militarycount2;
	}else(updateUser("militarycount2",military2))
	if(currentUser.widecount2){
		widecount2 = currentUser.widecount2;
	}else(updateUser("widecount2",wide2))
	if(currentUser.dipcount2){
		dipcount2 = currentUser.dipcount2;
	}else(updateUser("dipcount2",dip2));

	//DEFAULT SETTINGS
	$('.btn-row').hide();

	var clock = setInterval(workoutProgram, 999);

		if ( cycle === 1 || cycle === 2 ){
			var delayWorkout = setTimeout(delay,9000);
			var prepareDelay = setTimeout(prepareDelay1,6000);

		}else if ( cycle === 3 || cycle === 4){
			var delayWorkout2 = setTimeout(delay2,9000);
			var prepareDelay2 = setTimeout(prepareDelay2,8000);
		}else if ( cycle === 5 || cycle === 6){
			var delayWorkout3 = setTimeout(delay3,6950);
			var prepareDelay3 = setTimeout(prepareDelay3,6950);
		}else if (cycle === 7 || cycle === 8){
			var delayWorkout4 = setTimeout(delay4,6050);
			var prepareDelay4 = setTimeout(prepareDelay4,6050);
		}
		 else if (cycle === 9 || cycle === 10){
			var delayWorkout5 = setTimeout(delay5,11500);
		}else if (cycle === 11 || cycle === 12){
			var delayWorkout6 = setTimeout(delay6,6000);
		}else if (cycle === 13 || cycle === 14){
			var delayWorkout7 = setTimeout(delay7,6000);
		}else if (cycle === 15 || cycle === 16){
			var delayWorkout8 = setTimeout(delay8,6000);
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

	//Button Controls
			$('.stop-btn').click(function(){
			cycle = 0;
			$('#timer').html('Stopped');
			updateUser("cycle",cycle);
			clearTimeout(delayWorkout);
			runWorkout = 0;
			updateUser("runWorkout",runWorkout);			
		});

		$('.upperbody').click(function(){
			runWorkout = 1;
			updateUser("runWorkout",runWorkout);
			cycle = 1;
			updateUser("cycle",cycle);
		})

		$('.home-btn').click(function(){
			runWorkout = 0;
			updateUser("runWorkout",0);
		})

		$('.pause-btn').click(function(){
			paused = true;
			cycle = currentUser.cycle;
			clearInterval(clock);
			// clearTimeout(delayWorkout);

		});

		$('.play-btn').click(function(){
			paused = false;
			setInterval(workoutProgram,1000)
		});

	//LEVEL SELECTOR

	if (runWorkout == 1){
		if( cycle == 1 ){
			cycle = 1;
			updateUser("cycle",cycle);
			console.log("level 1"); //console log just level to test
			 // imageEnter(sendUp);
			var timer = 5000;
			// $('.exercise-title').hide();
			// $('.exercise-icon').hide();
			$('.btn-row').hide();
			delaySwitch = true;
			hideComplete = true;

		
			function prepareDelay1(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/Pushups.gif">');
				timer = 1999;
			};
				function delay(){
					if (delaySwitch === true && cycle === 1){
					clock = clearInterval(clock);
					cycle = 2;
					$('.exercise-title').html('Pushups');
					$('.exercise-icon').show();
					timer = 0;
					timer = 12000;
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');
					console.log("pushy pushy");
					
					hideComplete = false;
					// delaySwitch = false;
					$('.next-form').html('<form id="exercise-count"> <input id="pushupcount1" type="number" name="pushupcount"></form>')
					$('.next').html('<a class="exercise3 next-btn" href="timer.html">Level Up</a>');
					cycle = 3;
					// var delayWorkout = setTimeout(delay,5950);
					updateUser("cycle",cycle);

					$(".exercise3.next-btn").click(function(){
						delaySwitch = false;
						pushUp1 = document.getElementById("pushupcount1").value;
						console.log("I work");
						updateUser("pushupcount1", pushUp1);

						});
				}else{
					console.log('No delay');
				}
			};
					

		}else if ( cycle == 3 ){
			console.log("level 3");
			delaySwitch = true;
			timer = 7000;
			$('.exercise-title').html('Jab/Cross');
			$('.exercise-icon').html('<img class="workout-img" src="img/JabCross.gif">');
			$('.exercise-icon').css('visibility','show');

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
					$('.exercise-title').html('Military Pushups');
					$('#timer').css('visibility','visible');

					timer = 9000;
					console.log("Delay 2");
					clock = setInterval(workoutProgram, 999);
					$('.exercise-icon').html('<img class="workout-img" src="img/MilitaryPushups.gif">');
					console.log("I am the timed cycle 4 :)");
					hideComplete = false;
					$('.next-form').html('<form id="exercise-count"> <input id="militarycount1" type="number" name="militarycount"></form>')
					$('.next').html('<a class="exercise5 next-btn" href="timer.html">Level Up</a>');
					cycle = 5;
					updateUser("cycle",cycle);
					$(".exercise5.next-btn").click(function(){
						military1 = document.getElementById("militarycount1").value;
						console.log("I work");
						updateUser("militarycount1", military1);
						});
				}else{
					console.log('No delay part two');
				}
			};
			}else if ( cycle == 5 ){
				console.log("level5");
				delaySwitch = true;
				timer = 7000;
				$('.exercise-title').html('Hook/Uppercut');
				$('.exercise-icon').html('<img class="workout-img" src="img/HookUppercut.gif">');

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
					$('.exercise-title').html('Wide Pushups');
					$('#timer').css('visibility','visible');

					timer = 7000;
					clock = setInterval(workoutProgram, 999);
					$('.exercise-icon').html('<img class="workout-img" src="img/WidePushups.gif">');
					console.log("I am the timed cycle 6");
					hideComplete = false;
					$('.next-form').html('<form id="exercise-count"> <input id="widecount1" type="number" name="widecount"></form>')
					$('.next').html('<a class="exercise7 next-btn" href="timer.html">Level Up</a>');
					cycle = 7;
					updateUser("cycle",cycle);
					$(".exercise7.next-btn").click(function(){
						wide1 = document.getElementById("widecount1").value;
						updateUser("widecount1", wide1);
						});
				}else{
					console.log('No delay part three');
					}
			};
			}else if ( cycle == 7 ){
				console.log("level7");
				delaySwitch = true;
				timer = 7000;
				$('.exercise-title').html('Knee Strikes');
				$('.exercise-icon').html('<img class="workout-img" src="img/Knees.gif">');

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
					$('.exercise-title').html('Dips');
					$('.exercise-icon').show();
					$('#timer').css('visibility','visible');

					timer = 7000;
					clock = setInterval(workoutProgram, 999);
					$('.exercise-icon').html('<img class="workout-img" src="img/Dips.gif">');
					console.log("I am the timed cycle 8");
					hideComplete = false;
					$('.next-form').html('<form id="exercise-count"> <input id="dipcount1" type="number" name="dipcount"></form>')
					$('.next').html('<a class="exercise9 next-btn" href="timer.html">Level Up</a>');
					cycle = 9;
					updateUser("cycle",cycle);
					$(".exercise9.next-btn").click(function(){
						dip1 = document.getElementById("dipcount1").value;
						updateUser("dipcount1", dip1);
						});
				}else{
					console.log('No delay');
					}
			};
			}else if ( cycle == 9 ){
				delaySwitch = true;
				timer = 12000;
				$('exercise-title').html('Break!');
				$('exercise-icon').show();
				function delay5(){
					if(delaySwitch === true && cycle === 9){
					clock = clearInterval(clock);
					cycle = 10;
					$('.exercise-title').html('Pushups');
					$('.exercise-icon').show();
					timer = 7000;
					clock = setInterval(workoutProgram, 1000);
					$('.exercise-icon').html('<img class="workout-img" src="img/Pushups.gif">');
					hideComplete = false;
					$('.next-form').html('<form id="exercise-count"> <input id="pushupcount2" type="number" name="pushupcount"></form>')
					$('.next').html('<a class="exercise11 next-btn" href="timer.html">Level Up</a>');
					cycle = 11;
					updateUser("cycle",cycle);
					$(".exercise11.next-btn").click(function(){
						pushUp2 = document.getElementById("pushupcount2").value;
						updateUser("pushupcount2", pushUp2);
						});
				}
			};
			}else if ( cycle == 11 ){
				console.log("level 3");
				delaySwitch = true;
				timer = 9000;
				$('.exercise-title').html('Jab/Cross');
				$('.exercise-icon').html('<img class="workout-img" src="img/JabCross.gif">');

				function delay6(){
					if (delaySwitch === true && cycle === 11){
						clock = clearInterval(clock);
						cycle = 12;
						$('.exercise-title').html('Military Pushups');
						$('.exercise-icon').show();
						timer = 7000;
						console.log("Delay 2");
						clock = setInterval(workoutProgram, 1000);
						$('.exercise-icon').html('<img class="workout-img" src="img/MilitaryPushups.gif">');
						console.log("I am the timed cycle 4 :)");
						hideComplete = false;
						$('.next-form').html('<form id="exercise-count"> <input id="militarycount2" type="number" name="militarycount"></form>')
						$('.next').html('<a class="exercise13 next-btn" href="timer.html">Level Up</a>');
						cycle = 13;
						updateUser("cycle",cycle);
						$(".exercise13.next-btn").click(function(){
							military2 = document.getElementById("militarycount2").value;
							console.log("I work");
							updateUser("militarycount2", military2);
							});
					}else{
						console.log('No delay part two');
					}
			};
			}else if ( cycle == 13 ){
				delaySwitch = true;
				timer = 9000;
				$('.exercise-title').html('Hook/Uppercut');
				$('.exercise-icon').html('<img class="workout-img" src="img/HookUppercut.gif">');

				// delaySwitch = true;
				// $('.next').html('<a class="exercise3 next-btn">Level Up</a>');

				function delay7(){
					if (delaySwitch === true && cycle === 13){
						clock = clearInterval(clock);
						cycle = 14;
						$('.exercise-title').html('Wide Pushups');
						$('.exercise-icon').show();
						timer = 7000;
						console.log("Delay 2");
						clock = setInterval(workoutProgram, 1000);
						$('.exercise-icon').html('<img class="workout-img" src="img/WidePushups.gif">');
						hideComplete = false;
						$('.next-form').html('<form id="exercise-count"> <input id="widecount2" type="number" name="widecount"></form>')
						$('.next').html('<a class="exercise15 next-btn" href="timer.html">Level Up</a>');
						cycle = 15;
						updateUser("cycle",cycle);
						$(".exercise15.next-btn").click(function(){
							wide2 = document.getElementById("widecount2").value;
							console.log("I work");
							updateUser("widecount2", wide2);
							});
					}else{
						console.log('No delay part two');
					}
			};
			}else if ( cycle == 15 ){
				console.log("level7");
				delaySwitch = true;
				timer = 7000;
				$('.exercise-title').html('Knee Strikes');
				$('.exercise-icon').html('<img class="workout-img" src="img/Knees.gif">');

				function delay8(){
					if(delaySwitch === true && cycle === 15){
						clock = clearInterval(clock);
					cycle = 16;
					$('.exercise-title').html('Dips');
					$('.exercise-icon').show();
					timer = 7000;
					clock = setInterval(workoutProgram, 1000);
					$('.exercise-icon').html('<img class="workout-img" src="img/Dips.gif">');
					hideComplete = false;
					$('.next-form').html('<form id="exercise-count"> <input id="dipcount2" type="number" name="dipcount"></form>')
					$('.next').html('<a class="exercise17 next-btn" href="timer.html">Level Up</a>');
					cycle = 17;
					updateUser("cycle",cycle);
					$(".exercise17.next-btn").click(function(){
						dip2 = document.getElementById("dipcount2").value;
						updateUser("dipcount2", dip2);
						cycle = 0; //Gotta make this 99 and have a finished script
						updateUser("cycle",cycle);
						hideComplete = false;
						});
				}else{
					console.log('No delay');
					}
			};
			}else if (cycle == 17){
				hideComplete = false;
			}else{
			console.log("none");
			}

		$('.exercise1').click(function(){
			
			
		});

		// $('.exercise2').click(function(){
		// 	cycle = 2;
		// 	updateUser("cycle",cycle);
		// 	timer = 6000;
		// 	$('.exercise-title').html('Pushups');
		// 	clock = setInterval(workoutProgram, 1000);
		// 	console.log('I am running from the button');
		// 	$('.next').html('<a class="exercise3 next-btn" href="timer.html">Level Up</a>');
		// });

		$('.exercise3').click(function(){
			cycle = 3;
			updateUser("cycle",cycle);
			$('.exercise-title').html('Punch Cycle');
			$('.next').html('<a class="exercise3 next-btn">Level Up</a>');
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

		
		function workoutProgram(){
			if ( cycle !== 0 && paused === false && runWorkout === 1 && timer >= 0){
				var time = timer;
				// setInterval(test);
				var time = getTimeRemaining(timer); 
				// console.log(time);
				$('#timer').text(time.minutes + ":" + time.seconds );
				$('#timer').show();
				$('.exercise-title').show();
				$('.exercise-icon').css('display','block');
				$('.exercise-icon').css('visibility','visible');
				$('.btn-row').hide();
				$('.stop').show();
				$('.complete-display').hide();
				timer -= 999;
				console.log(timer);

				if (timer === 0 && hideComplete === false){
					$('.exercise-icon').css('visibility','hidden');
					$('.complete-display').show();
					$('#timer').css('visibility','hidden');
					$('.stop').hide();
					$('.btn-row').show();
					clearInterval(clock);
					console.log(cycle);
				}else if (prepare === true){
					function prepareDelay(){
						$('.prepare').show();

					}

				}else{
					$('.preworkout').css('visibility','hidden');
					$('.motivation').css('visibility','hidden' );
				};

				if (timer === 0 && cycle === 0){
					clearInterval(clock);

				}
			}else{
				$('#timer').css('visibility','hidden');
				console.log('Stopped');
				$('.stop').hide();
				$('.btn-row').show();
				// isPaused = false;
				cycle=0;
				clearInterval(clock);
				// $('#timer').hide;
			}
		}
	};//END RUN WORKOUT

	//IMAGE//
	
		$('.dot').click(function(){
			$('.exercise-icon').html('<img src="img/dot.png">');
			updateUser("exImg",'dot');
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
	
=======
$(document).ready(function(){
	//Level 1 is to indicate if was complete or not
	// var level1 = false;
	// var level2 = false;
	//sets level

	// get the local storage user
	var currentUser = getUser();
	// var workoutProgram = workoutProgram();
	var paused = false;
	var cycle = 0;
	var currentExercise = 0;
	var delaySwitch = false;
	var hideComplete = false;
	var pushUp1 = 0;
	var military1 = 0;
	var wide1 = 0;
	var dip1 = 0;
	var pushUp2 = 0;
	var military2 = 0;
	var wide2 = 0;
	var dip2 = 0;
	var prepare = false;
	var runWorkout = 1;

	// var isPaused = true;
	
	// if the current user has a saved level, restore it
	if(currentUser.runWorkout){
		runWorkout = currentUser.runWorkout;
	}else(updateUser("runWorkout",'0'))

	if (currentUser.cycle){
		cycle = currentUser.cycle;
	}else(updateUser("cycle",'0'))
	// if the current user has a saved mood, update the icon
	// if (currentUser.mood){
	// 	$('.exercise-icon').html('<img src="img/'+currentUser.mood+'.png">');
	// }else (updateUser("mood",'dot') ) //DEFAULT MODE

	if (currentUser.exImg){
		$('.exercise-icon').html('<img src="img/dot.png">');
	}else (updateUser("exImg",'dot') )

	if(currentUser.pushupcount1){
		pushupcount1 = currentUser.pushupcount1;
	}else(updateUser("pushupcount1",pushUp1))
	if(currentUser.militarycount1){
		militarycount1 = currentUser.militarycount1;
	}else updateUser("militarycount1",military1)
	if(currentUser.widecount1){
		widecount1 = currentUser.widecount1
	}else updateUser("widecount1",wide1)
	if(currentUser.dipcount1){
		dipcount1 = currentUser.dipcount1;
	}else(updateUser("dipcount1",dip1))
	if(currentUser.pushupcount2){
		pushupcount2 = currentUser.pushupcount2;
	}else(updateUser("pushupcount2",pushUp2))
	if(currentUser.militarycount2){
		militarycount2 = currentUser.militarycount2;
	}else(updateUser("militarycount2",military2))
	if(currentUser.widecount2){
		widecount2 = currentUser.widecount2;
	}else(updateUser("widecount2",wide2))
	if(currentUser.dipcount2){
		dipcount2 = currentUser.dipcount2;
	}else(updateUser("dipcount2",dip2));

	//DEFAULT SETTINGS
	$('.btn-row').hide();

	var clock = setInterval(workoutProgram, 999);

		if ( cycle === 1 || cycle === 2 ){
			var delayWorkout = setTimeout(delay,9000);
			var prepareDelay = setTimeout(prepareDelay1,6000);

		}else if ( cycle === 3 || cycle === 4){
			var delayWorkout2 = setTimeout(delay2,9000);
			var prepareDelay2 = setTimeout(prepareDelay2,8000);
		}else if ( cycle === 5 || cycle === 6){
			var delayWorkout3 = setTimeout(delay3,6950);
			var prepareDelay3 = setTimeout(prepareDelay3,6950);
		}else if (cycle === 7 || cycle === 8){
			var delayWorkout4 = setTimeout(delay4,6050);
			var prepareDelay4 = setTimeout(prepareDelay4,6050);
		}
		 else if (cycle === 9 || cycle === 10){
			var delayWorkout5 = setTimeout(delay5,11500);
		}else if (cycle === 11 || cycle === 12){
			var delayWorkout6 = setTimeout(delay6,6000);
		}else if (cycle === 13 || cycle === 14){
			var delayWorkout7 = setTimeout(delay7,6000);
		}else if (cycle === 15 || cycle === 16){
			var delayWorkout8 = setTimeout(delay8,6000);
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

	//Button Controls
			$('.stop-btn').click(function(){
			cycle = 0;
			$('#timer').html('Stopped');
			updateUser("cycle",cycle);
			clearTimeout(delayWorkout);
			runWorkout = 0;
			updateUser("runWorkout",runWorkout);			
		});

		$('.upperbody').click(function(){
			runWorkout = 1;
			updateUser("runWorkout",runWorkout);
			cycle = 1;
			updateUser("cycle",cycle);
		})

		$('.home-btn').click(function(){
			runWorkout = 0;
			updateUser("runWorkout",0);
		})

		$('.pause-btn').click(function(){
			paused = true;
			cycle = currentUser.cycle;
			clearInterval(clock);
			// clearTimeout(delayWorkout);

		});

		$('.play-btn').click(function(){
			paused = false;
			setInterval(workoutProgram,1000)
		});

	//LEVEL SELECTOR

	if (runWorkout == 1){
		if( cycle == 1 ){
			cycle = 1;
			updateUser("cycle",cycle);
			console.log("level 1"); //console log just level to test
			 // imageEnter(sendUp);
			var timer = 5000;
			// $('.exercise-title').hide();
			// $('.exercise-icon').hide();
			$('.btn-row').hide();
			delaySwitch = true;
			hideComplete = true;

		
			function prepareDelay1(){
				$('.exercise-title').html('Prepare');
				$('#timer').css('visibility','hidden');
				$('.exercise-icon').html('<img class="workout-img" src="img/Pushups.gif">');
				timer = 1999;
			};
				function delay(){
					if (delaySwitch === true && cycle === 1){
					clock = clearInterval(clock);
					cycle = 2;
					$('.exercise-title').html('Pushups');
					$('.exercise-icon').show();
					timer = 0;
					timer = 12000;
					clock = setInterval(workoutProgram, 999);
					$('#timer').css('visibility','visible');
					console.log("pushy pushy");
					
					hideComplete = false;
					// delaySwitch = false;
					$('.next-form').html('<form id="exercise-count"> <input id="pushupcount1" type="number" name="pushupcount"></form>')
					$('.next').html('<a class="exercise3 next-btn" href="timer.html">Level Up</a>');
					cycle = 3;
					// var delayWorkout = setTimeout(delay,5950);
					updateUser("cycle",cycle);

					$(".exercise3.next-btn").click(function(){
						delaySwitch = false;
						pushUp1 = document.getElementById("pushupcount1").value;
						console.log("I work");
						updateUser("pushupcount1", pushUp1);

						});
				}else{
					console.log('No delay');
				}
			};
					

		}else if ( cycle == 3 ){
			console.log("level 3");
			delaySwitch = true;
			timer = 7000;
			$('.exercise-title').html('Jab/Cross');
			$('.exercise-icon').html('<img class="workout-img" src="img/JabCross.gif">');
			$('.exercise-icon').css('visibility','show');

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
					$('.exercise-title').html('Military Pushups');
					$('#timer').css('visibility','visible');

					timer = 9000;
					console.log("Delay 2");
					clock = setInterval(workoutProgram, 999);
					$('.exercise-icon').html('<img class="workout-img" src="img/MilitaryPushups.gif">');
					console.log("I am the timed cycle 4 :)");
					hideComplete = false;
					$('.next-form').html('<form id="exercise-count"> <input id="militarycount1" type="number" name="militarycount"></form>')
					$('.next').html('<a class="exercise5 next-btn" href="timer.html">Level Up</a>');
					cycle = 5;
					updateUser("cycle",cycle);
					$(".exercise5.next-btn").click(function(){
						military1 = document.getElementById("militarycount1").value;
						console.log("I work");
						updateUser("militarycount1", military1);
						});
				}else{
					console.log('No delay part two');
				}
			};
			}else if ( cycle == 5 ){
				console.log("level5");
				delaySwitch = true;
				timer = 7000;
				$('.exercise-title').html('Hook/Uppercut');
				$('.exercise-icon').html('<img class="workout-img" src="img/HookUppercut.gif">');

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
					$('.exercise-title').html('Wide Pushups');
					$('#timer').css('visibility','visible');

					timer = 7000;
					clock = setInterval(workoutProgram, 999);
					$('.exercise-icon').html('<img class="workout-img" src="img/WidePushups.gif">');
					console.log("I am the timed cycle 6");
					hideComplete = false;
					$('.next-form').html('<form id="exercise-count"> <input id="widecount1" type="number" name="widecount"></form>')
					$('.next').html('<a class="exercise7 next-btn" href="timer.html">Level Up</a>');
					cycle = 7;
					updateUser("cycle",cycle);
					$(".exercise7.next-btn").click(function(){
						wide1 = document.getElementById("widecount1").value;
						updateUser("widecount1", wide1);
						});
				}else{
					console.log('No delay part three');
					}
			};
			}else if ( cycle == 7 ){
				console.log("level7");
				delaySwitch = true;
				timer = 7000;
				$('.exercise-title').html('Knee Strikes');
				$('.exercise-icon').html('<img class="workout-img" src="img/Knees.gif">');

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
					$('.exercise-title').html('Dips');
					$('.exercise-icon').show();
					$('#timer').css('visibility','visible');

					timer = 7000;
					clock = setInterval(workoutProgram, 999);
					$('.exercise-icon').html('<img class="workout-img" src="img/Dips.gif">');
					console.log("I am the timed cycle 8");
					hideComplete = false;
					$('.next-form').html('<form id="exercise-count"> <input id="dipcount1" type="number" name="dipcount"></form>')
					$('.next').html('<a class="exercise9 next-btn" href="timer.html">Level Up</a>');
					cycle = 9;
					updateUser("cycle",cycle);
					$(".exercise9.next-btn").click(function(){
						dip1 = document.getElementById("dipcount1").value;
						updateUser("dipcount1", dip1);
						});
				}else{
					console.log('No delay');
					}
			};
			}else if ( cycle == 9 ){
				delaySwitch = true;
				timer = 12000;
				$('exercise-title').html('Break!');
				$('exercise-icon').show();
				function delay5(){
					if(delaySwitch === true && cycle === 9){
					clock = clearInterval(clock);
					cycle = 10;
					$('.exercise-title').html('Pushups');
					$('.exercise-icon').show();
					timer = 7000;
					clock = setInterval(workoutProgram, 1000);
					$('.exercise-icon').html('<img class="workout-img" src="img/Pushups.gif">');
					hideComplete = false;
					$('.next-form').html('<form id="exercise-count"> <input id="pushupcount2" type="number" name="pushupcount"></form>')
					$('.next').html('<a class="exercise11 next-btn" href="timer.html">Level Up</a>');
					cycle = 11;
					updateUser("cycle",cycle);
					$(".exercise11.next-btn").click(function(){
						pushUp2 = document.getElementById("pushupcount2").value;
						updateUser("pushupcount2", pushUp2);
						});
				}
			};
			}else if ( cycle == 11 ){
				console.log("level 3");
				delaySwitch = true;
				timer = 9000;
				$('.exercise-title').html('Jab/Cross');
				$('.exercise-icon').html('<img class="workout-img" src="img/JabCross.gif">');

				function delay6(){
					if (delaySwitch === true && cycle === 11){
						clock = clearInterval(clock);
						cycle = 12;
						$('.exercise-title').html('Military Pushups');
						$('.exercise-icon').show();
						timer = 7000;
						console.log("Delay 2");
						clock = setInterval(workoutProgram, 1000);
						$('.exercise-icon').html('<img class="workout-img" src="img/MilitaryPushups.gif">');
						console.log("I am the timed cycle 4 :)");
						hideComplete = false;
						$('.next-form').html('<form id="exercise-count"> <input id="militarycount2" type="number" name="militarycount"></form>')
						$('.next').html('<a class="exercise13 next-btn" href="timer.html">Level Up</a>');
						cycle = 13;
						updateUser("cycle",cycle);
						$(".exercise13.next-btn").click(function(){
							military2 = document.getElementById("militarycount2").value;
							console.log("I work");
							updateUser("militarycount2", military2);
							});
					}else{
						console.log('No delay part two');
					}
			};
			}else if ( cycle == 13 ){
				delaySwitch = true;
				timer = 9000;
				$('.exercise-title').html('Hook/Uppercut');
				$('.exercise-icon').html('<img class="workout-img" src="img/HookUppercut.gif">');

				// delaySwitch = true;
				// $('.next').html('<a class="exercise3 next-btn">Level Up</a>');

				function delay7(){
					if (delaySwitch === true && cycle === 13){
						clock = clearInterval(clock);
						cycle = 14;
						$('.exercise-title').html('Wide Pushups');
						$('.exercise-icon').show();
						timer = 7000;
						console.log("Delay 2");
						clock = setInterval(workoutProgram, 1000);
						$('.exercise-icon').html('<img class="workout-img" src="img/WidePushups.gif">');
						hideComplete = false;
						$('.next-form').html('<form id="exercise-count"> <input id="widecount2" type="number" name="widecount"></form>')
						$('.next').html('<a class="exercise15 next-btn" href="timer.html">Level Up</a>');
						cycle = 15;
						updateUser("cycle",cycle);
						$(".exercise15.next-btn").click(function(){
							wide2 = document.getElementById("widecount2").value;
							console.log("I work");
							updateUser("widecount2", wide2);
							});
					}else{
						console.log('No delay part two');
					}
			};
			}else if ( cycle == 15 ){
				console.log("level7");
				delaySwitch = true;
				timer = 7000;
				$('.exercise-title').html('Knee Strikes');
				$('.exercise-icon').html('<img class="workout-img" src="img/Knees.gif">');

				function delay8(){
					if(delaySwitch === true && cycle === 15){
						clock = clearInterval(clock);
					cycle = 16;
					$('.exercise-title').html('Dips');
					$('.exercise-icon').show();
					timer = 7000;
					clock = setInterval(workoutProgram, 1000);
					$('.exercise-icon').html('<img class="workout-img" src="img/Dips.gif">');
					hideComplete = false;
					$('.next-form').html('<form id="exercise-count"> <input id="dipcount2" type="number" name="dipcount"></form>')
					$('.next').html('<a class="exercise17 next-btn" href="timer.html">Level Up</a>');
					cycle = 17;
					updateUser("cycle",cycle);
					$(".exercise17.next-btn").click(function(){
						dip2 = document.getElementById("dipcount2").value;
						updateUser("dipcount2", dip2);
						cycle = 0; //Gotta make this 99 and have a finished script
						updateUser("cycle",cycle);
						hideComplete = false;
						});
				}else{
					console.log('No delay');
					}
			};
			}else if (cycle == 17){
				hideComplete = false;
			}else{
			console.log("none");
			}

		$('.exercise1').click(function(){
			
			
		});

		// $('.exercise2').click(function(){
		// 	cycle = 2;
		// 	updateUser("cycle",cycle);
		// 	timer = 6000;
		// 	$('.exercise-title').html('Pushups');
		// 	clock = setInterval(workoutProgram, 1000);
		// 	console.log('I am running from the button');
		// 	$('.next').html('<a class="exercise3 next-btn" href="timer.html">Level Up</a>');
		// });

		$('.exercise3').click(function(){
			cycle = 3;
			updateUser("cycle",cycle);
			$('.exercise-title').html('Punch Cycle');
			$('.next').html('<a class="exercise3 next-btn">Level Up</a>');
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

		
		function workoutProgram(){
			if ( cycle !== 0 && paused === false && runWorkout === 1 && timer >= 0){
				var time = timer;
				// setInterval(test);
				var time = getTimeRemaining(timer); 
				// console.log(time);
				$('#timer').text(time.minutes + ":" + time.seconds );
				$('#timer').show();
				$('.exercise-title').show();
				$('.exercise-icon').css('display','block');
				$('.exercise-icon').css('visibility','visible');
				$('.btn-row').hide();
				$('.stop').show();
				$('.complete-display').hide();
				timer -= 999;
				console.log(timer);

				if (timer === 0 && hideComplete === false){
					$('.exercise-icon').css('visibility','hidden');
					$('.complete-display').show();
					$('#timer').css('visibility','hidden');
					$('.stop').hide();
					$('.btn-row').show();
					clearInterval(clock);
					console.log(cycle);
				}else if (prepare === true){
					function prepareDelay(){
						$('.prepare').show();

					}

				}else{
					$('.preworkout').css('visibility','hidden');
					$('.motivation').css('visibility','hidden' );
				};

				if (timer === 0 && cycle === 0){
					clearInterval(clock);

				}
			}else{
				$('#timer').css('visibility','hidden');
				console.log('Stopped');
				$('.stop').hide();
				$('.btn-row').show();
				// isPaused = false;
				cycle=0;
				clearInterval(clock);
				// $('#timer').hide;
			}
		}
	};//END RUN WORKOUT

	//IMAGE//
	
		$('.dot').click(function(){
			$('.exercise-icon').html('<img src="img/dot.png">');
			updateUser("exImg",'dot');
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
	
>>>>>>> origin/master
