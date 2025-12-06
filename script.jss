const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition.");
}

const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = "en-US";

const mic = document.querySelector(".microphone");
const output = document.querySelector(".speechOutput");
const instruction = document.querySelector(".instruction");

let isListening = false;

mic.addEventListener("click", () => {
    if (!isListening) {
        try {
            recognition.start();
            isListening = true;
            instruction.textContent = "Click the mic to stop recording";
        } catch (e) {
            console.log("Start blocked until recognition fully stops.");
        }
    } else {
        recognition.stop();
        isListening = false;
        instruction.textContent = "Click on the microphone to begin talking";
    }
});

recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    output.value += transcript + " ";
    console.log("result fired");
};

recognition.onerror = (event) => {
    console.error(event.error);
};

recognition.onend = () => {
    console.log("Microphone released.");
};
