import React from 'react';

const GoodbyePage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
            <h1>Goodbye!</h1>
            <p>You have successfully logged out. See you again soon!</p>
        </div>
    );
};

export default GoodbyePage;