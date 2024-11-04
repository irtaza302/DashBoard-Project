declare module '@react-pdf/renderer' {
  import { ReactElement } from 'react';

  export interface PDFOptions {
    compress?: boolean;
  }

  export function pdf(element: ReactElement): {
    toBlob: () => Promise<Blob>;
  };

  export interface PDFViewerProps {
    children: ReactElement;
  }

  export const PDFViewer: React.FC<PDFViewerProps>;
}

declare module '@react-pdf/types' {
  export interface Style {
    [key: string]: string | number | undefined;
  }
} 