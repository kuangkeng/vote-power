<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css">
    <script src="https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.1.0/css/responsive.dataTables.min.css">
    
    
    
  </head> 


<style type="text/css">	

body {
  font-family: "Source Sans Pro","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif;
  font-size: 14px;
  line-height: 16px;
  color: #33333c;
  margin:0px auto;
      } 

#wrapper {
    border:1px solid #D3D3D3;
    max-width: 700px; 
    margin: 0 auto;
    padding:10px;
}      

.tableA {
  width:100%;
  margin: 0 auto;
}

#title {
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  text-align: center;
  margin: 20px 10px 20px 10px;
}

.subtitle {
  font-size: 16px;
  line-height: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom:5px;
}

/*
 * Table styles
 */

#country_head, #gold_head, #silver_head, #bronze_head, #total_head, #rank_head {
	font-weight: bold;
}

td.country {width: 25% !important;}
td.rank {width: 10% !important;}

.table_wrapper {
  width:100%;
  margin:0px auto;
}

#table01 tbody tr, #table02 tbody tr {height:27px;}

.center {text-align: center;}
.left {text-align: left;}
.highlight {background-color: #d3401e;}
.downlight {background-color: red;}

#legend_wrapper {margin-left: 20px;}
.legend {width:180px; display: inline-block; margin:5px 0px;}
.col01 {width:30%;}
.col02 {width:70%;}
#rise {height:25px; width:30px; background-color: #CCFFCC;}
#drop {height:25px; width:30px; background-color: #FF99CC;}

@media (max-width: 450px) {
  .tableA, .tableB {width:150px;}
	#table01, #table02, #country_head, #gold_head, #silver_head, #bronze_head, #total_head, #rank_head, .legend, label {font-size:10px; line-height: 11px}
  .legend {margin: 0px; width:140px; font-size: 10px;}
  .legend2 {font-size: 10px; line-height: 12px;}
  #legend_wrapper {margin-left: 0px;}
  #wrapper {padding:5px;}
  #title {font-size: 16px; line-height: 18px; margin: 10px 5px 20px 5px;}
  .subtitle {font-size: 13px; line-height: 15px;}
  .dataTables_scrollBody {max-height:400px !important;}
}

@media (max-width: 310px) {
  .tableA, .tableB {width:120px;}
  input {width:100px;}
  .legend {width:130px;}
  #wrapper {padding:0px; padding-bottom: 5px;}
}

</style>


<body>
<div id="wrapper">  
  <div id="title">All-time medal standings for the Summer Olympics (1896-2012)</div>    
  <div class="table_wrapper">        
    <div class="tableA">
      <table id="table01" class="stripe order-column hover compact" cellspacing="0" width="100%">
        <thead>
          <tr>
            <td class="code" id="code_head">Code</td>
            <td class="seat" id="seat_head">Seat</td>
            <td class="voter" id="voter_head">Voters</td>
            <td class="party" id="party_head">Party</td>
            <td class="rep" id="rep_head">MP</td>
            <td class="state" id="state_head">State</td>
            <td class="class" id="class_head">Class</td>
          </tr>
        </thead>
      </table>
    </div>
  </div>	
</div>

<script>

$(document).ready( function () {

	var dataForTable = [
    {'code':'P189', 'party':'WARISAN', 'seat':'Semporna', 'rep':'Mohd. Shafie Apdal', 'voter':42570, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Sabah'},
    {'code':'P174', 'party':'WARISAN', 'seat':'Penampang', 'rep':'Ignatius Dorell Leiking', 'voter':45179, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Sabah'},
    {'code':'P062', 'party':'PSM', 'seat':'Sungai Siput', 'rep':'Michael Jeyakumar Devaraj', 'voter':51607, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Perak'},
    {'code':'P143', 'party':'PPBM', 'seat':'Pagoh', 'rep':'Muhyiddin Mohd. Yassin', 'voter':46968, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Johor'},
    {'code':'P083', 'party':'PKR', 'seat':'Kuantan', 'rep':'Fuziah Salleh', 'voter':56145, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Pahang'},
    {'code':'P047', 'party':'PKR', 'seat':'Nibong Tebal', 'rep':'Mansor Othman', 'voter':62162, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Pulau Pinang'},
    {'code':'P082', 'party':'PKR', 'seat':'Indera Mahkota', 'rep':'Fauzi Abdul Rahman', 'voter':66813, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Pahang'},
    {'code':'P116', 'party':'PKR', 'seat':'Wangsa Maju', 'rep':'Tan Kee Kwong', 'voter':67188, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Kuala Lumpur'},
    {'code':'P009', 'party':'PKR', 'seat':'Alor Star', 'rep':'Gooi Hsiao-Leung', 'voter':68742, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Kedah'},
    {'code':'P132', 'party':'PKR', 'seat':'Telok Kemang', 'rep':'Kamarul Baharin Abbas', 'voter':69338, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Negeri Sembilan'},
    {'code':'P121', 'party':'PKR', 'seat':'Lembah Pantai', 'rep':'Nurul Izzah Anwar', 'voter':72675, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Kuala Lumpur'},
    {'code':'P044', 'party':'PKR', 'seat':'Permatang Pauh', 'rep':'Wan Azizah Wan Ismail', 'voter':74545, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Pulau Pinang'},
    {'code':'P017', 'party':'PKR', 'seat':'Padang Serai', 'rep':'N. Surendran', 'voter':74776, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Kedah'},
    {'code':'P219', 'party':'PKR', 'seat':'Miri', 'rep':'Michael Teo Yu Keng', 'voter':75527, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Sarawak'},
    {'code':'P105', 'party':'PKR', 'seat':'Petaling Jaya Selatan', 'rep':'Hee Loy Sian', 'voter':78373, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Selangor'},
    {'code':'P099', 'party':'PKR', 'seat':'Ampang', 'rep':'Zuraida Kamaruddin', 'voter':83200, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Selangor'},
    {'code':'P052', 'party':'PKR', 'seat':'Bayan Baru', 'rep':'Sim Tze Tzin', 'voter':83594, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Pulau Pinang'},
    {'code':'P100', 'party':'PKR', 'seat':'Pandan', 'rep':'Mohd Rafizi Ramli', 'voter':85090, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Selangor'},
    {'code':'P115', 'party':'PKR', 'seat':'Batu', 'rep':'Tian Chua', 'voter':85092, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Kuala Lumpur'},
    {'code':'P112', 'party':'PKR', 'seat':'Kuala Langat', 'rep':'Abdullah Sani Abdul Hamid', 'voter':89077, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Selangor'},
    {'code':'P074', 'party':'PKR', 'seat':'Lumut', 'rep':'Mohamad Imran Abdul Hamid', 'voter':90308, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Perak'},
    {'code':'P150', 'party':'PKR', 'seat':'Batu Pahat', 'rep':'Mohd Idris Jusi', 'voter':90401, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Johor'},
    {'code':'P015', 'party':'PKR', 'seat':'Sungai Petani', 'rep':'Johari Abdul', 'voter':93946, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Kedah'},
    {'code':'P010', 'party':'PKR', 'seat':'Kuala Kedah', 'rep':'Azman Ismail', 'voter':95137, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Kedah'},
    {'code':'P071', 'party':'PKR', 'seat':'Gopeng', 'rep':'Lee Boon Chye', 'voter':101225, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Perak'},
    {'code':'P104', 'party':'PKR', 'seat':'Kelana Jaya', 'rep':'Wong Chen', 'voter':101590, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Selangor'},
    {'code':'P019', 'party':'PKR', 'seat':'Tumpat', 'rep':'Kamarudin Jaffar', 'voter':102372, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Kelantan'},
    {'code':'P137', 'party':'PKR', 'seat':'Bukit Katil', 'rep':'Shamsul Iskandar', 'voter':105163, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Melaka'},
    {'code':'P097', 'party':'PKR', 'seat':'Selayang', 'rep':'William Leong Jee Keen', 'voter':108276, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Selangor'},
    {'code':'P098', 'party':'PKR', 'seat':'Gombak', 'rep':'Mohamed Azmin Ali', 'voter':124823, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Selangor'},
    {'code':'P107', 'party':'PKR', 'seat':'Subang', 'rep':'R. Sivarasa', 'voter':130211, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Selangor'},
    {'code':'P109', 'party':'PKR', 'seat':'Kapar', 'rep':'G. Manivannan', 'voter':146625, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Selangor'},
    {'code':'P023', 'party':'PAS', 'seat':'Rantau Panjang', 'rep':'Siti Zailah Mohd Yusoff', 'voter':54262, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Kelantan'},
    {'code':'P020', 'party':'PAS', 'seat':'Pengkalan Chepa', 'rep':'Izani Husin', 'voter':66834, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Kelantan'},
    {'code':'P088', 'party':'PAS', 'seat':'Temerloh', 'rep':'Nasrudin Hassan', 'voter':66986, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Pahang'},
    {'code':'P024', 'party':'PAS', 'seat':'Kubang Kerian', 'rep':'Ahmad Baihaki Atiqullah', 'voter':66991, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Kelantan'},
    {'code':'P059', 'party':'PAS', 'seat':'Bukit Gantang', 'rep':'Idris Ahmad', 'voter':72317, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Perak'},
    {'code':'P022', 'party':'PAS', 'seat':'Pasir Mas', 'rep':'Nik Mohamad Abduh Nik Abdul Aziz', 'voter':73098, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Kelantan'},
    {'code':'P028', 'party':'PAS', 'seat':'Pasir Puteh', 'rep':'Nik Mazian Nik Mohamad', 'voter':78747, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Kelantan'},
    {'code':'P008', 'party':'PAS', 'seat':'Pokok Sena', 'rep':'Mahfuz Omar', 'voter':80502, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Kedah'},
    {'code':'P035', 'party':'PAS', 'seat':'Kuala Nerus', 'rep':'Mohd Khairuddin Aman Razali', 'voter':82497, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Terengganu'},
    {'code':'P021', 'party':'PAS', 'seat':'Kota Bharu', 'rep':'Takiyuddin Hassan', 'voter':82582, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Kelantan'},
    {'code':'P025', 'party':'PAS', 'seat':'Bachok', 'rep':'Ahmad Marzuk Shaary', 'voter':83206, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Kelantan'},
    {'code':'P039', 'party':'PAS', 'seat':'Dungun', 'rep':'Wan Hassan Mohd Ramli', 'voter':83283, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Terengganu'},
    {'code':'P037', 'party':'PAS', 'seat':'Marang', 'rep':'Abdul Hadi Awang', 'voter':96708, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Terengganu'},
    {'code':'P101', 'party':'PAS', 'seat':'Hulu Langat', 'rep':'Che Rosli Che Mat', 'voter':129527, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Selangor'},
    {'code':'P208', 'party':'DAP', 'seat':'Sarikei', 'rep':'Wong Ling Biu', 'voter':37454, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Sarawak'},
    {'code':'P186', 'party':'DAP', 'seat':'Sandakan', 'rep':'Stephen Wong Tien Fatt', 'voter':37778, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Sabah'},
    {'code':'P068', 'party':'DAP', 'seat':'Beruas', 'rep':'Ngeh Koo Ham', 'voter':48435, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Perak'},
    {'code':'P172', 'party':'DAP', 'seat':'Kota Kinabalu', 'rep':'Jimmy Wong Sze Phin', 'voter':49826, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Sabah'},
    {'code':'P049', 'party':'DAP', 'seat':'Tanjong', 'rep':'Ng Wei Aik', 'voter':50136, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Pulau Pinang'},
    {'code':'P120', 'party':'DAP', 'seat':'Bukit Bintang', 'rep':'Fong Kui Lun', 'voter':52753, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Kuala Lumpur'},
    {'code':'P080', 'party':'DAP', 'seat':'Raub', 'rep':'Mohd Ariff Sabri Abdul Aziz', 'voter':53748, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Pahang'},
    {'code':'P211', 'party':'DAP', 'seat':'Lanang', 'rep':'Alice Lau Kiong Yieng', 'voter':57708, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P046', 'party':'DAP', 'seat':'Batu Kawan', 'rep':'Kasthuriraani Patto', 'voter':59322, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Pulau Pinang'},
    {'code':'P196', 'party':'DAP', 'seat':'Stampin', 'rep':'Julian Tan Kok Ping', 'voter':60624, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Sarawak'},
    {'code':'P070', 'party':'DAP', 'seat':'Kampar', 'rep':'Ko Chung Sen', 'voter':63419, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Perak'},
    {'code':'P114', 'party':'DAP', 'seat':'Kepong', 'rep':'Tan Seng Giaw', 'voter':67956, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Kuala Lumpur'},
    {'code':'P145', 'party':'DAP', 'seat':'Bakri', 'rep':'Er Teck Hwa', 'voter':68838, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Johor'},
    {'code':'P043', 'party':'DAP', 'seat':'Bagan', 'rep':'Lim Guan Eng', 'voter':69371, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Pulau Pinang'},
    {'code':'P212', 'party':'DAP', 'seat':'Sibu', 'rep':'Oscar Ling Chai Yew', 'voter':69822, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Sarawak'},
    {'code':'P123', 'party':'DAP', 'seat':'Cheras', 'rep':'Tan Kok Wai', 'voter':71272, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Kuala Lumpur'},
    {'code':'P048', 'party':'DAP', 'seat':'Bukit Bendera', 'rep':'Zairil Khir Johari', 'voter':71772, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Pulau Pinang'},
    {'code':'P050', 'party':'DAP', 'seat':'Jelutong', 'rep':'Jeff Ooi Chuan Aun', 'voter':72837, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Pulau Pinang'},
    {'code':'P117', 'party':'DAP', 'seat':'Segambut', 'rep':'Lim Lip Eng', 'voter':75440, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Kuala Lumpur'},
    {'code':'P060', 'party':'DAP', 'seat':'Taiping', 'rep':'Nga Kor Ming', 'voter':77376, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Perak'},
    {'code':'P065', 'party':'DAP', 'seat':'Ipoh Barat', 'rep':'M. Kulasegaran ', 'voter':78043, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Perak'},
    {'code':'P064', 'party':'DAP', 'seat':'Ipoh Timor', 'rep':'Su Keong Siong', 'voter':80280, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Perak'},
    {'code':'P195', 'party':'DAP', 'seat':'Bandar Kuching', 'rep':'Chong Chieng Jen', 'voter':81037, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Sarawak'},
    {'code':'P045', 'party':'DAP', 'seat':'Bukit Mertajam', 'rep':'Sim Chee Keong', 'voter':81294, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Pulau Pinang'},
    {'code':'P066', 'party':'DAP', 'seat':'Batu Gajah', 'rep':'V. Sivakumar', 'voter':83883, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Perak'},
    {'code':'P106', 'party':'DAP', 'seat':'Petaling Jaya Utara', 'rep':'Tony Pua Kiam Wee', 'voter':84284, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Selangor'},
    {'code':'P051', 'party':'DAP', 'seat':'Bukit Gelugor', 'rep':'Ramkarpal Singh', 'voter':85053, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Pulau Pinang'},
    {'code':'P122', 'party':'DAP', 'seat':'Seputeh', 'rep':'Teresa Kok Suh Sim', 'voter':85172, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Kuala Lumpur'},
    {'code':'P163', 'party':'DAP', 'seat':'Kulai', 'rep':'Teo Nie Ching', 'voter':87218, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Johor'},
    {'code':'P152', 'party':'DAP', 'seat':'Kluang', 'rep':'Liew Chin Tong', 'voter':89470, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Johor'},
    {'code':'P130', 'party':'DAP', 'seat':'Rasah', 'rep':'Teo Kok Seong', 'voter':89496, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Negeri Sembilan'},
    {'code':'P110', 'party':'DAP', 'seat':'Klang', 'rep':'Charles Santiago', 'voter':98263, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Selangor'},
    {'code':'P128', 'party':'DAP', 'seat':'Seremban', 'rep':'Loke Siew Fook', 'voter':103795, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Negeri Sembilan'},
    {'code':'P103', 'party':'DAP', 'seat':'Puchong', 'rep':'Gobind Singh Deo', 'voter':110187, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Selangor'},
    {'code':'P162', 'party':'DAP', 'seat':'Gelang Patah', 'rep':'Lim Kit Siang', 'voter':115227, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Johor'},
    {'code':'P102', 'party':'DAP', 'seat':'Serdang', 'rep':'Ong Kian Ming', 'voter':139604, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Selangor'},
    {'code':'P125', 'party':'BN-UMNO', 'seat':'Putrajaya', 'rep':'Tengku Adnan Tengku Mansor', 'voter':17925, 'coa':'BN', 'color':'#000099', 'class':'Urban', 'state':'Putrajaya'},
    {'code':'P207', 'party':'BN-PBB', 'seat':'Igan', 'rep':'Wahab Dolah', 'voter':18334, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P222', 'party':'BN-PBB', 'seat':'Lawas', 'rep':'Henry Sum Agong', 'voter':19896, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P210', 'party':'BN-PRS', 'seat':'Kanowit', 'rep':'Aaron Ago Dagang', 'voter':20052, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P206', 'party':'BN-PBB', 'seat':'Tanjong Manis', 'rep':'Norah Abd. Rahman', 'voter':20190, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P203', 'party':'BN-PRS', 'seat':'Lubok Antu', 'rep':'William Nyallau Badak ', 'voter':20362, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P200', 'party':'BN-PBB', 'seat':'Batang Sadong', 'rep':'Nancy Shukri', 'voter':21693, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P209', 'party':'BN-PRS', 'seat':'Julau', 'rep':'Joseph Salang Gandum', 'voter':23577, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P183', 'party':'BN-UMNO', 'seat':'Beluran', 'rep':'Ronald Kiandee', 'voter':24938, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P166', 'party':'BN-UMNO', 'seat':'Labuan', 'rep':'Rozman Isli', 'voter':25087, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Labuan'},
    {'code':'P221', 'party':'BN-PBB', 'seat':'Limbang', 'rep':'Hasbi Habibollah', 'voter':25199, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P187', 'party':'BN-UMNO', 'seat':'Kinabatangan', 'rep':'Bung Moktar Radin', 'voter':25315, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P216', 'party':'BN-PRS', 'seat':'Hulu Rajang', 'rep':'Wilson Ugak Kumbong', 'voter':25316, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P181', 'party':'BN-UMNO', 'seat':'Tenom', 'rep':'Raime Unggi', 'voter':25340, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P192', 'party':'BN-SPDP', 'seat':'Mas Gading', 'rep':'Nogeh Gumbek', 'voter':26926, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P176', 'party':'BN-UMNO', 'seat':'Kimanis', 'rep':'Anifah Aman', 'voter':26958, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P182', 'party':'BN-PBRS', 'seat':'Pensiangan', 'rep':'Joseph Kurup', 'voter':27058, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P078', 'party':'BN-MIC', 'seat':'Cameron Highlands', 'rep':'G. Palanivel', 'voter':27941, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Pahang'},
    {'code':'P204', 'party':'BN-PBB', 'seat':'Betong', 'rep':'Douglas Uggah Embas', 'voter':28072, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P055', 'party':'BN-UMNO', 'seat':'Lenggong', 'rep':'Shamsul Anuar Nasarah', 'voter':28148, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Perak'},
    {'code':'P214', 'party':'BN-PRS', 'seat':'Selangau', 'rep':'Joseph Entulu Belaun', 'voter':28271, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P201', 'party':'BN-PBB', 'seat':'Batang Lupar', 'rep':'Rohani Abdul Karim', 'voter':28642, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P213', 'party':'BN-PBB', 'seat':'Mukah', 'rep':'Muhammad Leo Michael Toyad Abdullah', 'voter':28714, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P215', 'party':'BN-PBB', 'seat':'Kapit', 'rep':'Alexander Nanta Linggi', 'voter':28719, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P061', 'party':'BN-UMNO', 'seat':'Padang Rengas', 'rep':'Mohamed Nazri Abdul Aziz', 'voter':28830, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Perak'},
    {'code':'P205', 'party':'BN', 'seat':'Saratok', 'rep':'William Mawan Ikom', 'voter':28843, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P178', 'party':'BN-UMNO', 'seat':'Sipitang', 'rep':'Sapawi Ahmad Wasali', 'voter':29470, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P218', 'party':'BN-PBB', 'seat':'Sibuti', 'rep':'Ahmad Lai Bujang', 'voter':29974, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P177', 'party':'BN-UMNO', 'seat':'Beaufort', 'rep':'Azizah Mohd. Dun', 'voter':30218, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P185', 'party':'BN-PBS', 'seat':'Batu Sapi', 'rep':'Linda Tsen Thau Lin', 'voter':30389, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P202', 'party':'BN-PRS', 'seat':'Sri Aman', 'rep':'Masir Kujat', 'voter':31147, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P079', 'party':'BN-UMNO', 'seat':'Lipis', 'rep':'Abdul Rahman Mohamad', 'voter':32222, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Pahang'},
    {'code':'P067', 'party':'BN-UMNO', 'seat':'Kuala Kangsar', 'rep':'Mastura Mohd Yazid', 'voter':33066, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Perak'},
    {'code':'P069', 'party':'BN-UMNO', 'seat':'Parit', 'rep':'Mohd Zaim Abu Hasan', 'voter':33485, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Perak'},
    {'code':'P054', 'party':'BN-UMNO', 'seat':'Gerik', 'rep':'Hasbullah Osman', 'voter':33982, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Perak'},
    {'code':'P220', 'party':'BN-SPDP', 'seat':'Baram', 'rep':'Anyi Ngau', 'voter':34096, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P199', 'party':'BN-SUPP', 'seat':'Serian', 'rep':'Richard Riot Jaem', 'voter':35422, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P092', 'party':'BN-UMNO', 'seat':'Sabak Bernam', 'rep':'Mohd Fasiah Mohd Fakeh', 'voter':37293, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Selangor'},
    {'code':'P142', 'party':'BN-MCA', 'seat':'Labis', 'rep':'Chua Tee Yong', 'voter':37448, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Johor'},
    {'code':'P004', 'party':'BN-UMNO', 'seat':'Langkawi', 'rep':'Nawawi Ahmad', 'voter':37632, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Kedah'},
    {'code':'P086', 'party':'BN-UMNO', 'seat':'Maran', 'rep':'Ismail Abd. Muttalib', 'voter':37931, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Pahang'},
    {'code':'P157', 'party':'BN-UMNO', 'seat':'Pengerang', 'rep':'Azalina Othman Said', 'voter':38281, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Johor'},
    {'code':'P173', 'party':'BN-UPKO', 'seat':'Putatan', 'rep':'Marcus Makin Mojigoh', 'voter':38284, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Sabah'},
    {'code':'P175', 'party':'BN-UMNO', 'seat':'Papar', 'rep':'Rosnah Abdul Rashid Shirlin', 'voter':39199, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P075', 'party':'BN-UMNO', 'seat':'Bagan Datok', 'rep':'Ahmad Zahid Hamidi', 'voter':39426, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Perak'},
    {'code':'P179', 'party':'BN-UPKO', 'seat':'Ranau', 'rep':'Ewon Ebin', 'voter':39485, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P151', 'party':'BN-GERAKAN', 'seat':'Simpang Renggam', 'rep':'Liang Teck Meng', 'voter':40588, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Johor'},
    {'code':'P155', 'party':'BN-UMNO', 'seat':'Tenggara', 'rep':'Halimah Mohd Sadique', 'voter':40849, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Johor'},
    {'code':'P153', 'party':'BN-UMNO', 'seat':'Sembrong', 'rep':'Hishammuddin Hussein', 'voter':41677, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Johor'},
    {'code':'P141', 'party':'BN-UMNO', 'seat':'Sekijang', 'rep':'Anuar Abd. Manap', 'voter':41938, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Johor'},
    {'code':'P184', 'party':'BN-UMNO', 'seat':'Libaran', 'rep':'Juslie Ajirol', 'voter':41963, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P032', 'party':'BN-UMNO', 'seat':'Gua Musang', 'rep':'Tengku Razaleigh Hamzah', 'voter':42323, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Kelantan'},
    {'code':'P001', 'party':'BN-UMNO', 'seat':'Padang Besar', 'rep':'Zahidi Zainul Abidin', 'voter':42338, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Perlis'},
    {'code':'P193', 'party':'BN-PBB', 'seat':'Santubong', 'rep':'Wan Junaidi Tuanku Jaafar', 'voter':42342, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P197', 'party':'BN-PBB', 'seat':'Kota Samarahan', 'rep':'Rubiah Wang', 'voter':42357, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P168', 'party':'BN-PBS', 'seat':'Kota Marudu', 'rep':'Maximus Johnity Ongkili', 'voter':42553, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P095', 'party':'BN-UMNO', 'seat':'Tanjong Karang', 'rep':'Noh Omar', 'voter':42620, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Selangor'},
    {'code':'P093', 'party':'BN-UMNO', 'seat':'Sungai Besar', 'rep':'Budiman Mohd Zohdi', 'voter':42828, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Selangor'},
    {'code':'P156', 'party':'BN-UMNO', 'seat':'Kota Tinggi', 'rep':'Noor Ehsanuddin Mohd Harun Narrashid', 'voter':42962, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Johor'},
    {'code':'P007', 'party':'BN-UMNO', 'seat':'Padang Terap', 'rep':'Mahdzir Khalid', 'voter':43022, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Kedah'},
    {'code':'P087', 'party':'BN-UMNO', 'seat':'Kuala Krau', 'rep':'Ismail Mohamed Said', 'voter':43026, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Pahang'},
    {'code':'P198', 'party':'BN-PBB', 'seat':'Puncak Borneo (previously Mambong)', 'rep':'James Dawos Mamit', 'voter':43243, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P148', 'party':'BN-MCA', 'seat':'Ayer Hitam', 'rep':'Wee Ka Siong', 'voter':43398, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Johor'},
    {'code':'P003', 'party':'BN-UMNO', 'seat':'Arau', 'rep':'Shahidan Kassim', 'voter':44094, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Perlis'},
    {'code':'P180', 'party':'BN-PBS', 'seat':'Keningau', 'rep':'Joseph Pairin Kitingan', 'voter':44284, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P030', 'party':'BN-UMNO', 'seat':'Jeli', 'rep':'Mustapa Mohamed', 'voter':44564, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Kelantan'},
    {'code':'P154', 'party':'BN-UMNO', 'seat':'Mersing', 'rep':'Abd. Latiff Ahmad', 'voter':45411, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Johor'},
    {'code':'P126', 'party':'BN-UMNO', 'seat':'Jelebu', 'rep':'Zainudin Ismail', 'voter':45797, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Negeri Sembilan'},
    {'code':'P191', 'party':'BN-UMNO', 'seat':'Kalabakan', 'rep':'Abdul Ghapur Salleh', 'voter':46195, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P072', 'party':'BN-MIC', 'seat':'Tapah', 'rep':'M. Saravanan', 'voter':46233, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Perak'},
    {'code':'P056', 'party':'BN-UMNO', 'seat':'Larut', 'rep':'Hamzah Zainudin', 'voter':46242, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Perak'},
    {'code':'P149', 'party':'BN-UMNO', 'seat':'Sri Gading', 'rep':'Ab. Aziz Kaprawi', 'voter':46442, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Johor'},
    {'code':'P129', 'party':'BN-UMNO', 'seat':'Kuala Pilah', 'rep':'Hasan Malek', 'voter':46759, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Negeri Sembilan'},
    {'code':'P013', 'party':'BN-UMNO', 'seat':'Sik', 'rep':'Mansor Abdul Rahman', 'voter':47047, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Kedah'},
    {'code':'P167', 'party':'BN-UMNO', 'seat':'Kudat', 'rep':'Abd Rahim Bakri', 'voter':47444, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P134', 'party':'BN-UMNO', 'seat':'Masjid Tanah', 'rep':'Mas Ermieyati Samsudin', 'voter':48124, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Melaka'},
    {'code':'P146', 'party':'BN-UMNO', 'seat':'Muar', 'rep':'Razali Ibrahim', 'voter':48491, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Johor'},
    {'code':'P140', 'party':'BN-MIC', 'seat':'Segamat', 'rep':'S. Subramaniam', 'voter':48718, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Johor'},
    {'code':'P164', 'party':'BN-UMNO', 'seat':'Pontian', 'rep':'Ahmad Maslan', 'voter':48799, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Johor'},
    {'code':'P170', 'party':'BN-UPKO', 'seat':'Tuaran', 'rep':'Madius Tangau', 'voter':49140, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Sabah'},
    {'code':'P084', 'party':'BN-UMNO', 'seat':'Paya Besar', 'rep':'Abdul Manan Ismail ', 'voter':49176, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Pahang'},
    {'code':'P002', 'party':'BN-UMNO', 'seat':'Kangar', 'rep':'Shaharuddin Ismail', 'voter':50909, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Perlis'},
    {'code':'P073', 'party':'BN-UMNO', 'seat':'Pasir Salak', 'rep':'Tajuddin Abdul Rahman', 'voter':51243, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Perak'},
    {'code':'P090', 'party':'BN-UMNO', 'seat':'Bera', 'rep':'Ismail Sabri Yaakob', 'voter':51293, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Pahang'},
    {'code':'P005', 'party':'BN-UMNO', 'seat':'Jerlun', 'rep':'Othman Aziz', 'voter':51681, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Kedah'},
    {'code':'P169', 'party':'BN-UMNO', 'seat':'Kota Belud', 'rep':'Abdul Rahman Dahlan', 'voter':51851, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P053', 'party':'BN-UMNO', 'seat':'Balik Pulau', 'rep':'Hilmi Yahaya', 'voter':52337, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Pulau Pinang'},
    {'code':'P188', 'party':'BN-UMNO', 'seat':'Silam', 'rep':'Datu Nasrun Datu Mansur', 'voter':52438, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sabah'},
    {'code':'P194', 'party':'BN-PBB', 'seat':'Petra Jaya', 'rep':'Fadillah Yusof', 'voter':53607, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Sarawak'},
    {'code':'P041', 'party':'BN-UMNO', 'seat':'Kepala Batas', 'rep':'Reezal Merican Naina Merican', 'voter':53723, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Pulau Pinang'},
    {'code':'P165', 'party':'BN-MCA', 'seat':'Tanjong Piai', 'rep':'Wee Jeck Seng', 'voter':53991, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Johor'},
    {'code':'P058', 'party':'BN-UMNO', 'seat':'Bagan Serai', 'rep':'Noor Azmi Ghazali', 'voter':54719, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Perak'},
    {'code':'P091', 'party':'BN-UMNO', 'seat':'Rompin', 'rep':'Hasan Arifin', 'voter':54973, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Pahang'},
    {'code':'P190', 'party':'BN-PBS', 'seat':'Tawau', 'rep':'Mary Yap Kain Ching', 'voter':55232, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Sabah'},
    {'code':'P042', 'party':'BN-UMNO', 'seat':'Tasek Gelugor', 'rep':'Shabudin Yahaya', 'voter':55282, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Pulau Pinang'},
    {'code':'P171', 'party':'BN-UMNO', 'seat':'Sepanggar', 'rep':'Jumat Idris', 'voter':55518, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Sabah'},
    {'code':'P119', 'party':'BN-UMNO', 'seat':'Titiwangsa', 'rep':'Johari Abdul Ghani', 'voter':55899, 'coa':'BN', 'color':'#000099', 'class':'Urban', 'state':'Kuala Lumpur'},
    {'code':'P147', 'party':'BN-UMNO', 'seat':'Parit Sulong', 'rep':'Noraini Ahmad', 'voter':56808, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Johor'},
    {'code':'P133', 'party':'BN-UMNO', 'seat':'Tampin', 'rep':'Shaziman Abu Mansor', 'voter':56880, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Negeri Sembilan'},
    {'code':'P081', 'party':'BN-UMNO', 'seat':'Jerantut', 'rep':'Ahmad Nazlan Idris', 'voter':57713, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Pahang'},
    {'code':'P217', 'party':'BN-SPDP', 'seat':'Bintulu', 'rep':'Tiong King Sing', 'voter':60056, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Sarawak'},
    {'code':'P018', 'party':'BN-UMNO', 'seat':'Kulim-Bandar Baharu', 'rep':'Abd Aziz Sheikh Fadzir', 'voter':60481, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Kedah'},
    {'code':'P027', 'party':'BN-UMNO', 'seat':'Tanah Merah', 'rep':'Ikmal Hisham Abdul Aziz', 'voter':61010, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Kelantan'},
    {'code':'P076', 'party':'BN-GERAKAN', 'seat':'Telok Intan', 'rep':'Mah Siew Keong', 'voter':61086, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Perak'},
    {'code':'P029', 'party':'BN-UMNO', 'seat':'Machang', 'rep':'Ahmad Jazlan Yaakub', 'voter':61323, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Kelantan'},
    {'code':'P089', 'party':'BN-MCA', 'seat':'Bentong', 'rep':'Liow Tiong Lai', 'voter':62460, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Pahang'},
    {'code':'P118', 'party':'BN-UMNO', 'seat':'Setiawangsa', 'rep':'Ahmad Fauzi Zahari', 'voter':62812, 'coa':'BN', 'color':'#000099', 'class':'Urban', 'state':'Kuala Lumpur'},
    {'code':'P096', 'party':'BN-UMNO', 'seat':'Kuala Selangor', 'rep':'Irmohizam Ibrahim', 'voter':63920, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Selangor'},
    {'code':'P077', 'party':'BN-MCA', 'seat':'Tanjong Malim', 'rep':'Ong Ka Chuan', 'voter':63990, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Perak'},
    {'code':'P026', 'party':'BN-UMNO', 'seat':'Ketereh', 'rep':'Annuar Musa', 'voter':64426, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Kelantan'},
    {'code':'P135', 'party':'BN-MCA', 'seat':'Alor Gajah', 'rep':'Koh Nai Kwong', 'voter':65956, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Melaka'},
    {'code':'P006', 'party':'BN-UMNO', 'seat':'Kubang Pasu', 'rep':'Mohd Johari Baharum', 'voter':66141, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Kedah'},
    {'code':'P127', 'party':'BN-UMNO', 'seat':'Jempol', 'rep':'Mohd Isa Abdul Samad', 'voter':66386, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Negeri Sembilan'},
    {'code':'P139', 'party':'BN-UMNO', 'seat':'Jasin', 'rep':'Ahmad Hamzah', 'voter':68004, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Melaka'},
    {'code':'P038', 'party':'BN-UMNO', 'seat':'Hulu Terengganu', 'rep':'Jailani Johari', 'voter':68650, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Terengganu'},
    {'code':'P144', 'party':'BN-UMNO', 'seat':'Ledang', 'rep':'Hamim Samuri', 'voter':70678, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Johor'},
    {'code':'P011', 'party':'BN-UMNO', 'seat':'Pendang', 'rep':'Othman Abdul', 'voter':70820, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Kedah'},
    {'code':'P034', 'party':'BN-UMNO', 'seat':'Setiu', 'rep':'Che Mohamad Zulkifly Jusoh', 'voter':71292, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Terengganu'},
    {'code':'P012', 'party':'BN-UMNO', 'seat':'Jerai', 'rep':'Jamil Khir Baharom', 'voter':74176, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Kedah'},
    {'code':'P033', 'party':'BN-UMNO', 'seat':'Besut', 'rep':'Idris Jusoh', 'voter':77266, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Terengganu'},
    {'code':'P136', 'party':'BN-UMNO', 'seat':'Tangga Batu', 'rep':'Abu Bakar Mohamad Diah', 'voter':78264, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Melaka'},
    {'code':'P131', 'party':'BN-UMNO', 'seat':'Rembau', 'rep':'Khairy Jamaluddin', 'voter':79154, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Negeri Sembilan'},
    {'code':'P085', 'party':'BN-UMNO', 'seat':'Pekan', 'rep':'Mohd. Najib Abdul Razak', 'voter':82303, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Pahang'},
    {'code':'P014', 'party':'BN-UMNO', 'seat':'Merbok', 'rep':'Ismail Daut', 'voter':86926, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Kedah'},
    {'code':'P094', 'party':'BN-MIC', 'seat':'Hulu Selangor', 'rep':'P. Kamalanathan', 'voter':86966, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Selangor'},
    {'code':'P063', 'party':'BN-UMNO', 'seat':'Tambun', 'rep':'Ahmad Husni Mohamad Hanadzlah', 'voter':92356, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Perak'},
    {'code':'P016', 'party':'BN-UMNO', 'seat':'Baling', 'rep':'Abdul Azeez Abdul Rahim', 'voter':95349, 'coa':'BN', 'color':'#000099', 'class':'Rural', 'state':'Kedah'},
    {'code':'P160', 'party':'BN-UMNO', 'seat':'Johor Bahru', 'rep':'Shahrir Abdul Samad', 'voter':96923, 'coa':'BN', 'color':'#000099', 'class':'Urban', 'state':'Johor'},
    {'code':'P040', 'party':'BN-UMNO', 'seat':'Kemaman', 'rep':'Ahmad Shabery Cheek', 'voter':99432, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Terengganu'},
    {'code':'P158', 'party':'BN-MCA', 'seat':'Tebrau', 'rep':'Khoo Soo Seang', 'voter':101916, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Johor'},
    {'code':'P161', 'party':'BN-UMNO', 'seat':'Pulai', 'rep':'Nur Jazlan Mohamed', 'voter':104761, 'coa':'BN', 'color':'#000099', 'class':'Urban', 'state':'Johor'},
    {'code':'P159', 'party':'BN-UMNO', 'seat':'Pasir Gudang', 'rep':'Normala Abdul Samad', 'voter':108896, 'coa':'BN', 'color':'#000099', 'class':'Semi-urban', 'state':'Johor'},
    {'code':'P124', 'party':'BEBAS', 'seat':'Bandar Tun Razak', 'rep':'Abd Khalid Ibrahim', 'voter':91379, 'coa':'IND', 'color':'#ffffff', 'class':'Urban', 'state':'Kuala Lumpur'},
    {'code':'P138', 'party':'BEBAS', 'seat':'Kota Melaka', 'rep':'Sim Tong Him', 'voter':94066, 'coa':'IND', 'color':'#ffffff', 'class':'Urban', 'state':'Melaka'},
    {'code':'P057', 'party':'AMANAH', 'seat':'Parit Buntar', 'rep':'Mujahid Yusof Rawa', 'voter':50020, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Perak'},
    {'code':'P031', 'party':'AMANAH', 'seat':'Kuala Krai', 'rep':'Mohd. Hatta Md. Ramli', 'voter':65289, 'coa':'OPP', 'color':'#ff0000', 'class':'Rural', 'state':'Kelantan'},
    {'code':'P113', 'party':'AMANAH', 'seat':'Sepang', 'rep':'Mohamed Hanipa Maidin', 'voter':85853, 'coa':'OPP', 'color':'#ff0000', 'class':'Semi-urban', 'state':'Selangor'},
    {'code':'P036', 'party':'AMANAH', 'seat':'Kuala Terengganu', 'rep':'Raja Kamarul Bahrin Shah Raja Ahmad', 'voter':96965, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Terengganu'},
    {'code':'P108', 'party':'AMANAH', 'seat':'Shah Alam', 'rep':'Khalid Abd. Samad ', 'voter':104289, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Selangor'},
    {'code':'P111', 'party':'AMANAH', 'seat':'Kota Raja', 'rep':'Siti Mariah Mahmud', 'voter':110526, 'coa':'OPP', 'color':'#ff0000', 'class':'Urban', 'state':'Selangor'},
	];

    $('#table01').DataTable(
	    {
	    	data: dataForTable,
        columns: [
          {data:'code'},
          {data:'seat'},
          {data:'voter'},
          {data:'party'},
          {data:'rep'},
          {data:'state'},
          {data:'class'},
        ],
	    	responsive: true,
	    	columnDefs: [
		        // { responsivePriority: 2, targets: 0 },
		        // { responsivePriority: 1, targets: 1 },
          //   { responsivePriority: 3, targets: 2 },
          //   { responsivePriority: 4, targets: 3 },
          //   { responsivePriority: 5, targets: 4 },
          //   { responsivePriority: 6, targets: 5 },
          //   { className: "center", "targets": [ 0 ] },
          //   { className: "left", "targets": [ 1 ] },
		    ],
	    	"paging": false,
	    	"scrollY": "400px",
	    	"scrollCollapse": true,
        "info": false,
        "searching": false,
		  }
    );   
});


</script>

</body>	
</html>