prediction = "";

Webcam.set({

    height: 300,
    width: 350,
    img_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot() {

    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_img" src="' + data_uri + '">'
    });
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/gxO1Q_3Ul/model.json', modelLoaded);

function modelLoaded() {

    console.log("model loaded");

}

function check(){
    img=document.getElementById("captured_img");
    classifier.classify(img, gotResults);
}

function speak() {

    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function gotResults(error, results) {

    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;

        prediction = results[0].label;
        speak();

        if (results[0].label == "Amazing") {
            document.getElementById("update_gesture").innerHTML = "&#128076;"
        }
        if (results[0].label == "Best") {
            document.getElementById("update_gesture").innerHTML = "&#128077;"
        }
        if (results[0].label == "Victory") {
            document.getElementById("update_gesture").innerHTML = "&#9996;"
        }

    }


}
