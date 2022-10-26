import Link from 'next/link'

const Coffee = () => {
    return (
        <div className="buyButtonWrapper">
    <a
      className="buyButton"
      target="_blank"
      href="https://www.buymeacoffee.com/craigdempsQ"
    >
      <img
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