import React from "react";

const Profile = () => {
  return (
    <form className="flex flex-col">
      <div className="flex flex-col gap-4 pb-4">
        <p className=" font-500 text-lg text-gray-900 ">Profile</p>
        <p className=" font-400 text-sm text-gray-500 ">
          Update details shown to guests and on the short link preview.
        </p>
      </div>
      <hr className="border border-gray-200" />
        <div className="px-4">
            <div className="flex flex-col gap-5">
                <div className="flex gap-8 ">
                    <p className="text-sm font-500 text-gray-700 ">Business Name</p>
                    <input type="text" placeholder="Crestabel inc" className="rounded-lg py-2.5 px-3.5 border border-gray-300 shadow outline-none " />
                </div>

            </div>

        </div>

    </form>
  );
};

export default Profile;
