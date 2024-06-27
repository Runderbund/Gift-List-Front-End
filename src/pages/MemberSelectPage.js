import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MemberContext } from '../context/MemberContext';
import "../App.css";

const MemberSelectPage = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const {setSelfMember, setOtherMembers, setAllMembers, API_BASE_URL} = useContext(MemberContext);
  const navigate = useNavigate();



  useEffect(() => {
    // Function to fetch members
    const fetchMembers = async () => {

      console.log('Above try: API_BASE_URL:', API_BASE_URL);
      try {
        console.log('In try: API_BASE_URL:', API_BASE_URL);
        // const response = await axios.get(`${API_BASE_URL}/get_all_members/`);
        const response = await axios.get(`http://localhost:8000/get_all_members/`);


        // Sort members alphabetically by member_name
        // localCompare makes sure sorting varies by locale, probably not important for just a few people, but good practice
        // console.log('Response:', response.data);
        const sortedMembers = response.data.members.sort((a, b) => 
          a.member_name.localeCompare(b.member_name)
        );
        setMembers(sortedMembers);
        // console.log('Members:', sortedMembers);
      } catch (error) {
        console.error('Error fetching members:', error, 'API_BASE_URL:', API_BASE_URL);
      }
    };

    fetchMembers();
  }, []);

  const handleSelectMember = (event) => {
    setAllMembers(members);

    const value = event.target.value;
    setSelectedMember(value);

    // Find the member object by member.name
    const self = members.find(m => m.member_name === value);
    setSelfMember(self); // Update the context with the selected member object

    // Filter out the self member to get other members
    const others = members.filter(m => m.member_name !== value);
    setOtherMembers(others); // Update the context with the other members

    navigate('/self'); // Redirect to the ViewSelfPage after selecting a member
  };

  return (
    <div className="container">
      <h1>Please Choose Your Name</h1>
      <div className='memberSelectBox'>
        <select value={selectedMember} onChange={handleSelectMember}>
          <option value="">Select a family member</option>
          {members.map((member,) => (
            <option key={member.member_id} value={member.member_name}>
              {member.member_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
  
};

export default MemberSelectPage;