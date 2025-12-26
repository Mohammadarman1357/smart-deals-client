import React from 'react';

const Loading = () => {
    return (
        <div className='max-w-7xl mx-auto p-20'>
            <h1 className='text-9xl inter-font font-semibold flex items-center justify-center'>  L <span className="loading loading-spinner w-[120px] h-[120px] text-primary"></span> ADING...</h1>
        </div>
    );
};

export default Loading;