import React, { useState, useEffect } from "react";
import Link from "next/link";
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Layout({ children }) {
  const [toggleState, setToggleState] = useState(false);

  function toggle() {
    setToggleState(!toggleState);
  }

  useEffect(() => {
    AOS.init({
      duration : 1000
    })
    document.querySelectorAll('.card').forEach((elem) => {
      elem.onmouseenter = () => {
        elem.classList.add('hover')
      }
      elem.onmouseleave = () => {
        elem.classList.remove('hover')
      }
    })
  });

  return (
    <div className="container-wrap animated fadeIn">
      <header>
        <Link href="/">
          <a className="logo">David Riches</a>
        </Link>
        {/* <ThemeChanger/> */}
        <div
          role="button"
          aria-label="Main menu"
          className={toggleState ? "navbutton active" : "navbutton"}
          onClick={toggle}
          tabIndex={0}
          onKeyDown={toggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={toggleState ? "open" : ""}>
          <ul id="navigation">
            <li><Link href='/'>About me</Link></li>
            <li><Link href='/what-i-can-do'>What I can do</Link></li>
            <li><a target="_blank" rel="noopener noreferrer" href='https://resume.davidrich.es/'>Resume</a></li>
            <li><Link href='/contact'>Contact</Link></li>
          </ul>
        </nav>
      </header>

      <div id="page-wrap">{children}</div>
      <footer>
        <div>
          <p>
            Crafted by David with{" "}
            <span role="img" alt="Heart emoji" aria-label="Love">
              ❤️
            </span>
          </p>
          <a
            className="github"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.github.com/imshuffling"
          >
            <svg
              aria-labelledby="simpleicons-github-icon"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title id="simpleicons-github-icon">GitHub icon</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
