
Dropzone.autoDiscover = false;

$(() => {
  
	$('nav.navbar > ul > li').on('click', (e) => {
		window.location.assign(e.currentTarget.dataset.link);
	});

	$('#usravatar').on('click', (e) => {
		$('#root').addClass('pushed');
		_.delay(() => {
			$('nav.actionbar').one('mouseleave', (e) => {
				$('#root').removeClass('pushed');
			});
		}, 500);
	});

	// ====================================
	// Search Engine
	// ====================================

	var rsearch_engine = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		local: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
		  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
		  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
		  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
		  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
		  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
		  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
		  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
		  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
		]
	});

	$('#searchbox > input').typeahead({
		minLength: 3,
		highlight: true
	},
	{
		name: 'rsearch',
		source: rsearch_engine
	}).bind('typeahead:open', () => {
		$('nav.actionbar').removeClass('active');
	});

	// ====================================
	// Dropdown
	// ====================================

	var dropdowns = [];

	$('.dropdown').each((idx, elm) => {
		dropdowns.push(new Dropdown(elm));
	});

	// ====================================
	// Notifications
	// ====================================

	$(window).bind('beforeunload', () => {
		$('#notifload').addClass('active');
	});

});