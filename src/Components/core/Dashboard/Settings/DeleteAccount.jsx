import React from 'react'
import { deleteProfileHandler } from '../../../../Services/operations/profileApi'
import { VscTrash } from 'react-icons/vsc'
import { useDispatch } from 'react-redux';

const DeleteAccount = () => {
    const dispatch = useDispatch();

    return (
        <div className="w-full bg-pink-900 rounded-md px-10 py-8">
            <div className="flex items-start gap-5 sm:flex-row flex-col">
                <div className="w-20 h-20 rounded-full bg-pink-800 flex items-center justify-center">
                    <VscTrash className="text-5xl text-pink-100" />
                </div>

                <div className="flex flex-col items-start gap-5">
                    <p className="text-xl font-bold">Delete Account</p>
                    <div>
                        <p>Would you like to delete account?</p>
                        <p>
                            This account may contain Paid Courses. Deleting your account is
                            permanent and will remove all the contain associated with it.
                        </p>
                    </div>
                    <button
                        className="px-8 py-4 bg-pink-200 rounded text-lg font-medium"
                        onClick={() => dispatch(deleteProfileHandler())}
                    >
                        I want to delete my account.
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccount
