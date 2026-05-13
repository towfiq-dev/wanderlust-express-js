'use client'
import { AlertDialog, Button } from '@heroui/react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const UserBookingDelete = ({booking}) => {
  const router = useRouter()
  const handleDelete = async()=>{
    const res = await fetch(`http://localhost:5000/bookings/${booking._id}`,{
      method: 'DELETE',
      headers:{'content-type': 'application/json'}
      
    })
    const data = await res.json()
    if (data) {
          toast.success('You have successfully Delete')
          router.push('/allNav/bookings')
        }else{
          toast.error('Something went wrong')
        }
  }
  return (
    <AlertDialog>
      <Button variant="danger" className="flex cursor-pointer items-center gap-2 rounded-xl border border-red-400 px-6 py-6 font-medium text-black transition-all duration-300 hover:bg-red-500 hover:text-white">
        <Trash2 size={18} />
        Cancel
        </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel Booking permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently cancel <strong>Booking</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button 
              onClick={handleDelete}
              //slot="close" 
              variant="danger">
                Confirm
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default UserBookingDelete;