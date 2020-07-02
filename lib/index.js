'use strict';

var _require = require('./locales'),
    locales = _require.locales,
    currencySymbols = _require.currencySymbols,
    currencyFormatMap = _require.currencyFormatMap;

function replaceSeparators(sNum, separators) {
	var sNumParts = sNum.split('.');
	if (separators && separators.thousands) {
		sNumParts[0] = sNumParts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separators.thousands);
	}
	sNum = sNumParts.join(separators.decimal);
	return sNum;
}

function renderFormat(template, props) {
	for (var prop in props) {
		if (props[prop].indexOf('-') !== -1) {
			props[prop] = props[prop].replace('-', '');
			template = '-' + template;
		}
		template = template.replace('{{' + prop + '}}', props[prop]);
	}
	return template;
}

function mapMatch(map, locale) {
	var match = locale;
	var language = locale && locale.toLowerCase().match(/^\w+/);
	if (!map.hasOwnProperty(locale)) {
		if (map.hasOwnProperty(language)) {
			match = language;
		} else {
			match = 'en';
		}
	}
	return map[match];
}

function dotThousCommaDec(sNum) {
	var separators = {
		decimal: ',',
		thousands: '.'
	};
	return replaceSeparators(sNum, separators);
}

function commaThousDotDec(sNum) {
	var separators = {
		decimal: '.',
		thousands: ','
	};

	return replaceSeparators(sNum, separators);
}

function spaceThousCommaDec(sNum) {
	var seperators = {
		decimal: ',',
		thousands: '\xA0'
	};

	return replaceSeparators(sNum, seperators);
}

function apostrophThousDotDec(sNum) {
	var seperators = {
		decimal: '.',
		thousands: '\''
	};

	return replaceSeparators(sNum, seperators);
}

var transformForLocale = {
	'dotThousCommaDec': dotThousCommaDec,
	'commaThousDotDec': commaThousDotDec,
	'spaceThousCommaDec': spaceThousCommaDec,
	'apostrophThousDotDec': apostrophThousDotDec
};

var currencyFormats = {
	pre: '{{code}}{{num}}',
	post: '{{num}} {{code}}',
	prespace: '{{code}} {{num}}'
};

/**
 * @param {Number} num 
 * @param {String} [locale] 
 * @param {Intl.NumberFormatOptions} [options] 
 * @returns {String}
 */
function toLocaleString(num, locale, options) {
	if (locale && locale.length < 2) {
		throw new RangeError('Invalid language tag: ' + locale);
	}
	var sNum;
	if (options && options.minimumFractionDigits !== undefined && !Number.isInteger(num)) {
		sNum = Number(num).toFixed(options.minimumFractionDigits);
	} else {
		sNum = num.toString();
	}
	sNum = transformForLocale[mapMatch(locales, locale)](sNum, options);
	if (options && options.currency && options.style === 'currency') {
		var format = currencyFormats[mapMatch(currencyFormatMap, locale)];
		if (options.currencyDisplay === 'code') {
			sNum = renderFormat(format, {
				num: sNum,
				code: options.currency.toUpperCase()
			});
		} else {
			sNum = renderFormat(format, {
				num: sNum,
				code: currencySymbols[options.currency.toLowerCase()]
			});
		}
	}
	return sNum;
}

exports.toLocaleString = toLocaleString;