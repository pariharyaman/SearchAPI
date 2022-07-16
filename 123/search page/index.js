const url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBB4aWPpQkT295QWhlz0pnG4qcbshFTxSk&cx=612deaff72039408d";

window.addEventListener("load", function() {
  document.getElementById('submit-search').addEventListener("click", async (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById("search-term").value;
    getResults(searchTerm).then(results => renderResults(results));
  })
});

const getResults = async (searchTerm) => {
  return fetch(`${url}&q=${searchTerm}`)
    .then(response => response.json())
    .then(data => data.items)
}

const renderResults = (results) => {
  const resultList = document.getElementById("resultList");
  const imageList = document.getElementById("imageList");
  results.forEach(result => {
    const li = document.createElement("li");
    li.className = "result";
    li.innerHTML = `
      <a href="${result.link}">
        <div class="title">${result.title}</div>
        <div class="url-link">${result.link}</div>
      </a>
      <div class="description">
        ${result.htmlSnippet}
      </div>
      `
    resultList.appendChild(li);
    if(result.pagemap.cse_thumbnail.length > 0) {
      const div = document.createElement("div");
      div.className = "col-sm-6 col-md-6 col-lg-4";
      div.innerHTML = `
        <img src="${result.pagemap.cse_thumbnail[0].src}" alt="${result.title}">
      `
      imageList.append(div);
    }
    
  });
}