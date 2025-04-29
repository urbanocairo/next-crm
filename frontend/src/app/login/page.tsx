'use client'

import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
    const response = await axios.post('http://localhost:8000/api/token/', {
      username: email,
      password: password,
    })

      const { access, refresh } = response.data
      Cookies.set('access_token', access)
      Cookies.set('refresh_token', refresh)

      window.location.href = '/'  // redirect to home
    } catch (err) {
      setError('Login failed')
      console.error(err)
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex gap-2 items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <svg className="w-12 h-12 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z" clipRule="evenodd"/>
                </svg>


                        iBookie    
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Sign in to your account
                                </h1>
                                <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                                        <div>
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                                                <input 
                                                    type="text" 
                                                    name="email" 
                                                    id="email" 
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                    placeholder="Username" 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required 
                                                />
                                        </div>
                                        <div>
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                <input 
                                                    type="password" 
                                                    name="password" 
                                                    id="password" 
                                                    placeholder="••••••••" 
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required 
                                                />
                                        </div>
                                        <div className="flex items-center justify-between">
                                                <div className="flex items-start">
                                                        <div className="flex items-center h-5">
                                                            <input 
                                                                id="remember" 
                                                                aria-describedby="remember" 
                                                                type="checkbox" 
                                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                                        </div>
                                                </div>
                                                <a href="#" className="text-sm font-medium text-orange-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                        </div>
                                        <button 
                                            type="submit" 
                                            className="w-full flex items-center justify-center gap-2 text-white bg-orange-600 hover:bg-gray-900 hover:text-white transform duration-600 ease-in-out focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            style={{ cursor:'pointer' }} // Custom orange color
                                        >
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clipRule="evenodd"/>
                                            </svg>

                                            Sign in
                                        </button>
                                        {error && <p className="text-red-500">{error}</p>}
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                        </p>
                                </form>
                        </div>
                </div>
        </div>
    </section>
  )
}