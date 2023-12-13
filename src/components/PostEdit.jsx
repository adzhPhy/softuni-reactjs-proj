import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
<MdModeEdit />;

function PostEdit({ title, content }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div className="flex flex-row justify-center items-center bg-none">
        <MdModeEdit />
        <Button
          onClick={handleOpen}
          className="flex flex-row justify-center items-center text-gray-900"
        >
          <Typography variant="h3">Edit post</Typography>
        </Button>
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        className="text-gray-900"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Edit your post here!</DialogHeader>
        <DialogBody className="text-gray-900 fixed w-3/4 h-3/4">
          <Input type="text" placeholder={`${title}`} />
          <Input type="text" placeholder={`${content}`} />
          <Button className="text-gray-900">Edit Post</Button>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default PostEdit;
