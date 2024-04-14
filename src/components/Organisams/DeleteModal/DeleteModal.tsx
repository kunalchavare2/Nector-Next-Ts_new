import React from "react";
import "./DeleteModal.styled";
import Drawer from "@/components/Atoms/Drawer/Drawer";
import {
  BtnWrapper,
  ContentStyle,
  DeleteModalStyle,
  IconButton,
  ModalButton,
} from "./DeleteModal.styled";
import { IoClose } from "react-icons/io5";

type deleteModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onDelete: (value: boolean) => void;
};

const DeleteModal = ({ isOpen, setIsOpen, onDelete }: deleteModalProps) => {
  function exitBtnHandler() {
    setIsOpen(false);
  }

  function handleModalEvent(ev: React.MouseEvent<HTMLButtonElement>) {
    if (ev.target.textContent.toLowerCase() === "delete") {
      onDelete(true);
    } else {
      onDelete(false);
    }
    exitBtnHandler(); // close
  }
  return (
    <Drawer isOpen={isOpen}>
      <DeleteModalStyle>
        <ContentStyle>
          <p className="heading">Delete Item?</p>
          <p className="description">Do you want to delete this cart Item?</p>
        </ContentStyle>
        <BtnWrapper>
          <ModalButton
            type="cancel"
            label="Cancel"
            onClick={handleModalEvent}
          />
          <ModalButton
            type="delete"
            label="Delete"
            onClick={handleModalEvent}
          />
        </BtnWrapper>
        <IconButton
          icon={<IoClose />}
          transparent={true}
          onClick={exitBtnHandler}
        />
      </DeleteModalStyle>
    </Drawer>
  );
};

export default DeleteModal;
