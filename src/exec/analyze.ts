import { execSync } from 'child_process';

export const scripts: { [key: number]: string } = {
  1: './scripts/state-analysis.py',
};

export const getScript = (scriptId: number): string => {
  return scripts[scriptId];
};

export const python = async (scriptId: number) => {
  const script = getScript(scriptId);
  return execSync(`python3 ${script}`);
};
