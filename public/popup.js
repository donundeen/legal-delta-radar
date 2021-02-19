
function testPopup() {
  console.log("popup process", 3000);

  warningMessage(
    "Hey wathc out there's a bproblem to be careful of, but it's all good."
  );
}

function errorMessage(message, closetime) {
  $(".messageWindow .message").text(message);
  $(".messageWindow").removeClass("closed");
  $(".messageWindow").removeClass("warning");
  $(".messageWindow").removeClass("error");
  $(".messageWindow").removeClass("process");  
  $(".messageWindow").addClass("open");
  $(".messageWindow").addClass("error");
  if (closetime) {
    setTimeout(closeMessageWindow, 3000);
  }
}

function warningMessage(message, closetime) {
  $(".messageWindow .message").text(message);
  $(".messageWindow").removeClass("closed");
  $(".messageWindow").removeClass("warning");
  $(".messageWindow").removeClass("error");
  $(".messageWindow").removeClass("process");
  $(".messageWindow").addClass("open");
  $(".messageWindow").addClass("warning");
  if (closetime) {
    setTimeout(closeMessageWindow, 3000);
  }
}

function processMessage(message, closetime) {
  $(".messageWindow .message").text(message);
  $(".messageWindow").removeClass("closed");
  $(".messageWindow").removeClass("warning");
  $(".messageWindow").removeClass("error");
  $(".messageWindow").removeClass("process");
  $(".messageWindow").addClass("open");
  $(".messageWindow").addClass("process");
  if (closetime) {
    setTimeout(closeMessageWindow, 3000);
  }
}

function closeMessageWindow() {
  $(".messageWindow").removeClass("open");
  $(".messageWindow").addClass("closed");
}

$(".messageWindow .dismiss").click(closeMessageWindow);
