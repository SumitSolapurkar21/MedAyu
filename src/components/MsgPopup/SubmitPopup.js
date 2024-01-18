import React from 'react';
import {
  Button,
  Dialog,
  Portal,
  Provider as PaperProvider,
  Text,
} from 'react-native-paper';

export default function SubmitPopup(title, msg, visibleMsg, hideDialog) {
  return (
    <Portal>
      <Dialog visible={visibleMsg} onDismiss={() => hideDialog()}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{msg}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => hideDialog()}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
