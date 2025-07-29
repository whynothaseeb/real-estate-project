import React, { useState, useEffect } from 'react';
import { assets, projectsData } from '../assets/assets';
import { motion } from 'motion/react';

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardWidthPercentage, setCardWidthPercentage] = useState(100);

    // This useEffect hook sets the number of cards to show based on screen size
    // and updates it dynamically on resize.
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) { // 'lg' breakpoint
                setCardWidthPercentage(100 / 3); // Show 3 cards (each taking 1/3 of the width)
            } else if (window.innerWidth >= 768) { // 'md' breakpoint
                setCardWidthPercentage(100 / 2); // Show 2 cards (each taking 1/2 of the width)
            } else { // default (small screens)
                setCardWidthPercentage(100); // Show 1 card (taking full width)
            }
        };

        handleResize(); // Set initial state on component mount
        window.addEventListener('resize', handleResize); // Add event listener for dynamic resizing

        // Cleanup function: remove event listener when component unmounts
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

    // Function to navigate to the next project(s)
    const nextProject = () => {
        // Calculate the effective length for looping the slider.
        // If you're showing 'n' cards, the last 'n-1' cards don't have enough space to fully slide,
        // so we adjust the total number of slides.
        const effectiveLength = projectsData.length - (100 / cardWidthPercentage) + 1;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % effectiveLength);
    };

    // Function to navigate to the previous project(s)
    const prevProject = () => {
        const effectiveLength = projectsData.length - (100 / cardWidthPercentage) + 1;
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? effectiveLength - 1 : prevIndex - 1));
    };

    // Define the gap between cards in pixels (corresponding to Tailwind's gap-8)
    const gapPx = 32;

    // Calculate the CSS transform value for sliding the project cards.
    // It combines percentage-based movement for card width and pixel-based movement for the gap.
    const transformValue = `translateX(calc(-${currentIndex * cardWidthPercentage}% - ${currentIndex * gapPx}px))`;

    return (
        <motion.div initial={{opacity: 0, x:-200}} transition={{duration: 1}} whileInView={{opacity: 1, x:0}} viewport={{once: true}} className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden' id='Projects'>
            {/* Section Heading */}
            <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>
                Projects <span className='underline underline-offset-4 decoration-1'>Completed</span>
            </h1>
            {/* Section Subtitle */}
            <p className='text-gray-500 max-w-80 mb-8 mx-auto text-center'>
                Crafting Spaces, Building Legacies - Explore Our Portfolio
            </p>

            {/* Slider Navigation Buttons */}
            <div className='flex justify-end items-center mb-8'>
                <button onClick={prevProject} className='p-3 bg-gray-200 rounded mr-2 cursor-pointer' aria-label='Previous Project'>
                    <img src={assets.left_arrow} alt="Previous" />
                </button>
                <button onClick={nextProject} className='p-3 bg-gray-200 rounded cursor-pointer' aria-label='Next Project'>
                    <img src={assets.right_arrow} alt="Next" />
                </button>
            </div>

            {/* Project Slider Container */}
            <div className='overflow-hidden'>
                <div style={{ transform: transformValue }} className='flex gap-8 transition-transform duration-500 ease-in-out'>
                    {projectsData.map((project, index) => (
                        <div
                            key={index}
                            className='relative flex-shrink-0 w-full md:w-1/2 lg:w-1/3 group overflow-hidden rounded shadow-lg
                                       transform transition-all duration-300 ease-in-out
                                       hover:scale-105 hover:shadow-xl' // Apply scale and shadow to the whole card on hover
                            style={{ flexBasis: `${cardWidthPercentage}%` }} // Dynamic width for responsive card sizing
                        >
                            {/* Project Image */}
                            <img
                                className='w-full h-auto mb-14' // No direct scale on image; it scales with parent
                                src={project.image}
                                alt={project.title}
                            />
                            {/* Project Details Text Card (slides down on hover) */}
                            <div
                                className='absolute left-0 bottom-5 right-0 flex justify-center
                                           transform transition-transform duration-300 ease-in-out
                                           group-hover:translate-y-full' // Slides down when parent card is hovered
                            >
                                <div className='inline-block bg-white w-3/4 px-4 py-2 shadow-md'>
                                    <h2 className='text-xl font-semibold text-gray-800'>
                                        {project.title}
                                    </h2>
                                    <p className='text-gray-500 text-sm'>
                                        {project.price} <span>|</span> {project.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Projects;