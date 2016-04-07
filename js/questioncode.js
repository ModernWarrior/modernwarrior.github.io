var cycle = 0;

//This bit of code works fine, it's my timer
function getTimeRemaining(endtime){
	var time = timer;
	var seconds = Math.floor( (timer/1000) % 60 );
	var minutes = Math.floor( (timer / 1000 / 60 ) % 60 );
	return {
		'total': timer,
		'minutes': minutes,
		'seconds': seconds
	};


//Where Problem starts...		

function timerProgram(){
	if ( cycle !== 0 && timer >=0){
		console.log ('Working');
		var time = timer;
		var time = getTimeRemaining(timer); 
		$('#timer').text(time.minutes + ":" + time.seconds );
		timer -= 1000;
	}else{
		console.log('Something has broken'); //this runs after the timer goes past 0 after the initial timer (5 seconds) is finished
	}
};

//There is a link that when pressed updates the cycle to cycle 1

if( cycle == 1 ){
	cycle = 1;
	updateUser("cycle",cycle); //This is local storage which saves the state as the program updates
	var clock = setInterval(timerProgram, 999);
	var delayTime = setTimeout(delay,9000);
	var prepareDelay = setTimeout(prepareDelay1,6000);
	timer = 5000; //This works
	console.log(prepareDelay1);
	console.log(delay);

	function prepareDelay1(){
		console.log('Hi');
		timer = 1999; //This doesn't happen instead I get the console message 'Something has broken'
	};
		function delay(){
			if (cycle === 1){
				clock = clearInterval(clock);
				cycle = 2;
				updateUser("cycle",cycle);
				timer = 0;
				timer = 12000; //Does not run becauuse prepareDelay1 never triggers either
				clock = setInterval(timerProgram, 999);
				console.log("Hi, now changed to cycle 2");
				cycle = 3;
				updateUser("cycle",cycle);
			}else{
				console.log('Something is wrong');
			}
		};				

