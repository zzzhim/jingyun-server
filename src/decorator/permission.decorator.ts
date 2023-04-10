export const PermissionMetadataKey = Symbol('PermissionMetadataKey');

export function Permission(permission: string): MethodDecorator {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (target, propertyKey, descriptor) => {
    Reflect.defineMetadata(
      PermissionMetadataKey,
      permission,
      target,
      propertyKey
    );
  };
}
