"use client";
import { authClient } from "@/lib/auth-client";
import {AlertDialog, Button} from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EditDelete = ({detailsData}) => {
  const router = useRouter()
  const handleDelete = async()=>{
    const {data: tokenData} = await authClient.token()
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${detailsData._id}`,{
      method: 'DELETE',
      headers:{
        'content-type': 'application/json',
        authorization: `Bearer ${tokenData?.token}`
      },
    })
    const data = await res.json()
    if (data) {
      toast.success('You have successfully Delete')
      router.push('/allNav/destinations')
    }else{
      toast.error('Something went wrong')
    }
  }
  return (
    <AlertDialog>
      <Button variant="danger">Delete</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Project</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default EditDelete;