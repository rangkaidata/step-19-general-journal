'use strict';
var global_url='https://datablok.id/v0/';

// function 01
function loadXHR(url,obj,callback){
	var request = new XMLHttpRequest();
	var dbParam = JSON.stringify(obj);

	request.onload=function(){		
		if (request.readyState===4){
			var paket = JSON.parse(request.responseText);
			// alert(paket.msg);
			callback(paket);
		}
		else {
			console.log('Network request failed with response ' + request.status + ': ' + request.statusText)
		}
	};
	request.open('POST', url);
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.send(dbParam);
}

// function 02
function blokID (blok){
	var blokend = blok;
	var blokend3 = blokend.split("-");
	return blokend3[2];
}

// function 03
function tglIna(tgl){
	var bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nop", "Des"];
	return tgl.substr(8,2)+'-'+bulan[parseInt(tgl.substr(5,2))]+'-'+tgl.substr(2,2) +' ' +tgl.substr(11,5);
}

// function 04
function timeID(blok){
	var blokend = blok;
	var blokend3 = blokend.split("-");
	return blokend3[0];
}	

// function 05
function pleaseWait(){
	return "Please wait ...";
}

// function 06
function paging(paket){
	var html='';
	var x;
	if (paket.err===0){
		if (metode.innerHTML=="Read Data"){
			if (paket.paging.first!=""){
				html+= '<button type="button" id="btn_first" onclick="objModul.gotoPage(\''+paket.paging.first+'\')"></button>';
			}
			for (x in paket.paging.pages) {			
				if (paket.paging.pages[x].current_page=="yes"){
					html+= '<button type="button" onclick="objModul.gotoPage(\''+paket.paging.pages[x].url+'\')" disabled >'+paket.paging.pages[x].page +'</button>';	
				} else {
					html+= '<button type="button" onclick="objModul.gotoPage(\''+paket.paging.pages[x].url+'\')">'+paket.paging.pages[x].page+'</button>';	
				}
			}
			if (paket.paging.last!=""){
				html+='<button type="button" id="btn_last" onclick="objModul.gotoPage(\''+paket.paging.last+'\')"></button>';
			}
		}
	}	
	return html;
}

// function 07
function tglInaFull(tgl){
	var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
	return tgl.substr(8,2)+' '+bulan[parseInt(tgl.substr(5,2))-1]+' '+tgl.substr(0,4) ;
}

// function 08
function formatSerebuan(num) {
	if (num===undefined){return 0.00};
	if (num===null){num=0;}
	if (num<0){
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}else{
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}
}

// function 09: format tanggal 
function tglIna2(tgl){
	var bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nop", "Des"];
	return tgl.substr(8,2)+'-'+bulan[parseInt(tgl.substr(5,2))-1]+'-'+tgl.substr(2,2) ;
}

// function 10: tampilkan halaman input dan tombol untuk membuat data baru. 
function tglSekarang(){
	var n=new Date();
	var tglskrng=n.getFullYear()+"-"+("0"+parseInt(n.getMonth()+1)).slice(-2)+"-"+("0"+n.getDate()).slice(-2);
	return tglskrng;
}	
	
// function 11:
function load_modul(modul){
	sessionStorage.setItem("modul",modul);
	location.reload();
}

// function 12
function ikon(menu_name){
	switch (menu_name){
		case "Setting":
			return "&#128295; "+menu_name;
			break;
		case "Network":
			return "&#127759; "+menu_name;
			break;
		case "Folder":
			return "&#128193; "+menu_name;
			break;
		case "Tutup":
			return "&#10005; ";
			break;
		case "Logout":
			return "&#128100; ";
			break;
		case "Exit":
			//return "&#128164 Logout";
			return "&#128164; ";
			break;
		case "Close Folder":
			return "&#128194; "+menu_name;
			break;
		case "User":
			return "&#128100; ";
			break;
		case "Users":
			return "&#128101;";
			break;
		case "Email":
			return "&#128101;";
			break;
		case "Login":
			return "&#128275;";
			break;
		case "Dashboard":
			return "&#128275;";
			break;
		default:
			//return "&#127974; "+menu_name;
			//return "&#128216; "+menu_name;
			return "&#127974; "+menu_name;
	}
	// &#128193; 
	// &#127760; earth
}

function tglBlok(blok){
	if (blok==undefined){
		return '';
	}
	const blokx=blok;
	var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
	return blokx.substr(6,2)+'-'+bulan[parseInt(blokx.substr(4,2))-1] +'-'+blokx.substr(0,4) +' '+blokx.substr(8,2)+':'+blokx.substr(10,2);
}


function pagingPopup(paket){
	var html='';
	if (paket.err==0){
		if (objPop.metode=="Read Data"){
			if (paket.paging.first!=""){
				html+= "<button type='button' id='btn_first' onclick='objPop.gotoPage(\"" + paket.paging.first + "\")' ></button>" ;
			}
			for (var x9 in paket.paging.pages) {			
				if (paket.paging.pages[x9].current_page=="yes"){
					html+= "<button type='button' onclick='objPop.gotoPage(\"" + paket.paging.pages[x9].url + "\")' disabled >"+ paket.paging.pages[x9].page +"</button>";	
				} else {
					html+= "<button type='button' onclick='objPop.gotoPage(\"" + paket.paging.pages[x9].url + "\")'>"+ paket.paging.pages[x9].page +"</button>";	
				}
			}
			if (paket.paging.last!=""){
				html+= "<button type='button' id='btn_last' onclick='objPop.gotoPage(\"" + paket.paging.last + "\")'></button>" ;
			}
		}
	}
	return html;
}
