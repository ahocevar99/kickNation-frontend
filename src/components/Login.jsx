import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';
import titlePhoto from '../assets/title-photo.jpg'
import axios from 'axios'

const Login = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const loginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post('https://kicknation-backend-5.onrender.com/login', {
                username: username,
                password: password,
            },
            {
                withCredentials: true,
            })
            if (response.data.message == "Successful login") {
                navigate('/home', { state: { username: username } });
            }
            else setLoading(false)
        } catch (error) {
            console.error('Error sending data: ', error);
            setLoading(false)
        } finally {
            setLoading(false)
        }

    }



    return (
        <div className='min-h-screen flex flex-col justify-between'>
            <div className='mt-[3rem] lg:mt-[10rem] h-[35rem] w-[90%] justify-center items-center lg:flex lg:flex-row lg:w-[60rem] xl:w-[70rem] 2xl:w-[80rem] m-auto border border-white lg:border-gray-800 rounded-[1rem] lg:justify-evenly shadow-2xl md:w-[40rem] sm:w-[30rem]'>
                <div className='hidden lg:block lg:w-[60rem] h-[35rem]'>
                    <img src={titlePhoto} alt="" className='w-full h-full object-cover rounded-l-[1rem]' />
                </div>
                <div className='w-full md:w-[40rem] sm:w-[30rem] flex flex-col justify-center items-center'>
                    <h1 className='text-green-100 text-4xl sm:text-5xl lg:text-3xl text-shadow-lg mt-[1rem] font-serif'>KickNation</h1>
                    <p className="text-3xl lg:text-5xl mt-[3rem] underline decoration-solid text-gray-100">Sign In</p>
                    <form onSubmit={loginSubmit}>
                        <div className="mt-[4rem] flex flex-col m-auto items-center justify-center">
                            <div className="mb-1">
                                <i class="fa-solid fa-user mr-2 text-gray-200"></i>
                                <input className="border h-[2.4rem] p-2 rounded-[4rem] mb-[0.5rem]" type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} />
                            </div>
                            <div className="mb-1">
                                <i class="fa-solid fa-lock mr-2 text-gray-200"></i>
                                <input className='border h-[2.4rem] p-2 rounded-[4rem]' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
                            </div>
                        </div>

                        <button className="submit border rounded-[4rem] w-[15rem] h-[3rem] p-1 mt-[2rem] bg-green-900 hover:bg-green-950 text-gray-100 text-lg" disabled={loading}>{loading? 'Logging In ...' : 'Sign in'}</button>
                    </form>
                    <div className='mt-[2rem] w-[15rem] flex justify-evenly mb-[2rem]'>
                        <div className='text-gray-200'>Don't have an account? </div>
                        <Link to="/signUp" className="text-blue-400">Sign Up</Link>
                    </div>
                </div>
            </div>
            <p className='hidden lg:flex w-full m-auto items-center justify-center mt-[2rem] lg:mb-[2rem] text-xl text-shadow-xl font-serif text-gray-200'>Lead your Team to glory</p>
        </div>
    )
}

export default Login
