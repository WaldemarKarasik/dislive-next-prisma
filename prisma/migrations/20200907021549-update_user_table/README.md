# Migration `20200907021549-update_user_table`

This migration has been generated at 9/7/2020, 10:15:49 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX `Channel_userId_unique` ON `dislive`.`Channel`(`userId`)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200907005453-update_channels..20200907021549-update_user_table
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
@@ -16,8 +16,9 @@
   username String
   password String
   isBanned Boolean? @default(false)
   createdAt DateTime @default(now())
+  channel Channel? 
 }
 model Channel {
   id Int @id @default(autoincrement())
```


