import * as Dialog from '@radix-ui/react-dialog';

import igniteLogo from '../../assets/ignite-logo.svg';
import { NewTransactionModal } from '../NewTransactionModal';

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

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova Transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
