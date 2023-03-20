prediction=""

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
})

camera=document.getElementById("camera")

Webcam.attach("#camera")

function take_Snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">'
    })
}

console.log("ml5 version:",ml5.version)

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/NnD08XGu7/model.json",modelLoaded)

function modelLoaded(){
    console.log("Model Ready!")
}

function speak(){
    var synth=window.speechSynthesis
    speak_data="The prediction is "+prediction
    var utterThis=new SpeechSynthesisUtterance(speak_data)
    synth.speak(utterThis)
}

function check(){
    img=document.getElementById("captured_image")
    classifier.classify(img, gotResult)
}

function gotResult(error,result){
    if(error){
        console.error(error)
    }else{
        console.log(result)
        document.getElementById("result_gesture_name").innerHTML=result[0].label
        prediction=result[0].label
        speak();

        if(prediction=="best"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if(prediction=="okay"){
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if(prediction=="stop"){
            document.getElementById("update_emoji").innerHTML="&#9995;";
        }
        if(prediction=="peace"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
        if(prediction=="rock"){
            document.getElementById("update_emoji").innerHTML="&#129311;";
        }
    }
}