console.log("start17");

var viewportHeight = $(window).height(),
    headlineHeight = $('.headline').outerHeight( true);

$('#pageMobileMenu').css({height:viewportHeight});
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
    idOpp;

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
        panel('pageOpen');
        //Events for each button clicked
        $('#btnMobile').click(function () {
            $(window).scrollTop(0);
            panel('pageMobileMenuState');
        });
        $('.optState').click(function () {
            selectedStateIndex = $('.optState').index(this);
            selectedSeats = seatByState[selectedStateIndex];
            if (selectedStateIndex == 9 || selectedStateIndex == 13){
              selectedSeat = selectedSeats[0];
              matchSeat();
              $(window).scrollTop(0);
              panel('pageSeat');
            } else {
              $("#mobileSeatList").html('');
              for (i = 0; i < selectedSeats.length; i++) {
                $("#mobileSeatList").append('<li><a class="optSeat uk-button uk-button-secondary uk-border-rounded uk-width-1-1">' + selectedSeats[i] + '</a></li>');
              }
              panel('pageMobileMenu');
            }   
        }); 
        $('#mobileSeatList').on('click', '.optSeat', function(){
            selectedSeat = $(this).text();
            matchSeat();
            $(window).scrollTop(0);
            panel('pageSeat');
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
        });        
        $('#btnWhy').click(function () {
            panel('pageAnalysis');
        });
        $('#btnExplain').click(function () {
            openExplain();
        });
        $('.btnRepeatSeat').click(function () {
            $(window).scrollTop(0);
            panel('pageMobileMenuState');
            $("#resultBox").hide();
            $("#loserVote").html("");
            $("#leftVoteHead").removeClass("flipImg");
            $(".opponent").css({'background-color':'#e54e42!important','pointer-events':'auto'});
            $('.opponent > img').css('opacity','1');
        });
        $('.btnRepeatOpp').click(function () {
            $(window).scrollTop(0);
            panel('pageSeat');
            $("#resultBox").hide();
            $("#loserVote").html("");
            $("#leftVoteHead").removeClass("flipImg");
        });
        $('#btnShare').click(function () {

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
      darkenOpp();
    }

    function darkenOpp(){
      var oppSeats = [];
      for (i = 0; i < opponents.length; i++) { 
        oppSeats.push(opponents[i].seat);
      }  
      var darkenIndex = jQuery.inArray(selectedSeat, oppSeats);
      if (darkenIndex == -1){} else {
        $('#'+ (darkenIndex+1)).css({'background-color':'rgba(0,0,0,0)','pointer-events':'none'});
        $('#'+ (darkenIndex+1) + "> img" ).css('opacity','0.3');
      }
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
        $("#btnExplain").text("Some voters are more powerful than you, find out why");
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
        $("#loserVote").append('<li class="voteHead"><img class="img-responsive" src="'+ voteHeadRightUrl +'"></li>');
      }
      if (checkInt == true){} 
        else {
          $("#loserVote").append('<li class="voteHead"><img class="img-responsive" src="'+ voteHeadRightHalfUrl +'"></li>');
        }
      $(".voteHead").css({"max-width":voteHeadWidth, "display":"inline-block"});  
      if(maxVote == 1){$("#loserVote").css({"text-align":"center"});} 
        else {$("#loserVote").css({"text-align":"left"});} 
      $("#leftVoteHead").attr("src", voteHeadLeftUrl);
      if(result == 1){$("#leftVoteHead").addClass("flipImg");}

      //Populate text for result page  
      var fightUrl = "img/fight_opp" + idOpp + "_you_" + result_text + "_480x480.gif";

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

// function sendData() {
//   $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
//     function(json) {
//       $.ajax({
//         type: 'POST',
//         url: 'https://docs.google.com/forms/d/e/1FAIpQLSezn9Ag2Fo5Jsss1mkERwxAPlK7aOpcQK5GU5v9zPcMz8xmfg/formResponse',
//         data: { 
//           "entry.225955305": selectedSeat,
//           "entry.225955305": oppSeat,
//           "entry.225955305": result_text,
//           "entry.1489940444": json.ip,
//           "entry.283757303": document.referrer,
//         }
//       }); 
//     }
//   );   
// }