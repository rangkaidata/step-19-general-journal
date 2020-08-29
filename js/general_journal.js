'use strict';
// step 19: general journal 
function GeneralJournal(){
	// step 19.1:
	var html;
	var url=global_url+'view/';
	var sdate,edate;
	var company_data;
	
	// step 19.2:
	function init(){
		const obj={
			"login_blok":login_blok
		}
		
		loadXHR(global_url+'company/read_open.php',obj,companyProf);
		
		function companyProf(paket){
			company_data=paket.data[0];

			formInput();
		}
	}
	
	// step 19.3:
	function formInput(sd,ed){
		var company_sdate=company_data.company_sdate;
		modul.innerHTML="General Journal";
		metode.innerHTML="View Data";
		btn.innerHTML='<button onclick="objModul.readData()">Preview</button>';
		msg.innerHTML='';
		html='<ul>'
			+'<li><label>Posting</label> : '
			+'<select id="ptype">'
			+'<option value="opening">Opening Only</option>'
			+'<option value="general">Opening+General</option>'
			+'<option value="adjusting">Opening+General+Adjusting</option>'
			+'<option value="closing" selected>Opening+General+Adjusting+Closing</option>'
			+'</select>'
			+'</li>'
			+'<li><label>Dated From</label> : <input type="date" id="sdate"></li>'
			+'<li><label>to</label> : <input type="date" id="edate"></li>'
			+'</ul>';
			
		app.innerHTML=html;

		sdate=document.getElementById('sdate');
		edate=document.getElementById('edate');

		if (sd===undefined){sdate.value=company_sdate;}else{sdate.value=sd;}
		if (ed===undefined){edate.value=tglSekarang();}else{edate.value=ed;}
	}
	
	// step 19.4:
	function readData(){
		var company_name=company_data.company_name;
		html='<button type="button" id="btn_back" onclick="objModul.formInput(\''+sdate.value+'\',\''+edate.value+'\');"></button>';
		btn.innerHTML =html;	
		metode.innerHTML='Preview Data';
		// alert(document.getElementById('ptype').value);
		const obj = {
			"login_blok":login_blok
			,"ptype":document.getElementById('ptype').value
			,"sdate":sdate.value
			,"edate":edate.value
		};
		loadXHR(url+"general_journal.php",obj,exportShow); 			

		function exportShow(paket){
			if (paket.err===0){
				html='<p>Total: '+paket.count+' rows</p>'
					+'<p>File name: <a href="" id="downloadLink" onclick="exportF(this,\'general_journal\')">general_journal.csv</a></p>'
					+'<table id="exportTable">'
					+'<caption>'
					+'<h1>'+company_name.toUpperCase()+'</h1>'
					+'<h2>GENERAL JOURNAL</h2>'
					+tglIna3(sdate.value)+' to ' +tglIna3(edate.value)
					+'</caption>'
					+'<th>Date</th>'
					+'<th>Notes</th>'
					+'<th>Ref</th>'
					+'<th>Account ID</th>'
					+'<th>Account Name</th>'
					+'<th>Debit</th>'
					+'<th>Credit</th>'
					+'<th>Job ID</th>';
					
				var ref;
				var html_ref;										
				for (var x in paket.data) {
					html_ref='<tr>'
						+'<td style="border:0px;border-left:1px solid grey;">'+tglJurnal(paket.data[x].journal_date)+'</td>'
						+'<td style="border:0px;border-left:1px solid grey;">'+paket.data[x].journal_note+'</td>'
						+'<td style="border:0px;border-left:1px solid grey;">'+paket.data[x].journal_ref+'</td>'
						+'';
						
					if (x==0){
						ref=paket.data[x].journal_ref;
						html+=html_ref;
					}
					
					if (ref!=paket.data[x].journal_ref){
						html+='<tr><td colspan=8 style="height:0;background-color:lightgrey;border:1px;"></td></tr>';
						html+=html_ref;
					}else{
						if (x>0){
							html+='<td style="border:0px;;border-left:1px solid grey;"></td>'
								+'<td style="border:0px;;border-left:1px solid grey;"></td>'
								+'<td style="border:0px;;border-left:1px solid grey;"></td>';
						}
					}
					
					ref=paket.data[x].journal_ref;
						
					html+=''
					+'<td>'+paket.data[x].account_id+'</td>'
					+'<td>'+paket.data[x].account_name+'</td>'
					+'<td style="text-align:right">'+formatSerebuan(paket.data[x].account_debit)+'</td>'
					+'<td style="text-align:right">'+formatSerebuan(paket.data[x].account_credit)+'</td>'
					+'<td>'+paket.data[x].job_id+'</td>'
					+'</tr>';

				}
				html+='</table>';
				app.innerHTML=html;	
			}
			else{
				msg.innerHTML = paket.msg;	
			}
		}
	}
	
	// step 19.5:
	init();
	
	/* --- public --- */
	this.readData=function(){
		readData();
	}
	
	this.formInput=function(sd,ed){
		formInput(sd,ed);
	}
}

function tglIna3(tgl){
	var bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sept", "Okto", "Nop", "Des"];
	return tgl.substr(8,2)+'-'+bulan[parseInt(tgl.substr(5,2))-1]+'-'+tgl.substr(0,4) ;
}

function tglJurnal(tgl){
	var bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sept", "Okto", "Nop", "Des"];
	return bulan[parseInt(tgl.substr(5,2))-1]+'\n'+tgl.substr(8,2);
}
