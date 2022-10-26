import Link from 'next/link'
import Image from 'next/image'

const Coffee = () => {
    return (
        <div className="buyButtonWrapper">
    <a
      className="buyButton"
      target="_blank"
      rel="noreferrer"
      href="https://www.buymeacoffee.com/craigdempsQ"
    >
      <Image
        width="33%"
        height="100%"
        className="coffeeImage"
        src="/000000-0.png"
        alt="Buy me a coffee"
      />
    </a>
    </div>
     );
    }

const Header = () => {
    return (
        <div className='Header'>
            <Coffee/>
            <Link href="/"><a className="appTitle">
                <h1><span className="funny-text">XMAS</span>/trope-hunt</h1>
            </a></Link>
        </div>
    )
};

export default Header;