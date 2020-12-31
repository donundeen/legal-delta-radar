$(document).ready(function() {
  let orgs = [];

  refreshDisplay();

  function refreshDisplay() {
    getOrgsForUser(userId, showOrgs);
  }

  function getOrgsForUser(userId, callback) {
    let data = { userId: userId };
    console.log("getting orgs for user " + userId);
    $.get("/orgForUser", data, function(response, status) {
      console.log("got orgs");
      console.log(response);
      console.log(status);
      if (callback) {
        callback(response);
      }
    });
  }

  function showOrgs(data) {
    console.log("showing orgs");
    console.log(data);
    $("#orgContainer").empty();

    // iterating through the orgs
    $(data).each((index, org) => {
      console.log(org);
      var orgdiv = $("#orgtemplate")
        .clone()
        .html();



      orgdiv = $(orgdiv);
      $("#orgContainer").append(orgdiv);
      $(".orgName", orgdiv).text(org.name);

      // set dyanamic ids as necessary
      $(".needsdynamicid", orgdiv).each((index5, dynelement1) => {
        console.log("attaching id " + $(dynelement1).attr("id") + index);
        console.log($(dynelement1));
        $(dynelement1).attr("id", $(dynelement1).attr("id") + index);
      });
      $(".needsdynamicdatatarget", orgdiv).each((index5, dynelement2) => {
        console.log(
          "attaching data target " + $(dynelement2).attr("data-target") + index
        );
        console.log($(dynelement2));
        $(dynelement2).attr("data-target", $(dynelement2).attr("data-target") + index);
      });      
      $(".needsdynamicariacontrols", orgdiv).each((index5, dynelement2) => {
        console.log(
          "attaching aria-controls" + $(dynelement2).attr("aria-controls") + index
        );
        console.log($(dynelement2));
        $(dynelement2).attr("aria-controls", $(dynelement2).attr("aria-controls") + index);
      });      
      
      
      
      // career Paths
      $(org.dataset.careerPaths).each((index2, careerPath) => {
        var li = $("<li class='careerPath'>" + careerPath + "</li>");
        $(".careerPaths", orgdiv).append(li);
        var clickable = $(
          "<span class='deletecareerpath'> <em>(Delete)</em> </span>"
        ).appendTo(li);

        $(clickable).click(function() {
          var index = org.dataset.careerPaths.findIndex(
            val => val === careerPath
          );
          org.dataset.careerPaths.splice(index, 1);
          saveOrg(org, refreshDisplay);
        });
      });
      $(".newcareerpathsubmit", orgdiv).click(function() {
        let newpath = $(".newcareerpath", orgdiv).val();
        if (
          newpath &&
          newpath.trim() !== "" &&
          !org.dataset.careerPaths.includes(newpath.trim())
        ) {
          console.log("newpath is " + newpath);
          org.dataset.careerPaths.push(newpath);
          saveOrg(org, refreshDisplay);
        }
      });

      // skill groups
      $.each(org.dataset.groups, (index3, skillGroup) => {
        /* skillGroup
        skillGroup.label
        skillGroup.description
        .competencies[] 
        */
    //    console.log(skillGroup);
        let skillGroupDiv = $(
          $("#skillGroupTemplate")
            .clone()
            .html()
        );
        $(".label", skillGroupDiv).text(skillGroup.label);
        $(".description", skillGroupDiv).text(skillGroup.description);
        $(".skillGroups", orgdiv).append(skillGroupDiv);
        $.each(skillGroup.competencies, (index2, competency) => {
      //    console.log(competency);
          let competencyDiv = $(
            $("#competencyTemplate")
              .clone()
              .html()
          );
          $(".competencies", skillGroupDiv).append(competencyDiv);
          $(".label", competencyDiv).text(competency.label);
          $(".description", competencyDiv).text(competency.description);

          // competency.label
          // competency.description
          $.each(
            competency.careerPathAlignment,
            (careerPathName, alignment) => {
              var careerPathAlignmentDiv = $(
                $("#careerPathAlignmentTemplate")
                  .clone()
                  .html()
              );
              $(".careerPathAlignments", competencyDiv).append(
                careerPathAlignmentDiv
              );
              $(".careerPathName", careerPathAlignmentDiv).text(careerPathName);
              $(".idealScore", careerPathAlignmentDiv).text(
                alignment.idealScore
              );
              $(".visibleForThisCareerPath", careerPathAlignmentDiv).text(
                alignment.visibleForThisCareerPath
              );

              // alignment.idealScore
              // alignment.visibleForThisCareerPath
            }
          );

          // gap playlist
          $.each(competency.playlist, (index3, playlistItem) => {
       //     console.log(playlistItem);
            var playlistItemDiv = $("<li>" + playlistItem + "</li>");
            $(".gapPlaylist", competencyDiv).append(playlistItemDiv);
          });
        });
      });
    });
  }

  function saveOrg(org, callback) {
    $.post("/org", org, function(response, status) {
      console.log("posted");
      console.log(response);
      console.log(status);
      if (callback) {
        callback();
      }
    });
  }
});
