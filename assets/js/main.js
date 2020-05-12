window.onload = () => {
  let darkmode = localStorage.getItem("theme");

  const body = document.body;
  const toggle = document.getElementById("dark");
  const assigned = document.getElementById("assigned");
  const revoked = document.getElementById("revoked");
  const toggler = document.getElementById("toggler");
  const nav = document.getElementById("nav");
  const cross = document.getElementById("toggler-cross");

  /* buttons */
  const assignBtn = document.getElementById("assign-btn");
  const revokeBtn = document.getElementById("revoke-btn");


  /* navigation */
  toggler.addEventListener("click", ()=>{
    nav.classList.remove("nav-hide")
    nav.classList.add("collapse");
  });
  cross.addEventListener("click", ()=>{
    nav.classList.add("nav-hide")
    nav.classList.remove("collapse");
  })

  /* dark mode */

  if (darkmode === "enabled") {
    body.classList.add("dark");
    toggle.checked = true;
  } else {
    toggle.checked = false;
    body.classList.remove("dark");
  }

  toggle.addEventListener("input", (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      body.classList.add("dark");
      localStorage.setItem("theme", "enabled");
    } else {
      body.classList.remove("dark");
      localStorage.setItem("theme", "disabled");
    }
  });

  fetch("https://arjun391c.github.io/totalcloud/list.json")
    .then((res) => res.json())
    .then((res) => appendData(res))
    .catch((err) => console.log(err));

  const appendData = (res) => {
    res.map((item) => {
      const newli = document.createElement("li");
      const img = document.createElement("img");
      const p = document.createElement("p");
      if (!item.assign) {
        revoked.appendChild(newli);
        newli.appendChild(img);
        newli.appendChild(p);
        p.innerHTML = item.name;
        p.id = item.id;
        img.src = `${item.img}`;
        newli.className = "list-item";
      } else {
        assigned.appendChild(newli);
        newli.appendChild(img);
        newli.appendChild(p);
        p.innerHTML = item.name;
        p.id = item.id;
        img.src = `${item.img}`;
        newli.className = "list-item";
      }
    });
  };

  var selected = [];

  revoked.addEventListener("click", function (e) {
    if (e.target && e.target.matches("li.list-item")) {
      selected = e.target;
    }
  });
  assignBtn.addEventListener("click", () => {
    if (revoked.childElementCount < 1) {
      alert("Revoked list is empty noting to assign");
    } else if (selected.length < 1) {
      alert("Select One");
    } else {
      assigned.appendChild(selected);
    }
    selected = [];
  });

  assigned.addEventListener("click", function (e) {
    if (e.target && e.target.matches("li.list-item")) {
      selected = e.target;
    }
  });
  revokeBtn.addEventListener("click", () => {
     if (assigned.childElementCount < 1) {
        alert("Assigned list is empty noting to revoke");
      } 
    else if (selected.length < 1) {
      alert("Select One");
    } else {
      revoked.appendChild(selected);
    }
    selected = [];
  });
};
