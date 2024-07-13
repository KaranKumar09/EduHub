// const quoteElement = document.getElementById('quote');
// const quoteText = 'ज्ञान और शिक्षा को समझना भले ही  मुश्किल है  लेकिन  कामयाबी भी उन्ही को मिलती है  जो मुश्किलों  से डर  कर रोया नहीं करते।';
// const words = quoteText.split(' ');
// let index = 0;

// function writeQuote() {
//     if (index < words.length) {
//         let line = '';
//         for (let i = 0; i < 5 && index < words.length; i++, index++) {
//             line += words[index] + ' ';
//         }
//         quoteElement.innerHTML += '<span style="color: ' + rainbowColor() + '; font-size: 18px;">' + line.trim() + '</span><br>';
//         setTimeout(writeQuote, 1000); // Reduced displaying time to 100 milliseconds
//     }
// }

// function rainbowColor() {
//     const frequency = 0.1;
//     const center = 128;
//     const width = 127;
//     const red = Math.sin(frequency * index + 0) * width + center;
//     const green = Math.sin(frequency * index + 2) * width + center;
//     const blue = Math.sin(frequency * index + 4) * width + center;
//     return 'rgb(' + red + ',' + green + ',' + blue + ')';
// }

// writeQuote();
