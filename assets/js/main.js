window.onload = () => {
  let darkmode = localStorage.getItem("theme");

  const body = document.body;
  const toggle = document.getElementById("dark");
  const assigned = document.getElementById("assigned");
  const revoked = document.getElementById("revoked");
  const listItem = document.getElementsByClassName("list-item");
  /* buttons */
  const assignBtn = document.getElementById("assign-btn");
  const revokeBtn = document.getElementById("revoke-btn");

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
        img.src = `${item.img}`;
        newli.className = "list-item";
      }
    });
  };

  assignBtn.addEventListener("click", () => {
    console.log("clicked");

  });
};
