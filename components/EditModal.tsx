'use client'
import { useState, useEffect, useContext } from "react";
import { Logcontext } from "@/context/LogContext";
import { Car } from "@/utils/type";

type ModalProps = {
    Modal: boolean,
    Item: Car | null,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setcars: React.Dispatch<React.SetStateAction<Car[]>>

}


const EditModal = ({ Modal, Item, setModal, setcars }: ModalProps) => {

    const context = useContext(Logcontext)

    if (!context) {
        throw new Error("Logcontext must be used within a LogContextProvider");
    }
    const { addLogs } = context


    const [selectedItem, setselectedItem] = useState<Car | null>(Item)

    const closeModal = () => {
        document.getElementById("crud-modal")?.classList.toggle("hidden")
        setModal(!Modal)

    }

    useEffect(() => {
        if (Item) {
            setselectedItem(Item);
        }
    }, [Item]);

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  setselectedItem((prev) => {
    if (!prev) return prev;
    return {
      ...prev,
      [name]: value,
    } as Car;
  });
};

   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const localDate = new Date(e.target.value);
  const utcISOString = new Date(
    localDate.getTime() - localDate.getTimezoneOffset() * 60000
  ).toISOString();

  setselectedItem((prev) => {
    if (!prev) return prev;

    return {
      ...prev,
      submittedAt: utcISOString,
    } as Car;
  });
};

    const UpdateItem = () => {
  if (!selectedItem) return;

  setcars((prevcars) =>
    prevcars.map((car) =>
      car.id === selectedItem.id ? selectedItem : car
    )
  );

  const changes: string[] = [];

  if (Item) {
    (Object.keys(selectedItem) as (keyof Car)[]).forEach((key) => {
      if (selectedItem[key] !== Item[key]) {
        changes.push(
          `Changed "${key}" from "${Item[key]}" to "${selectedItem[key]}"`
        );
      }
    });
  }

  if (changes.length > 0) {
    const message = `Modified car "${selectedItem.title}" (ID: ${selectedItem.id}): ${changes.join(", ")}`;
    addLogs(message);
  }

  setModal((prev) => !prev);
};




    return (
        Modal && selectedItem != null && (

            <div
                id="crud-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Edit Rental List
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal"
                                onClick={closeModal}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <form className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div>
                                    <img src={selectedItem?.imageUrl} alt="car_image" className="rounded-md place-content-center self-center" />
                                </div>
                                {/* car title */}
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Car Name
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Edit Car Name"
                                        value={selectedItem?.title}
                                        onChange={handleChange}

                                    />
                                </div>

                                {/* car brand */}
                                <div className="col-span-2">
                                    <label
                                        htmlFor="brand"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Brand
                                    </label>
                                    <input
                                        type="text"
                                        name="brand"
                                        id="brand"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Edit Car Brand"
                                        value={selectedItem?.brand}
                                        onChange={handleChange}

                                    />
                                </div>
                                {/* price per day */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label
                                        htmlFor="price"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Price Per Day
                                    </label>
                                    <input
                                        type="number"
                                        name="pricePerDay"
                                        id="pricePerDay"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="$2999"
                                        value={selectedItem?.pricePerDay}
                                        onChange={handleChange}

                                    />
                                </div>
                                {/* status */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label
                                        htmlFor="status"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Status
                                    </label>
                                    <select
                                        id="category"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        value={selectedItem.status}
                                        onChange={handleChange}
                                        name="status"
                                    >
                                        <option>Select priority</option>
                                        <option value="pending">Pending</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="approved">Approved</option>

                                    </select>
                                </div>
                                {/* model */}
                                <div className="col-span-2">
                                    <label
                                        htmlFor="model"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Model
                                    </label>
                                    <input
                                        type="text"
                                        name="model"
                                        id="model"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Edit Car Name"
                                        value={selectedItem?.model}
                                        onChange={handleChange}

                                    />
                                </div>

                                {/* location */}

                                <div className="col-span-2">
                                    <label
                                        htmlFor="location"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        id="location"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Edit Car Name"
                                        value={selectedItem?.location}
                                        onChange={handleChange}

                                    />
                                </div>

                                {/* image link */}

                                <div className="col-span-2">
                                    <label
                                        htmlFor="location"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Image Link
                                    </label>
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        id="imageUrl"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Edit Car Name"
                                        value={selectedItem?.imageUrl}
                                        onChange={handleChange}

                                    />
                                </div>

                                {/* submitted by */}

                                <div className="col-span-2">
                                    <label
                                        htmlFor="submittedBy"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Submitted By
                                    </label>
                                    <input
                                        type="text"
                                        name="submittedBy"
                                        id="submittedBy"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Edit Car Name"
                                        value={selectedItem?.submittedBy}
                                        onChange={handleChange}

                                    />
                                </div>
                                {/* submitted at */}
                                <div className="col-span-2">
                                    <label
                                        htmlFor="submittedAt"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Submitted At
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="submittedAt"
                                        id="submittedAt"
                                        value={
                                            selectedItem?.submittedAt
                                                ? new Date(selectedItem.submittedAt).toISOString().slice(0, 16)
                                                : ""
                                        }
                                        onChange={handleDateChange}
                                    />

                                </div>


                            </div>
                            <button

                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={UpdateItem}
                            >
                            
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        )
    );
};

export default EditModal;
