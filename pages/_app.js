import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
    return (
      <>
        <nav className='nav-bar'>
          <div className='nav-bar__left-section'>
            <h1 className='nav-bar__website-title'>coup d&apos;état</h1>
          </div>
          <div className='nav-bar__right-section'>
            <Link href='/'>
              <a className='nav-bar__link nav-bar__link--margin-right'>Home</a>
            </Link>
            <Link href='/interesting-facts/'>
              <a className='nav-bar__link'>Interesting Facts</a>
            </Link>
          </div>
        </nav>
        <Component {...pageProps} />
      </>
    );
}

export default MyApp

  
