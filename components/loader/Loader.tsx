import { FC } from 'react';
import { CircleIcon } from '../../assets/images';

const Loader: FC = () => (
    <div className='text-center'>
        <button
            type='button'
            className={`inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium 
rounded-md text-white bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out 
duration-150 cursor-not-allowed`}
            disabled
        >
            <CircleIcon />
            Loading
        </button>
    </div>
);

export default Loader;