import { FC, useState, createContext } from 'react';
type SidebarContextProps = {
  sidebarToggle: any;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextProps>(
  {} as SidebarContextProps
);

export const SidebarProvider: FC = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };
  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  return (
    <SidebarContext.Provider
      value={{ sidebarToggle, toggleSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
