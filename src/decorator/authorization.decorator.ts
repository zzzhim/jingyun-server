export const AuthorizationMetadataKey = Symbol('AuthorizationMetadataKey');

export function Authorization(permission = true) {
  return Reflect.metadata(AuthorizationMetadataKey, permission);
}
