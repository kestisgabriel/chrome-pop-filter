let audioContext = null;
let highPassFilter = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === 'SET_HIGH_PASS_FREQUENCY') {
		const frequency = message.frequency;

		if (!audioContext) {
			// Initialize the audio context and filter
			audioContext = new AudioContext();
			highPassFilter = audioContext.createBiquadFilter();
			highPassFilter.type = 'highpass';
			highPassFilter.frequency.value = frequency;

			// Connect the filter to all audio sources
			const audioElements = document.querySelectorAll('audio, video');
			audioElements.forEach((element) => {
				const source = audioContext.createMediaElementSource(element);
				source
					.connect(highPassFilter)
					.connect(audioContext.destination);
			});
		} else {
			// Update the filter frequency
			highPassFilter.frequency.value = frequency;
		}
	}
});
