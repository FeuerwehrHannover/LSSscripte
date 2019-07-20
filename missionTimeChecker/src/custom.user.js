// ==UserScript==
// @name         missionTimeCheckerCustom
// @version      1.0
// @description  Das Tool zeigt an, ob ein Einsatz ein gewisses Alter erreicht hat.
// @author       FeuerwehrHannover
// @include      *://www.leitstellenspiel.de/missions/*
// @grant        none
// ==/UserScript==

$(document).ready(function(){var e=20;if(0==$("#mission_finish_now_btn").length){var s=$("#missionH1").attr("data-original-title").replace("Einsatz eingegangen: ","").replace(" Uhr","").split(",");console.log(Date.parse(s[0]+" "+(new Date).getFullYear()+s[1])+6e6),Date.parse(s[0]+" "+(new Date).getFullYear()+s[1])+NaN<Date.now()?($(".mission_header_info div:eq(0)").append('<div class="missioneror"><p style="margin: 0;"><strong>Hinweis!</strong> Dieser Einsatz ist '+e+"h alt und darf beendet werden.</p></div>"),$(".missioneror").css({"background-color":"#DDFFDD","border-left":"6px solid #6BBD6E","margin-bottom":"15px",padding:"4px 12px",display:"flex","align-items":"center"}),$("body").hasClass("dark")&&$(".missioneror").css("color","#000")):($(".mission_header_info div:eq(0)").append('<div class="missioneror"><p style="margin: 0;"><strong>HINWEIS!</strong> Dieser Einsatz ist noch keine '+e+"h alt und sollte nicht beendet werden!</p></div>"),$(".missioneror").css({"background-color":"#ffdddd","border-left":"6px solid #f44336","margin-bottom":"15px",padding:"4px 12px",display:"flex","align-items":"center"}),$("body").hasClass("dark")&&$(".missioneror").css("color","#000"))}});
//-------------------------------^ Hier die Stunden eintragen z.B. var e=20;
