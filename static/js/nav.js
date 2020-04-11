(function (document, window) {
  function addNav(data) {
    let nav = document.querySelector(".auto-nav");
    if (!nav) {
      return;
    }

    data.forEach(item => {
      let name = item.name;
      let href = item.href;

      let li = document.createElement('li');
      li.classList.add('nav-item');
      let a = document.createElement('a');
      a.classList.add('nav-link');
      a.href = href;
      a.textContent = name;
      if (window.location.pathname === href) {
        a.classList.add('active');
        let srOnlySpan = document.createElement('span');
        srOnlySpan.classList.add('sr-only');
        srOnlySpan.textContent = ' (current)';
        a.appendChild(srOnlySpan);
      }
      li.appendChild(a);
      nav.appendChild(li);
    });
  }

  const NAV_URL = "/static/json/nav.json";
  fetch(NAV_URL).then(response => {
    if (response.status !== 200) {
      console.error('Cannot fetch ' + NAV_URL);
      return;
    }
    response.json().then(addNav);
  });
})(document, window);