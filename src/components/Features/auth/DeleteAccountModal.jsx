import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/Common/ui/dialog";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

/**
 * DeleteAccountModal component
 * This modal allows users to confirm account deletion.
 * It matches the style and logic of BlockUserModal.jsx.
 */
const Modal = NiceModal.create(({ onDelete }) => {
  const modal = useModal();

  const handleCancel = () => {
    modal.hide();
  };

  const handleDelete = () => {
    onDelete?.();
    modal.hide();
  };

  return (
    <Dialog open={modal.visible} onOpenChange={handleCancel}>
      <DialogContent
        aria-describedby={undefined}
        showCloseButton={false}
        className="flex w-[300px] flex-col overflow-hidden rounded-[20px] border-none bg-white p-0 text-black shadow-xl"
      >
        <div className="flex flex-col items-center px-6 pt-6 pb-6 gap-2 text-center">
          <h2 className="text-[17px] font-bold">Delete your account?</h2>
          <p className="text-[14px] leading-tight text-gray-500">
            This action is permanent and cannot be undone. All your posts, profile, and data will be lost forever.
          </p>
        </div>

        <div className="flex flex-col border-t border-gray-100">
           <button
            onClick={handleDelete}
            className="w-full py-3.5 text-[15px] font-bold text-red-600 transition-colors hover:bg-gray-50 active:bg-gray-100"
          >
            Delete account
          </button>
          <div className="h-[1px] w-full bg-gray-100" />
          <button
            onClick={handleCancel}
            className="w-full py-3.5 text-[15px] font-medium text-black transition-colors hover:bg-gray-50 active:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export const DeleteAccountModal = {
  open: (props) => NiceModal.show(Modal, props),
  close: () => NiceModal.hide(Modal),
};
