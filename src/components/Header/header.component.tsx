import DarkModeSwitcher from './dark-mode-switcher.component';
import DropdownNotification from './dropdown-notification.component';
import DropdownUser from './dropdown-user.component';

const Header = () => {
  return (
    <header className="sticky top-0 z-999 flex w-full border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark">
      <div className="flex flex-grow items-center justify-between px-4 py-5 shadow-2 md:px-5 2xl:px-10">
        <div className="hidden xl:block">
          <div>
            <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">Business name of the manager</h1>
            <p className="font-medium">Admin Page</p>
          </div>
        </div>

        <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <div data-testid="dark-mode-switcher">
              <DarkModeSwitcher />
            </div>
            <div data-testid="dropdown-notification">
              <DropdownNotification />
            </div>
          </ul>
          <div data-testid="dropdown-user">
            <DropdownUser />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
