export interface NavlinkProps {
    Icon: React.ElementType;
    link: string;
    children: React.ReactNode;
}
export interface OpensideBar {
    handleCloseSideBarMenu: React.MouseEventHandler<HTMLDivElement>;
    isOpen: boolean;
    modalRef: any;
}