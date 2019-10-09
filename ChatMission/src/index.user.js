// ==UserScript==
// @name         ChatMission
// @version      1.1
// @author       FeuerwehrHannover
// @include      *://www.leitstellenspiel.de/
// @description  Zeigt eine Vorschau des Einsatzes bei einer Rückmeldung im Verbandschat
// ==/UserScript==

$(document).ready(function(){$(document).on("mouseover",$("#mission_chat_messages"),function(s){var a=$(s.target);a.is("a")&&a.attr("href").match("^/missions/")&&function(s){if("/alliance_chats"!=s){$('<div id="chatmission"></div>').appendTo("body").css({position:"fixed","background-color":"#f5f5f5",right:"45px",bottom:"50px",width:"400px","-webkit-box-shadow":"0px 0px 18px 1px rgba(71,71,71,0.54)","-moz-box-shadow":"0px 0px 18px 1px rgba(71,71,71,0.54)","box-shadow":"0px 0px 10px 1px rgba(71,71,71,0.54)","border-radius":"3px",display:"none","z-index":"20010"});var a=s.replace("/missions/",""),i=$("#mission_"+a);if(i.length>0){i.find("a.map_position_mover small s").remove();var n=i.find("a.map_position_mover small").text(),e=i.find("a.map_position_mover").text().replace(", "+n,""),o="label-danger",t="progress-bar-danger",r="<div>";if(i.children(".panel").hasClass("mission_panel_green")?(o="label-success",t="progress-bar-success"):i.children(".panel").hasClass("mission_panel_yellow")&&(o="label-warning"),$("#chatmission").append('<span class="label '+o+'" style="display: block;">'+e+'</span><div class="progress" style="background-color:white;margin-bottom: 1px;"><div class="missionchat-progress progress-bar '+t+'" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%"><span class="sr-only">20% abgeschlossen</span></div></div>'),$(".missionchat-progress").css("margin-top","2px"),"Ein Fahrzeug hat einen Sprechwunsch!"==$("#mission_missing_short_"+a).text&&(r+="<span class='label label-danger'>Sprechwunsch</span> "),$("#mission_patients_"+a).length>0)if($("#mission_patient_summary_"+a).length>0)r+="<span class='label label-primary'>"+$("#mission_patient_summary_"+a).children("strong").text()+"</span> ",$("#mission_patient_summary_"+a+" .alert").each(function(){r+="<span class='label label-warning'>"+$(this).text().replace("Wir benötigen: ","")+"</span> "});else if($("#mission_patients_"+a).length>0){var l=$("#mission_patients_"+a).children('div[id^="patient_"]').length,p=l-$("#mission_patients_"+a).children('div[id^="patient_"]').find(".progress-striped-inner-active").length;l>0&&(r+="<span class='label label-primary'> "+l+(l!=p?" ("+p+") ":" ")+(l>1?"Patienten":"Patient")+"</span> ")}r+="<span class='label label-info'><span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span> "+n+"</span><br/></div>",$("#chatmission").append(r),$("#mission_missing_"+a).length>0&&""!=$("#mission_missing_"+a)&&$("#chatmission").append('<div class="chatmission-danger"><p style="margin: 0;">'+$("#mission_missing_"+a).text()+"</p></div>"),$(".chatmission-danger").css({"background-color":"rgb(255, 221, 221)","border-left":"6px solid rgb(244, 67, 54)","margin-top":"2px",padding:"4px 12px",display:"flex","align-items":"center"}),$("body").hasClass("dark")&&$(".chatmission-danger").css("color","black")}else $("#chatmission").append('<center><h1 style="color:white"><span class="glyphicon glyphicon-ok-circle"></span><br>Einsatz beendet</h1></center>'),$("#chatmission").css("background-color","#5CB85C");$("#chatmission").fadeIn("fast")}}(a.attr("href"))}),$(document).on("mouseout",$("#mission_chat_messages"),function(s){$("#chatmission").fadeOut("fast").empty().css("background-color","#f5f5f5")})});
