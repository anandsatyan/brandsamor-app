declare module '@calid/react-embed' {
  import type { CSSProperties, ReactElement } from 'react';

  export type CalApi = (command: string, options?: Record<string, unknown>) => void;

  export function getCalApi(options: {
    namespace?: string;
    embedLibUrl?: string;
  }): Promise<CalApi>;

  export type CalProps = {
    namespace?: string;
    calLink: string;
    style?: CSSProperties;
    config?: Record<string, unknown>;
    calOrigin?: string;
    embedJsUrl?: string;
  };

  export default function Cal(props: CalProps): ReactElement;
}
