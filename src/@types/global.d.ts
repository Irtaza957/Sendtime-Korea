export {};

declare global {
  interface Window {
    confirmationResult: any;
    gtag: any;
    PaypleCpayPopup: (data?: any) => void;
  }
}
