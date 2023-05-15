import { useEffect, useState } from 'react';
import profileService from "../services/profileService";

const useProfile = () => {

    const [user, setUser] = useState("");
    const [mobileNumber, setMobileNumber] = useState('');

    useEffect(() => {
        profileService.getUsername().then(response => {

            setUser(response.username);
            setMobileNumber(response.mobileNumber);

        });

    }, []);

    return {

        mobileNumber: mobileNumber,
        user: user

    };
}

export default useProfile;
