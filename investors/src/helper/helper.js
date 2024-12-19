import axios from "axios"

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


// MAKE API REQUESTS



export async function authenticate(name){
    try{

        return await axios.post("/api/authenticate", {name})

    } catch (error) {
        return { error: "Email doesn't exist!" }
    }
}



export async function getUser({ email }){
    try{
         const {data} = await axios.get(`/api/user/${email}`);
         return {data};
    } catch(error) {
        return { error : "Password doesn't match!!"}
    }
}


// register

export async function registerUser(credentials){
    try{
        const {data: {msg}, status} = await axios.post(`/api/signups`, credentials);
        
        let {name, email} = credentials;

        if(status === 201){
            await axios.post("/api/registerMail", {name, email, text:msg})
        }

        return Promise.resolve(msg)

    } catch(error){
        return Promise.reject({error})
    }
}


// login

export async function verifyPassword({email, password}){
    try{
        if(email){
            const {data} = await axios.post("/api/logins", {email, password})
            return Promise.resolve({data});
        }
    }catch(error){
        return Promise.reject({error: "Password doesn't Match!!"})
    }
}


export async function updateUser(investorForm, email){
    try{
        const token = sessionStorage.getItem('token');
        console.log(token);
        
        const data = await axios.put("/api/updateuser", {
            email: JSON.parse(sessionStorage.getItem('emailInv')),
            company: "DIZ"
          } , { headers: { "Authorization" : `Bearer ${token}` }});
        
        return Promise.resolve({data})
    }catch(error){
        return Promise.reject({error: "Couldn't update profile!!"})
    }
}


export async function generateOTP(email){
    try{
        const {data : {code}, status} = await axios.get("/api/generateOTP", {params: {email}})
        if(status === 201){
            let {data: {email}} = await getUser({email});
            let text = `Your password recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { email : email, text, subject:"Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch(error) {
        return Promise.reject({error});
    }
}

export async function verifyOTP({email, code}){
    try{
        const {data, status} = await axios.get("/api/verifyOTP", {params : {email, code}})
        return {data, status}
    }catch(error){
        return Promise.reject(error);
    }
}


export async function resetPassword({email, password}){
    try{
        const {data, status} = await axios.put("/api/resetPassword", {email, password})
        return Promise.resolve({data, status});
    }catch(error){
        return Promise.reject({error})
    }
}