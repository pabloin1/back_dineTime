-- Agregar la columna `tipo` con un valor predeterminado temporal
ALTER TABLE `Categorias`
ADD COLUMN `tipo` VARCHAR(255) NOT NULL DEFAULT 'default_value';

-- Actualizar las filas existentes si es necesario
UPDATE `Categorias`
SET `tipo` = 'some_value'
WHERE `tipo` = 'default_value';

-- Quitar el valor predeterminado si no lo necesitas después de la actualización
ALTER TABLE `Categorias`
MODIFY COLUMN `tipo` VARCHAR(255) NOT NULL;
