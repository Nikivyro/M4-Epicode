const usersContainer = document.getElementById("usersResponse");
const errorMsg = document.createElement("p");
let choosedOptionInput = document.getElementById("chooseOptioon");
const searchTextInput = document.getElementById("searchText");
const resetBtn = document.getElementById('resetBtn');
let table = ''

const filterUsers = (users, choosedOption, searchText) => {
  return users.filter((user) => {
    const value = user[choosedOption];
    return value.toLowerCase().includes(searchText.toLowerCase());
  });
}

const showUsers = (filteredUsers) => {
  usersContainer.innerHTML = "";

  if (filteredUsers.length === 0) {
    errorMsg.innerHTML = "Nessun utente trovato.";
    usersContainer.appendChild(errorMsg);
    return;
  }

  table = document.createElement("table");
  table.classList.add('table','table-striped','table-hover');
  table.innerHTML = `
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Username</th>
        <th scope="col">Email</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;

  const tbody = table.querySelector("tbody");
  filteredUsers.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
    `;
    tbody.appendChild(row);
  });

  usersContainer.appendChild(table);
}

const searchUser = async () => {
  const choosedOption = choosedOptionInput.value;
  const searchText = searchTextInput.value;

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    const filteredUsers = filterUsers(users, choosedOption, searchText);
    showUsers(filteredUsers);
    
    resetBtn.classList.remove('d-none');
    resetBtn.classList.add('d-block');

  } catch (error) {
    errorMsg.innerHTML = "Inserire una selezione valida o riprovare compilando i campi richiesti.";
    usersContainer.appendChild(errorMsg);

    console.error("Errore durante la fetch o la ricerca:", error);
  }
}

const resetSearch = () =>{
  var allOption = choosedOptionInput.options;
  var selected = allOption[choosedOptionInput.selectedIndex = 0];
  searchTextInput.value = '';
  usersContainer.innerHTML = '';
  resetBtn.classList.remove('d-block');
  resetBtn.classList.add('d-none');
}
