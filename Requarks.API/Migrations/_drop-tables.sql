
while(exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_TYPE='FOREIGN KEY'))
begin
 declare @sql nvarchar(2000)
 SELECT TOP 1 @sql=('ALTER TABLE ' + TABLE_SCHEMA + '.[' + TABLE_NAME
 + '] DROP CONSTRAINT [' + CONSTRAINT_NAME + ']')
 FROM information_schema.table_constraints
 WHERE CONSTRAINT_TYPE = 'FOREIGN KEY'
 exec (@sql)
 PRINT @sql
end

while(exists(select 1 from INFORMATION_SCHEMA.TABLES))
begin
 declare @sql2 nvarchar(2000)
 SELECT TOP 1 @sql2=('DROP TABLE ' + TABLE_SCHEMA + '.[' + TABLE_NAME
 + ']')
 FROM INFORMATION_SCHEMA.TABLES
exec (@sql2)
 PRINT @sql2
end