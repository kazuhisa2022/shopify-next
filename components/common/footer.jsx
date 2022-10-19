import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-200 text-center lg:text-left">
        <div className="text-gray-700 text-center p-4">
          © 2021 Copyright
          <Link href="/">
            <a className="text-indigo-800 mx-2"> Custom Frontend</a>
          </Link>
        </div>
      </footer>
    </>
  );
}
