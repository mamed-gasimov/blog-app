import { ChangeEvent, FC, useEffect, useState } from 'react'
import { submitComment } from '../../services/sendGraphRequest';

interface Props {
    slug: string;
}

type FormDataType = {
    name: string | null;
    email: string | null;
    comment: string | null;
    storeData: boolean;
}

const CommentsForm: FC<Props> = ({ slug }) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState<Storage | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [formData, setFormData] = useState<FormDataType>({ name: null, email: null, comment: null, storeData: false });

    useEffect(() => {
        setLocalStorage(window.localStorage);
        const initalFormData = {
            name: window.localStorage.getItem('name'),
            email: window.localStorage.getItem('email'),
            comment: window.localStorage.getItem('comment'),
            storeData: Boolean(window.localStorage.getItem('name') || window.localStorage.getItem('email')),
        };
        setFormData(initalFormData);
    }, []);

    const onInputChange = (event: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
        const { target } = event;
        if (target.type === 'checkbox') {
            setFormData((prevState) => ({
                ...prevState,
                [target.name]: target.checked,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [target.name]: target.value,
            }));
        }
    };

    const handlePostSubmission = () => {
        setError(false);
        const { name, email, comment, storeData } = formData;
        if (!name || !name.trim() || !email || !email.trim() || !comment || !comment.trim()) {
            setError(true);
            return;
        }
        const commentObj = {
            name,
            email,
            comment,
            slug,
        };

        if (storeData) {
            localStorage?.setItem('name', name);
            localStorage?.setItem('email', email);
        } else {
            localStorage?.removeItem('name');
            localStorage?.removeItem('email');
        }

        submitComment(commentObj)
            .then((res) => {
                if (res.createComment) {
                    if (!storeData) {
                        formData.name = '';
                        formData.email = '';
                    }
                    formData.comment = '';
                    setFormData((prevState) => ({
                        ...prevState,
                        ...formData,
                    }));
                    setShowSuccessMessage(true);
                    setTimeout(() => {
                        setShowSuccessMessage(false);
                    }, 3000);
                }
            })
            .catch(error => console.log('Error when submitting comment!', error));
    }

    return (
        <form className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a Reply</h3>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <textarea
                    value={formData.comment ?? ''}
                    onChange={onInputChange}
                    className='p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                    name='comment'
                    placeholder='Comment'
                />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
                <input
                    type='text'
                    value={formData.name ?? ''}
                    onChange={onInputChange}
                    className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                    placeholder='Name'
                    name='name'
                />
                <input
                    type='email'
                    value={formData.email ?? ''}
                    onChange={onInputChange}
                    className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                    placeholder='Email'
                    name='email'
                />
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <div>
                    <input
                        checked={formData.storeData}
                        onChange={onInputChange}
                        type='checkbox'
                        id='storeData'
                        name='storeData'
                        value='true'
                        className='mr-2'
                    />
                    <label
                        className='text-gray-500 cursor-pointer'
                        htmlFor='storeData'
                    >
                        Save my name, email in this browser for the next time I comment.
                    </label>
                </div>
            </div>
            {error && <p className='text-xs text-red-500'>All fields are mandatory</p>}
            <div className='mt-8'>
                <button
                    type='button'
                    onClick={handlePostSubmission}
                    className={`transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg 
font-medium rounded-full text-white px-8 py-3 cursor-pointer`}
                >
                    Post Comment
                </button>
                {showSuccessMessage && (
                    <span className='text-xl float-right font-semibold mt-3 text-green-500'>
                        Comment submitted for review
                    </span>
                )}
            </div>
        </form>
    )
}

export default CommentsForm;