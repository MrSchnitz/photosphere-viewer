import NavbarItem from "./NavbarItem.tsx";

export enum Page {
  UPLOAD = "UPLOAD",
  VIEW = "VIEW",
}

interface Props {
  page: Page | null;
  onNavChange: (page: Page | null) => void;
}

export default function NavBar({ page, onNavChange }: Props) {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
          onClick={page !== null ? () => onNavChange(Page.UPLOAD) : undefined}
        >
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            PhotosphereViewer
          </span>
        </a>
        <div
          className="items-center justify-start flex-1 ml-10 hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          {page && (
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <NavbarItem
                onClick={() => onNavChange(Page.UPLOAD)}
                isActive={page === Page.UPLOAD}
              >
                Upload
              </NavbarItem>
              <NavbarItem
                onClick={() => onNavChange(Page.VIEW)}
                isActive={page === Page.VIEW}
              >
                View
              </NavbarItem>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
