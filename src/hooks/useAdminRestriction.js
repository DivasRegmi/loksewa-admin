import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import RouteConfig from "../config/RouteConfig";

const useAdminRestriction = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if userId is not equal to 1
    if (user.userId !== 1) {
      // Redirect to SECTION_SCREEN
      navigate(`/${RouteConfig.SECTION_SCREEN}`);
    } else {
      setIsLoading(false); // Admin restriction check is complete
    }
  }, [user.userId, navigate]);

  // Return loading indicator if the check is in progress
  return isLoading ? null : user.userId;
};

export default useAdminRestriction;
