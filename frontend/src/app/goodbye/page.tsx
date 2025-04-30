import React from 'react';
import Image from "next/image";

export default function GoodbyePage() {

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className="flex flex-col items-center justify-center mb-4 text-2xl text-center">
                <h1>Goodbye!</h1>
                <p>You have successfully logged out. See you again soon!</p>
            </div>
            <div
                className="flex gap-4 items-center justify-center text-center">
                <a
                    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-orange-600 text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                    href='/'
                    target="_parent"
                    rel=""
                >
                <Image
                    className="dark:invert text-white"
                    src="/library-svgrepo-com.svg"
                    alt="Library icon"
                    width={20}
                    height={90}
                />
                Home
                </a>
                <a
                    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-orange-600 text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                    href="/login"
                    target="_parent"
                    rel=""
                >
                <Image
                    className="dark:invert text-white"
                    src="/library-svgrepo-com.svg"
                    alt="Library icon"
                    width={20}
                    height={90}
                />
                Back to Login
                </a>
            </div>
        </div>
    );
};
