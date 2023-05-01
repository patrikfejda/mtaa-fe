import {Modal, Text} from 'native-base';
import React from 'react';
import type {AppModalProps} from '../types/component';

// @ts-ignore
function getByDisplayName(children, displayName) {
  return React.Children.map(children, child =>
    child.type.displayName === displayName ? child : null,
  );
}

function AppModal({children, isOpen, onClose}: AppModalProps) {
  const header = getByDisplayName(children, 'Header');
  const body = getByDisplayName(children, 'Body');
  const footer = getByDisplayName(children, 'Footer');

  return (
    <Modal isOpen={isOpen} onClose={onClose} px="2" size="full">
      <Modal.Content mt="auto" mb="2">
        <Modal.CloseButton top="2" right="2.5" />
        <Modal.Header
          borderBottomWidth="0"
          height="12"
          px="3"
          py="0"
          justifyContent="center">
          <Text fontSize="18" fontWeight="bold">
            {header}
          </Text>
        </Modal.Header>
        <Modal.Body px="3" pt="1" pb="0">
          {body}
        </Modal.Body>
        <Modal.Footer borderTopWidth="0" pt="4" px="3" pb="3">
          {footer}
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

function AppModalHeader({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
AppModalHeader.displayName = 'Header';

function AppModalBody({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
AppModalBody.displayName = 'Body';

function AppModalFooter({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
AppModalFooter.displayName = 'Footer';

export default Object.assign(AppModal, {
  Header: AppModalHeader,
  Body: AppModalBody,
  Footer: AppModalFooter,
});
