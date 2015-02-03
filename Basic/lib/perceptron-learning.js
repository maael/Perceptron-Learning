function perceptron(options) {
	options = options || {};
	options.threshold = options.threshold || 0;
	options.numberOfInputs = options.numberOfInputs || 1;
	options.bias = options.bias || 1;
	options.useBias = options.useBias || true;
	options.verbose = options.verbose || false;
	var weightings = [];
	/* Set up weighting 0 vector */
	if(options.useBias) weightings.push(0);
	for(var i = 0; i < options.numberOfInputs; i++) weightings.push(0);
	function train(dataset) {
		var inputs, 
			output, 
			result = 0,
			changed = true,
			passes = 0;
		while(changed) {
			passes++;
			if(options.verbose) console.log('# Pass ' + passes + ' #\n');
			changed = false;
			/* Solve each input pair and check output */
			for(var i in dataset) {
				inputs = dataset[i].inputs;
				output = dataset[i].output;
				result = this.solve(inputs);
				if(options.verbose) console.log('\t Result: ' + result);
				if(options.verbose) console.log('\t Change weightings?: ' + (result !== output));
				if(result !== output) {
					for(var i = 0; i < weightings.length; i++) {
						changed = true;
						if(options.useBias && (i === 0)) {
							weightings[i] += (options.bias * output);
						} else {
							weightings[i] += (inputs[i-1] * output);
						}
						weightings[i] = parseFloat(weightings[i].toFixed(2));
					}
				}
				if(options.verbose) console.log('New weightings: ' + weightings + '\n');
			}
		}
	}
	function solve(inputs) {
		if(options.verbose) console.log('For inputs:' + inputs);
		if(options.verbose) console.log('\t Weightings: ' + weightings);
		var sum = weightings[0],
			result;
		for(var i = 0; i < options.numberOfInputs; i++) {
			if(options.verbose) console.log('\t Pair #' + i + ': ' + inputs[i] + '|' + weightings[i+1]);
			sum += (inputs[i] * weightings[i+1]);
		}
		if(options.verbose) console.log('\t Calculating: ' + sum + '>' + options.threshold);
		result = ((sum > options.threshold) ? 1 : -1);
		return result;
	}
	function getWeightings() {
		return weightings;
	}
	function getThreshold() {
		return options.threshold;
	}

	return {
		train: train,
		solve: solve,
		getWeightings: getWeightings,
		getThreshold: getThreshold
	}
}

module.exports = perceptron;