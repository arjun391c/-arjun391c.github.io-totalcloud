window.onload = () => {
  let darkmode = localStorage.getItem("theme");

  const body = document.body;
  const toggle = document.getElementById("dark");
  if(darkmode === "enabled"){   
    body.classList.add("dark");
    toggle.checked = true;
  }
  else{
    toggle.checked = false;
    body.classList.remove("dark");
  }
 

  toggle.addEventListener("input", (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      body.classList.add("dark");
      localStorage.setItem("theme","enabled")
    } else {
      body.classList.remove("dark");
      localStorage.setItem("theme","disabled")
    }
  });
};
