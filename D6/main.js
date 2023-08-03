const usersContainer = document.getElementById("usersResponse");
const errorMsg = document.createElement("p");

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

  const table = document.createElement("table");
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
  const choosedOptionInput = document.getElementById("chooseOptioon");
  const choosedOption = choosedOptionInput.value;

  const searchTextInput = document.getElementById("searchText");
  const searchText = searchTextInput.value;

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    const filteredUsers = filterUsers(users, choosedOption, searchText);
    showUsers(filteredUsers);

  } catch (error) {
    errorMsg.innerHTML = "Inserire una selezione valida o riprovare inserendo altri campi.";
    usersContainer.appendChild(errorMsg);

    console.error("Errore durante la fetch o la ricerca:", error);
  }
}
