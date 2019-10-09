// ==UserScript==
// @name         ChatMission
// @version      1.1
// @author       FeuerwehrHannover
// @include      *://www.leitstellenspiel.de/
// ==/UserScript==

$(document).ready(function() {
  function chatmission(mission){
    if (mission == "/alliance_chats") {
      return;
    }
    $('<div id="chatmission"></div>').appendTo("body").css({
      "position": "fixed",
      "background-color": "#f5f5f5",
      "right": "45px",
      "bottom": "50px",
      "width": "400px",
      "-webkit-box-shadow": "0px 0px 18px 1px rgba(71,71,71,0.54)",
      "-moz-box-shadow": "0px 0px 18px 1px rgba(71,71,71,0.54)",
      "box-shadow": "0px 0px 10px 1px rgba(71,71,71,0.54)",
      "border-radius": "3px",
      "display": "none",
      "z-index": "20010",
    });
    var m_id = mission.replace("/missions/", "");
    var m = $("#mission_"+m_id);
    if (m.length > 0) {
      m.find("a.map_position_mover small s").remove();
      var addr = m.find("a.map_position_mover small").text();
      var m_name = m.find("a.map_position_mover").text().replace(", "+addr, "");
      var label = "label-danger";
      var progress = "progress-bar-danger";
      var tag = "<div>";
      if (m.children('.panel').hasClass('mission_panel_green')) {
        label = "label-success";
        progress = "progress-bar-success";
      }else if (m.children('.panel').hasClass('mission_panel_yellow')) {
        label = "label-warning";
      }
      $("#chatmission").append('<span class="label '+label+'" style="display: block;">'+m_name+'</span><div class="progress" style="background-color:white;margin-bottom: 1px;"><div class="missionchat-progress progress-bar '+progress+'" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%"><span class="sr-only">20% abgeschlossen</span></div></div>');
      $(".missionchat-progress").css("margin-top", "2px");
      if ($("#mission_missing_short_"+m_id).text == "Ein Fahrzeug hat einen Sprechwunsch!") {
        tag += "<span class='label label-danger'>Sprechwunsch</span> ";
      }if ($("#mission_patients_"+m_id).length > 0) {
        if ($("#mission_patient_summary_"+m_id).length > 0) {
          tag += "<span class='label label-primary'>"+$("#mission_patient_summary_"+m_id).children('strong').text()+"</span> ";
          $("#mission_patient_summary_"+m_id+" .alert").each(function() {
            tag += "<span class='label label-warning'>"+$(this).text().replace("Wir benötigen: ","")+"</span> ";
          });
        }else {
          if ($("#mission_patients_"+m_id).length > 0) {
            var c_pat_a = $("#mission_patients_"+m_id).children('div[id^="patient_"]').length;
            var c_pat_b = c_pat_a - $("#mission_patients_"+m_id).children('div[id^="patient_"]').find(".progress-striped-inner-active").length;
            if (c_pat_a > 0) {
              tag += "<span class='label label-primary'> "+ c_pat_a + ((c_pat_a != c_pat_b)? " ("+c_pat_b+") " : " ") + ((c_pat_a > 1)? "Patienten" : "Patient")+"</span> ";
            }
          }
        }
      }
      tag += "<span class='label label-info'><span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span> "+addr+"</span><br/></div>";
      $("#chatmission").append(tag);
      if ($("#mission_missing_"+m_id).length > 0) {
        if ($("#mission_missing_"+m_id) != "") {
          $("#chatmission").append('<div class="chatmission-danger"><p style="margin: 0;">'+$("#mission_missing_"+m_id).text()+"</p></div>");
        }
      }
      //---------
      $(".chatmission-danger").css({
        "background-color": "rgb(255, 221, 221)",
        "border-left": "6px solid rgb(244, 67, 54)",
        "margin-top": "2px",
        "padding": "4px 12px",
        "display": "flex",
        "align-items": "center",
      });
      if ($("body").hasClass('dark')) {
        $(".chatmission-danger").css("color","black");
      }
    }else {
      $("#chatmission").append('<center><h1 style="color:white"><span class="glyphicon glyphicon-ok-circle"></span><br>Einsatz beendet</h1></center>');
      $("#chatmission").css('background-color', '#5CB85C');
    }
    $("#chatmission").fadeIn('fast');
  }
  $(document).on("mouseover", $("#mission_chat_messages"), function(e) {
    var target = $(e.target);
    if (target.is("a") && target.attr("href").match("^/missions/")) {
      chatmission(target.attr("href"));
    }
  });
  $(document).on("mouseout", $("#mission_chat_messages"), function(e) {
    $("#chatmission").fadeOut('fast').empty().css('background-color', '#f5f5f5');
  });
});

