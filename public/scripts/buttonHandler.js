function openMusicWindow() {
  var musicWindow = document.getElementById("musicWindow");
  var settingsWindow = document.getElementById("settingWindow");
  if (musicWindow.style.display === "none") {
    musicWindow.style.display = "block";
    settingsWindow.style.display = "none";
  } else {
    musicWindow.style.display = "none";
  }
}

function openSettingsWindow() {
  var musicWindow = document.getElementById("musicWindow");
  var settingsWindow = document.getElementById("settingWindow");
  if (settingsWindow.style.display === "none") {
    settingsWindow.style.display = "block";
    musicWindow.style.display = "none";
  } else {
    settingsWindow.style.display = "none";
  }
}