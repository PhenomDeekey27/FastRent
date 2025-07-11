import { Logcontext } from '@/context/LogContext'
import React, { SetStateAction, useContext } from 'react'

type LogModalProps = {
    logview: boolean,
    setlogview: React.Dispatch<SetStateAction<boolean>>
}

const LogModal = ({ logview, setlogview }: LogModalProps) => {
    const context = useContext(Logcontext)
    if (!context) {
        throw new Error("Logcontext must be used within a LogContextProvider")
    }
    const { logs } = context
    console.log(logs, "received logs")
    return logview && (
        <div>
            <div id="default-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black">
                <div className="relative p-4 w-full max-w-2xl max-h-full">

                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Log View (Admins)
                            </h3>
                            <button
                                onClick={() => setlogview(!logview)}
                                type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-4 md:p-5 space-y-4">





                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Admin
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Time
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Changes
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            logs && logs.length > 0 && logs.map((log) => (<tr>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {
                                                        log.admin
                                                    }
                                                </th>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                                    {
                                                        log.timestamp
                                                    }
                                                </th>
                                                <th scope="row" className="px-6  py-4 font-medium text-gray-900  dark:text-white">
                                                    {
                                                        log.message
                                                    }
                                                </th>

                                            </tr>))
                                        }

                                    </tbody>
                                </table>
                            </div>



                        </div>


                    </div>
                </div>
            </div>


        </div>
    )
}

export default LogModal
