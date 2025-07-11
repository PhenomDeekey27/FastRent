"use client"
import EditModal from '@/components/EditModal'
import Table from '@/components/Table'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { useState } from 'react'
import { mockCars } from '@/utils/mockdata'
import LogModal from '@/components/LogModal'
import { Car } from '@/utils/type'

const page = () => {
  const [Modal, setModal] = useState<boolean>(false)
  const [Item, setItem] = useState<Car | null>(null)
  const [cars, setcars] = useState<Car[]>(mockCars)
  const [originalCars, setOriginalCars] = useState(mockCars)
  const [logview, setlogview] = useState<boolean>(false)

const filterList = (status: string) => {
  if (status === "all") {
    setcars(originalCars)
  } else {
    setcars(originalCars.filter((car) => car.status === status))
  }
}


  return (
    <div className='text-primary'>
      <div className='flex items-center justify-between p-4 font-bold'>
        <div className='bg-[#cb3cff] p-2 rounded-md'>
          <h1>FastRent</h1>

        </div>

        <UserButton></UserButton>

      </div>
      <div className='flex flex-col md:flex-row items-center justify-between flex-wrap p-4'>
        <div>
          <button onClick={()=>setlogview(!logview)}
           className='p-2 bg-orange-700 rounded-md hover:bg-orange-600 cursor-pointer'>
            View Logs
          </button>

        </div>
        <div className="flex flex-col gap-2 flex-wrap">
          <span className='font-semibold italic'>Sort by</span>
          <div className='flex gap-4 flex-wrap'>
              <button onClick={()=>filterList('approved')}
               className='p-2 bg-green-700 hover:bg-green-600 rounded-md cursor-pointer'>
            Approved
          </button>
          <button onClick={()=>filterList('pending')}
          className='p-2 bg-yellow-700 hover:bg-yellow-600 rounded-md cursor-pointer'>
            Pending
          </button>
          <button onClick={()=>filterList('rejected')}
          className='p-2 bg-red-700 hover:bg-red-600 rounded-md cursor-pointer'>
            Rejected
          </button>
             <button onClick={()=>filterList('all')}
          className='p-2 bg-blue-400 text-black hover:bg-blue-600 rounded-md cursor-pointer'>
            Reset
          </button>


          </div>
        

        </div>


      </div>
      <Table
        Modal={Modal}
        setModal={setModal}
        setItem={setItem}
        Item={Item}
        cars={cars}
        setcars={setcars}
        setOriginalCars={setOriginalCars}

      ></Table>
      <EditModal Modal={Modal} Item={Item} setModal={setModal} setcars={setcars} ></EditModal>
      <LogModal logview={logview} setlogview={setlogview}></LogModal>
    </div>
  )
}

export default page
