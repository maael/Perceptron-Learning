/*
* Module Dependencies
*/
var perceptron = require('..'),
    chai = require('chai'),
    should = chai.should();

describe('Perceptron', function() {
	describe('#perceptron', function() {
		it('initializes correctly', function() {
			var p1 = new perceptron();
			p1.getWeightings().should.eql([0,0]);
			p1.getThreshold().should.eql(0);

			var p2 = new perceptron({
				threshold: 1,
				numberOfInputs: 2
			});
			p2.getWeightings().should.eql([0,0,0]);
			p2.getThreshold().should.eql(1);
		});
	});
	describe('#train', function() {	
		it('training produces the right weightings', function() {
			var p1 = new perceptron({
				numberOfInputs: 2
			});
			p1.train([
				{inputs: [1, 4], output: 1}, 
				{inputs: [2, 9], output: 1}, 
				{inputs: [5, 6], output: 1}, 
				{inputs: [4, 5], output: 1}, 
				{inputs: [6, 0.7], output: -1}, 
				{inputs: [1, 1.5], output: -1},
			]);
			p1.getWeightings().should.eql([-7, -5, 7.1]);
			
			var p2 = new perceptron({
				numberOfInputs: 2
			});
			p2.train([
				{inputs: [1, 4], output: -1}, 
				{inputs: [2, 9], output: 1}, 
				{inputs: [5, 6], output: 1}, 
				{inputs: [4, 5], output: 1}, 
				{inputs: [6, 0.7], output: -1}, 
				{inputs: [1, 1.5], output: -1},
			]);
			p2.getWeightings().should.eql([-28, 1, 6.7]);
			
		});
	});
	describe('#solve', function() {
		it('training produces the right output for an input', function() {

		});
	});
});