song1= "";
song2= "";
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
statusSong1="";

statusSong2="";

function preload(){
    song1= loadSound("music1.mp3");
    song2= loadSound("music2.mp3");

}

function play(){
    song.play()
    song.setVolume(1);
    song.rate(1);
    
}






function setup(){
   canvas = createCanvas(500,600);
    canvas.center();
    
    video=createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is initialised")
}

function draw(){
    image(video,0,0,500,600);
    statusSong1= song1.isPlaying();
    statusSong2= song2.isPlaying();
    fill("orange");
    stroke("black");
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(statusSong1==false){
            song1.play();
            document.getElementById("song").innerHTML="Super MArio Land Theme";

        }
    }

    if(scoreLefttWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(statusSong2==false){
            song2.play();
            document.getElementById("song").innerHTML="Keyboard Cat";

        }
    }


}

function gotPoses(results){
console.log(results);
leftWristX= results[0].pose.leftWrist.x;
leftWristY= results[0].pose.leftWrist.y;
rightWristX= results[0].pose.rightWrist.x;
rightWristY= results[0].pose.rightWrist.y;
scoreLeftWrist= results[0].pose.keypoints[9].score;
scoreRightWrist= results[0].pose.keypoints[10].score;



}