import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategories } from '../../services/sendGraphRequest';
import { CategoryType } from '../../types/CategoryType';

const Header: FC = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        getCategories().then((newCategories: CategoryType[]) => {
            setCategories(newCategories);
        });
    }, []);

    return (
        <header className='container mx-auto px-10 mb-8'>
            <div className='border-b w-full inline-block border-blue-400 py-8'>
                <div className='md:float-left block'>
                    <Link href='/'>
                        <span className='cursor-pointer font-bold text-4xl text-white'>Blog App</span>
                    </Link>
                </div>
                <div className='hidden md:float-left md:contents'>
                    {categories.map((category, index) => (
                        <Link key={index} href={`/category/${category.slug}`}>
                            <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    )
}

export default Header;