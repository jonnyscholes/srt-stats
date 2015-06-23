// Yeah yeah this is gross, sozlol. This is a WIP blah blah blah.

var srtstats = require('./index.js');
var fs = require('fs');

var broadchurchSrt = fs.readFileSync('fixtures/broadchurch.srt', 'utf8');
var gracelandSrt = fs.readFileSync('fixtures/graceland.srt', 'utf8');

console.log(srtstats.compareFromString(broadchurchSrt, gracelandSrt)+'% of the words in words Broadchurch and Graceland are the same.');
console.log('============================================================');

var legoSrt = fs.readFileSync('fixtures/lego.srt', 'utf8');
var diehardSrt = fs.readFileSync('fixtures/diehard.srt', 'utf8');

console.log(srtstats.compareFromString(legoSrt, diehardSrt)+'% of the words in words Die Hard and The Lego Movie are the same.');
console.log('============================================================');

var stub1 = {
	word1: 100,
	word2: 100,
	word3: 100
};

var stub2 = {
	word1: 100,
	word2: 100,
	word3: 100
};

console.log(srtstats.compare(stub1, stub2));
console.log('============================================================');

var stub3 = {
	word1: 100,
	word2: 100,
	word3: 100
};

var stub4 = {
	word1: 100,
	word2: 100,
	word3: 100,
	word4: 50
};

console.log(srtstats.compare(stub3, stub4));
console.log('============================================================');