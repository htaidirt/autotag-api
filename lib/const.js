const env = process.env.NODE_ENV;

export default {
  TABLES: {
    PROJECTS: `auto-tag-${env}-projects`,
    RESOURCES: `auto-tag-${env}-resources`,
    JOBS: `auto-tag-${env}-jobs`,
  }
};
