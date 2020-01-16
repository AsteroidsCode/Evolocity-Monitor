if (typeof(Storage) !== "undefined") {
    name = localStorage.CartName;
    token = localStorage.CartToken;
  } else {
    // Sorry! No Web Storage support..
  }