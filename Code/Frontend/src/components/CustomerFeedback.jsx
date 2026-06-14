import { Star } from "lucide-react";
import { useState } from "react"

function CustomerFeedback({onSubmit}) {
    const [rating , setRating] = useState(0);
    const [hover , setHover] = useState(null);
    const [submitted , setSubmitted] = useState(false);
    const handleClick = (star)=>{
        setRating(star);
    };
    const handleSubmit =()=>{
        if(rating===0) return alert("please select a rating") ;
        setSubmitted(true);
        if(onSubmit) onSubmit(rating);
    }
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md text-white max-w-xl mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4 text-center">Rate Your Ride </h2>
        <div className="flex justify-center space-x-2 mb-4">
            {[1,2,3,4,5].map((star)=>(
                <Star 
                key={star}
                size={32}
                className={`cursor-pointer transition ${star <= (hover || rating)? "fill-yellow-400 text-yellow-400" : "text-gray-500"}
                `}
                onClick={()=>handleClick(star)}
                onMouseEnter={()=>setHover(star)}
                onMouseLeave={()=>setHover(null)}
                />
            ))}
        </div>
        <button onClick={handleSubmit} disabled={submitted} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full font-semibold transition">
            {submitted ? "ThankYou for your Feedback!!" : "Submit Feedback"}
        </button>
      
    </div>
  )
}

export default CustomerFeedback ;
