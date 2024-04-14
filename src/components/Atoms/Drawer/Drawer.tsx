import { createPortal } from "react-dom";
import DrawerStyle from "./Drawer.styled";

type drawerProps = {
  isOpen: boolean;
  wrapperId?: string;
  handleClose?: () => void;
  children?: React.ReactNode;
};

const Drawer = ({
  isOpen,
  wrapperId,
  handleClose,
  children,
  ...props
}: drawerProps) => {
  if (!isOpen) return null;

  return createPortal(
    <DrawerStyle className="drawer" {...props}>
      {children}
    </DrawerStyle>,
    document.body
  );
};

export default Drawer;
