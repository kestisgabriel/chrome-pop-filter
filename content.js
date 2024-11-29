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

			// Connect the filter to all eligible audio elements
			const audioElements = document.querySelectorAll('audio, video');
			audioElements.forEach((element) => {
				try {
					const source =
						audioContext.createMediaElementSource(element);
					source
						.connect(highPassFilter)
						.connect(audioContext.destination);
				} catch (e) {
					console.warn(
						`Unable to process element: ${element.src}`,
						e,
					);
				}
			});

			// Ensure the context is resumed
			audioContext
				.resume()
				.catch((err) =>
					console.error('AudioContext failed to resume:', err),
				);
		} else {
			// Update the filter frequency
			highPassFilter.frequency.value = frequency;
		}
	}
});
