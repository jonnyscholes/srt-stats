var srtwords = require('srt-words');

module.exports = {
	compareFromString: compareFromString,
	compare: compare
};

function compareFromString(srt1String, srt2String) {
	var s1 = srtwords.getWordUsage(srt1String);
	var s2 = srtwords.getWordUsage(srt2String);

	return compare(s1, s2);
}

function compare(srt1Words, srt2Words) {
	var data = compareSubtitleWords(srt1Words, srt2Words);
	return calcTotalPercentage(data.totalCommon, data.srt1Words, data.srt2Words);
}

function compareSubtitleWords(srt1Words, srt2Words) {
	var wordsSrt2hasInCommonWithSrt1 = {};
	var wordsSrt1hasInCommonWithSrt2 = {};
	var totalCommon = {};

	for (var w1 in srt1Words) {
		if (srt2Words.hasOwnProperty(w1)) {
			wordsSrt2hasInCommonWithSrt1[w1] = lowest(srt2Words[w1], srt1Words[w1]);
		}
	}

	for (var w2 in srt2Words) {
		if (srt1Words.hasOwnProperty(w2)) {
			wordsSrt1hasInCommonWithSrt2[w2] = lowest(srt2Words[w2], srt1Words[w2]);
		}
	}

	for (var t1 in srt1Words) {
		if (srt2Words.hasOwnProperty(t1) && !totalCommon.hasOwnProperty(t1)) {
			totalCommon[t1] = lowest(srt2Words[t1], srt1Words[t1]);
		}
	}

	for (var t2 in srt2Words) {
		if (srt1Words.hasOwnProperty(t2) && !totalCommon.hasOwnProperty(t2)) {
			totalCommon[t2] = lowest(srt2Words[t2], srt1Words[t2]);
		}
	}

	return {
		srt2InSrt1: wordsSrt2hasInCommonWithSrt1,
		srt1InSrt2: wordsSrt1hasInCommonWithSrt2,
		srt1Words: srt1Words,
		srt2Words: srt2Words,
		totalCommon: totalCommon
	};
}

function calcTotalPercentage(inCommonWordGraph, srt1WordGraph, srt2WordGraph) {
	var inCommonWords = sumObjectValues(inCommonWordGraph);
	var totalWords = sumObjectValues(srt1WordGraph) + sumObjectValues(srt2WordGraph);

	return (inCommonWords * 2) / totalWords * 100;
}

function sumObjectValues(obj) {
	var total = 0;
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			total += obj[prop];
		}
	}
	return total;
}

function lowest(a, b) {
	return Math.min(a, b);
}
