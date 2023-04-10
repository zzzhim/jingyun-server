export const PermissionMetadataKey = Symbol('PermissionMetadataKey');

export function Permission(permission: string) {
  return Reflect.metadata(PermissionMetadataKey, permission);
}
