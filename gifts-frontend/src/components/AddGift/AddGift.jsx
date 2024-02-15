import React from 'react';
import axios from 'axios';
import { MemberContext } from '../../context/MemberContext'; 
import { useContext } from 'react';
import "../../App.css";



const AddGift = ({ member, isSelfMember, closePopup }) => {

  const { otherMembers } = useContext(MemberContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form data for file upload
    const formData = new FormData();
    formData.append("itemName", event.target.meetName.value);
    formData.append("exactItem", event.target.exactItem.value);
    formData.append("multiple", event.target.multiple.value);
    formData.append("user", event.target.user.value);
    formData.append("notes", event.target.notes.value);


    // Axios post request to upload the file
    axios.post("http://localhost:8000/create_gift/", formData)
      .then((response) => {
        console.log("Gift added successfully");
        closePopup(); // Close the popup on successful add
      })
      .catch((error) => {
        console.log("Gift add failed");
        console.log(error);
      });
  };

  return (
      <div className="giftBox">
        <h1>Add gift for {member.member_name}</h1> 
        <form onSubmit={handleSubmit}>
          <label>
            Gift Name:
            <input type="text" name="itemName" required />
          </label>
          <label>
            Exact Item Please:
            <input type="radio" name="exactItem" value="yes" required />
          </label>
          <label>
            Similar Items Okay:
            <input type="radio" name="exactItem" value="no" required />
          </label>
          <label>
            Multiple Items:
            <input type="radio" name="multiple" value="yes" required />
          </label>
          <label>
            Single item:
            <input type="radio" name="multiple" value="no" required />
          </label>
          <label>
          Notes:
          <textarea name="notes" required></textarea>
        </label>
          Visibile to:
          {/* {users.map((user, index) => (
            <label key={index}>
              {user.name}:
              <input type="checkbox" name="user" value={user.id} />
            </label>
          ))} */}
        <div className="buttonContainer">
          <button type="submit">Add Gift</button>
          <button type="button" onClick={closePopup}>Cancel</button>
          </div>
        </form>
      </div>
    );
};

export default AddGift;
