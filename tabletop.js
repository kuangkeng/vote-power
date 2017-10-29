//put this at init()

<script src="https://cdnjs.cloudflare.com/ajax/libs/tabletop.js/1.4.2/tabletop.min.js"></script> 

//Retrieve previous users data from google spreadsheet and convert them into arrays.
    //Use Tabletop function to convert google spreadsheet into json (documentation: https://github.com/jsoma/tabletop)
    //The google spreadsheet has to be published first
    var spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1-yb2hCTYDQNJ_4vVrP8bMXj3rMrspBkGqPs4UO9JwCI/pubhtml';
    Tabletop.init( { key: spreadsheet_url,
                    callback: showInfo,
                    simpleSheet: true } )

    //Convert data in the spreadsheet to json and store them in "dataset"
    function showInfo(dataset, tabletop) {
      //find the total users 	
      user_num = dataset.length;
      //select only entries that match the selected opponent
      dataset_opp = jQuery.grep(dataset, function (n, i) {
        return (n.opponent == oppSeat);
      },false);
      // console.log("dataset_opp = " + JSON.stringify(dataset_opp));
      //select only entries of which the opponent won
      dataset_opp_win = jQuery.grep(dataset_opp, function (n, i) {
        return (n.result == "lost");
      },false);
      //select only entries of which the opponent lost
      dataset_opp_lost = jQuery.grep(dataset_opp, function (n, i) {
        return (n.result == "won");
      },false);
      win_num = dataset_opp_win.length;
      win_lost = dataset_opp_lost.length;
    }



