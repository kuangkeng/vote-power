<?php
     $result_share = $_GET['result_share'];
     // $price = $_GET['price'];
?>

<!DOCTYPE html>
<head>
     <!-- This url should be the same as the href you passed in to showDialog -->
     <meta property="og:url" content="<?="http://".$_SERVER['HTTP_POST'].$_SERVER['REQUEST_URI'];?>" /> 
     <meta property="og:title" content="<?=$result_share?>"/>
     <meta property="og:description" content="How powerful is your vote? Fight your way through our line-up of mighty leaders!"/> 
     <meta property="og:image" content="https://pages.malaysiakini.com/votepower-kk/img/fight_opp1_you_draw_480x480.gif"/>

	 
</head>

<!-- both url is the url where your story page is hosted -->
<?php
include('https://static03.malaysiakini.com/undipower/index.html');
?>
<script>window.location.href = 'https://static03.malaysiakini.com/undipower/index.html';</script>