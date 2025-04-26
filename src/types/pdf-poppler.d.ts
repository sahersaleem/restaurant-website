declare module "pdf-poppler" {
    interface ConvertOptions {
      format?: string;
      out_dir?: string;
      out_prefix?: string;
      page?: number;
      scale?: number;
      resolution?: number;
      singleFile?: boolean;
    }
  
    export function convert(filePath: string, options: ConvertOptions): Promise<any>;
  }