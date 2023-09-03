import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom"
import { backendUrl } from "../config";


const Verify = () => {

  const [params,] = useSearchParams();

  const [isLoading, setLoading] = useState(false);

  const [isVerified, setVerified] = useState(false);

  const verifyUser = async () => {
    setLoading(true);
    await fetch(`${backendUrl}/auth/verify`, {
      method: 'POST',
      body: JSON.stringify({ token: params.get('token') }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setVerified(true);
    setLoading(false);
  }

  useEffect(() => {

    verifyUser();

    window.location.href = 'https://google.com/'

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])





  return (
    <div>
      {isLoading && 'verifying please wait'}
      {!isLoading && isVerified && 'User Verified Please login'}
      {!isLoading && !isVerified && 'Unable to verify please wait'}
    </div>
  )

}


export default Verify;