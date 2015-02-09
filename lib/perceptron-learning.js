function perceptron(options) {
	options = options || {};
	options.threshold = options.threshold || 0;
	options.numberOfInputs = options.numberOfInputs || 1;
	options.bias = options.bias || 1;
	options.useBias = options.useBias || true;
	options.verbose = options.verbose || false;
	options.mse = options.mse || false;
	var weightings = [];
	/* Set up weighting 0 vector */
	if(options.useBias) weightings.push(0);
	for(var i = 0; i < options.numberOfInputs; i++) weightings.push(0);
	function conditionalLog(text) {
		if(options.verbose) console.log(text);
	}
	function train(dataset) {
		var inputs, 
			output, 
			result = 0,
			changed = true,
			passes = 0;
		while(changed) {
			passes++;
			conditionalLog('# Pass ' + passes + ' #\n');
			changed = false;
			/* Solve each input pair and check output */
			for(var i in dataset) {
				inputs = dataset[i].inputs;
				output = dataset[i].output;
				result = this.solve(inputs);
				conditionalLog('\t Result: ' + result);
				conditionalLog('\t Change weightings?: ' + (result !== output));
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
				conditionalLog('New weightings: ' + weightings + '\n');
			}
		}
	}
	function solve(inputs) {
		conditionalLog('For inputs:' + inputs);
		conditionalLog('\t Weightings: ' + weightings);
		var sum = weightings[0],
			result;
		for(var i = 0; i < options.numberOfInputs; i++) {
			conditionalLog('\t Pair #' + i + ': ' + inputs[i] + '|' + weightings[i+1]);
			sum += (inputs[i] * weightings[i+1]);
		}
		conditionalLog('\t Calculating: ' + sum + '>' + options.threshold);
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