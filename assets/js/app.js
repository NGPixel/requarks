'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {

	$('nav.navbar > ul > li').on('click', function (e) {
		window.location.assign(e.currentTarget.dataset.link);
	});

	$('#usravatar').on('click', function (e) {
		$('#root').addClass('pushed');
		_.delay(function () {
			$('nav.actionbar').one('mouseleave', function (e) {
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
		local: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
	});

	$('#searchbox > input').typeahead({
		minLength: 3,
		highlight: true
	}, {
		name: 'rsearch',
		source: rsearch_engine
	}).bind('typeahead:open', function () {
		$('nav.actionbar').removeClass('active');
	});

	// ====================================
	// Notifications
	// ====================================

	$(window).bind('beforeunload', function () {
		$('#notifload').addClass('active');
	});
});

// ====================================
// Modals
// ====================================

var Modal = function () {
	function Modal(mId) {
		_classCallCheck(this, Modal);

		this.id = mId;
	}

	_createClass(Modal, [{
		key: 'open',
		value: function open() {

			$(document.body).addClass('dimmed');
			$('#id-modal-' + this.id).addClass('shown');
		}
	}, {
		key: 'bind',
		value: function bind(act) {
			var _this = this;

			var clb = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];


			$('#id-modal-' + this.id + ' .modal-actions > button.act-' + act).one('click', function (e) {
				if (clb) {
					clb();
				} else {
					_this.close();
				}
			});
		}
	}, {
		key: 'close',
		value: function close() {
			var _this2 = this;

			var immediate = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			$('#id-modal-' + this.id + ' .modal-actions > button').off('click');
			$('#id-modal-' + this.id).addClass('exit');
			_.delay(function () {
				$(document.body).removeClass('dimmed');
				$('#id-modal-' + _this2.id).removeClass('shown exit');
			}, immediate ? 0 : 500);
		}
	}]);

	return Modal;
}();

;