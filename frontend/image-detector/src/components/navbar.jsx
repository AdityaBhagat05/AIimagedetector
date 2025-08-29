function NavBar() {

  return (
    <>
    <nav>
        <div className='Header'>
            <h1>RealorNot</h1>
            <h2>Find out if an image is AI Generated</h2>
        </div>
        <ul>
            <li><button className='home'>Home</button></li>
            <li><button className='navbarbutton'>Checker</button></li>
            <li><button className='navbarbutton'>How our app works?</button></li>
            <li><button className='navbarbutton'>About us</button></li>
        </ul>
    </nav>
    </>
  )
}

export default NavBar
