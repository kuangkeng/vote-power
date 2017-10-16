//CODE FOR SCROLLSTORY STARTS HERE
// check viewport dimensions and use them to set the text box margin and chart height and width
var $scrollerWrapper = $('.scroller-wrapper'),
    $chartWrapper = $('.chart-wrapper');

var viewportHeight = $(window).height(),
    halfViewportHeight = Math.floor(viewportHeight / 2),
    twoThirdViewportHeight = Math.floor(viewportHeight / 3 * 2),
    bottomSpace = 0, //use this to set the bottom margin of the chart 
    chartWidth = $('.wrapper').width()-22,
    chartMargin = 0 - (chartWidth/2), //use this to center align the chart when it's position is set as fixed
    chartHeight = Math.floor(viewportHeight*0.95),
    headlineHeight = $('.headline').outerHeight( true);

$chartWrapper.css({'width':chartWidth, 'margin-left':chartMargin, 'height':chartHeight, 'bottom':bottomSpace});
$('.trigger').css({'margin-bottom':viewportHeight});
$('#pageMobileMenu').css({height:viewportHeight});
$('.mobileMenuBox').css({height:viewportHeight*0.8-headlineHeight});
$('.mobileAvatar').css({'max-height':viewportHeight});

var chart;

//count and step are used to check if any chart animation step has been skipped
var count = 0,
    step = 0,
    chartSwitch = 0,
    lastScrollTop = 0,
    scrollDirection = 0; 

//CODE FOR SCROLLSTORY ENDS HERE

var dataAll2 = JSON.parse(JSON.stringify(dataAll));

var selectedData,
    selectedSeat, 
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
    indexUser,
    indexOpp;

var resultText = [
    "It's a draw!",
    "You lose!",
    "You win!",
];    

var resultHeads = [
    "Why was it a draw?",
    "You've lost. Here's why",
    "You've won. There's a reason",
];

var dataSeat = [],
    dataVoter = [],
    dataVoter2 = [],
    dataBN = [],
    dataBN2 = [],
    dataOPP = [],
    dataRural = [],
    dataRural2 = [],
    dataUrban = [],
    dataUrban2 = [];

for (i = 0; i < dataAll.length; i++) { 
    dataSeat.push(dataAll[i].seat);
    dataVoter.push(dataAll[i].y);
    var partyFull = dataAll[i].party;
    var party = partyFull.substring(0, 2);
    if (party == "BN"){ 
      dataBN.push(dataAll[i].y);
      dataOPP.push(0);
    } else {
      dataBN.push(0);
      dataOPP.push(dataAll[i].y);
    }
    if (dataAll[i].kelas == "Rural"){
      dataRural.push(dataAll[i].y);
    } else {
      dataRural.push(0);
    }
    if (dataAll[i].kelas == "Urban"){
      dataUrban.push(dataAll[i].y);
    } else {
      dataUrban.push(0);
    }   
}

