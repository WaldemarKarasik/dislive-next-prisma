# Migration `20200907005453-update_channels`

This migration has been generated at 9/7/2020, 8:54:53 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX `Channel.name_unique` ON `dislive`.`Channel`(`name`)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200907003447-create_tables..20200907005453-update_channels
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -20,9 +20,9 @@
 }
 model Channel {
   id Int @id @default(autoincrement())
-  name String
+  name String @unique
   createdAt DateTime @default(now())
   user User @relation(fields: [userId], references: [id])
   userId Int
   videos Video[]
```


