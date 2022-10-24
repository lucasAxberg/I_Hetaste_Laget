function bananas() {
    alert('thisId');
}

function check() {
    document.getElementById("menu__toggle").checked = true;
  }
  
  function uncheck() {
    document.getElementById("menu__toggle").checked = false;
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
    }
    else {
      parent.style.background = "#444444";
      s = 2;
      console.log(s)
      check();
      
    }
  }