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

  const handleUserSelect = (selectedUserIds) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      belong_to_ids: selectedUserIds,
    }));
  };

  const handleBelongToSelect = (selectedUserIds) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      teamMember: selectedUserIds,
    }));
  };

  return {
    userDetails,
    handleChange,
    handleUserSelect,
    setUserDetails,
    handleBelongToSelect,
  };
}

export default useUserDetails;
