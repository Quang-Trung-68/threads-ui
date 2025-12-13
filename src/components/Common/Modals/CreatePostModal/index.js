import NiceModal from "@ebay/nice-modal-react";
import Modal from "./Modal";

export const CreatePostModal = {
  open: (props) => NiceModal.show(Modal, props),
  close: () => NiceModal.hide(Modal),
};
