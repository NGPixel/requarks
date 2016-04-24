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
	// Notifications
	// ====================================

	$(window).bind('beforeunload', () => {
		$('#notifload').addClass('active');
	});

});

// ====================================
// Modals
// ====================================

class Modal {

	constructor(mId) {
		this.id = mId;
	}

	open() {

		$(document.body).addClass('dimmed');
		$('#id-modal-' + this.id).addClass('shown');

	}

	bind(act, clb = false) {

		$('#id-modal-' + this.id + ' .modal-actions > button.act-' + act).one('click', (e) => {
			if(clb) {
				clb();
			} else {
				this.close();
			}
		});

	}

	close(immediate = false) {
		$('#id-modal-' + this.id + ' .modal-actions > button').off('click');
		$('#id-modal-' + this.id).addClass('exit');
		_.delay(() => {
			$(document.body).removeClass('dimmed');
			$('#id-modal-' + this.id).removeClass('shown exit');
		}, (immediate) ? 0 : 500);
	}

};