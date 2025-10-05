import classes from './header.module.css'
import headerLogo from '../../assets/images/header-logo.png'

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.logo}>
            <img src={headerLogo} alt="Evangadi Logo" />
          </div>
          <nav className={classes.navLinks}>
            <a href="#">Home</a>
            <a href="#">How it Works</a>
            <button className={classes.signinBtn}>Sign In</button>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header