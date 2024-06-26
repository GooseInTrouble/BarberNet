'use client'
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import NavButtonLink from "./NavButtonLink";

export default function EmployeeLink() {
  const [isEmployee, setIsEmployee] = useState(true);
  const [salonName, setSalonName] = useState("667833e36bd549ac28d2d202");

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (!session || !session.user) {
        console.error("Session or user not found");
        return;
      }

      const userEmail = session.user.email;
      if (!userEmail || typeof userEmail !== "string") {
        console.error("Invalid user email");
        return;
      }

      console.log("User email:", userEmail);

      // Example: Fetch user details from backend
      try {
        const response = await fetch(`/api/user/details?email=${userEmail}`);
        if (!response.ok) {
          console.error("Failed to fetch user details");
          return;
        }

        const userData = await response.json();
        console.log("User data:", userData);

        setIsEmployee(userData.isEmployee);
        if (userData.salonId) {
          console.log("Salon ID:", userData.salonId);

          // Example: Fetch salon details from backend
          const salonResponse = await fetch(`/api/salons/details?id=${userData.salonId}`);
          if (!salonResponse.ok) {
            console.error("Failed to fetch salon details");
            return;
          }

          const salonData = await salonResponse.json();
          console.log("Salon data:", salonData);

          setSalonName(salonData.name);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!isEmployee) {
    console.warn("User is not an employee");
    return null; // or display nothing if not an employee
  }

  if (!salonName) {
    console.warn("Salon name not found");
    return null; // or display nothing if salon name not found
  }

  return (
    <NavButtonLink href={`/salons/${salonName}`}>
      {salonName}
    </NavButtonLink>
  );
}
