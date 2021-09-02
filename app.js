// Hiding Spinner & Error Message 
document.getElementById('spinner').style.display = 'none';
document.getElementById('error').style.display = 'none';


const search = () => {
    // Collect input from search Field

    const searchField = document.getElementById('name');
    const searchText = searchField.value;

    // Erasinng searchText 
    searchField.value = '';

    //  Showing Spinner 
    document.getElementById('spinner').style.display = 'block';

    // Hiding Error      
    document.getElementById('error').style.display = 'none';

    // Fetching Desirable Data From API
    const url = `https://openlibrary.org/search.json?q=${searchText}
`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data.docs))

}

//<-------- Error Hendling---------->
const displayError = () => {
    document.getElementById('error').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('display-books').textContent = '';
    document.getElementById('result-count').textContent = '';
    document.getElementById('details').style.display = 'none';

}



// ---Display Search Result (~_~) 
const displayResult = books => {

    // Hiding Spinner , Error Message , Author Details
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    document.getElementById('details').style.display = 'none';

    // Heandling Error For Unmatch Input 
    if (books.length === 0) {
        displayError();

    } else {
        const displayDiv = document.getElementById('display-books');

        // Erasing Previous Reasults
        displayDiv.textContent = '';

        // Counting Search Result 
        document.getElementById('result-count').innerText = ` Total Found ${books.length} Result.
    `;
        books.forEach(book => {
            const div = document.createElement('div');
            // Dynamically Updateing HTML 

            div.classList.add('col');
            div.innerHTML = `
                    <div class="card h-auto border">
                        <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-50 m-3" alt="...">
                        <div class="card-body">
                            <h5 class="card-title text-center">${book.title}</h5>
                            <p class="card-text"> by ${book.author_name[0] ? book.author_name[0] : 'Not Found'} </p><p>Publisher : ${book.publisher[0] ? book.publisher[0] : 'Not Found'} </p><p>Publish Year : ${book.first_publish_year ? book.first_publish_year : 'Not Found'}</p> 
                            <button onclick="loadAuthorDetails('${book.author_key[0]}')" class=" btn btn-info fw-400 text-white ms-5">About Author</button> </div>

                    </div>
`
            displayDiv.appendChild(div);
        });
    }
}

// Fetching Author Data From API
const loadAuthorDetails = name => {
    console.log(name);
    const url = `https://openlibrary.org/authors/${name}.json`;
    fetch(url)
        .then(res => res.json())
        .then(data => authorDetails(data))

}

// Displaying Author Data 
const authorDetails = data => {
    console.log(data);

    document.getElementById('details').style.display = 'block';

    const detailsDiv = document.getElementById('details');
    // Erasing Previous 
    detailsDiv.textContent = '';
    // Creating Element Dynamically 
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card bg-info text-white fw-300">
  <div class="card-body">
    <h4 class="card-title">${data.name}</h4>
    <p class="card-text"><b>Date Of Birth :</b> ${data.birth_date ? data.birth_date : '_ _'}</p>
    <p class="card-text"> <b>Bio :</b> ${data.bio?.value ? data.bio?.value : '_ _'}</p>
  </div>
</div>
    `
    detailsDiv.appendChild(div);

}