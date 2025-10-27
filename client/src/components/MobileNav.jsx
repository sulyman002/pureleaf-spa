import { X } from 'lucide-react';
import React, { useState } from 'react';
import { CgMenuLeftAlt } from 'react-icons/cg';

const MobileNav = () => {
    const [openNav, setOpenNav] = useState(false);

    const handleToggleNav = () => {
        setOpenNav(!openNav)
    }
  return (
    <div className=' flex md:hidden border-b border-[#F0ECEB] shadow py-4 px-4 items-center justify-between '>
        {/* logo */}
        <div className="">logo</div>
       <div onClick={handleToggleNav} className="cursor-pointer">
         <CgMenuLeftAlt size={24} className='text-gray-500 ' />
       </div>

       {/* Mobile Nav display */}

       {openNav && (
        <div className="fixed inset-0 bg-[#34405499] min-h-full flex backdrop-blur-2xl ">
            <div className="flex h-screen w-4/5 bg-white">a</div>

            <div className="flex justify-end w-1/5 p-4">
                <X size={24} className='text-white' />
            </div>
        </div>
       )}
    </div>
  )
}

export default MobileNav