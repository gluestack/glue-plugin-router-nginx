
export const getProjectName = () =>
  process
    .cwd()
    .split('/')[
      process.cwd().split('/').length - 1
    ];