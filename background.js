let sliderFrequency = 20; // Default frequency

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === 'SET_HIGH_PASS_FREQUENCY') {
		sliderFrequency = message.frequency;
	} else if (message.type === 'GET_HIGH_PASS_FREQUENCY') {
		sendResponse({ frequency: sliderFrequency });
	}
});
