const slider = document.getElementById('frequency-slider');
const frequencyValue = document.getElementById('frequency-value');

slider.addEventListener('input', () => {
	const frequency = parseInt(slider.value, 10);
	frequencyValue.textContent = `Frequency: ${frequency} Hz`;

	// Send the frequency value to the content script
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, {
			type: 'SET_HIGH_PASS_FREQUENCY',
			frequency,
		});
	});
});
