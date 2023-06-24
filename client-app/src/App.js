import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [age, setage] = useState();
  const [username, setusername] = useState();

  // get data function
  useEffect(() => {
    const callData = async () => {
      const userData = await Axios.get("http://localhost:4000/getuser");
      setData(userData.data);
    };
    callData();
  }, [data]);

  // adding function
  const addClick = async () => {
    try {
      const response = await axios.post("http://localhost:4000/createuser", {
        name,
        age,
        username,
      });
      setData([...data, { _id: response.data._id, name, age, username }]);
    } catch (error) {
      console.error(error);
    }
    setName("");
    setage("");
    setusername("");
  };

  // update function
  const updateClick = async (id) => {
    let newAge = parseInt(prompt("Enter age "));
    axios
      .put("http://localhost:4000/update", {
        newAge,
        id,
      })
      .then(() => {
        setData(
          data.map((ele) => {
            return ele._id === id
              ? { _id: id, age: newAge, name: ele.name, username: ele.username }
              : ele;
          })
        );
      });
  };

  // delete function
  const deleteClick = (id) => {
    axios.delete(`http://localhost:4000/delete/${id}`).then(() => {
      setData(
        data.filter((val) => {
          return val._id !== id;
        })
      );
    });
  };

  return (
    <>
      <div className="container mt-4">
        <div className="formParent ">
          <div className="formContainer m-auto mb-2 pb-2 border-blue-400 border-b">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                name
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 w-[25%] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                required
                value={name}
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                age
              </label>
              <input
                type="number"
                id="first_name"
                className="bg-gray-50 w-[25%] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                placeholder="Enter age"
                onChange={(e) => setage(e.target.value)}
                required
                value={age}
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                user name
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 w-[25%] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                placeholder=" user name"
                onChange={(e) => setusername(e.target.value)}
                required
                value={username}
              />
            </div>
            <button
              type="button"
              className="focus:outline-none mt-2 text-white bg-purple-700 hover:bg-purple-800   font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              onClick={() => addClick()}
            >
              Add
            </button>
          </div>
        </div>
        {data &&
          data.map((ele) => {
            return (
              <>
                <div
                  className="dataContainer  border-b-2 border-black"
                  key={ele._id}
                >
                  <h1>name : {ele.name}</h1>
                  <h1>
                    age : {ele.age}{" "}
                    <span>
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-2 "
                        onClick={() => updateClick(ele._id)}
                      >
                        Update
                      </button>
                    </span>{" "}
                  </h1>
                  <h1>username : {ele.username}</h1>
                </div>
                <div className="buttonContainer">
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-2 "
                    onClick={() => deleteClick(ele._id)}
                  >
                    delete
                  </button>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default App;
