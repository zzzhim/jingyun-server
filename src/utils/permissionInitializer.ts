import * as glob from 'glob';
import * as path from 'path';
import { PermissionModel } from '../model/permission.model';
import { PermissionMetadataKey } from '../decorator/permission.decorator';

export async function initializePermissions() {
  const controllersPattern = path.join(
    __dirname,
    '../controller/**/**.controller.ts'
  );

  const files = glob.sync(path.normalize(controllersPattern), {
    nodir: true,
    windowsPathsNoEscape: true,
  });

  for (const file of files) {
    const controllerModule = await import(file);

    for (const exportedValue of Object.values(controllerModule)) {
      if (typeof exportedValue === 'function') {
        const controller = new exportedValue.prototype.constructor();
        const methodNames = Object.getOwnPropertyNames(
          exportedValue.prototype
        ).filter(methodName => methodName !== 'constructor');

        for (const methodName of methodNames) {
          const permission = Reflect.getMetadata(
            PermissionMetadataKey,
            controller,
            methodName
          );

          if (permission) {
            const existingPermission = await PermissionModel.findOne({
              where: { name: permission },
            });

            if (!existingPermission) {
              await PermissionModel.create({
                name: permission,
                description: `Permission for ${methodName}`,
              });
              console.log(`Inserted permission: ${permission}`);
            }
          }
        }
      }
    }
  }
}
