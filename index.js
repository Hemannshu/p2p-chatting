var getusermedia = require('getusermedia')
var Peer = require('simple-peer')
getusermedia(
    {
        video:true,
        audio:true
    },
    function(err,stream){
        if(err)console.log(err);
        var peer = new Peer({
            initiator:location.hash==='#init',
            trickle:false,
            stream:stream
        })
        peer.on('signal',function(data){
            console.log(data)
            document.getElementById("yourId").value =JSON.stringify(data);
        })
        document.getElementById("connect").addEventListener('click',function(){
            console.log("button was clicked")
            var otherId =JSON.parse(document.getElementById('otherId').value)
            peer.signal(otherId)

        })
        document.getElementById('send').addEventListener('click',function(){
            console.log("send button was clicked")
            var yourMessage=document.getElementById('yourMessage').value
            peer.send(yourMessage)
        })
        peer.on('data',function(data){
            console.log(data)
            document.getElementById("messages").textContent+=data + "\n"
        })
        peer.on('stream',function(stream){
            console.log(stream)
            showWebcam(stream)
        })
    }
);
function showWebcam(stream){
    const video =document.createElement('video');
    document.body.appendChild(video)
    video.srcObject=stream
    video.play()
}