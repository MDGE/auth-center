declare namespace NodeJS {
  interface Process {
    readonly NODE_ENV: string;
  }
}
declare module '*.jpeg';
declare module '*.png';
declare module '*.less';
declare module '*.scss';
declare module 'axios';
declare module '*.glb';
declare let NODE_ENV: string;
type Res = {
  errorCode: number;
};
