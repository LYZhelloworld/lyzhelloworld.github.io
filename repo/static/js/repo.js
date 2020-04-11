(function(document, window) {
  badgeClasses = [
    'badge-success',
    'badge-danger',
    'badge-warning',
    'badge-info',
    'badge-light',
    'badge-dark'
  ];

  function getBadgeClass(i) {
    return badgeClasses[i % badgeClasses.length];
  }

  function addRepo(data) {
    let container = document.querySelector('.auto-repo');
    if (!container) {
      return;
    }

    data.forEach(item => {
      let name = item.name;
      let href = item.href;
      let external = item.external;
      let description = item.description;
      let languages = item.language;

      let col = document.createElement('div');
      container.appendChild(col);
      col.classList.add('col-4', 'mb-4');
      let cardHeader = document.createElement('div');
      col.appendChild(cardHeader);
      cardHeader.classList.add('card', 'h-100');
      let cardBody = document.createElement('div');
      cardHeader.appendChild(cardBody);
      cardBody.classList.add('card-body');

      let cardTitle = document.createElement('h2');
      cardBody.appendChild(cardTitle);
      cardTitle.classList.add('card-title');
      let cardTitleLink = document.createElement('a');
      cardTitle.appendChild(cardTitleLink);
      cardTitleLink.setAttribute('href', href);
      if (external) {
        setExternal(cardTitleLink);
      }
      cardTitleLink.textContent = name;

      let cardText = document.createElement('p');
      cardBody.appendChild(cardText);
      cardText.classList.add('card-text');
      cardText.appendChild(document.createTextNode(description));
      cardText.appendChild(document.createElement('br'));

      for (let i = 0; i < languages.length; i++) {
        let badge = document.createElement('span');
        cardText.appendChild(badge);
        badge.classList.add('badge', 'badge-pill', getBadgeClass(i));
        badge.textContent = languages[i];
      }

      let viewLink = document.createElement('a');
      cardBody.appendChild(viewLink);
      viewLink.setAttribute('href', href);
      if (external) {
        setExternal(viewLink);
      }
      viewLink.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      viewLink.textContent = 'View';
    });
  }

  function setExternal(element) {
    element.setAttribute('target', '_blank');
    element.setAttribute('rel', 'noreferrer noopener');
  }

  const REPO_URL = "./static/json/repo.json";
  fetch(REPO_URL).then(response => {
    if (response.status !== 200) {
      console.error('Cannot fetch ' + NAV_URL);
      return;
    }
    response.json().then(addRepo);
  })
})(document, window);