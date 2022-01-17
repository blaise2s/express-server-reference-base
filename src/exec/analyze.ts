import { execSync } from 'child_process';
import { Upload } from '../sequelize/models/upload.model';

export const scripts: { [key: number]: string } = {
  1: './scripts/state-analysis.py',
};

export const getScript = (scriptId: number): string => {
  return scripts[scriptId];
};

const prependDotSlash = (path: string): string => {
  return `./${path}`;
};

export const getScriptArgs = async (
  file1Id?: number,
  file2Id?: number,
  file3Id?: number
): Promise<string[]> => {
  const fileIds = [file1Id, file2Id, file3Id];
  const files = await Promise.all(
    fileIds.map(async fileId => Upload.findByPk(fileId))
  );
  return files.reduce<string[]>((filtered, file) => {
    if (file) {
      filtered.push(prependDotSlash(file.path));
    }
    return filtered;
  }, []);
};

export const python = async (
  scriptId: number,
  file1Id: number,
  file2Id?: number,
  file3Id?: number
) => {
  const scriptArgs = await getScriptArgs(file1Id, file2Id, file3Id);
  const script = getScript(scriptId);
  return execSync(`python3 ${[script, ...scriptArgs].join(' ')}`);
};
