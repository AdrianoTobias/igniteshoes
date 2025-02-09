import { OneSignal } from 'react-native-onesignal';

export function tagUserInfoCreate() {
  OneSignal.User.addTags({
    'user_name': 'Teste 1',
    'user_email': 'teste1@rteste.com.br'
  });
}