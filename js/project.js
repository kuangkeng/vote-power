console.log("start10!");

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
    indexOpp;  

var resultHeads = [
    "Why a Draw?",
    "Why You Lost",
    "How You Won",
];

    function init() {      
        panel('pageOpen');
        //Events for each button clicked
        $('#btnMobile').click(function () {
            $(window).scrollTop(0);
            panel('pageMobileMenuState');
        });
        $('.optState').click(function () {
            selectedStateIndex = $(this).index();
            selectedSeats = seatByState[selectedStateIndex];
            if (selectedStateIndex == 9 || selectedStateIndex == 13){
              selectedSeat = selectedSeats[0];
              matchSeat();
              $(window).scrollTop(0);
              panel('pageSeat');
            } else {
              $("#mobileSeatList").html('');
              for (i = 0; i < selectedSeats.length; i++) {
                $("#mobileSeatList").append('<li class="nav-item align-items-center col-6 col-xs-6 col-sm-4 col-md-3"><a class="optSeat btn btn-danger btn-lg">' + selectedSeats[i] + '</a></li>');
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
            var idOpp = $(this).attr('id')-1;
            oppData = opponents[idOpp];
            oppSeat = oppData.seat;
            oppKod = oppData.kod;
            oppName = oppData.name;
            oppVoter = oppData.voter;
            oppParty = oppData.party;
            oppPos = oppData.pos;
            oppLevel = oppData.level;
            panel('pageFight');
            compareSeat();
            setTimeout(function(){
                $('#btnWhy').attr('hidden',false);
            }, 5000);
        });        
        $('#btnWhy').click(function () {
            panel('pageAnalysis');
        });
        $('#btnExplain').click(function () {
            openExplain();
        });
        $('#btnRepeatSeat').click(function () {
            $(window).scrollTop(0);
            panel('pageMobileMenuState');
            //$('#btnWhy').attr('hidden',true);
        });
        $('#btnRepeatOpp').click(function () {
            $(window).scrollTop(0);
            panel('pageSeat');
            //$('#btnWhy').attr('hidden',true);
        });
        $('#btnRepeatSeat2').click(function () {
            $(window).scrollTop(0);
            panel('pageMobileMenuState');
            //$('#btnWhy').attr('hidden',true);
        });
        $('#btnRepeatOpp2').click(function () {
            $(window).scrollTop(0);
            panel('pageSeat');
            //$('#btnWhy').attr('hidden',true);
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
        $('#'+ (darkenIndex+1)).removeClass('oppHover').css({'background-color':'rgba(0,0,0,0.5)','pointer-events':'none'});
        $('#'+ (darkenIndex+1) + "> img" ).css('opacity','0.8');
      }
    }

    function compareSeat(){
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
          result_text = "lost";
        }  else {
          result = 2;
          result_text = "won";
        }
      } else {
        result = 0;
        result_text = "draw";
        voteWeight2 = 1;
      }
      console.log("result = " + result);
      console.log("voteWeight = " + voteWeight);
      console.log("voteWeight2 = " + voteWeight2);
      var fullVote = Math.floor(voteWeight2);
      var checkInt = isInt(voteWeight2);
      console.log("checkInt = " + checkInt);
      
      for (i = 0; i < fullVote; i++) { 
        $("#voteBox" + i).append('<img class="img-responsive" src="img/avatar_opp1_240x240.png">');
      }  

      if (checkInt == true){} 
        else {
          $("#voteBox" + fullVote).append('<img class="img-responsive" src="img/avatar_opp1_half_240x240.png">');
        }

      //Populate text for result page  
      $('#resultHead').text(resultHeads[result])

      var resultSummary = [
          "You drew because your vote has equal power to the votes in " + oppSeat + ".",
          "You lost because one vote in " + oppSeat + " is equal to " + voteWeight2 + " votes of yours.",
          "You won because your one vote is equal to "+ voteWeight2 + " votes in " + oppSeat + "."          
      ];

      $('#result01').text(resultSummary[result]);

      if(result>1){
        //user avatar put on left, opp on right
        $('#leftSeat').text(selectedKod + " " + selectedSeat);
        $('#leftVoter').text(addThousandSeparator(selectedVoter) + " voters");
        $('#leftName').text(selectedName);
        $('#leftParty').text(selectedParty);
        $('#rightSeat').text(oppKod + " " + oppSeat);
        $('#rightVoter').text(addThousandSeparator(oppVoter) + " voters");
        $('#rightName').text(oppName);
        $('#rightParty').text(oppParty);
      } else {
        $('#leftSeat').text(oppKod + " " + oppSeat);
        $('#leftVoter').text(addThousandSeparator(oppVoter) + " voters");
        $('#leftName').text(oppName);
        $('#leftParty').text(oppParty);
        $('#rightSeat').text(selectedKod + " " + selectedSeat);
        $('#rightVoter').text(addThousandSeparator(selectedVoter) + " voters");
        $('#rightName').text(selectedName);
        $('#rightParty').text(selectedParty);
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