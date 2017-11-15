console.log("start18");

var viewportHeight = $(window).height(),
    headlineHeight = $('.headline').outerHeight( true);

$('#pageSeat').css({height:viewportHeight});
//$('.mobileMenuBox').css({height:viewportHeight*0.8-headlineHeight});

var selectedData,
    selectedSeat, 
    selectedSeats, 
    selectedState,
    selectedVoter, 
    selectedKod, 
    selectedParty, 
    selectedName,
    selectedLevel,
    oppData,
    oppSeat, 
    oppVoter, 
    oppKod, 
    oppParty, 
    oppName,
    oppPos,
    oppLevel,
    difVoter,
    perVoter,
    halfround,
    voteWeight,
    voteWeight2,
    result,
    result_text,
    idOpp,
    result_share;

var resultHeads = [
    "Why a Draw?",
    "Why You Lost",
    "How You Won",
];

var btnTexts = [
  "Why a Draw?",
  "How did I lose?",
  "How did I win?",
];

    function init() {   
        showOppWin();
        panel('pageStart');
        //Events for each button clicked
        $('#btnStart').click(function () {
            $(window).scrollTop(0);
            panel('pageState');
        });
        $('.btnState').click(function () {
            selectedStateIndex = $('.btnState').index(this);
            selectedSeats = seatByState[selectedStateIndex];
            if (selectedStateIndex == 9 || selectedStateIndex == 13){
              selectedSeat = selectedSeats[0];
              matchSeat();
              $(window).scrollTop(0);
              panel('pageOpponent');
            } else {
              $("#mobileSeatList").html('');
              for (i = 0; i < selectedSeats.length; i++) {
                $("#mobileSeatList").append('<li><a class="btnSeat uk-button uk-button-secondary uk-button-large uk-border-rounded uk-width-1-1 uk-text-capitalize" style="font-size:16px">' + selectedSeats[i] + '</a></li>');
              }
              panel('pageSeat');
            }   
        }); 
        $('#mobileSeatList').on('click', '.btnSeat', function(){
            selectedSeat = $(this).text();
            matchSeat();
            $(window).scrollTop(0);
            panel('pageOpponent');
        });    
        $('.opponent').click(function () {
            idOpp = $(this).attr('id');
            oppData = opponents[idOpp-1];
            oppSeat = oppData.seat;
            oppKod = oppData.kod;
            oppName = oppData.name;
            oppVoter = oppData.voter;
            oppParty = oppData.party;
            oppPos = oppData.pos;
            oppLevel = oppData.level;
            compareSeat();
            panel('pageFight');
            setTimeout(function(){
                $('#resultBox').fadeIn();
            }, 10000);
            sendData();
        });        
        $('#btnWhy').click(function () {
            panel('pageAnalysis');
        });
        $('#btnExplain').click(function () {
            openExplain();
        });
        $('.btnRepeatSeat').click(function () {
            showOppWin();
            $(window).scrollTop(0);
            panel('pageState');
            $("#resultBox").hide();
            $("#loserVote").html("");
            $("#leftVoteHead").removeClass("flipImg");
        });
        $('.btnRepeatOpp').click(function () {
            showOppWin();
            $(window).scrollTop(0);
            panel('pageOpponent');
            $("#resultBox").hide();
            $("#loserVote").html("");
            $("#leftVoteHead").removeClass("flipImg");
        });
        $('#btnShare').click(function () {
            facebook();
        });
        $('.at-svc-twitter').click(function () {
            // tweet();
        });
    }

    //Function to open index2.html and pass on the seats selected
    function openExplain(){
      var url = "explain.html?seat=" + selectedKod + "&opp=" + oppKod;
      //to fix the issue of Safari on iOS can't open a new window in a new tab
      if($(window).width()<500){
        var win = window.open(url, '_self');  
      } else {var win = window.open(url, '_blank');}
      win.focus();
    }

    //Function to slide up and down the panel
    function panel(id) {
        $('.panel').slideUp(500);
        $('#' + id).slideDown(500);
    }
  
    function matchSeat(){
      selectedData = jQuery.grep(dataAll, function (n, i) {
        return (n.seat == selectedSeat);
      },false);
      selectedVoter = selectedData[0].y;
      selectedKod = selectedData[0].kod;
      selectedParty = selectedData[0].party;
      selectedName = selectedData[0].name;
      selectedLevel = selectedData[0].level;
      console.log(JSON.stringify(selectedData));
    }

    function compareSeat(){
      var voteHeadLeft = "me";
      var voteHeadRight = "opp" + idOpp;
      var bigNum, smallNum;
      difVoter = selectedVoter - oppVoter;
      if(difVoter>0){
        bigNum = selectedVoter;
        smallNum = oppVoter;
      } else {
          bigNum = oppVoter;
          smallNum = selectedVoter;
        }
      
      //Calculate percentage of difference
      perVoter = Math.round(Math.abs(difVoter)/smallNum*100);
      console.log("percentage of difference = " + perVoter);

      //Calculate how many times bigger
      voteWeight = (bigNum/smallNum).toFixed(2);

      //Determine result
      if(perVoter > 30){
        voteWeight2 = Math.round(voteWeight*2)/2;
        if (difVoter > 0) {
          result = 1;
          result_text = "lose";
          voteHeadLeft = "opp" + idOpp;
          voteHeadRight = "me";
        }  else {
          result = 2;
          result_text = "win";
        }
      } else {
        result = 0;
        result_text = "draw";
        voteWeight2 = 1;
        $("#btnExplain").text("Not everyone has the same voting power. Find out why");
      }
      console.log("result = " + result);
      console.log("voteWeight = " + voteWeight);
      console.log("voteWeight2 = " + voteWeight2);
      var fullVote = Math.floor(voteWeight2);
      var maxVote = Math.ceil(voteWeight2);
      var checkInt = isInt(voteWeight2);
      console.log("checkInt = " + checkInt);
      var voteHeadLeftUrl = "img/avatar_" + voteHeadLeft + "_240x240.png";
      var voteHeadRightUrl = "img/avatar_" + voteHeadRight + "_240x240.png";
      var voteHeadRightHalfUrl = "img/avatar_" + voteHeadRight + "_half_240x240.png";
      var voteHeadWidth;
      console.log("maxVote = " + maxVote);
      if (maxVote >2  && maxVote <7){
        voteHeadWidth = "33%"  
      } else if (maxVote >6){
        voteHeadWidth = "26%"  
      }
      else {
        voteHeadWidth = (100/maxVote)+"%";
      }
      
      for (i = 0; i < fullVote; i++) { 
        $("#loserVote").append('<li class="voteHead"><img src="'+ voteHeadRightUrl +'" alt=""></li>');
      }
      if (checkInt == true){} 
        else {
          $("#loserVote").append('<li class="voteHead"><img src="'+ voteHeadRightHalfUrl +'" alt=""></li>');
        }
      $(".voteHead").css({"max-width":voteHeadWidth, "display":"inline-block"});  
      if(maxVote == 1){$("#loserVote").css({"text-align":"center"});} 
        else {$("#loserVote").css({"text-align":"left"});} 
      $("#leftVoteHead").attr("src", voteHeadLeftUrl);
      if(result == 1){$("#leftVoteHead").addClass("flipImg");}

      //Populate text for result page  
      var fightUrl = "img/fight_opp" + idOpp + "_you_" + result_text + "_480x480.gif";
      $("#fightImg").attr("src","");
      $("#fightImg").attr("src",fightUrl);
      $('#btnWhy').text(btnTexts[result]);
      $('#resultHead').text(resultHeads[result]);

      var resultSummary = [
          "You drew because your vote has very similar power to the votes in " + oppSeat + ".",
          "You lost because one vote in " + oppSeat + " is equavalent to " + voteWeight2 + " votes of yours.",
          "You won because your one vote is equavalent to "+ voteWeight2 + " votes in " + oppSeat + "."          
      ];

      $('#result01').text(resultSummary[result]);

      if(result == 2 || result == 0){
        //user avatar put on left, opp on right
        $('#leftSeat').text(selectedKod + " " + selectedSeat);
        $('#leftVoter').text(addThousandSeparator(selectedVoter) + " voters");
        $('#leftName').text(selectedName);
        $('#leftParty').text(selectedParty);
        $('#rightSeat').text(oppKod + " " + oppSeat);
        $('#rightVoter').text(addThousandSeparator(oppVoter) + " voters");
        $('#rightName').text(oppName);
        $('#rightParty').text(oppParty);
        $('#voteTextLeft').text("You're voting in");
        $('#voteTextRight').text("Your opponent is representing");
      } else {
        $('#leftSeat').text(oppKod + " " + oppSeat);
        $('#leftVoter').text(addThousandSeparator(oppVoter) + " voters");
        $('#leftName').text(oppName);
        $('#leftParty').text(oppParty);
        $('#rightSeat').text(selectedKod + " " + selectedSeat);
        $('#rightVoter').text(addThousandSeparator(selectedVoter) + " voters");
        $('#rightName').text(selectedName);
        $('#rightParty').text(selectedParty);
        $('#voteTextLeft').text("Your opponent is representing");
        $('#voteTextRight').text("You're voting in");
      }
    }

    function showOppWin(){
      //Retrieve previous users data from google spreadsheet and convert them into arrays.
      //Use Tabletop function to convert google spreadsheet into json (documentation: https://github.com/jsoma/tabletop)
      //The google spreadsheet has to be published first
      var spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1zonJ5ASmJGbY1ZvJ6rL4_plCO99o6OqZ3fgwJtRZGM4/pubhtml';
      Tabletop.init( { key: spreadsheet_url,
                      callback: getRecord,
                      simpleSheet: true } )

      //Convert data in the spreadsheet to json and store them in "dataset" using Tabletop JS
      function getRecord(dataset, tabletop) {
        //find the total users  
        var user_num = dataset.length;
        console.log("user_num = " + user_num);
        //Repeat for all opponents
        for (count=0; count<opponents.length; count++){
          //select only entries that match the selected opponent
          var dataset_opp = jQuery.grep(dataset, function (n, i) {
            return (n.opponent == opponents[count].seat);
          },false);
          // console.log("dataset_opp = " + JSON.stringify(dataset_opp));
          //select only entries of which the opponent won
          var dataset_opp_win = jQuery.grep(dataset_opp, function (n, i) {
            return (n.result == "lose");
          },false);
          var win_num = dataset_opp_win.length;
          console.log("win_num " + opponents[count].seat + " = " + win_num);
          $("#" + (count+1) + " .uk-label").text(win_num + " WINS");
        }
      }
    }

    //Function to check if a number is integer
    function isInt(value) {
      return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
    }

    function addThousandSeparator(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

$(document).ready(function(){
  init();
}); 

function facebook() {
FB.ui({
  method: 'share',
  href: 'https://pages.malaysiakini.com/votepower-kk/VotePowerResult.php?result_share=' + result_share, 
  }, function(response){});
}

function tweet() {
  var tweet_url = 'https://twitter.com/intent/tweet?related=pritheworld&text=';
  tweet_url += encodeURIComponent(tweet_rating);
  tweet_url += '&url=http://bit.ly/2qtja4a&via=pri';
  tweet_url += ' pic.twitter.com/u9wrwPxLQ8';
  window.open(tweet_url,'_blank');
}

function sendData() {
  $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
    function(json) {
      $.ajax({
        type: 'POST',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSfkDwjYHmZZxtfTVtjoSvDlbvsc8VGphLeeiboKAHBjeb-ZmA/formResponse',
        data: { 
          "entry.927637414": selectedSeat,
          "entry.2041801391": oppSeat,
          "entry.1987551221": result_text,
          "entry.1639422024": json.ip,
          "entry.1860643513": document.referrer,
        }
      }); 
    }
  );   
}