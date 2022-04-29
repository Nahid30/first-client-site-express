import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);
  console.log(users)

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleForm = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    // console.log(user);

    fetch('http://localhost:5000/user', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(response => response.json())
    .then(data => {
      const newUser = [...users,data]
      setUsers(newUser);
      // console.log('Success:', data);
    })


  }

  //  fetch('http://localhost:5000/users'{
  //    method: 'POST',
  //    headers: {
  //      'Content-Type' : 'application/json',
  //    },
  //    body: JSON.stringify(users)
  //  })
  //  .then(res => res.json())
  //  .then(data =>{
  //    console.log('success', users)
  //  })

  


  return (
    <div className="App">
      <h1>Hello Data : {users.length}</h1>
     

      <form onSubmit={handleForm}>
        <input type="text" name="name" placeholder='Enter Your Name' required />
        <input type="email" name="email" placeholder='Enter Your Email' required />

        <input type="submit" value="Add" />


        {
        users.map(user => <li>id: {user.id} Name:{user.name} Email: {user.email} </li>)
      }

      </form>

    </div>
  );
}

export default App;
