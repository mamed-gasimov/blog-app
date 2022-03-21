import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { getCategories } from '../../services/sendGraphRequest';
import { CategoryType } from '../../types/CategoryType';

const Categories: FC = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        getCategories()
            .then((newCategories) => {
                setCategories(newCategories as CategoryType[]);
            }).catch(e => console.log(e));
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
            {categories?.map((category, index) => (
                <Link key={index} href={`/category/${category.slug}`}>
                    <span className={
                        `cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`
                    }>
                        {category.name}
                    </span>
                </Link>
            ))}
        </div>
    )
}

export default Categories;