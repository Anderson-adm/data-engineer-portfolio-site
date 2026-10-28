export const technologies = [
  { name: 'Python', icon: 'python.svg' },
  { name: 'SQL', icon: 'sql.svg' },
  { name: 'AWS', icon: 'aws.svg' },
  { name: 'PySpark', icon: 'spark.svg' },
  { name: 'S3', icon: 'aws-s3.svg' },
  { name: 'AWS Glue', icon: 'aws-glue.svg' },
  { name: 'Lambda', icon: 'aws-lambda.svg' },
  { name: 'Athena', icon: 'aws-athena.svg' },
  { name: 'Bash', icon: 'bash.svg' },
  { name: 'Terraform', icon: 'terraform.svg' },
  { name: 'dbt', icon: 'dbt.svg' },
  { name: 'Airflow', icon: 'airflow.svg' },
  { name: 'Docker', icon: 'docker.svg' },
  { name: 'Metabase', icon: 'metabase.svg' },
  { name: 'CI/CD', icon: 'github-actions.svg' },
  { name: 'Postgres', icon: 'postgresql.svg' },
  { name: 'MongoDB', icon: 'mongodb.svg' },
  { name: 'Aurora', icon: 'aws-aurora.svg' },
  { name: 'RDS', icon: 'aws-rds.svg' },
  { name: 'SQL Server', icon: 'sql-server.svg' },
] as const;
export type TechnologyName = typeof technologies[number]['name'];

// Presentation groups describe the requested ecosystem, not experience levels.
export const technologyGroups = [
  { id: 'languages', label: 'Linguagens', items: ['Python', 'SQL', 'PySpark', 'Bash'] },
  { id: 'tools', label: 'Tools', items: ['Terraform', 'dbt', 'Airflow', 'Docker', 'Metabase', 'CI/CD'] },
  { id: 'databases', label: 'Databases', items: ['Postgres', 'MongoDB', 'Aurora', 'RDS', 'SQL Server'] },
  { id: 'cloud', label: 'Cloud', items: ['AWS', 'S3', 'Lambda', 'AWS Glue', 'Athena'] },
] as const satisfies readonly { id: string; label: string; items: readonly TechnologyName[] }[];
