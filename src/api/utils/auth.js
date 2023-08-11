export async function userVerification(token) {

    const optionsFetch = {
        method: "GET",
        headers: { //para añadir el token al header
            'auth-token': token
          }
    }
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth`, optionsFetch)
    
    if (!response.ok) {
      localStorage.removeItem("token")
      throw new Error('Error de verificacion, userVerification')
       
    }

      const data = await response.json()

      // console.log(data, "data token")
      // Devolver true si la verificación es exitosa
    return true;

} catch (error) {
  console.log(error, 'error userVerification');
  
  // Devolver false si hay un error en la verificación
  return false;
}
}
