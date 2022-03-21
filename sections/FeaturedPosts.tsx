import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { LeftArrowIcon, RightArrowIcon } from '../assets/images';
import { FeaturedPostCard } from '../components';
import { getFeaturedPosts } from '../services/sendGraphRequest';
import { FeaturedPost } from '../types/PostType';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 768, min: 640 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 640, min: 0 },
        items: 1,
    },
};

const FeaturedPosts = () => {
    const [featuredPosts, setFeaturedPosts] = useState<FeaturedPost[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        getFeaturedPosts().then((result) => {
            setFeaturedPosts(result);
            setDataLoaded(true);
        });
    }, []);

    const customLeftArrow = (
        <div className="absolute left-0 text-center p-3 cursor-pointer bg-pink-600 rounded-full">
            <LeftArrowIcon />
        </div>
    );

    const customRightArrow = (
        <div className="absolute arrow-btn right-0 text-center p-3 cursor-pointer bg-pink-600 rounded-full">
            <RightArrowIcon />
        </div>
    );

    return (
        <div className="mb-8">
            <Carousel infinite customLeftArrow={customLeftArrow} customRightArrow={customRightArrow} responsive={responsive} itemClass="px-4">
                {dataLoaded && featuredPosts.map((post, index) => (
                    <FeaturedPostCard key={index} post={post} />
                ))}
            </Carousel>
        </div>
    );
};

export default FeaturedPosts;