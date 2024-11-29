const slider = document.getElementById('frequency-slider');
const frequencyValue = document.getElementById('frequency-value');

// Update slider value and display
function updateSliderUI(frequency) {
	slider.value = frequency;
	frequencyValue.textContent = `Frequency: ${frequency} Hz`;
}

// Fetch the saved frequency from the background script
chrome.runtime.sendMessage({ type: 'GET_HIGH_PASS_FREQUENCY' }, (response) => {
	const savedFrequency = response?.frequency || 500; // Default to 500 Hz
	updateSliderUI(savedFrequency);
});

// Handle slider input
slider.addEventListener('input', () => {
	const frequency = parseInt(slider.value, 10);
	updateSliderUI(frequency);

	// Save the frequency to the background script
	chrome.runtime.sendMessage({
		type: 'SET_HIGH_PASS_FREQUENCY',
		frequency,
	});

	// Send the frequency to the content script
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, {
			type: 'SET_HIGH_PASS_FREQUENCY',
			frequency,
		});
	});
});
