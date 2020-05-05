import Nav from './Nav';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Logo, StyledHeader } from './styles/HeaderStyles';
import Cart from './Cart';
import Search from './Search';

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
          <a>Blockade</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <Search />
    </div>
    <Cart />
  </StyledHeader>
);

export default Header;