import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductSkelator = () => {
    return (
        <div className="bg-white p-3 w-full">
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="9rem"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="2rem"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.7rem"
                width="70%"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.7rem"
                width="40%"
                inline={true}
                className="mr-10"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.7rem"
                width="40%"
                inline={true}
            />
        </div>
    );
};

const ProductSideSkelator = () => {
    return (
        <div className="bg-white w-full p-5">
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="2.5rem"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.6rem"
                width="90%"
                count={3}
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.6rem"
                width="30%"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="2.5rem"
                className="mt-10"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.6rem"
                width="90%"
                count={2}
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.6rem"
                width="30%"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="2.5rem"
                className="mt-10"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.6rem"
                width="90%"
                count={3}
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.6rem"
                width="30%"
                className="mr-14"
                inline={true}
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.6rem"
                width="30%"
            />
        </div>
    )
};

const ReviewSkelator = () => {
    return (
        <div className="bg-white p-3">
            <div className="flex justify-center">
                <Skeleton
                    baseColor="#ddd3d352"
                    highlightColor="#3f3b3b13"
                    circle={true}
                    width="4rem"
                    height="4rem"
                />
            </div>
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                width="50%"
                height="2rem"
                className="ml-24 my-3"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.4rem"
                count={3}
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.7rem"
                width="60%"
                className="ml-16 mt-3"
            />
        </div>
    )
};
const NewsSkelator = () => {
    return (
        <div className="bg-white p-3">
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="13rem"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="2rem"
                className="my-3"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.5rem"
                count={4}
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="2rem"
                width="40%"
                className="mt-3 ml-18"
            />
        </div>
    )
};

export { ProductSkelator, ProductSideSkelator, ReviewSkelator, NewsSkelator };