dataVoter2 = JSON.parse(JSON.stringify(dataVoter));
dataBN2 = JSON.parse(JSON.stringify(dataBN));
dataRural2 = JSON.parse(JSON.stringify(dataRural));
dataUrban2 = JSON.parse(JSON.stringify(dataUrban));

    function init() {      
        panel('pageOpen');

        //Run Chosen plugin to make the dropdown table
        $(".stateMenu").chosen({width: "70%"});
        var wrapperWidth = $('.wrapper').width()
        var dropdownMargin = (wrapperWidth-(wrapperWidth*0.55))/2;
        $(".dropdownbox").css({'margin-left':dropdownMargin});

        //Events for each button clicked
        $('#btnStart').click(function () {
            $(window).scrollTop(0);
            panel('pageSelect');
        });
        $('#btnMobile').click(function () {
            panel('pageMobileMenu');
        });
        $('.stateMenu').on('change', function() {
            selectedSeat = $(".stateMenu").val();
            matchSeat();
            $('#btnReady').attr('disabled',false);
            $('#imgAvatar').animate({opacity:1},1000);
        });
        $('.optSeat').click(function () {
            selectedSeat = $(this).text();
            matchSeat();
            $('#userSeat').text(selectedSeat);
            $('.userLevel').text("Level " + selectedLevel);
            $('.mobileAvatar').fadeIn(500);
        });    
        $('#btnBackM').click(function () {
            $('.mobileAvatar').fadeOut(500);
        });
        $("#btnReady, #btnReadyM").click(function () {
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
                $('#animationText').text(resultText[result]);
                $('#btnWhy').attr('disabled',false);
            }, 2000);
        });        
        $('#btnWhy').click(function () {
            panel('pageAnalysis');
            //SCROLLSTORY CODE - launched when analysis page is shown
            setTimeout(scrollstory,500);
        });
        $('#btnRepeatSeat').click(function () {
            $('#imgAvatar').animate({opacity:0},0);
            $(window).scrollTop(0);
            panel('pageSelect');
            clearChart();
        });
        $('#btnRepeatOpp').click(function () {
            $(window).scrollTop(0);
            panel('pageSeat');
            clearChart();
        });
        $('#btnShare').click(function () {

        });
    }

    //Function to clear the chart for repeat play
    function clearChart(){
      var seriesLength = chart.series.length;
      for(var i = seriesLength - 1; i > -1; i--) {
          chart.series[i].remove();
      }
      chartSwitch = 0;
      $('#btnWhy').attr('disabled',true);
      count = 0;
      step = 0;   
      dataAll2 = JSON.parse(JSON.stringify(dataAll));
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
        }  else {
          result = 2;}
      } else {
        result = 0;
        voteWeight2 = 1;
      }
      console.log("result = " + result);
      console.log("voteWeight = " + voteWeight);
      console.log("voteWeight2 = " + voteWeight2);
      var fullVote = Math.floor(voteWeight2);
      var checkInt = isInt(voteWeight2);
      console.log("checkInt = " + checkInt);
      
      for (i = 0; i < fullVote; i++) { 
        $("#voteBox" + i).append('<img class="img-responsive" src="graphic/ballot-icon.png">');
      }  

      if (checkInt == true){} 
        else {
          $("#voteBox" + fullVote).append('<img class="img-responsive" src="graphic/ballot-icon-half.png">');
        }

      //Populate text for result page  
      $('#resultHead').text(resultHeads[result])

      var resultSummary = [
          "You got a draw because your vote has equal power to the votes in " + oppSeat + ".",
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

      //Match the user's and opponent's seats in the small to big constituencies list
      var indexesUser = $.map(dataAll, function(obj, index) {
          if(obj.seat == selectedSeat) {
              return index;
          }
      });
      indexUser = indexesUser[0];
      console.log("indexUser = " + indexUser);
      
      var indexesOpp = $.map(dataAll, function(obj, index) {
          if(obj.seat == oppSeat) {
              return index;
          }
      });
      indexOpp = indexesOpp[0];
      console.log("indexOpp = " + indexOpp);
    }

    //Function to check if a number is integer
    function isInt(value) {
      return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
    }

    //SCROLLSTORY: handle the fixed/static position of grahpic
    var toggle = function(bottom) {
      if (bottom) {
        $chartWrapper.addClass('is-bottom');
        $('#instruct').fadeIn();
      } else {
        $chartWrapper.removeClass('is-bottom');
        $('#instruct').fadeOut();
      }
    }

    //SCROLLSTORY: fire function when scrollStory detects text box in focus
    var handleItemFocus = function(event, item) {    
          $('.trigger').eq(item.index).animate({opacity:1},500);
          //fire the animation on text after the text boxes have fully fade in
          setTimeout(function(){
            $('.trigger').eq(item.index).children('.background').addClass("changeBackground");
            $('.trigger').eq(item.index).children('.font').addClass("changeFont");
            $('.trigger').eq(item.index).children('.font3').addClass("changeFont3");
            setTimeout(function(){$('.trigger').eq(item.index).children('.font2').addClass("changeFont2");},1000);
          }, 500);

          //when reverse scroll text boxes that don't fire chart animation, need to minus the step value
          if(item.data.step == "none"){ 
            if(scrollDirection == 0){step--;}
          } 
          else {
            step = item.data.step;    //"step" is the variable set in index.html
            //when scroll down, fire chart animation
            if(scrollDirection == 1){
                // console.log("item " + item.data.step + " in focus, draw");
                count++;
                steps[0][step].call();

                //check if any animation step has been skipped and show the error box
                if(count != step){  
                    // console.log("count is smaller than step");
                    // console.log("count = " + count + ", step = " + step);
                    $('#chart-container').hide();
                    $('#errorBox').show();
                }                 
            }
          }
    } 

    //SCROLLSTORY: fire function when scrollStory detects text box is out of focus
    var handleItemBlur = function(event, item) {
        $('.trigger').eq(item.index).animate({opacity:0.1},500);
        if(item.data.step == "none"){} 
        else {
            var step2 = item.data.step;
            //when scroll down, do nothing; when scroll up, fire reverse animation
            if(scrollDirection == 1){} else {
                count--;
                // console.log("item " + item.data.step + " out of focus, reverse");
                steps[1][step2].call();

                //check if any animation step has been skipped and show the error box
                if(count != step2-1){  
                    $('#chart-container').hide();
                    $('#errorBox').show();
                } 
            } 
        }
    }

    //SCROLLSTORY: scroll event
    var handleContainerScroll = function(event) {
    //detect scroll direction
        var st = $(document).scrollTop();
        if (st > lastScrollTop){
            scrollDirection = 1;
        } else {
            scrollDirection = 0;
        }
        lastScrollTop = st;

    // calculate the position of chart from page top
        var bottom = false
        var bb = $scrollerWrapper[0].getBoundingClientRect(),
            bottomFromTop = bb.bottom - viewportHeight,
            distance = bb.top - halfViewportHeight;

        bb = $scrollerWrapper[0].getBoundingClientRect();
        bottomFromTop = bb.bottom - viewportHeight;
      
    //fade in and fade out the chart
      if (bb.top < viewportHeight/2 && bb.top != 0) {
        if (chartSwitch == 0) {
            makechart();
            chartSwitch = 1;
        } 
        $chartWrapper.fadeIn(1000);
      } else {
        $chartWrapper.fadeOut(300);
      }

    //fix the position of chart when scroll to the last animation
      if (bb.top < halfViewportHeight && bottomFromTop > 0) {
        bottom = false
      } else if (bb.top < 0 && bottomFromTop < 0) {
        bottom = true
      }
      toggle(bottom)
    }

    //SCROLLSTORY: call the scrollStory plugin and set the features to be used. Refer to ScrollStory documentation: http://sjwilliams.github.io/scrollstory/
    function scrollstory() {
      var $storywrapper = $('.scroller-wrapper')
      $storywrapper.scrollStory({
        contentSelector: '.trigger',
        triggerOffset: halfViewportHeight,
        itemfocus: handleItemFocus,
        containerscroll: handleContainerScroll,
        itemblur: handleItemBlur,
        scrollSensitivity: 10
      })
    }

    //SCROLLSTORY: chart animation steps. steps[0][i] are sequential animations, steps[1][i] are reverse animations. Refer to highchart API: http://api.highcharts.com/highcharts/Chart.update
    var steps = [
        [
            function step0(){ 
                chart.addSeries({
                    name: "noColor", 
                    id: "noColor",
                    data :dataVoter2,
                });
            },
            function step1(){  
                chart.get("noColor").points[indexUser].update({
                    color: colorUser,
                    dataLabels: {
                      enabled: true,
                      allowOverlap: true,
                      padding: 0,
                      color: '#7e7e7e',
                      format: 'Your seat:<br>' + selectedSeat + '<br>' + addThousandSeparator(selectedVoter) + ' voters',
                      align: 'left',
                      zIndex: 10,
                      style: {fontSize: '12px'},
                    }
                });
            },
            function step2(){
                chart.get("noColor").points[indexUser].update({
                  dataLabels: {enabled: false}
                });    
                chart.get("noColor").points[indexOpp].update({
                    color: colorOpponent,
                    dataLabels: {
                      enabled: true,
                      allowOverlap: true,
                      padding: 0,
                      color: '#7e7e7e',
                      format: "Opponent's seat:<br>" + oppSeat + "<br>" + addThousandSeparator(oppVoter) + " voters",
                      align: 'left',
                      zIndex: 10,
                      style: {fontSize: '12px'},
                    }
                });
                chart.yAxis[0].addPlotLine({
                    value: averageNat, 
                    color: '#a8a8a8',
                    dashStyle: 'shortdash',
                    width: 1,
                    zIndex: 9,
                    label: {
                      text: 'National<br>average<br>61,103',
                      align: 'left',
                      rotation: 0,
                      style: {
                          color: '#939393',
                          fontSize: 12,
                      },
                    },
                    id: 'plotline-national'
                });        
            },
            function step3(){                 
                chart.get("noColor").points[indexOpp].update({
                  color: "#d3d3d3",
                  dataLabels: {enabled: false},
                });    
                chart.get("noColor").points[indexUser].update({
                  color: "#d3d3d3",
                });  
                chart.get("noColor").remove();
                chart.addSeries({
                    name: "allColors", 
                    id: "allColors",
                    data :dataAll2
                });
                chart.get("allColors").setData(dataBN2);
                chart.get("allColors").points[indexUser].update({
                    color: colorUser,
                });           
                chart.get("allColors").points[indexOpp].update({
                    color: colorOpponent,
                });         
                chart.yAxis[0].removePlotLine('plotline-national');
                chart.yAxis[0].addPlotLine({
                  value: averageBN, 
                  color: '#a8a8a8',
                  dashStyle: 'shortdash',
                  width: 1,
                  zIndex: 9,
                  label: {
                    text: 'BN<br>average<br>48,273',
                    align: 'left',
                    rotation: 0,
                    style: {
                        color: '#939393',
                        fontSize: 12,
                    },
                  },
                  id: 'plotline-BN'
                });                
            },
            function step4(){ 
                chart.get("allColors").setData(dataVoter2);
                chart.get("allColors").points[indexUser].update({
                    color: colorUser,
                });           
                chart.get("allColors").points[indexOpp].update({
                    color: colorOpponent,
                }); 
                chart.yAxis[0].addPlotLine({
                  value: averageOPP, 
                  color: '#a8a8a8',
                  dashStyle: 'shortdash',
                  width: 1,
                  zIndex: 9,
                  label: {
                    text: 'OPP<br>average<br>79,921',
                    align: 'left',
                    rotation: 0,
                    style: {
                        color: '#939393',
                        fontSize: 12,
                    },
                  },
                  id: 'plotline-OPP'
                });
            },
            function step5(){ 
                chart.get("allColors").setData(dataRural2);
            },
            function step6(){ 
                chart.get("allColors").setData(dataUrban2);
            },
            function step7(){ 
                chart.get("allColors").setData(dataVoter2);
                chart.get("allColors").points[indexUser].update({
                    color: colorUser,
                    dataLabels: {
                      enabled: true,
                      allowOverlap: true,
                      padding: 0,
                      color: '#7e7e7e',
                      format: 'You',
                      align: 'left',
                      zIndex: 10,
                      style: {fontSize: '12px'},
                    }
                });
                chart.get("allColors").points[indexOpp].update({
                    color: colorOpponent,
                    dataLabels: {
                      enabled: true,
                      allowOverlap: true,
                      padding: 0,
                      color: '#7e7e7e',
                      format: 'Opponent',
                      align: 'left',
                      zIndex: 10,
                      style: {fontSize: '12px'},
                    }
                });
            },                        
        ],
        //reverse animations
        [   function reverse0(){},
            function reverse1(){  
                chart.get("noColor").points[indexUser].update({
                  color:"#d3d3d3",
                  dataLabels: {enabled: false}
                });    
            },
            function reverse2(){ 
                chart.get("noColor").points[indexOpp].update({
                  color:"#d3d3d3",
                  dataLabels: {enabled: false}
                });   
                chart.get("noColor").points[indexUser].update({
                    color: colorUser,
                    dataLabels: {
                      enabled: true,
                      allowOverlap: true,
                      padding: 0,
                      color: '#7e7e7e',
                      format: 'Your seat:<br>' + selectedSeat + '<br>' + addThousandSeparator(selectedVoter) + ' voters',
                      align: 'left',
                      zIndex: 10,
                      style: {fontSize: '12px'},
                    }
                });
                chart.yAxis[0].removePlotLine('plotline-national');
            },
            function reverse3(){ 
                chart.get("allColors").remove();
                chart.addSeries({
                    color:"#d3d3d3",
                    name: "noColor", 
                    id: "noColor",
                    data :dataVoter2,
                });
                chart.yAxis[0].removePlotLine('plotline-BN');
                chart.yAxis[0].addPlotLine({
                    value: averageNat, 
                    color: '#a8a8a8',
                    dashStyle: 'shortdash',
                    width: 1,
                    zIndex: 9,
                    label: {
                      text: 'National<br>average<br>61,103',
                      align: 'left',
                      rotation: 0,
                      style: {
                          color: '#939393',
                          fontSize: 12,
                      },
                    },
                    id: 'plotline-national'
                });
                chart.get("noColor").points[indexOpp].update({
                    color: colorOpponent,
                    dataLabels: {
                      enabled: true,
                      allowOverlap: true,
                      padding: 0,
                      color: '#7e7e7e',
                      format: "Opponent's seat:<br>" + oppSeat + "<br>" + addThousandSeparator(oppVoter) + " voters",
                      align: 'left',
                      zIndex: 10,
                      style: {fontSize: '12px'},
                    }
                });
            },
            function reverse4(){ 
                chart.get("allColors").setData(dataBN2);
                chart.yAxis[0].removePlotLine('plotline-OPP');
            },
            function reverse5(){ 
                chart.get("allColors").setData(dataVoter2); 
                chart.get("allColors").points[indexUser].update({
                    color: colorUser,
                });           
                chart.get("allColors").points[indexOpp].update({
                    color: colorOpponent,
                });
            }, 
            function reverse6(){ 
                chart.get("allColors").setData(dataRural2);
            },
            function reverse7(){ 
                chart.get("allColors").setData(dataUrban2);
                chart.get("allColors").points[indexUser].update({dataLabels: {enabled: false}});
                chart.get("allColors").points[indexOpp].update({dataLabels: {enabled: false}});
            },      
        ]
    ];

    //SCROLLSTORY: functions to make the animated chart
    function makechart () {

        Highcharts.setOptions({
            lang: {
              thousandsSep: ','
            }
        }),

        chart = new Highcharts.Chart({
            chart: {
                height: chartHeight,
                renderTo: 'chart-container',
                type: 'bar',
                animation: {duration: 1500},
            },
            title: {
                text: null,
            },
            subtitle: {
                enabled: false,
            },
            xAxis: {
                categories: dataSeat,     
                labels: {enabled: false}, 
                tickColor: '#ffffff',
            },
            yAxis: { 
                title: {text: 'Number of voters'},
                min: 0,
                max:150000,      
            },
            credits: {enabled: false},
            legend: {enabled: false},
            tooltip: {
                headerFormat:'',
                pointFormat: '<b>{point.seat}</b><br>Voters:<b>{point.y:,0f}</b><br>{point.name}, {point.party}',
            },
            plotOptions: {
                series: {
                    dataLabels: {enabled: false},
                    // pointWidth: 1,
                    pointPadding: 0,
                    groupPadding: 0,
                    borderWidth: 0,
                    shadow: false,
                    animationLimit: Infinity,
                    states: {
                      hover: {
                        brightness: 0.2,
                      }
                    }
                },
            },    
            series: [ 
                {name: "noColor", color:"#d3d3d3", 
                id: 'noColor',
                data: dataVoter,
                },
            ],
        });
    };

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
//           "entry.1489940444": json.ip,
//           "entry.283757303": document.referrer,
//         }
//       }); 
//     }
//   );   
// }