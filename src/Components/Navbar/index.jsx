import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { UserIcon } from "@heroicons/react/24/solid";
import ShoppingCart from "../ShoppingCart";

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-offset-4";

  const signOut = localStorage.getItem("sign-out");
  const parsedSignOut = JSON.parse(signOut);
  const isUserSignOut = context.signOut || parsedSignOut;

  const account = localStorage.getItem("account");
  const parsedAccount = JSON.parse(account);

  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = context.account
    ? Object.keys(context.account).length === 0
    : true;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true);
    localStorage.setItem("sign-out", stringifiedSignOut);
    context.setSignOut(true);
  };

  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li className="text-black/60">{parsedAccount?.email}</li>
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={() => handleSignOut()}
            >
              Sign out
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleSignOut()}
          >
            Sign in
          </NavLink>
        </li>
      );
    }
  };

  function renderDesktopView() {
    return (
      <>
        <ul className="hidden md:flex items-center gap-3">
          <li className="font-semibold text-lg">
            <NavLink to={`${isUserSignOut ? "/sign-in" : "/"}`}>Shopi</NavLink>
          </li>
          {hasUserAnAccount && !isUserSignOut ? (
            <>
              <li>
                <NavLink
                  to="/"
                  onClick={() => context.setSearchByCategory()}
                  className={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                >
                  All
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/clothes"
                  onClick={() => context.setSearchByCategory("clothes")}
                  className={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                >
                  Clothes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/electronics"
                  onClick={() => context.setSearchByCategory("electronics")}
                  className={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                >
                  Electronics
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/furnitures"
                  onClick={() => context.setSearchByCategory("furnitures")}
                  className={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                >
                  Furnitures
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/toys"
                  onClick={() => context.setSearchByCategory("toys")}
                  className={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                >
                  Toys
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/others"
                  onClick={() => context.setSearchByCategory("others")}
                  className={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                >
                  Others
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
        <ul className="hidden md:flex items-center gap-3">
          {renderView()}
          <li className="flex items-center">
            <ShoppingCart />
          </li>
        </ul>
      </>
    );
  }

  function renderMobileView() {
    const options = () => (
      <>
        <ul
          className="md:hidden absolute z-10 bg-white top-[85px] left-0 right-0
         w-full gap-7 p-8 flex flex-col items-center justify-center text-[20px]"
        >
          <li>
            <NavLink
              to="/"
              onClick={() => {
                context.setSearchByCategory();
                context.setShowOptions(false);
              }}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              All
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clothes"
              onClick={() => {
                context.setSearchByCategory("clothes");
                context.setShowOptions(false);
              }}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Clothes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/electronics"
              onClick={() => {
                context.setSearchByCategory("electronics");
                context.setShowOptions(false);
              }}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Electronics
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/furnitures"
              onClick={() => {
                context.setSearchByCategory("furnitures");
                context.setShowOptions(false);
              }}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Furnitures
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/toys"
              onClick={() => {
                context.setSearchByCategory("toys");
                context.setShowOptions(false);
              }}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Toys
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/others"
              onClick={() => {
                context.setSearchByCategory("others");
                context.setShowOptions(false);
              }}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Others
            </NavLink>
          </li>
        </ul>
      </>
    );

    const userOptions = () => {
      if (hasUserAnAccount && !isUserSignOut) {
        return (
          <>
            <ul
              className="md:hidden absolute z-10 bg-white top-[85px] left-0 right-0 p-8
                        w-full gap-7 flex flex-col items-center justify-center text-[20px]">
              <li className="text-black/60">{parsedAccount?.email}</li>
              <li>
                <NavLink
                  to="/my-orders"
                  className={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                  onClick={()=> context.setUserOptions(false)}
                >
                  My Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-account"
                  className={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                  onClick={()=> context.setUserOptions(false)}
                >
                  My Account
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sign-in"
                  className={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                  onClick={() => {
                    handleSignOut()
                    context.setUserOptions(false)
                  }}
                >
                  Sign out
                </NavLink>
              </li>
            </ul>
          </>
        );
      } else {
        return (
          <ul
          className="md:hidden absolute z-10 bg-white top-[85px] left-0 right-0 p-8
                    w-full gap-7 flex flex-col items-center justify-center text-[20px]">
            <li>
              <NavLink
                to="/sign-in"
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
                onClick={() => {
                  handleSignOut()
                  context.setUserOptions(false)
                }}
              >
                Sign in
              </NavLink>
            </li>
          </ul>
        );
      }
    };

    return (
      <div className="h-[45px] w-full md:hidden bg-white ">
        <div>
          <img
            src="/navbarMB.svg"
            alt="Menu"
            onClick={() => {
              context.setShowOptions(true)
              context.setUserOptions(false)
            }}
            className={`${
              context.showOptions ? "hidden" : "block"
            } absolute w-[25px] top-10 left-10`}
          />
          <img
            src="/closeIcon.png"
            alt="Close Menu"
            onClick={() => {
              context.setShowOptions(false);
            }}
            className={`${
              context.showOptions ? "block" : "hidden"
            } absolute w-[25px] top-10 left-10`}
          />
        </div>
        <div>
          <UserIcon 
          className="w-[25px] absolute top-10 right-16" 
          onClick={() =>{ 
          context.setUserOptions(!context.userOptions)
          context.setShowOptions(false)
          }}/>
          <ShoppingCart />
        </div>
        {context.showOptions && options()}
        {context.userOptions && userOptions()}
      </div>
    );
  }

  return (
    <nav
      className="flex justify-between items-center fixed z-10 top-0 
                    w-full p-5 px-8 text-sm font-light bg-white"
    >
      {renderMobileView()}
      {renderDesktopView()}
    </nav>
  );
};

export default Navbar;
