"use client"
import { Car } from "@/utils/type"


import { Logcontext } from "@/context/LogContext"
import React, {useContext } from "react"
type TableProps = {
    Modal: Boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    Item:Car | null,
    setItem:React.Dispatch<React.SetStateAction<Car | null >> ,
    cars:Car[],
    setcars:React.Dispatch<React.SetStateAction<Car[]>>
    setOriginalCars:React.Dispatch<React.SetStateAction<Car[]>>
    

}


const Table = ({ Modal, setModal , setItem ,cars,setcars , setOriginalCars }: TableProps) => {
    
    const context = useContext(Logcontext)
       if (!context) {
        throw new Error("Logcontext must be used within a LogContextProvider");
    }
    const {addLogs} = context

    const setterFn=(item:Car)=>{
    setModal(!Modal)
    setItem(item)
    
}

const approveStatus = (id:string) => {
  setcars((prevCars) =>
    prevCars.map((car) =>
      car.id === id ? { ...car, status: 'approved' } : car
    )
    

  );
  setOriginalCars((prevCars) =>
    prevCars.map((car) =>
      car.id === id ? { ...car, status: 'approved' } : car
    )
   )


  const message = `${cars.filter((car)=>car.id === id)[0].title } is approved `

  addLogs(message)
  

 



};

const rejectStatus = (id:string) => {
 
    setcars((prevCars) =>
    prevCars.map((car) =>
      car.id === id ? { ...car, status: 'rejected' } : car
    )

  );

  setOriginalCars((prevCars) =>
    prevCars.map((car) =>
      car.id === id ? { ...car, status: 'rejected' } : car
    )
   )
   const message = `${cars.filter((car)=>car.id === id)[0].title } is rejected `

  addLogs(message)
  
};

    return (
        <div className="p-4">
            
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right bg-[#142650] text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-primary uppercase ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Car
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Model
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                                <br />
                                (per day)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                View
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Submitted By
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Submitted At
                            </th>
                             <th scope="col" className="px-6 py-3">
                               Edit
                            </th>
                             <th scope="col" className="px-6 py-3">
                             Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            cars.map((item,ind) => <tr key={ind} className="cursor-pointer hover:bg-blue-800 mt-12">
                                <td className="px-6 py-3">
                                    {item.id}
                                </td>
                                <td className="px-6 py-3 flex flex-col">
                                    <span className="font-bold text-white">{item.brand}</span>
                                    {item.title}
                                </td>
                               
                                <td className="px-6 py-3">
                                    {item.model}
                                </td>
                                <td className="px-12">
                                    $ {item.pricePerDay}
                                </td>
                                <td className=" py-3">
                                    <span
                                        className={`inline-flex items-center justify-center 
                w-28 h-8 
                text-white p-2 rounded-md font-semibold uppercase 
                ${item.status.includes("pending") ? "bg-yellow-600" :
                                                item.status.includes("approved") ? "bg-green-600" :
                                                    "bg-red-600"}`}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                <td className="px-6 py-3">
                                    <img src={item.imageUrl} className="w-10 h-10"></img>
                                </td>
                                <td className="px-6 py-3">
                                    {item.location}
                                </td>
                                <td className="px-6 py-3 font-bold uppercase text-primary">
                                    {item.submittedBy}
                                </td>
                                <td className="px-6 py-3">
                                    {new Date(item.submittedAt).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                    })}
                                </td>
                                <td className="px-6 py-3">
                                    <button onClick={()=>setterFn(item)} className="cursor-pointer">
                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                                    className="lucide lucide-pencil-ruler-icon lucide-pencil-ruler hover:text-orange-400"><path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"/><path d="m8 6 2-2"/><path d="m18 16 2-2"/><path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>

                                    </button>
                                   
                                </td>
                                <td className="flex flex-col gap-2">
                                  
                                    <button onClick={()=>approveStatus(item.id)} className="bg-green-500 p-2 text-white rounded-md mr-1 cursor-pointer">Approve</button>
                                    <button   onClick={()=>rejectStatus(item.id)} className="bg-red-500 p-2 text-white rounded-md mr-1 cursor-pointer">Reject</button>
                                </td>

                            </tr>
                        )
                        }

                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default Table
