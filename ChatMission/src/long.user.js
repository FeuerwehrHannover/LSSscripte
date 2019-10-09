// ==UserScript==
// @name         ChatMission
// @version      1.2
// @author       FeuerwehrHannover
// @include      *://www.leitstellenspiel.de/
// ==/UserScript==

$(document).ready(function() {
  $("#chat_panel_heading div.btn-group").append('<button class="btn btn-default btn-xs" id="chatmission-move-btn"><span class="glyphicon glyphicon-move"></span></button>')
  $('<div id="chatmission"></div>').appendTo("body").css({
    "position": "fixed",
    "background-color": "#f5f5f5",
    "width": "400px",
    "-webkit-box-shadow": "0px 0px 18px 1px rgba(71,71,71,0.54)",
    "-moz-box-shadow": "0px 0px 18px 1px rgba(71,71,71,0.54)",
    "box-shadow": "0px 0px 10px 1px rgba(71,71,71,0.54)",
    "border-radius": "3px",
    "display": "none",
    "z-index": "20010",
  });
  if (localStorage.getItem("ChatMission_pos_t_b_key") !== null && localStorage.getItem("ChatMission_pos_t_b_val") !== null && localStorage.getItem("ChatMission_pos_r_l_key") !== null && localStorage.getItem("ChatMission_pos_r_l_val") !== null) {
    if (localStorage.getItem("ChatMission_pos_t_b_key") == "top") {
      var t_b_val = localStorage.getItem("ChatMission_pos_t_b_val")+"px";
      $("#chatmission").css("top", t_b_val);
    }else {
      var t_b_val = localStorage.getItem("ChatMission_pos_t_b_val")+"px";
      $("#chatmission").css("bottom", t_b_val);
    }if (localStorage.getItem("ChatMission_pos_r_l_key") == "left") {
      var r_l_val = localStorage.getItem("ChatMission_pos_r_l_val")+"px";
      $("#chatmission").css("left", r_l_val);
    }else {
      var r_l_val = localStorage.getItem("ChatMission_pos_r_l_val")+"px";
      $("#chatmission").css("right", r_l_val);
    }
  }else {
    $("#chatmission").css({
      "bottom":"50px",
      "right":"45px",
    });
  }
  function chatmission(mission){
    if (mission == "/alliance_chats") {
      return;
    }
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
    if (target.is("a") && target.attr("href").match("^/missions/") && (target.parents("#mission_chat_messages").length == 1)) {
      chatmission(target.attr("href"));
    }
  });
  $(document).on("mouseout", $("#mission_chat_messages"), function(e) {
    $("#chatmission").fadeOut('fast').empty().css('background-color', '#f5f5f5');
  });
  $(document).on('click', '#chatmission-move-btn', function(event) {
    if ($("#chatmission-move-btn").hasClass('btn-default')) {
      $("#chatmission-move-btn").removeClass('btn-default');
      $("#chatmission-move-btn").addClass('btn-success');
      $('<div id="chatmission-move"></div>').appendTo("body").css({
        "position": "fixed",
        "background-color": "#f5f5f5",
        "right": "45px",
        "bottom": "50px",
        "width": "400px",
        "height": "200px",
        "-webkit-box-shadow": "0px 0px 18px 1px rgba(71,71,71,0.54)",
        "-moz-box-shadow": "0px 0px 18px 1px rgba(71,71,71,0.54)",
        "box-shadow": "0px 0px 10px 1px rgba(71,71,71,0.54)",
        "border-radius": "3px",
        "z-index": "20010",
        "cursor": "move",
      });
      $("#chatmission-move").append('<center><h1 style="color:white"><span class="glyphicon glyphicon-move"></span><br>Fenster an gewünschte Position schieben und Button betätigen</h1></center>');
      $("#chatmission-move").css('background-color', '#337AB7');
      var draggable = $('#chatmission-move');
      draggable.on('mousedown', function(e){
      	var dr = $(this).addClass("drag").css("cursor","move");
      	height = dr.outerHeight();
      	width = dr.outerWidth();
      	max_left = dr.parent().offset().left + dr.parent().width() - dr.width();
      	max_top = dr.parent().offset().top + dr.parent().height() - dr.height();
      	min_left = dr.parent().offset().left;
      	min_top = dr.parent().offset().top;

      	ypos = dr.offset().top + height - e.pageY,
      	xpos = dr.offset().left + width - e.pageX;
      	$(document.body).on('mousemove', function(e){
      		var itop = e.pageY + ypos - height;
      		var ileft = e.pageX + xpos - width;

      		if(dr.hasClass("drag")){
      			if(itop <= min_top ) { itop = min_top; }
      			if(ileft <= min_left ) { ileft = min_left; }
      			if(itop >= max_top ) { itop = max_top; }
      			if(ileft >= max_left ) { ileft = max_left; }
      			dr.offset({ top: itop,left: ileft});
      		}
      	}).on('mouseup', function(e){
      			dr.removeClass("drag");
      	});
      });
    }else {
      var p = $('#chatmission-move').position();
      $("#chatmission").css({
        "top": "",
        "bottom": "",
        "left": "",
        "right": "",
      });
      var pos_t_b_key = "";
      var pos_t_b_val = "";
      var pos_r_l_key = "";
      var pos_r_l_val = "";
      if (p.top < $(window).height()/2) {
        pos_t_b_key = "top";
        pos_t_b_val = p.top;
        $("#chatmission").css("top", p.top+"px");
      }else {
        pos_t_b_key = "bottom";
        pos_t_b_val = $(window).height() - p.top - $('#chatmission-move').height();
        $("#chatmission").css("bottom",$(window).height() - p.top - $('#chatmission-move').height()+"px");
      }if (p.left < $(window).width()/2) {
        pos_r_l_key = "left";
        pos_r_l_val = p.left;
        $("#chatmission").css("left", p.left+"px");
      }else {
        pos_r_l_key = "right";
        $("#chatmission").css("right", $(window).width() - p.left - $('#chatmission-move').width()+"px");
        pos_r_l_val = $(window).width() - p.left - $('#chatmission-move').width();
      }
      localStorage.setItem("ChatMission_pos_t_b_key", pos_t_b_key);
      localStorage.setItem("ChatMission_pos_t_b_val", pos_t_b_val);
      localStorage.setItem("ChatMission_pos_r_l_key", pos_r_l_key);
      localStorage.setItem("ChatMission_pos_r_l_val", pos_r_l_val);
      $('#chatmission-move').remove();
      $("#chatmission-move-btn").addClass('btn-default');
      $("#chatmission-move-btn").removeClass('btn-success');
    }
  });
});
