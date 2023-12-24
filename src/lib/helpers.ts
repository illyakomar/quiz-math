import toast, { ToastOptions } from 'react-hot-toast';

export const notifyLoading = (text: string, options?: ToastOptions) =>
  toast.loading(text, { ...options, style: { textAlign: 'center' } });

export const notifySuccess = (text: string, options?: ToastOptions) =>
  toast.success(text, { ...options, style: { textAlign: 'center' } });

export const notifyError = (text: string, options?: ToastOptions) =>
  toast.error(text, { ...options, style: { textAlign: 'center' } });

export const removeNotification = (id: string) => toast.remove(id);
