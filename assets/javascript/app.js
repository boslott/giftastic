//
//    app.js for GifTastic
//    Coding BootCamp at UNC Homework Assignment #6
//    October 7, 2017
//    Bo Slott
//

//
//    Giftastic Object Constructor Function
//
function Giftastic() {

  this.topics = ["swimming", "cycling", "running", "triathlon"];
  this.currentTopicIndex;

  this.renderTopicBtns = function() {

    for(var i=0; i<this.topics.length; i++) {
      var newBtn = $("<button></button>");
      newBtn.addClass("btn btn-default topic-btns");
      newBtn.attr("value", i);
      newBtn.text(this.topics[i]);

      $("#topicOptions").append(newBtn);
    }
  };

  this.chooseTopic = function(appObj) {
    var appObj = appObj;

    $(".topic-btns").on("click",function(){
      appObj.currentTopicIndex = this.value;
      $(".gifs-display").css({
        "background-color":"#e8800c",
        "border-width": "0.1rem"
      });
      appObj.callAJAX(appObj);
    });
  };

  this.callAJAX = function(appObj) {
    var appObj = appObj;
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + appObj.topics[appObj.currentTopicIndex] + "&api_key=BDidNuCitvrSXbXrixCQQ6kVMKjMkMHD&limit=10";

    $.ajax({
      url: queryURL,
      type: "GET",
    }).done(function(response){
      console.log(appObj.topics[appObj.currentTopicIndex])
      console.log(response);
      appObj.renderGifs(response);
      appObj.animate();
    });
  };

  this.renderGifs = function(response) {
    var response = response;
    var gifDisp = $("#gifDisp");
    gifDisp.empty();

    for(var i=0; i<10; i++) {
      var imageUrl = response.data[i].images.fixed_height_still.url;
      var animateUrl = response.data[i].images.fixed_height.url;

      var newImg = $("<img>");
      newImg.attr({
        "id": "gif" + i,
        "src": imageUrl,
        "data-still": imageUrl,
        "data-animate": animateUrl,
        "data-state": "still"
      });
      newImg.addClass("gifImgs");

      gifDisp.append(newImg).append("<br />");
    }
  };

  this.animate = function() {
    $(".gifImgs").on("click", function(){
      var state = $(this).attr("data-state");
      if(state === "still") {
        $(this).attr("data-state","animate");
        $(this).attr("src", $(this).attr("data-animate"));
      } else {
        $(this).attr("data-state","still");
        $(this).attr("src", $(this).attr("data-still"));
      }
    });
  };

  this.renderNewTopicForm = function() {
    $("#newTopic").empty();
    var newForm = $("<form></form>");

    var newInput = $("<input />");
    newInput.attr({
      "type":"text",
      "name":"new-topic-input"
    });
    newForm.append(newInput);

    var newBtn = $("<button></button>");
    newBtn.addClass("new-topic-sub-btn");
    newForm.append(newBtn);

    $("#newTopic").append(newForm);
  };

  this.renderNewTopicButton = function(appObj) {
    var appObj = appObj
    var newTopic = $("#newTopic");
    newTopic.empty();
    var newBtn = $("<button></button>");
    newBtn.addClass("new-topic-btn");
    newBtn.text("New Topic");

    newTopic.append(newBtn);

    newBtn.on("click",function(){
      appObj.renderNewTopicForm();
    });
  };

  // this.newTopic = function() {
  //   var newTopic = $("#newTopic");
  //   if(newTopic.attr("state")==="")
  // };

}



var gifApp = new Giftastic();

gifApp.renderTopicBtns();
gifApp.chooseTopic(gifApp);
// gifApp.renderNewTopicButton(gifApp);
