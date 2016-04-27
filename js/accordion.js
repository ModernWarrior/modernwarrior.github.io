$('.upper-list').on('click', '.upper-control', function(e){
	e.preventDefault();
	$(this)
		.next('.upper-panel')
		.not(':animated')
		.slideToggle();
});

$('.lower-list').on('click', '.lower-control', function(e){
	e.preventDefault();
	$(this)
		.next('.lower-panel')
		.not(':animated')
		.slideToggle();
});

$('.cardio-list').on('click', '.cardio-control', function(e){
	e.preventDefault();
	$(this)
		.next('.cardio-panel')
		.not(':animated')
		.slideToggle();
});

$('.core-list').on('click', '.core-control', function(e){
	e.preventDefault();
	$(this)
		.next('.core-panel')
		.not(':animated')
		.slideToggle();
});