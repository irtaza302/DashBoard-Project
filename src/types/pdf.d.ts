declare module '@react-pdf/renderer' {
  import { ReactElement, ReactNode } from 'react';

  export interface Style {
    [key: string]: string | number | undefined;
  }

  export interface Styles {
    [key: string]: Style;
  }

  export const StyleSheet: {
    create: <T extends Styles>(styles: T) => T;
  };

  export interface DocumentProps {
    children?: ReactNode;
  }

  export interface PageProps {
    size?: string;
    style?: Style;
    children?: ReactNode;
  }

  export interface ViewProps {
    style?: Style;
    children?: ReactNode;
  }

  export interface TextProps {
    style?: Style;
    children?: ReactNode;
  }

  export const Document: React.FC<DocumentProps>;
  export const Page: React.FC<PageProps>;
  export const View: React.FC<ViewProps>;
  export const Text: React.FC<TextProps>;

  export function pdf(element: ReactElement): {
    toBlob: () => Promise<Blob>;
  };
}

declare module '@react-pdf/types' {
  export interface Style {
    [key: string]: string | number | undefined;
  }
} 