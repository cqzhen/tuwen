function getEnv(env) {
  if (env) return window.graphics[`graphic_${env}`];
  return [];
}
