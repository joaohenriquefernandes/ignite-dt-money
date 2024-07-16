import igniteLogo from '../../assets/ignite-logo.svg';

import {
  HeaderContainer,
  HeaderContent,
  LogoContainer,
  NewTransactionButton,
} from './styles';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <img src={igniteLogo} alt="" />
          <h1>DT Money</h1>
        </LogoContainer>
        <NewTransactionButton>Nova Transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  );
}
