
    function OpenSettings() {
      var settingsWindow = document.getElementById("settingWindow");
      if (settingsWindow.style.display === "none") {
        settingsWindow.style.display = "grid";
      } else {
        settingsWindow.style.display = "none";
      }
    }

