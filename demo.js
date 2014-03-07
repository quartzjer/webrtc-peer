// this uses forms in demo.html

var peer = require("webrtc-peer");

var signals = document.forms[0][0].value;

var handler;
var parts = [];
function sigs(evt)
{
  parts.push(evt.signal);
  signals = JSON.stringify(parts);
  if(evt.signal.sdp) console.log("SIG",evt.signal);
  if(evt.signal.candidate) console.log("CAN",evt.signal.candidate);
}

function connected()
{
  console.log("WebRTC Peer Data Connected!");
  handler.sendMessage("WebRTC Peer Data Connected!");
}

function message(msg)
{
  signals = JSON.stringify(msg);
}

function pch(arg)
{
  if(handler) return;
  handler = new peer(arg);
  handler.DEBUG = true;
  handler.onhavesignal = sigs;  
  handler.onconnection = connected;
  handler.onreceivemessage = message;

  console.log(handler);
}

function sigout()
{
  pch({initiate:true, _self:"me", _peer:"you"});
}

function sigin()
{
  pch({_self:"me", _peer:"you"});
  var parts = JSON.parse(signals);
  parts.forEach(function(part){
    handler.receiveSignal(part);
  });
}
