const numDivs = 36;
const maxHits = 10;

let hits = 0;
let fails = 0;
let firstHitTime = 0;

function getTimestamp() {
  let d = new Date();
  return d.getTime();
}

function randomDivId() {
  let x = Math.floor(Math.random() * 6) + 1;
  let y = Math.floor(Math.random() * 6) + 1;
  return `#slot-${x}${y}`;
}

function round() {
  $(".target").removeClass("target"); 
  $(".miss").removeClass("miss"); 

  let divSelect = randomDivId();
  $(divSelect).addClass("target")
  $(divSelect).text(hits + 1)
  
    if (hits === maxHits) {
      $(divSelect).text(1);
    }
    if (hits === 1) { 
      firstHitTime = getTimestamp();
    } 
    if (hits === maxHits) {
      endGame();
    } 
}

function endGame() {
  $(".game-field").hide();

  let playedMilliseconds = getTimestamp() - firstHitTime;
  let playedSeconds = Number(playedMilliseconds / 1000).toPrecision(2);
  $("#total-time-played").text(playedSeconds);
  $("#total-scores").text(hits - fails);
  $("#win-message").removeClass("hide-this");
}

function handleClick(event) {
  let target = $(event.target)
  
  if (target.hasClass("target")) {
    hits += 1;
    target.text("");
    round();
  } else {
  	fails += 1
  	$(event.target).addClass("miss"); 
  } 
}

function init() {
    round();

    $(".game-field").click(handleClick);
    $("#button-start").click(function() {
      hits = 0;
      fails = 0;
      firstHitTime = 0;
      $(".game-field").show();
      $("#win-message").addClass("hide-this");
  });
}

$(document).ready(init);