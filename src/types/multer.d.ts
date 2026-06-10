declare module 'multer' {
  export interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    filename: string;
    path: string;
    size: number;
    buffer: Buffer;
  }

  export type FileNameCallback = (error: Error | null, filename: string) => void;

  export function diskStorage(options: {
    destination: string;
    filename: (request: unknown, file: MulterFile, callback: FileNameCallback) => void;
  }): unknown;

  export function memoryStorage(): unknown;
}
