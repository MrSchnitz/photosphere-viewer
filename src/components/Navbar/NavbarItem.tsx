import clsx from "clsx";

interface Props {
  children: string;
  isActive: boolean;
  href?: string;
  onClick?: () => void;
}

export default function NavbarItem({
  children,
  isActive,
  href,
  onClick,
}: Props) {
  return (
    <li onClick={onClick}>
      <a
        href={href}
        className={clsx(
          "cursor-pointer block py-2 px-3 text-gray-900 transition-colors rounded hover:bg-gray-100 t md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700",
            isActive && "!text-blue-500"
        )}
      >
        {children}
      </a>
    </li>
  );
}
