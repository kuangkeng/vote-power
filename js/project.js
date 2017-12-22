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
    "Why a Tie?",
    "How You Lost",
    "How You Won",
];

var btnTexts = [
  "Why a tie?",
  "How did I lose?",
  "Why did I win?",
];

var result_shares = [
  "Gosh, that was a tough battle! Can you do better?",
  "That's not even a fair fight! Revenge me!",
  "Yes!!! I am victorious. Who's next?!"
];

var twitterPics = [
  {win:"pic.twitter.com/434UYJ2rOB", lose:"pic.twitter.com/nKTMh1Ntec", draw:"pic.twitter.com/P3tyIGsZwY"},
  {win:"pic.twitter.com/m0yb3dpIBT", lose:"pic.twitter.com/JgbsKeec6P", draw:"pic.twitter.com/2GQhiIsome"},
  {win:"pic.twitter.com/aYLFR9QHCT", lose:"pic.twitter.com/pshIGNZZq9", draw:"pic.twitter.com/QtjTCTHtlz"},
  {win:"pic.twitter.com/GGMGRuSkow", lose:"pic.twitter.com/GvUaKLNVB2", draw:"pic.twitter.com/xicERUHegt"},
  {win:"pic.twitter.com/0J3XWtmRCi", lose:"pic.twitter.com/rL95s4JT7Q", draw:"pic.twitter.com/cTmqDwRE1w"},
  {win:"pic.twitter.com/cFBTLkz4zS", lose:"pic.twitter.com/0fJcNJq4mh", draw:"pic.twitter.com/jhm0HTDzqi"},
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
                $('#shareBox').fadeIn();
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
            $("#shareBox").hide();
            $("#loserVote").html("");
            $("#leftVoteHead").removeClass("flipImg");
        });
        $('.btnRepeatOpp').click(function () {
            showOppWin();
            $(window).scrollTop(0);
            panel('pageOpponent');
            $("#resultBox").hide();
            $("#shareBox").hide();
            $("#loserVote").html("");
            $("#leftVoteHead").removeClass("flipImg");
        });
    }

    //Function to open index2.html and pass on the seats selected
    function openExplain(){
      var url = "explained.html?seat=" + selectedKod + "&opp=" + oppKod;
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
      // console.log("percentage of difference = " + perVoter);

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
        $("#btnExplain").text("Tell me more");
      }
      // console.log("result = " + result);
      // console.log("voteWeight = " + voteWeight);
      // console.log("voteWeight2 = " + voteWeight2);
      var fullVote = Math.floor(voteWeight2);
      var maxVote = Math.ceil(voteWeight2);
      var checkInt = isInt(voteWeight2);
      // console.log("checkInt = " + checkInt);
      var voteHeadLeftUrl = "img/avatar_" + voteHeadLeft + "_240x240.png";
      var voteHeadRightUrl = "img/avatar_" + voteHeadRight + "_240x240.png";
      var voteHeadRightHalfUrl = "img/avatar_" + voteHeadRight + "_half_240x240.png";
      var voteHeadWidth;
      // console.log("maxVote = " + maxVote);
      
      //set the width of the avatars in result page
      if (maxVote >2  && maxVote <7){
        voteHeadWidth = "33%"  
      } else if (maxVote >6){
        voteHeadWidth = "26%"  
      }
      else {
        voteHeadWidth = (100/maxVote)+"%";
      }

      //append avatars to the result page
      for (i = 0; i < fullVote; i++) { 
        $("#loserVote").append('<li class="voteHead"><img src="'+ voteHeadRightUrl +'" alt=""></li>');
      }
      if (checkInt == true){} 
        else {
          $("#loserVote").append('<li class="voteHead"><img src="'+ voteHeadRightHalfUrl +'" alt=""></li>');
        }
      $(".voteHead").css({"max-width":voteHeadWidth, "display":"inline-block"});  
      //align to left if the number of avatar is more than 1
      if(maxVote == 1){}
        else {
          $("#loserVote").css({"text-align":"left"});
        }
      $("#leftVoteHead").attr("src", voteHeadLeftUrl);
      //flip the left avatar so it is facing right
      if(result == 1){$("#leftVoteHead").addClass("flipImg");}

      //Populate text for result page  
      var fightUrl = "img/fight_opp" + idOpp + "_you_" + result_text + "_480x480.gif";
      $("#fightImg").attr("src","");
      $("#fightImg").attr("src",fightUrl);
      $('#btnWhy').text(btnTexts[result]);
      $('#resultHead').text(resultHeads[result]);

      var resultSummary = [
          "Your seat has a similar number of voters compared to your opponent's seat. Only one Member of Parliament is elected for each seat. It means votes in both seats carry the same weight.",
          "Your seat has about " + voteWeight2 + " times more voters than your opponent's seat, but only one Member of Parliament is elected for each seat. It means one vote in your opponent's seat carries the same weight as " + voteWeight2 + " of your votes.",
          "Your opponent's seat has about " + voteWeight2 + " times more voters than your seat, but only one Member of Parliament is elected for each seat. It means your single vote carries the same weight as " + voteWeight2 + " votes in your opponent's seat.",
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
        $('#voteTextLeft').text("Your seat is");
        $('#voteTextRight').text("Your opponent's seat is");
      } else {
        $('#leftSeat').text(oppKod + " " + oppSeat);
        $('#leftVoter').text(addThousandSeparator(oppVoter) + " voters");
        $('#leftName').text(oppName);
        $('#leftParty').text(oppParty);
        $('#rightSeat').text(selectedKod + " " + selectedSeat);
        $('#rightVoter').text(addThousandSeparator(selectedVoter) + " voters");
        $('#rightName').text(selectedName);
        $('#rightParty').text(selectedParty);
        $('#voteTextLeft').text("Your opponent's seat is");
        $('#voteTextRight').text("Your seat is");
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
        // console.log("user_num = " + user_num);
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
          // console.log("win_num " + opponents[count].seat + " = " + win_num);
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
  href: 'https://pages.malaysiakini.com/votepower-kk-08/VotePowerResult.php?result_share=' + result_shares[result] + '&result=' + result_text + '&opp=' + idOpp, 
  }, function(response){});
}

function tweet() {
  var tweet_pic = twitterPics[idOpp-1][result_text];
  var tweet_url = 'https://twitter.com/intent/tweet?related=malaysiakini&text=';
  tweet_url += encodeURIComponent(result_shares[result]);
  tweet_url += '&url=http://bit.ly/2AULhxD&via=malaysiakini ';
  tweet_url += tweet_pic;
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
          "entry.1122129992": "EN",
        }
      }); 
    }
  );   
}