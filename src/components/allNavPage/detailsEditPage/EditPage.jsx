"use client";
import { authClient } from "@/lib/auth-client";
import {Envelope} from "@gravity-ui/icons";
import {Button, FieldError, Input, Label, ListBox, Modal, Surface, TextArea, TextField, Select} from "@heroui/react";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Modals = ({detailsData}) => {
  const {
    _id,
    imageUrl,
    price,
    destinationName,
    duration,
    country,
    description,
    category,
    departureDate,
  } = detailsData
  const router = useRouter()
  const handleEdit = async(e)=>{
  
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  const newData = Object.fromEntries(formData.entries())
  
  const {data: tokenData} = await authClient.token()

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${detailsData._id}`,{
    method: 'PATCH',
    headers:{
      'content-type': 'application/json',
      authorization: `Bearer ${tokenData?.token}`
    },
    body: JSON.stringify(newData)

  })
  const data = await res.json()

  if (data) {
    toast.success('Edit is Successful')
    router.push('/allNav/destinations')
  }else{
    toast.error('Something went wrong')
  }

  }
  return (
    <div>
      
      <Modal>
        <Button className="mr-20" variant="secondary"><Edit/> Edit</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Contact Us</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Fill out the form below and well get back to you. The modal adapts automatically
                when the keyboard appears on mobile.
              </p>
            </Modal.Header>
            <Modal.Body className="p-2">
              <Surface variant="default">
<form 
            onSubmit={handleEdit}
            className=" space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Destination Name */}
              <div className="md:col-span-2">
                <TextField name="destinationName" isRequired defaultValue={destinationName}>
                  <Label>Destination Name</Label>
                  <Input placeholder="Bali Paradise" className="rounded-2xl" />
                  <FieldError />
                </TextField>
              </div>

              {/* Country */}
              <TextField name="country" isRequired defaultValue={country}>
                <Label>Country</Label>
                <Input placeholder="Indonesia" className="rounded-2xl" />
                <FieldError />
              </TextField>

              {/* Category - Updated Select Component */}
              <div>
                <Select
                  name="category"
                  isRequired
                  className="w-full"
                  placeholder="Select category"
                  defaultValue={category}
                >
                  <Label>Category</Label>
                  <Select.Trigger className="rounded-2xl">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="Beach" textValue="Beach">
                        Beach
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="Mountain" textValue="Mountain">
                        Mountain
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="City" textValue="City">
                        City
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="Adventure" textValue="Adventure">
                        Adventure
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="Cultural" textValue="Cultural">
                        Cultural
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="Luxury" textValue="Luxury">
                        Luxury
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Price */}
              <TextField name="price" type="number" isRequired defaultValue={price}>
                <Label>Price (USD)</Label>
                <Input
                  type="number"
                  placeholder="1299"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>

              {/* Duration */}
              <TextField name="duration" isRequired defaultValue={duration}>
                <Label>Duration</Label>
                <Input
                  placeholder="7 Days / 6 Nights"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>

              {/* Departure Date */}
              <div className="md:col-span-2">
                <TextField name="departureDate" type="date" isRequired defaultValue={departureDate}>
                  <Label>Departure Date</Label>
                  <Input type="date" className="rounded-2xl" />
                  <FieldError />
                </TextField>
              </div>

              {/* Image URL - Removed preview */}
              <div className="md:col-span-2">
                <TextField name="imageUrl" isRequired defaultValue={imageUrl}>
                  <Label>Image URL</Label>
                  <Input
                    type="url"
                    placeholder="https://example.com/bali-paradise.jpg"
                    className="rounded-2xl"
                  />
                  <FieldError />
                </TextField>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <TextField name="description" isRequired defaultValue={description}>
                  <Label>Description</Label>
                  <TextArea
                    placeholder="Describe the travel experience..."
                    className="rounded-3xl"
                  />
                  <FieldError />
                </TextField>
              </div>
            </div>

            {/* Buttons */}
            <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button type='submit'>Save</Button>
    </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default Modals;