import Nav from './Nav';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Logo, StyledHeader } from './styles/HeaderStyles';

Router.onRouteChangeStart = () => {
  console.log('onRouteChangeStart Triggered');
  NProgress.start();
}
Router.onRouteChangeComplete = () => {
  console.log('onRouteChangeComplete Triggered');
  NProgress.done();
}
Router.onRouteChangeError = () => {
  console.log('onRouteChangeError Triggered');
  NProgress.done();
}

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>Sick Fits</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>Search</p>
    </div>
    <div>Cart</div>
  </StyledHeader>
);

export default Header;