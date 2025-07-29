import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'motion/react'

const Testimonials = () => {
  return (
    <motion.div initial={{opacity: 0, x:200}} transition={{duration: 1}} whileInView={{opacity: 1, x:0}} viewport={{once: true}} className='container mx-auto py-10 lg:px-32 w-full overflow-hidden' id='Testimonials'> {/* Corrected 'conatiner' to 'container' */}
      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Customer <span className='underline underline-offset-4 decoration-1'>Testimonials</span></h1>
      <p className='text-gray-500 max-w-80 mb-8 mx-auto text-center'>Real Stories from Those Who Found Homes With Us</p>
      <div className='flex flex-wrap justify-center gap-8 border-white'>
        {testimonialsData.map((testimonial, index) => (
            <div
                key={index}
                className='max-w-[340px] border shadow-xl rounded px-8 py-12 text-center
                           bg-white transform transition-all duration-300 ease-in-out
                           hover:scale-105 hover:shadow-2xl hover:-translate-y-2 border-white'
                // Added: shadow-xl, bg-white (explicit), transform, transition-all, duration-300, ease-in-out,
                //        hover:scale-105, hover:shadow-2xl, hover:-translate-y-2
            >
                <img className='w-20 h-20 rounded-full mx-auto mb-4 object-cover' src={testimonial.image} alt={testimonial.alt} /> {/* Added object-cover */}
                <h2 className='text-xl text-gray-700 font-medium'>{testimonial.name}</h2>
                <p className='text-gray-500 mb-4 text-sm'>{testimonial.title}</p>
                <div className='flex justify-center gap-1 text-red-500 mb-4'>
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                        <img key={i} src={assets.star_icon} alt="Star rating" className='inline-block w-5 h-5' />
                    ))}
                </div>
                <p className='text-gray-600'>{testimonial.text}</p>
            </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonials