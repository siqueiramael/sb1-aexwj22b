const info = (...args: any[]) => {
  console.log(new Date().toISOString(), ...args);
};

const error = (...args: any[]) => {
  console.error(new Date().toISOString(), ...args);
};

const warn = (...args: any[]) => {
  console.warn(new Date().toISOString(), ...args);
};

export const logger = {
  info,
  error,
  warn,
};