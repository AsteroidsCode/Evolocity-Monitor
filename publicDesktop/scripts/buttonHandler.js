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

function openContentEco() {
  var spotifySet =  document.getElementById("SettingsSpotify");
  var ecoSet = document.getElementById("SettingsEco");
  var connectSet = document.getElementById("SettingsConnect");

  if (ecoSet.style.display === "none") {
    ecoSet.style.display = "block";
    spotifySet.style.display = "none";
    connectSet.style.display = "none";
  } else {
    ecoSet.style.display = "none";
  }
}

function openContentConnect() {
  var spotifySet =  document.getElementById("SettingsSpotify");
  var ecoSet = document.getElementById("SettingsEco");
  var connectSet = document.getElementById("SettingsConnect");

  if (connectSet.style.display === "none") {
    connectSet.style.display = "block";
    ecoSet.style.display = "none";
    spotifySet.style.display = "none";
  } else {
    connectSet.style.display = "none";
  }
}

function openContentSpotify() {
  var spotifySet =  document.getElementById("SettingsSpotify");
  var ecoSet = document.getElementById("SettingsEco");
  var connectSet = document.getElementById("SettingsConnect");

  if (spotifySet.style.display === "none") {
    spotifySet.style.display = "block";
    ecoSet.style.display = "none";
    connectSet.style.display = "none";
  } else {
    spotifySet.style.display = "none";
  }
}