import { useState } from "react";

function useUserDetails() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    fullName: "",
    education: "",
    companyStatus: "",
    consultantLocation: "",
    entrepreneurMission: "",
    status: "",
    mission: "",
    teamMember: [],
    userType: "",
    // for consultants these can be different companies, for company owners this can be
    // entrepreneur
    belong_to_ids: [],
    industry: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleUserSelect = (selectedUserId) => {
    if (!userDetails.teamMember.includes(selectedUserId)) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        teamMember: [...prevDetails.teamMember, selectedUserId],
      }));
    }
  };

  const removeUserSelect = (selectedUserId) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      teamMember: prevDetails.teamMember.filter((id) => id !== selectedUserId),
    }));
  };

  return {
    userDetails,
    handleChange,
    handleUserSelect,
    removeUserSelect,
    setUserDetails,
  };
}

export default useUserDetails;
