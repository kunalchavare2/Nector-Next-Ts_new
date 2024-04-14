import React, { ReactElement } from "react";

type localParameter = {
  children: React.ReactNode | null;
};

export default function Layout({ children }: localParameter): React.ReactNode {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
