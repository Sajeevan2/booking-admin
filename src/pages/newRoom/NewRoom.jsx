import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewRoom = ({ inputs, title }) => {
  const [hotelId, setHotelId] = useState(undefined);
  const [info,setInfo] = useState({})
  const [rooms,setRooms] = useState([])

  const navigate = useNavigate()

  const {data,loading,error} = useFetch("/hotels")

  const handleChange = e =>{
    setInfo(prev =>({...prev,[e.target.id]:e.target.value}))
  }

  const handleClick = async e =>{
    e.preventDefault()
    const roomNumbers = rooms.split(",").map(roomNumber =>(
      {number:roomNumber}
    ))
    try {
      const newRoom ={
        ...info,
        roomNumbers
      }
      await axios.post(`/rooms/${hotelId}`,newRoom)
      navigate('/rooms')
    } catch (error) {}
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                    type={input.type} 
                    placeholder={input.placeholder} 
                    id={input.id}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Choose a hotel</label>
                <select id="hotelId" onChange={e=>setHotelId(e.target.value)}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>
              <div className="formInput">
                  <label>Rooms</label>
                  <textarea onChange={e=>setRooms(e.target.value)}  placeholder="give comma between room numbers"/>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
