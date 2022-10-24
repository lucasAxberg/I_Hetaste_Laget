

function check() {
    document.getElementById("menu__toggle").checked = true;
  }
  
  function uncheck() {
    document.getElementById("menu__toggle").checked = false;
  }
  let toggle = true;
  let seb = document.querySelector(".settings");

  function settings() {
    
    console.log(seb)

    if (toggle) {
      seb.style.top = "0";
      toggle = false;
    }
    else {
      console.log("ejjh")
      seb.style.top = "-150%";
      toggle = true;
    }

    return seb;
    
  }
  
  let s = 1;
  function menuButton(x) {
    
    console.log("hej")
    x.classList.toggle("change");
    let parent = x.parentElement
    console.log(parent)
    
    if (s == 2) {
      parent.style.background = "#333333";
      s = 1;
      uncheck();
      seb.style.top = "-150%";
    }
    else {
      parent.style.background = "#444444";
      s = 2;
      console.log(s)
      check();
      
      
    }
  }