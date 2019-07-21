// ==UserScript==
// @name         missionTimeCheckerCustom
// @version      1.1
// @description  Das Tool zeigt an, ob ein Einsatz ein gewisses Alter erreicht hat.
// @author       FeuerwehrHannover
// @include      *://www.leitstellenspiel.de/missions/*
// @grant        none
// ==/UserScript==

$(document).ready(function(){var e=20;if(0==$("#mission_finish_now_btn").length){var r=$("#missionH1").attr("data-original-title").replace("Einsatz eingegangen: ","").replace(" Uhr","").split(","),i={Januar:"01",Februar:"02","März":"03",April:"04",Mai:"05",Juni:"06",Juli:"07",August:"08",September:"09",Oktober:"10",November:"11",Dezember:"12"},s=r[0].split(".");parseInt(+s[0])<10&&(s[0]="0"+s[0]),console.log((new Date).getFullYear()+"-"+i[s[1].replace(" ","")]+"-"+s[0]+"T"+r[1].replace(" ","")),console.log(Date.parse((new Date).getFullYear()+"-"+i[s[1].replace(" ","")]+"-"+s[0]+"T"+r[1].replace(" ",""))+NaN),Date.parse((new Date).getFullYear()+"-"+i[s[1].replace(" ","")]+"-"+s[0]+"T"+r[1].replace(" ",""))+NaN<Date.now()?($(".mission_header_info div:eq(0)").append('<div class="missioneror"><p style="margin: 0;"><strong>Hinweis!</strong> Dieser Einsatz ist '+e+"h alt und darf beendet werden.</p></div>"),$(".missioneror").css({"background-color":"#DDFFDD","border-left":"6px solid #6BBD6E","margin-bottom":"15px",padding:"4px 12px",display:"flex","align-items":"center"}),"rgb(66, 66, 66)"==$(".mission_header_info").css("background-color")&&$(".missioneror").css("color","#000")):($(".mission_header_info div:eq(0)").append('<div class="missioneror"><p style="margin: 0;"><strong>HINWEIS!</strong> Dieser Einsatz ist noch keine '+e+"h alt und sollte nicht beendet werden!</p></div>"),$(".missioneror").css({"background-color":"#ffdddd","border-left":"6px solid #f44336","margin-bottom":"15px",padding:"4px 12px",display:"flex","align-items":"center"}),"rgb(66, 66, 66)"==$(".mission_header_info").css("background-color")&&$(".missioneror").css("color","#000"))}});
//---------------------------------^ Hier die Stunden eintragen z.B. var e=20;
