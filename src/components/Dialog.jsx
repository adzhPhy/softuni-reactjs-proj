import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const DialogComp = ({ open, handleOpen, func, textByDialogType }) => {
  return (
    <Dialog
      size={"xs"}
      open={open}
      handler={handleOpen}
      variant="gradient"
      className="max-w-[30rem] text-gray-900 flex flex-col border-2 mt-2 w-124 bg-slate-100 gap-1"
    >
      <DialogBody className="flex justify-center text-md">
        <b>{textByDialogType}</b>
      </DialogBody>
      <DialogFooter className="justify-center mb-1">
        <Button
          variant="gradient"
          onClick={handleOpen}
          className="mr-1 p-2 text-gray-900 bg-red-400"
        >
          Cancel
        </Button>
        <Button
          variant="gradient"
          color="green"
          className="text-gray-900 p-2 bg-green-400"
          onClick={func}
        >
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DialogComp;
