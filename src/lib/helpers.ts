import toast from 'react-hot-toast';

export const notifyLoading = (text: string) => toast.loading(text);

export const notifySuccess = (text: string) => toast.success(text);

export const notifyError = (text: string) => toast.error(text);

export const removeNotification = (id: string) => toast.remove(id);
